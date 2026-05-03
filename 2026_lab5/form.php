<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анкета разработчика</title>
    <style>
        :root { --primary: #4f46e5; --bg: #f8fafc; --text: #1e293b; --border: #e2e8f0; --error: #dc2626; }
        body { font-family: sans-serif; background: var(--bg); color: var(--text); display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); width: 100%; max-width: 500px; }
        .auth-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
        .msg { background: #f0fdf4; color: #166534; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; border: 1px solid #bbf7d0; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: 600; margin-bottom: 5px; font-size: 14px; }
        input[type="text"], input[type="tel"], input[type="email"], input[type="date"], select, textarea { 
            width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 4px; box-sizing: border-box; 
        }
        .error { border-color: var(--error) !important; background: #fff1f1; }
        .btn { background: var(--primary); color: white; border: none; padding: 10px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: 600; }
        .btn-secondary { background: #f1f5f9; color: #475569; text-decoration: none; padding: 5px 10px; border-radius: 4px; }
    </style>
</head>
<body>
<div class="card">
    <div class="auth-bar">
        <?php if (!empty($_SESSION['login'])): ?>
            <span>Вы вошли как: <b><?php echo htmlspecialchars($_SESSION['login']); ?></b></span>
            <a href="login.php?logout=1" class="btn-secondary">Выйти</a>
        <?php else: ?>
            <span>Гостевой режим</span>
            <a href="login.php" class="btn-secondary">Войти</a>
        <?php endif; ?>
    </div>

    <?php if (!empty($messages)) foreach ($messages as $m) echo '<div class="msg">'.$m.'</div>'; ?>

    <form action="index.php" method="POST">
        <div class="form-group">
            <label>ФИО</label>
            <input type="text" name="fio" class="<?php echo !empty($errors['fio']) ? 'error' : ''; ?>" value="<?php echo htmlspecialchars($values['fio']); ?>">
        </div>
        <div class="form-group">
            <label>Телефон</label>
            <input type="tel" name="phone" value="<?php echo htmlspecialchars($values['phone']); ?>">
        </div>
        <div class="form-group">
            <label>E-mail</label>
            <input type="email" name="email" value="<?php echo htmlspecialchars($values['email']); ?>">
        </div>
        <div class="form-group">
            <label>Дата рождения</label>
            <input type="date" name="birthday" value="<?php echo htmlspecialchars($values['birthday']); ?>">
        </div>
        <div class="form-group">
            <label>Пол</label>
            <input type="radio" name="gender" value="male" <?php if($values['gender']=='male') echo 'checked'; ?>> М
            <input type="radio" name="gender" value="female" <?php if($values['gender']=='female') echo 'checked'; ?>> Ж
        </div>
        <div class="form-group">
            <label>Любимые языки</label>
            <select name="languages[]" multiple>
                <?php 
                $all = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java'];
                foreach($all as $id => $name) {
                    $sel = (is_array($values['languages']) && in_array($id, $values['languages'])) ? 'selected' : '';
                    echo "<option value='$id' $sel>$name</option>";
                }
                ?>
            </select>
        </div>
        <div class="form-group">
            <label>Биография</label>
            <textarea name="biography"><?php echo htmlspecialchars($values['biography']); ?></textarea>
        </div>
        <button type="submit" class="btn"><?php echo !empty($_SESSION['login']) ? 'Обновить' : 'Отправить'; ?></button>
    </form>
</div>
</body>
</html>