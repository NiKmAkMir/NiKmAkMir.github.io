<?php
// Безопасность сессии
ini_set('session.cookie_httponly', 1);
session_start();

require 'db.php'; 

// Генерация токена для форм админки
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// 1. HTTP-Авторизация через БД
$auth_failed = true;
if (!empty($_SERVER['PHP_AUTH_USER']) && !empty($_SERVER['PHP_AUTH_PW'])) {
    $stmt = $db->prepare("SELECT pass FROM admins WHERE login = ?");
    $stmt->execute([$_SERVER['PHP_AUTH_USER']]);
    $admin = $stmt->fetch();
    
    // Сверка MD5 хеша (согласно заданию 6)
    if ($admin && $admin['pass'] === md5($_SERVER['PHP_AUTH_PW'])) {
        $auth_failed = false;
    }
}

if ($auth_failed) {
    header('HTTP/1.1 401 Unauthorized');
    header('WWW-Authenticate: Basic realm="Admin Area"');
    print('<h1>401 Требуется авторизация</h1>');
    exit();
}

// ПРОВЕРКА CSRF ПРИ POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        die('Ошибка безопасности: неверный CSRF-токен.');
    }
}

// 2. Удаление
if (isset($_POST['delete_id'])) {
    $id = (int)$_POST['delete_id'];
    $db->prepare("DELETE FROM application_languages WHERE application_id = ?")->execute([$id]);
    $db->prepare("DELETE FROM application WHERE id = ?")->execute([$id]);
    header("Location: admin.php"); exit();
}

// 3. Редактирование
if (isset($_POST['edit_id'])) {
    $id = (int)$_POST['edit_id'];
    $db->prepare("UPDATE application SET name=?, phone=?, email=?, birthday=?, gender=?, biography=? WHERE id=?")
       ->execute([$_POST['fio'], $_POST['phone'], $_POST['email'], $_POST['birthday'], $_POST['gender'], $_POST['biography'], $id]);
    
    $db->prepare("DELETE FROM application_languages WHERE application_id=?")->execute([$id]);
    if (!empty($_POST['languages'])) {
        $stmt_l = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
        foreach ($_POST['languages'] as $l_id) { $stmt_l->execute([$id, $l_id]); }
    }
    header("Location: admin.php"); exit();
}

// 4. Статистика (GROUP BY)
$stats = $db->query("SELECT language_id, COUNT(*) as count FROM application_languages GROUP BY language_id")->fetchAll(PDO::FETCH_KEY_PAIR);
$all_langs = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java', 8=>'Haskel', 9=>'Clojure', 10=>'Prolog', 11=>'Scala', 12=>'Go'];

// 5. Список пользователей
$users = $db->query("SELECT * FROM application ORDER BY id DESC")->fetchAll();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админ-панель</title>
    <style>
        body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
        .container { max-width: 1100px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 14px; }
        th { background: #f8fafc; }
        .stat-box { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px; }
        .stat-item { background: #e0f2fe; padding: 10px 15px; border-radius: 8px; border: 1px solid #bae6fd; font-size: 13px; }
        .btn { padding: 5px 10px; border-radius: 4px; border: none; cursor: pointer; color: white; text-decoration: none; font-size: 12px; }
        .btn-edit { background: #4f46e5; }
        .btn-del { background: #dc2626; }
    </style>
</head>
<body>

<div class="container">
    <h1>Панель администратора</h1>

    <h3>Статистика по языкам</h3>
    <div class="stat-box">
        <?php foreach ($all_langs as $id => $name): ?>
            <div class="stat-item">
                <?php echo $name; ?>: <b><?php echo $stats[$id] ?? 0; ?></b>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if (isset($_GET['edit'])): 
        $edit_id = (int)$_GET['edit'];
        $stmt = $db->prepare("SELECT * FROM application WHERE id = ?");
        $stmt->execute([$edit_id]);
        $u = $stmt->fetch();
        if ($u):
            $u_langs = $db->query("SELECT language_id FROM application_languages WHERE application_id = $edit_id")->fetchAll(PDO::FETCH_COLUMN);
    ?>
        <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px;">
            <h3>Редактирование пользователя #<?php echo $u['id']; ?></h3>
            <form action="admin.php" method="POST">
                <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
                <input type="hidden" name="edit_id" value="<?php echo $u['id']; ?>">
                ФИО: <input type="text" name="fio" value="<?php echo htmlspecialchars($u['name'], ENT_QUOTES); ?>"><br><br>
                Биография: <textarea name="biography"><?php echo htmlspecialchars($u['biography'], ENT_QUOTES); ?></textarea><br><br>
                <button type="submit" class="btn btn-edit" style="font-size: 14px; padding: 10px;">Сохранить изменения</button>
                <a href="admin.php">Отмена</a>
            </form>
        </div>
    <?php endif; endif; ?>

    <h3>Список заявок</h3>
    <table>
        <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Email</th>
            <th>Дата</th>
            <th>Действия</th>
        </tr>
        <?php foreach ($users as $user): ?>
        <tr>
            <td><?php echo $user['id']; ?></td>
            <td><?php echo htmlspecialchars($user['name'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td><?php echo htmlspecialchars($user['email'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td><?php echo $user['birthday']; ?></td>
            <td>
                <a href="admin.php?edit=<?php echo $user['id']; ?>" class="btn btn-edit">Изменить</a>
                <form action="admin.php" method="POST" style="display:inline;" onsubmit="return confirm('Удалить?');">
                    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
                    <input type="hidden" name="delete_id" value="<?php echo $user['id']; ?>">
                    <button type="submit" class="btn btn-del">Удалить</button>
                </form>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</div>

</body>
</html>