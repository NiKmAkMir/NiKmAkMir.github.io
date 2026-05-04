<?php
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
    die('Ошибка подключения к базе данных: ' . $e->getMessage());
}
?>