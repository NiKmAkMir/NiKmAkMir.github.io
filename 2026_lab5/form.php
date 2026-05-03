<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анкета разработчика | Задание 5</title>
    <style>
        :root { --primary: #4f46e5; --primary-hover: #4338ca; --bg: #f8fafc; --text: #1e293b; --border: #e2e8f0; --error: #dc2626; --success: #166534; }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg); color: var(--text); display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 550px; position: relative; }
        h2 { margin-top: 0; text-align: center; color: #0f172a; margin-bottom: 25px; }
        
        /* Стили уведомлений */
        .msg-container { margin-bottom: 20px; }
        .msg { padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; font-size: 14px; border: 1px solid; }
        .msg-info { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }
        .msg-error { background: #fef2f2; color: var(--error); border-color: #fecaca; }
        
        .auth-info { font-size: 13px; margin-bottom: 20px; text-align: right; color: #64748b; }
        .auth-info a { color: var(--primary); text-decoration: none; font-weight: 600; }

        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: 500; margin-bottom: 5px; font-size: 14px; }
        input[type="text"], input[type="tel"], input[type="email"], input[type="date"], select, textarea { 
            width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; box-sizing: border-box; 
        }
        .error { border-color: var(--error) !important; background: #fff1f1; }
        .error-label { color: var(--error); font-size: 12px; margin-top: 4px; display: block; }

        .btn { background: var(--primary); color: white; border: none; padding: 12px; width: 100%; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s; margin-top: 10px; }
        .btn:hover { background: var(--primary-hover); }
        
        select[multiple] { height: 100px; }
    </style>
</head>
<body>

<div class="card">
    <?php if (!empty($_SESSION['login'])): ?>
        <div class="auth-info">
            Вы вошли как: <b><?php echo htmlspecialchars($_SESSION['login']); ?></b> | 
            <a href="login.php?logout=1">Выйти</a>
        </div>
    <?php endif; ?>

    <h2>Анкета участника</h2>

    <?php if (!empty($messages)): ?>
        <div class="msg-container">
            <?php foreach ($messages as $m): ?>
                <div class="msg msg-info"><?php echo $m; ?></div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <form action="index.php" method="POST">
        <div class="form-group">
            <label>ФИО</label>
            <input type="text" name="fio" class="<?php echo !empty($errors['fio']) ? 'error' : ''; ?>" 
                   value="<?php echo htmlspecialchars($values['fio']); ?>">
            <?php if(!empty($errors['fio'])): ?><span class="error-label"><?php echo $errors['fio']; ?></span><?php endif; ?>
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
            <label>Любимые языки программирования</label>
            <select name="languages[]" multiple="multiple">
                <?php 
                $all_langs = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java'];
                foreach($all_langs as $id => $name) {
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

        <div class="form-group">
            <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="contract" checked> С контрактом ознакомлен(а)
            </label>
        </div>

        <button type="submit" class="btn">
            <?php echo !empty($_SESSION['login']) ? 'Сохранить изменения' : 'Отправить анкету'; ?>
        </button>
    </form>
</div>

</body>
</html>