<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();

if (!empty($_GET['logout'])) {
    session_destroy(); header('Location: index.php'); exit();
}

if (!empty($_SESSION['login'])) {
    header('Location: index.php'); exit();
}

// Автоподстановка из URL
$login_val = $_GET['login'] ?? '';
$pass_val = $_GET['pass'] ?? '';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход</title>
    <style>
        body { font-family: sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); width: 300px; }
        h2 { margin-top: 0; font-size: 20px; text-align: center; }
        input { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 4px; box-sizing: border-box; }
        .btn { background: #4f46e5; color: white; border: none; padding: 10px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: 600; }
        .back { display: block; text-align: center; margin-top: 15px; font-size: 14px; color: #64748b; text-decoration: none; }
    </style>
</head>
<body>
<div class="card">
    <h2>Авторизация</h2>
    <form action="" method="post">
        <input name="login" placeholder="Логин" value="<?php echo htmlspecialchars($login_val); ?>" required />
        <input name="pass" type="text" placeholder="Пароль" value="<?php echo htmlspecialchars($pass_val); ?>" required />
        <button type="submit" class="btn">Войти</button>
    </form>
    <a href="index.php" class="back">На главную</a>
</div>
</body>
</html>
<?php
} else {
    $user_db = 'geontar'; $pass_db = '123456'; $db_name = 'geontar';
    $db = new PDO("mysql:host=localhost;dbname=$db_name", $user_db, $pass_db);
    
    $stmt = $db->prepare("SELECT id, pass FROM application WHERE login = ?");
    $stmt->execute([$_POST['login']]);
    $user = $stmt->fetch();

    if ($user && password_verify($_POST['pass'], $user['pass'])) {
        $_SESSION['login'] = $_POST['login'];
        $_SESSION['uid'] = $user['id'];
        header('Location: index.php');
    } else {
        echo "Ошибка! <a href='login.php'>Назад</a>";
    }
}