<?php
// Защитные HTTP-заголовки
header('X-Frame-Options: DENY'); // Защита от Clickjacking
header('X-Content-Type-Options: nosniff'); // Защита от подмены MIME-типов
header('X-XSS-Protection: 1; mode=block'); // Базовая защита от XSS в старых браузерах

$user = 'geontar'; 
$pass_db = '123456'; 
$db_name = 'geontar';

try {
    $db = new PDO("mysql:host=localhost;dbname=$db_name", $user, $pass_db, [
        PDO::ATTR_PERSISTENT => true, 
        PDO::ERRMODE_EXCEPTION => true,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die('Ошибка подключения к базе данных.'); // Убрали вывод $e->getMessage() в целях безопасности (не раскрываем детали БД)
}
?>