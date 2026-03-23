<?php
header('Content-Type: text/html; charset=UTF-8');

$user = 'geontar';
$pass = 'ваш_пароль';
$db_name = 'geontar';

try {
    $db = new PDO("mysql:host=localhost;dbname=$db_name", $user, $pass, [
        PDO::ATTR_PERSISTENT => true,
        PDO::ERRMODE_EXCEPTION => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die('Ошибка подключения: ' . $e->getMessage());
}

$messages = [];

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!empty($_GET['save'])) {
        $messages[] = '<div class="success">Данные успешно сохранены! [cite: 18]</div>';
    }
    include('form.php');
    exit();
}

// --- Бэкенд Валидация [cite: 16-17] ---
$errors = false;

// ФИО: только буквы и пробелы, до 150 символов [cite: 17]
if (empty($_POST['fio']) || !preg_match('/^[a-zA-Zа-яА-Я\s]+$/u', $_POST['fio']) || mb_strlen($_POST['fio']) > 150) {
    $messages[] = '<div class="error">ФИО должно содержать только буквы и быть до 150 символов.</div>';
    $errors = true;
}

// E-mail
if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $messages[] = '<div class="error">Некорректный e-mail.</div>';
    $errors = true;
}

// Языки: проверка на пустой выбор и допустимые значения [cite: 17]
if (empty($_POST['languages']) || !is_array($_POST['languages'])) {
    $messages[] = '<div class="error">Выберите хотя бы один язык программирования.</div>';
    $errors = true;
}

if (!$errors) {
    try {
        // Запись в основную таблицу через prepared statements [cite: 22]
        $stmt = $db->prepare("INSERT INTO application (name, phone, email, birthday, gender, biography) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $_POST['fio'], $_POST['phone'], $_POST['email'], $_POST['birthday'], $_POST['gender'], $_POST['biography']
        ]);

        $app_id = $db->lastInsertId(); // [cite: 36]

        // Запись выбранных языков в таблицу связей [cite: 38-41]
        $stmt_lang = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
        foreach ($_POST['languages'] as $lang_id) {
            $stmt_lang->execute([$app_id, (int)$lang_id]);
        }

        header('Location: ?save=1');
        exit();
    } catch (PDOException $e) {
        $messages[] = '<div class="error">Ошибка сохранения: ' . $e->getMessage() . '</div>';
    }
}

// Если есть ошибки — снова показываем форму с сообщениями
include('form.php');