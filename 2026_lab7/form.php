<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анкета разработчика</title>
    <style>
        :root { 
            --primary: #4f46e5; 
            --primary-hover: #4338ca; 
            --bg: #f8fafc; 
            --text: #1e293b; 
            --border: #e2e8f0; 
            --error: #dc2626; 
        }
        body { 
            font-family: -apple-system, system-ui, sans-serif; 
            background-color: var(--bg); 
            color: var(--text); 
            display: flex; justify-content: center; align-items: center; 
            min-height: 100vh; margin: 0; padding: 20px; 
        }
        .card { 
            background: white; padding: 40px; border-radius: 16px; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
            width: 100%; max-width: 550px; 
        }
        .auth-bar { 
            display: flex; justify-content: space-between; align-items: center; 
            margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid var(--border); 
            font-size: 14px; 
        }
        .btn-logout { color: var(--primary); text-decoration: none; font-weight: 600; }
        .msg { 
            background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; 
            padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; 
        }
        .form-group { margin-bottom: 18px; }
        label { display: block; font-weight: 500; margin-bottom: 8px; font-size: 14px; }
        input[type="text"], input[type="tel"], input[type="email"], input[type="date"], select, textarea { 
            width: 100%; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; font-size: 15px; box-sizing: border-box; 
        }
        input:focus, select:focus, textarea:focus { 
            outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); 
        }
        .error-input { border-color: var(--error) !important; background-color: #fef2f2; }
        .btn-submit { 
            background-color: var(--primary); color: white; border: none; 
            padding: 14px; width: 100%; border-radius: 8px; 
            font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 10px; 
        }
        .btn-submit:hover { background-color: var(--primary-hover); }
    </style>
</head>
<body>

<div class="card">
    <div class="auth-bar">
        <?php if (!empty($_SESSION['login'])): ?>
            <span>Вы вошли как: <b><?php echo htmlspecialchars($_SESSION['login'], ENT_QUOTES, 'UTF-8'); ?></b></span>
            <a href="login.php?logout=1" class="btn-logout">Выйти</a>
        <?php else: ?>
            <span>Режим гостя</span>
            <a href="login.php" class="btn-logout">Войти</a>
        <?php endif; ?>
    </div>

    <h2>Анкета участника</h2>

    <?php if (!empty($messages)): ?>
        <?php foreach ($messages as $m): ?>
            <div class="msg"><?php echo $m; ?></div>
        <?php endforeach; ?>
    <?php endif; ?>

    <form action="index.php" method="POST">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">

        <div class="form-group">
            <label>ФИО</label>
            <input type="text" name="fio" class="<?php echo !empty($errors['fio']) ? 'error-input' : ''; ?>" 
                   value="<?php echo htmlspecialchars($values['fio'], ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label>Телефон</label>
            <input type="tel" name="phone" value="<?php echo htmlspecialchars($values['phone'], ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label>E-mail</label>
            <input type="email" name="email" value="<?php echo htmlspecialchars($values['email'], ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label>Дата рождения</label>
            <input type="date" name="birthday" value="<?php echo htmlspecialchars($values['birthday'], ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label>Пол</label>
            <div class="radio-group">
                <label><input type="radio" name="gender" value="male" <?php if($values['gender']=='male') echo 'checked'; ?>> Мужской</label>
                <label><input type="radio" name="gender" value="female" <?php if($values['gender']=='female') echo 'checked'; ?>> Женский</label>
            </div>
        </div>

        <div class="form-group">
            <label>Любимые языки программирования</label>
            <select name="languages[]" multiple="multiple">
                <?php 
                $all_langs = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java', 8=>'Haskel', 9=>'Clojure', 10=>'Prolog', 11=>'Scala', 12=>'Go'];
                foreach($all_langs as $id => $name) {
                    $sel = (is_array($values['languages']) && in_array($id, $values['languages'])) ? 'selected' : '';
                    echo "<option value='$id' $sel>$name</option>";
                }
                ?>
            </select>
        </div>

        <div class="form-group">
            <label>Биография</label>
            <textarea name="biography"><?php echo htmlspecialchars($values['biography'], ENT_QUOTES, 'UTF-8'); ?></textarea>
        </div>

        <button type="submit" class="btn-submit">
            <?php echo !empty($_SESSION['login']) ? 'Сохранить изменения' : 'Отправить анкету'; ?>
        </button>
    </form>
</div>

</body>
</html>