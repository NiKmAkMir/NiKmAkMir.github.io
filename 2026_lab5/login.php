<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();

// DRY: Используем общий файл подключения 
require 'db.php'; 

if (!empty($_GET['logout'])) {
    session_destroy(); header('Location: index.php'); exit();
}

if (!empty($_SESSION['login'])) {
    header('Location: index.php'); exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $login_val = $_GET['login'] ?? '';
    $pass_val = $_GET['pass'] ?? '';
    // (Здесь твой HTML код формы логина)
} else {
    $stmt = $db->prepare("SELECT id, pass FROM application WHERE login = ?");
    $stmt->execute([$_POST['login']]);
    $user = $stmt->fetch();

    if ($user && password_verify($_POST['pass'], $user['pass'])) {
        $_SESSION['login'] = $_POST['login'];
        $_SESSION['uid'] = $user['id'];
        header('Location: index.php');
    } else {
        echo "Ошибка входа. <a href='login.php'>Назад</a>";
    }
}