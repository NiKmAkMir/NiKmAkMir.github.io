<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();

// Выход из системы
if (!empty($_GET['logout'])) {
    session_destroy();
    header('Location: index.php'); exit();
}

if (!empty($_SESSION['login'])) {
    header('Location: index.php'); exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
?>
    <form action="" method="post">
        <input name="login" placeholder="Логин" required /><br/>
        <input name="pass" type="password" placeholder="Пароль" required /><br/>
        <input type="submit" value="Войти" />
    </form>
<?php
} else {
    $user_db = 'geontar'; $pass_db = '123456'; $db_name = 'geontar';
    $db = new PDO("mysql:host=localhost;dbname=$db_name", $user_db, $pass_db);
    
    $stmt = $db->prepare("SELECT id, pass FROM application WHERE login = ?");
    $stmt->execute([$_POST['login']]);
    $user = $stmt->fetch();

    // Сверка хеша пароля [cite: 92]
    if ($user && password_verify($_POST['pass'], $user['pass'])) {
        $_SESSION['login'] = $_POST['login'];
        $_SESSION['uid'] = $user['id'];
        header('Location: index.php');
    } else {
        echo "Неверный логин или пароль. <a href='login.php'>Попробовать снова</a>";
    }
}