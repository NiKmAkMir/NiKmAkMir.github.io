<?php
require 'db.php'; // Подключаем БД, соблюдая DRY 

// 1. HTTP-Авторизация [cite: 116]
$auth_failed = true;
if (!empty($_SERVER['PHP_AUTH_USER']) && !empty($_SERVER['PHP_AUTH_PW'])) {
    $stmt = $db->prepare("SELECT pass FROM admins WHERE login = ?");
    $stmt->execute([$_SERVER['PHP_AUTH_USER']]);
    $admin = $stmt->fetch();
    
    // Проверяем пароль (сравниваем MD5 хеш, как в методичке)
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

// 2. Обработка удаления данных 
if (isset($_POST['delete_id'])) {
    $id = (int)$_POST['delete_id'];
    $db->prepare("DELETE FROM application_languages WHERE application_id = ?")->execute([$id]);
    $db->prepare("DELETE FROM application WHERE id = ?")->execute([$id]);
    header("Location: admin.php"); exit();
}

// 3. Обработка редактирования данных 
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

// 4. Сбор статистики по языкам [cite: 120, 126]
$stats_query = $db->query("SELECT language_id, COUNT(application_id) as count FROM application_languages GROUP BY language_id");
$stats = $stats_query->fetchAll(PDO::FETCH_KEY_PAIR);
$all_langs = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java', 8=>'Haskel', 9=>'Clojure', 10=>'Prolog', 11=>'Scala', 12=>'Go'];

// 5. Получение всех пользователей [cite: 117]
$users = $db->query("SELECT * FROM application ORDER BY id DESC")->fetchAll();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Панель администратора</title>
    <style>
        body { font-family: sans-serif; background: #f8fafc; padding: 20px; color: #1e293b; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h1, h2 { color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px; }
        th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
        th { background: #f1f5f9; }
        .stats-block { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 30px; }
        .stat-card { background: #eff6ff; padding: 15px; border-radius: 8px; border: 1px solid #bfdbfe; text-align: center; min-width: 100px; }
        .stat-card b { font-size: 20px; color: #1d4ed8; display: block; margin-top: 5px; }
        .btn-del { background: #dc2626; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
        .btn-edit { background: #4f46e5; color: white; text-decoration: none; padding: 5px 10px; border-radius: 4px; font-size: 13px; }
        .edit-form { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 30px; }
        .edit-form input, .edit-form select, .edit-form textarea { width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    </style>
</head>
<body>

<div class="container">
    <h1>Панель администратора</h1>

    <h2>Статистика по языкам программирования</h2>
    <div class="stats-block">
        <?php foreach ($all_langs as $id => $name): ?>
            <div class="stat-card">
                <?php echo $name; ?>
                <b><?php echo $stats[$id] ?? 0; ?> чел.</b>
            </div>
        <?php endforeach; ?>
    </div>

    <?php 
    if (isset($_GET['edit'])): 
        $edit_id = (int)$_GET['edit'];
        $stmt = $db->prepare("SELECT * FROM application WHERE id = ?");
        $stmt->execute([$edit_id]);
        $user_data = $stmt->fetch();
        
        if ($user_data):
            $stmt_l = $db->prepare("SELECT language_id FROM application_languages WHERE application_id = ?");
            $stmt_l->execute([$edit_id]);
            $user_langs = $stmt_l->fetchAll(PDO::FETCH_COLUMN);
    ?>
    <div class="edit-form">
        <h2>Редактирование пользователя #<?php echo $user_data['id']; ?></h2>
        <form action="admin.php" method="POST">
            <input type="hidden" name="edit_id" value="<?php echo $user_data['id']; ?>">
            
            <label>ФИО: <input type="text" name="fio" value="<?php echo htmlspecialchars($user_data['name']); ?>" required></label>
            <label>Телефон: <input type="tel" name="phone" value="<?php echo htmlspecialchars($user_data['phone']); ?>"></label>
            <label>Email: <input type="email" name="email" value="<?php echo htmlspecialchars($user_data['email']); ?>"></label>
            <label>Дата рождения: <input type="date" name="birthday" value="<?php echo htmlspecialchars($user_data['birthday']); ?>"></label>
            
            <label>Пол:</label>
            <select name="gender">
                <option value="male" <?php if($user_data['gender'] == 'male') echo 'selected'; ?>>Мужской</option>
                <option value="female" <?php if($user_data['gender'] == 'female') echo 'selected'; ?>>Женский</option>
            </select>
            
            <label>Языки:</label>
            <select name="languages[]" multiple style="height: 100px;">
                <?php foreach($all_langs as $id => $name): ?>
                    <option value="<?php echo $id; ?>" <?php if(in_array($id, $user_langs)) echo 'selected'; ?>><?php echo $name; ?></option>
                <?php endforeach; ?>
            </select>
            
            <label>Биография: <textarea name="biography"><?php echo htmlspecialchars($user_data['biography']); ?></textarea></label>
            
            <button type="submit" style="background: #16a34a; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;">Сохранить изменения</button>
            <a href="admin.php" style="margin-left: 10px; color: #dc2626; text-decoration: none;">Отмена</a>
        </form>
    </div>
    <?php endif; endif; ?>

    <h2>Все пользователи</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Логин</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Дата рожд.</th>
            <th>Пол</th>
            <th>Действия</th>
        </tr>
        <?php foreach ($users as $u): ?>
        <tr>
            <td><?php echo $u['id']; ?></td>
            <td><?php echo htmlspecialchars($u['login']); ?></td>
            <td><?php echo htmlspecialchars($u['name']); ?></td>
            <td><?php echo htmlspecialchars($u['phone']); ?></td>
            <td><?php echo htmlspecialchars($u['email']); ?></td>
            <td><?php echo htmlspecialchars($u['birthday']); ?></td>
            <td><?php echo $u['gender'] == 'male' ? 'М' : 'Ж'; ?></td>
            <td style="display: flex; gap: 10px;">
                <a href="admin.php?edit=<?php echo $u['id']; ?>" class="btn-edit">Изменить</a>
                <form action="admin.php" method="POST" onsubmit="return confirm('Точно удалить?');">
                    <input type="hidden" name="delete_id" value="<?php echo $u['id']; ?>">
                    <button type="submit" class="btn-del">Удалить</button>
                </form>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</div>

</body>
</html>