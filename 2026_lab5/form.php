<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анкета разработчика</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1; /* Indigo 500 */
            --primary-dark: #4f46e5;
            --bg: #f3f4f6;
            --card-bg: #ffffff;
            --text-main: #111827;
            --text-muted: #6b7280;
            --border: #e5e7eb;
            --error: #ef4444;
            --success: #10b981;
        }

        * { box-sizing: border-box; transition: all 0.2s ease-in-out; }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                              radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                              radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
            background-attachment: fixed;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 40px 20px;
        }

        .container {
            width: 100%;
            max-width: 600px;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Шапка авторизации */
        .auth-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            background: #f8fafc;
            padding: 12px 20px;
            border-radius: 12px;
            border: 1px solid var(--border);
        }

        .auth-header b { color: var(--primary); }

        .btn-auth {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            text-decoration: none;
            padding: 6px 14px;
            border-radius: 8px;
            background: white;
            border: 1px solid var(--border);
        }
        .btn-auth:hover { background: var(--bg); color: var(--primary); }

        h2 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 800;
            text-align: center;
            letter-spacing: -0.025em;
        }

        .subtitle {
            text-align: center;
            color: var(--text-muted);
            margin-bottom: 30px;
            font-size: 15px;
        }

        /* Сообщения */
        .msg {
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 25px;
            font-size: 14px;
            line-height: 1.5;
            border-left: 4px solid;
        }
        .msg-success { background: #ecfdf5; color: #065f46; border-left-color: var(--success); }
        .msg-info { background: #eff6ff; color: #1e40af; border-left-color: var(--primary); }

        /* Поля формы */
        .form-group { margin-bottom: 20px; }
        
        label {
            display: block;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
            color: var(--text-muted);
        }

        input[type="text"], input[type="tel"], input[type="email"], input[type="date"], select, textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border);
            border-radius: 12px;
            font-size: 15px;
            background: #fff;
            color: var(--text-main);
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .input-error { border-color: var(--error) !important; background: #fffafa; }

        /* Кастомные радио и чекбоксы */
        .radio-group { display: flex; gap: 20px; padding: 5px 0; }
        .radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 15px; }
        input[type="radio"] { width: 18px; height: 18px; accent-color: var(--primary); }

        select[multiple] { height: 140px; padding: 8px; }

        .contract-label {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 14px;
            color: var(--text-muted);
            cursor: pointer;
            margin-top: 30px;
        }
        .contract-label input { width: 20px; height: 20px; accent-color: var(--primary); }

        /* Кнопка */
        .btn-submit {
            display: block;
            width: 100%;
            padding: 16px;
            margin-top: 25px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
        }
        .btn-submit:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5);
        }
        .btn-submit:active { transform: translateY(0); }

    </style>
</head>
<body>

<div class="container">
    <div class="card">
        <div class="auth-header">
            <?php if (!empty($_SESSION['login'])): ?>
                <span>Привет, <b><?php echo htmlspecialchars($_SESSION['login']); ?></b></span>
                <a href="login.php?logout=1" class="btn-auth">Выйти из системы</a>
            <?php else: ?>
                <span>Вы в гостевом режиме</span>
                <a href="login.php" class="btn-auth">Авторизоваться</a>
            <?php endif; ?>
        </div>

        <h2>Анкета</h2>
        <p class="subtitle">Пожалуйста, заполните данные о себе</p>

        <?php if (!empty($messages)) foreach ($messages as $m): ?>
            <div class="msg <?php echo (strpos($m, 'Спасибо') !== false) ? 'msg-success' : 'msg-info'; ?>">
                <?php echo $m; ?>
            </div>
        <?php endforeach; ?>

        <form action="index.php" method="POST">
            <div class="form-group">
                <label>Полное имя</label>
                <input type="text" name="fio" placeholder="Иван Иванов" 
                       class="<?php echo !empty($errors['fio']) ? 'input-error' : ''; ?>" 
                       value="<?php echo htmlspecialchars($values['fio']); ?>">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="form-group">
                    <label>Телефон</label>
                    <input type="tel" name="phone" placeholder="+7..." 
                           value="<?php echo htmlspecialchars($values['phone']); ?>">
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" name="email" placeholder="mail@example.com" 
                           value="<?php echo htmlspecialchars($values['email']); ?>">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="form-group">
                    <label>Дата рождения</label>
                    <input type="date" name="birthday" value="<?php echo htmlspecialchars($values['birthday']); ?>">
                </div>
                <div class="form-group">
                    <label>Пол</label>
                    <div class="radio-group">
                        <label class="radio-item"><input type="radio" name="gender" value="male" <?php if($values['gender']=='male') echo 'checked'; ?>> Муж</label>
                        <label class="radio-item"><input type="radio" name="gender" value="female" <?php if($values['gender']=='female') echo 'checked'; ?>> Жен</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Любимые языки программирования</label>
                <select name="languages[]" multiple>
                    <?php 
                    $langs = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java'];
                    foreach($langs as $id => $name) {
                        $sel = (is_array($values['languages']) && in_array($id, $values['languages'])) ? 'selected' : '';
                        echo "<option value='$id' $sel>$name</option>";
                    }
                    ?>
                </select>
            </div>

            <div class="form-group">
                <label>Краткая биография</label>
                <textarea name="biography" rows="4" placeholder="Расскажите о себе..."><?php echo htmlspecialchars($values['biography']); ?></textarea>
            </div>

            <label class="contract-label">
                <input type="checkbox" name="contract" checked>
                <span>Я соглашаюсь с условиями обработки персональных данных и условиями контракта.</span>
            </label>

            <button type="submit" class="btn-submit">
                <?php echo !empty($_SESSION['login']) ? 'ОБНОВИТЬ ДАННЫЕ' : 'ОТПРАВИТЬ АНКЕТУ'; ?>
            </button>
        </form>
    </div>
</div>

</body>
</html>