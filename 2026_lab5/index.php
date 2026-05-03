<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();

// Настройки подключения
$user = 'geontar'; $pass_db = '123456'; $db_name = 'geontar';
$db = new PDO("mysql:host=localhost;dbname=$db_name", $user, $pass_db, [
    PDO::ATTR_PERSISTENT => true, PDO::ERRMODE_EXCEPTION => true
]);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $messages = [];
    // Отображение сообщения об успехе и данных для входа (один раз) [cite: 91, 98]
    if (!empty($_COOKIE['save'])) {
        setcookie('save', '', 100000);
        $messages[] = 'Спасибо, результаты сохранены.';
        if (!empty($_COOKIE['pass'])) {
            $messages[] = sprintf('Вы можете <a href="login.php">войти</a> с логином <strong>%s</strong> 
                и паролем <strong>%s</strong> для изменения данных.',
                htmlspecialchars($_COOKIE['login']), htmlspecialchars($_COOKIE['pass']));
            setcookie('login', '', 100000); setcookie('pass', '', 100000);
        }
    }

    $errors = [];
    $fields = ['fio', 'phone', 'email', 'birthday', 'gender', 'languages', 'biography', 'contract'];
    foreach ($fields as $f) {
        if (!empty($_COOKIE[$f . '_error'])) {
            $errors[$f] = $_COOKIE[$f . '_error'];
            setcookie($f . '_error', '', 100000);
        }
    }

    $values = [];
    // Если пользователь авторизован, загружаем актуальные данные из БД [cite: 99]
    if (!empty($_SESSION['login'])) {
        $stmt = $db->prepare("SELECT * FROM application WHERE id = ?");
        $stmt->execute([$_SESSION['uid']]);
        $row = $stmt->fetch();
        foreach ($fields as $f) { $values[$f] = $row[$f] ?? ''; }
        
        $stmt = $db->prepare("SELECT language_id FROM application_languages WHERE application_id = ?");
        $stmt->execute([$_SESSION['uid']]);
        $values['languages'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } else {
        // Если нет — берем из Cookies (результат задания 4) [cite: 101]
        foreach ($fields as $f) {
            $values[$f] = $_COOKIE[$f . '_value'] ?? '';
        }
        $values['languages'] = isset($_COOKIE['languages_value']) ? json_decode($_COOKIE['languages_value']) : [];
    }

    include('form.php');
} else {
    // POST: Валидация всех полей регулярными выражениями [cite: 74, 101]
    $errors = false;
    if (!preg_match('/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/u', $_POST['fio'])) {
        setcookie('fio_error', 'Имя должно содержать только буквы и пробелы.', time() + 24*3600); $errors = true;
    }
    // (Здесь должны быть проверки для всех полей из задания №4)
    
    if ($errors) {
        foreach ($_POST as $key => $val) {
            setcookie($key . '_value', is_array($val) ? json_encode($val) : $val, time() + 30*24*3600);
        }
        header('Location: index.php'); exit();
    }

    if (!empty($_SESSION['login'])) {
        // Перезапись данных существующего пользователя [cite: 100]
        $stmt = $db->prepare("UPDATE application SET name=?, phone=?, email=?, birthday=?, gender=?, biography=? WHERE id=?");
        $stmt->execute([$_POST['fio'], $_POST['phone'], $_POST['email'], $_POST['birthday'], $_POST['gender'], $_POST['biography'], $_SESSION['uid']]);
        
        $db->prepare("DELETE FROM application_languages WHERE application_id=?")->execute([$_SESSION['uid']]);
        $stmt_l = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
        foreach ($_POST['languages'] as $l_id) { $stmt_l->execute([$_SESSION['uid'], $l_id]); }
    } else {
        // Регистрация нового пользователя и генерация логина/пароля [cite: 91, 98]
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