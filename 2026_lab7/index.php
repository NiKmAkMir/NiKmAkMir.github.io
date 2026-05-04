<?php
header('Content-Type: text/html; charset=UTF-8');
// Безопасный старт сессии
ini_set('session.cookie_httponly', 1); // Защита куки сессии от чтения через JS (XSS)
session_start();

require 'db.php';

// Генерация CSRF-токена, если его нет
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // ... [ВЕСЬ КОД GET-ЗАПРОСА ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ ИЗ ПРОШЛОЙ ВЕРСИИ] ...
    $messages = [];
    if (!empty($_COOKIE['save'])) {
        setcookie('save', '', 100000);
        $messages[] = 'Спасибо, результаты сохранены.';
        if (!empty($_COOKIE['pass'])) {
            $messages[] = sprintf('Ваш логин: <strong>%s</strong>, пароль: <strong>%s</strong>. <br/> 
                <a href="login.php?login=%s&pass=%s">Войти</a> для редактирования.',
                htmlspecialchars($_COOKIE['login'], ENT_QUOTES, 'UTF-8'), 
                htmlspecialchars($_COOKIE['pass'], ENT_QUOTES, 'UTF-8'),
                urlencode($_COOKIE['login']), urlencode($_COOKIE['pass']));
            setcookie('login', '', 100000); setcookie('pass', '', 100000);
        }
    }

    $errors = [];
    $fields = ['fio', 'phone', 'email', 'birthday', 'gender', 'languages', 'biography', 'contract'];
    foreach ($fields as $f) {
        if (!empty($_COOKIE[$f . '_error'])) {
            $errors[$f] = htmlspecialchars($_COOKIE[$f . '_error'], ENT_QUOTES, 'UTF-8'); // Экранирование XSS
            setcookie($f . '_error', '', 100000);
        }
    }

    $values = [];
    if (!empty($_SESSION['login'])) {
        $stmt = $db->prepare("SELECT * FROM application WHERE id = ?");
        $stmt->execute([$_SESSION['uid']]);
        $row = $stmt->fetch();
        $values['fio'] = $row['name'] ?? '';
        foreach (['phone', 'email', 'birthday', 'gender', 'biography'] as $f) {
            $values[$f] = $row[$f] ?? '';
        }
        
        $stmt = $db->prepare("SELECT language_id FROM application_languages WHERE application_id = ?");
        $stmt->execute([$_SESSION['uid']]);
        $values['languages'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } else {
        foreach ($fields as $f) {
            $values[$f] = $_COOKIE[$f . '_value'] ?? '';
        }
        $values['languages'] = isset($_COOKIE['languages_value']) ? json_decode($_COOKIE['languages_value']) : [];
    }

    include('form.php');
} else {
    // ПРОВЕРКА CSRF ТОКЕНА!
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        die('Ошибка безопасности: неверный CSRF-токен.');
    }

    // POST-обработка (валидация регулярками)
    $errors = false;
    if (!preg_match('/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/u', $_POST['fio'])) {
        setcookie('fio_error', 'Имя заполнено неверно.', time() + 24*3600); $errors = true;
    }
    
    if ($errors) {
        foreach ($_POST as $key => $val) {
            setcookie($key . '_value', is_array($val) ? json_encode($val) : $val, time() + 30*24*3600);
        }
        header('Location: index.php'); exit();
    }

    if (!empty($_SESSION['login'])) {
        $stmt = $db->prepare("UPDATE application SET name=?, phone=?, email=?, birthday=?, gender=?, biography=? WHERE id=?");
        $stmt->execute([$_POST['fio'], $_POST['phone'], $_POST['email'], $_POST['birthday'], $_POST['gender'], $_POST['biography'], $_SESSION['uid']]);
        
        $db->prepare("DELETE FROM application_languages WHERE application_id=?")->execute([$_SESSION['uid']]);
        $stmt_l = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
        foreach ($_POST['languages'] as $l_id) { $stmt_l->execute([$_SESSION['uid'], $l_id]); }
    } else {
        $login = 'user' . rand(1000, 9999);
        $pass = substr(md5(uniqid()), 0, 8);
        setcookie('login', $login); setcookie('pass', $pass);
        
        $stmt = $db->prepare("INSERT INTO application (name, phone, email, birthday, gender, biography, login, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$_POST['fio'], $_POST['phone'], $_POST['email'], $_POST['birthday'], $_POST['gender'], $_POST['biography'], $login, password_hash($pass, PASSWORD_DEFAULT)]);
        $app_id = $db->lastInsertId();
        
        $stmt_l = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
        foreach ($_POST['languages'] as $l_id) { $stmt_l->execute([$app_id, $l_id]); }
    }
    
    setcookie('save', '1');
    header('Location: index.php');
}