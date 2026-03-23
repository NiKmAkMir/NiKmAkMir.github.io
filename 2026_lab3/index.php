<?php
$user = 'geontar';
$pass = 'QhGwgmm6xS*s'; 
$db_name = 'geontar';

try {
    $db = new PDO("mysql:host=localhost;dbname=$db_name", $user, $pass, [
        PDO::ATTR_PERSISTENT => true,
        PDO::ERRMODE_EXCEPTION => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die('<div style="color:red; padding:20px;">Ошибка подключения к БД: ' . $e->getMessage() . '</div>');
}

$errors = [];
$success = false;

// Обработка POST-запроса
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // 1. Валидация ФИО (только буквы и пробелы)
    if (empty($_POST['fio']) || !preg_match('/^[a-zA-Zа-яА-Я\s\-]+$/u', $_POST['fio'])) {
        $errors[] = 'ФИО заполнено некорректно (используйте только буквы).';
    } elseif (mb_strlen($_POST['fio']) > 150) {
        $errors[] = 'ФИО слишком длинное (макс. 150 символов).';
    }

    // 2. Валидация Email
    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Укажите валидный адрес электронной почты.';
    }

    // 3. Валидация Телефона
    if (empty($_POST['phone']) || !preg_match('/^\+?[0-9\(\)\-\s]{7,20}$/', $_POST['phone'])) {
        $errors[] = 'Некорректный формат телефона.';
    }

    // 4. Валидация Языков
    if (empty($_POST['languages']) || !is_array($_POST['languages'])) {
        $errors[] = 'Выберите хотя бы один язык программирования.';
    }

    // 5. Валидация Контракта
    if (empty($_POST['contract'])) {
        $errors[] = 'Необходимо подтвердить ознакомление с контрактом.';
    }

    // Если ошибок нет — пишем в базу
    if (empty($errors)) {
        try {
            $db->beginTransaction();

            // Вставка в основную таблицу
            $stmt = $db->prepare("INSERT INTO application (name, phone, email, birthday, gender, biography) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $_POST['fio'], 
                $_POST['phone'], 
                $_POST['email'], 
                $_POST['birthday'], 
                $_POST['gender'], 
                $_POST['biography']
            ]);

            $app_id = $db->lastInsertId();

            // Вставка языков в таблицу связей
            $stmt_lang = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
            foreach ($_POST['languages'] as $lang_id) {
                $stmt_lang->execute([$app_id, (int)$lang_id]);
            }

            $db->commit();
            
            // Редирект для предотвращения повторной отправки формы
            header('Location: ' . $_SERVER['PHP_SELF'] . '?success=1');
            exit();

        } catch (Exception $e) {
            $db->rollBack();
            $errors[] = 'Ошибка при сохранении: ' . $e->getMessage();
        }
    }
}

if (isset($_GET['success'])) {
    $success = true;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анкета разработчика | geontar</title>
    <style>
        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --bg: #f8fafc;
            --text: #1e293b;
            --border: #e2e8f0;
        }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .card {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 550px;
        }

        h2 {
            margin-top: 0;
            font-size: 24px;
            text-align: center;
            color: #0f172a;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 14px;
        }

        input[type="text"],
        input[type="tel"],
        input[type="email"],
        input[type="date"],
        select,
        textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.2s;
            box-sizing: border-box;
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .radio-group {
            display: flex;
            gap: 20px;
            padding: 10px 0;
        }

        .radio-item {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }

        .checkbox-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 14px;
            margin-top: 25px;
        }

        .btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 14px;
            width: 100%;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-top: 10px;
        }

        .btn:hover {
            background-color: var(--primary-hover);
        }

        .alert {
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 14px;
            line-height: 1.5;
        }

        .alert-error {
            background-color: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }

        .alert-success {
            background-color: #f0fdf4;
            color: #166534;
            border: 1px solid #bbf7d0;
            text-align: center;
        }

        select[multiple] {
            height: 120px;
        }

        textarea {
            resize: vertical;
            min-height: 80px;
        }
    </style>
</head>
<body>

<div class="card">
    <h2>Анкета участника</h2>

    <?php if ($success): ?>
        <div class="alert alert-success">
            ✨ Данные успешно сохранены!
            <br><a href="index.php" style="color: inherit; font-size: 12px;">Отправить еще раз</a>
        </div>
    <?php endif; ?>

    <?php if (!empty($errors)): ?>
        <div class="alert alert-error">
            <strong>Исправьте следующие ошибки:</strong>
            <ul style="margin: 8px 0 0 20px; padding: 0;">
                <?php foreach($errors as $error) echo "<li>$error</li>"; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form action="" method="POST">
        <div class="form-group">
            <label>ФИО</label>
            <input type="text" name="fio" placeholder="Иванов Иван Иванович" required>
        </div>

        <div class="form-group">
            <label>Телефон</label>
            <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required>
        </div>

        <div class="form-group">
            <label>E-mail</label>
            <input type="email" name="email" placeholder="example@mail.com" required>
        </div>

        <div class="form-group">
            <label>Дата рождения</label>
            <input type="date" name="birthday" required>
        </div>

        <div class="form-group">
            <label>Пол</label>
            <div class="radio-group">
                <label class="radio-item">
                    <input type="radio" name="gender" value="male" checked> Мужской
                </label>
                <label class="radio-item">
                    <input type="radio" name="gender" value="female"> Женский
                </label>
            </div>
        </div>

        <div class="form-group">
            <label>Любимые языки программирования</label>
            <select name="languages[]" multiple="multiple">
                <option value="1">Pascal</option>
                <option value="2">C</option>
                <option value="3">C++</option>
                <option value="4">JavaScript</option>
                <option value="5">PHP</option>
                <option value="6">Python</option>
                <option value="7">Java</option>
                <option value="8">Haskel</option>
                <option value="9">Clojure</option>
                <option value="10">Prolog</option>
                <option value="11">Scala</option>
                <option value="12">Go</option>
            </select>
            <small style="color: #64748b; font-size: 12px;">Зажмите Ctrl (или Cmd), чтобы выбрать несколько</small>
        </div>

        <div class="form-group">
            <label>Биография</label>
            <textarea name="biography" placeholder="Расскажите о своем опыте..."></textarea>
        </div>

        <label class="checkbox-item">
            <input type="checkbox" name="contract" required>
            <span>Я подтверждаю, что ознакомлен(а) с условиями контракта и даю согласие на обработку данных.</span>
        </label>

        <button type="submit" class="btn">Отправить анкету</button>
    </form>
</div>

</body>
</html>