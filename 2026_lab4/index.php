<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- НАСТРОЙКИ БД ---
$user = 'geontar';
$pass = '123456'; 
$db_name = 'geontar';

// --- ОБРАБОТКА POST-ЗАПРОСА (ВАЛИДАЦИЯ И СОХРАНЕНИЕ) ---
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errors = [];
    
    // Получаем данные
    $fio = $_POST['fio'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $birthday = $_POST['birthday'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $languages = $_POST['languages'] ?? [];
    $biography = $_POST['biography'] ?? '';
    $contract = isset($_POST['contract']) ? 1 : 0;

    // Подготавливаем значения для сохранения в Cookies
    $values = [
        'fio' => $fio,
        'phone' => $phone,
        'email' => $email,
        'birthday' => $birthday,
        'gender' => $gender,
        'languages' => json_encode($languages), // Массив сохраняем в JSON
        'biography' => $biography,
        'contract' => $contract
    ];

    // 1. ФИО (регулярное выражение: буквы, пробелы, дефис)
    if (!preg_match('/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/u', $fio)) {
        $errors['fio'] = 'Допустимо использовать только буквы, пробелы и дефис.';
    }

    // 2. Телефон (регулярное выражение: цифры, плюс, скобки, дефис, пробел)
    if (!preg_match('/^\+?[0-9\(\)\-\s]{7,20}$/', $phone)) {
        $errors['phone'] = 'Допустимо использовать только цифры, знаки +, -, (, ) и пробелы.';
    }

    // 3. Email (регулярное выражение)
    if (!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email)) {
        $errors['email'] = 'Введите корректный email. Допустимы латинские буквы, цифры и символы @, ., _, -, +.';
    }

    // 4. Дата рождения (регулярное выражение формата YYYY-MM-DD)
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $birthday)) {
        $errors['birthday'] = 'Введите дату в корректном формате (ГГГГ-ММ-ДД).';
    }

    // 5. Пол (только male или female)
    if (!preg_match('/^(male|female)$/', $gender)) {
        $errors['gender'] = 'Выберите допустимый пол из предложенных.';
    }

    // 6. Любимые языки программирования
    if (empty($languages) || !is_array($languages)) {
        $errors['languages'] = 'Выберите хотя бы один язык программирования.';
    } else {
        foreach ($languages as $lang) {
            if (!preg_match('/^\d+$/', $lang)) {
                $errors['languages'] = 'Недопустимое значение для языка программирования.';
                break;
            }
        }
    }

    // 7. Биография (проверка на непустую строку)
    if (!preg_match('/^(?!\s*$).+/s', $biography)) {
        $errors['biography'] = 'Заполните поле биографии.';
    }

    // 8. Контракт
    if (!$contract) {
        $errors['contract'] = 'Необходимо подтвердить ознакомление с контрактом.';
    }

    // Если ошибок нет — пишем в базу
    if (empty($errors)) {
        try {
            $db = new PDO("mysql:host=localhost;dbname=$db_name", $user, $pass, [
                PDO::ATTR_PERSISTENT => true,
                PDO::ERRMODE_EXCEPTION => PDO::ERRMODE_EXCEPTION
            ]);
            
            $db->beginTransaction();

            $stmt = $db->prepare("INSERT INTO application (name, phone, email, birthday, gender, biography) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$fio, $phone, $email, $birthday, $gender, $biography]);
            $app_id = $db->lastInsertId();

            $stmt_lang = $db->prepare("INSERT INTO application_languages (application_id, language_id) VALUES (?, ?)");
            foreach ($languages as $lang_id) {
                $stmt_lang->execute([$app_id, (int)$lang_id]);
            }

            $db->commit();
            
            // Успешное сохранение: удаляем куки ошибок и ставим куки значений на 1 год 
            setcookie('save_success', '1', 0, '/');
            foreach ($values as $key => $val) {
                setcookie("val_$key", $val, time() + 365 * 24 * 60 * 60, '/');
            }
            foreach (array_keys($values) as $key) {
                setcookie("err_$key", '', time() - 3600, '/');
            }

        } catch (Exception $e) {
            $db->rollBack();
            setcookie("err_db", 'Ошибка при сохранении в БД: ' . $e->getMessage(), 0, '/');
        }
    } else {
        // Есть ошибки: сохраняем ошибки и введённые данные в Cookies на время сессии (0) 
        foreach ($errors as $key => $val) {
            setcookie("err_$key", $val, 0, '/');
        }
        foreach ($values as $key => $val) {
            setcookie("val_$key", $val, 0, '/');
        }
    }

    // Перезагрузка страницы методом GET 
    header('Location: index.php');
    exit();
}

// --- ОБРАБОТКА GET-ЗАПРОСА (ОТОБРАЖЕНИЕ ФОРМЫ) ---

// Извлекаем значения из Cookies для заполнения формы 
$val_fio = $_COOKIE['val_fio'] ?? '';
$val_phone = $_COOKIE['val_phone'] ?? '';
$val_email = $_COOKIE['val_email'] ?? '';
$val_birthday = $_COOKIE['val_birthday'] ?? '';
$val_gender = $_COOKIE['val_gender'] ?? 'male';
$val_languages = isset($_COOKIE['val_languages']) ? json_decode($_COOKIE['val_languages'], true) : [];
if (!is_array($val_languages)) $val_languages = [];
$val_biography = $_COOKIE['val_biography'] ?? '';
$val_contract = $_COOKIE['val_contract'] ?? '';

// Извлекаем ошибки из Cookies и СРАЗУ ИХ УДАЛЯЕМ 
$errors = [];
$fields = ['fio', 'phone', 'email', 'birthday', 'gender', 'languages', 'biography', 'contract', 'db'];
foreach ($fields as $f) {
    if (isset($_COOKIE["err_$f"])) {
        $errors[$f] = $_COOKIE["err_$f"];
        setcookie("err_$f", '', time() - 3600, '/'); // Удаление куки
    }
}

// Проверяем флаг успешного сохранения
$success = !empty($_COOKIE['save_success']);
if ($success) {
    setcookie('save_success', '', time() - 3600, '/');
}

// Вспомогательная функция для подсветки ошибок красным 
function getErrorClass($fieldName, $errors) {
    return isset($errors[$fieldName]) ? 'input-error' : '';
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Анкета разработчика | geontar</title>
    <style>
        :root { --primary: #4f46e5; --primary-hover: #4338ca; --bg: #f8fafc; --text: #1e293b; --border: #e2e8f0; --error: #dc2626; }
        body { font-family: 'Inter', -apple-system, sans-serif; background-color: var(--bg); color: var(--text); display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); width: 100%; max-width: 550px; }
        h2 { margin-top: 0; font-size: 24px; text-align: center; color: #0f172a; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; font-weight: 500; margin-bottom: 8px; font-size: 14px; }
        input[type="text"], input[type="tel"], input[type="email"], input[type="date"], select, textarea { width: 100%; padding: 12px 16px; border: 1px solid var(--border); border-radius: 8px; font-size: 15px; transition: all 0.2s; box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
        
        /* Стили для полей с ошибками  */
        .input-error { border-color: var(--error) !important; background-color: #fef2f2; }
        .error-msg { color: var(--error); font-size: 13px; margin-top: 5px; display: block; }
        
        .radio-group { display: flex; gap: 20px; padding: 10px 0; }
        .radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .checkbox-item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; margin-top: 25px; }
        .btn { background-color: var(--primary); color: white; border: none; padding: 14px; width: 100%; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 10px; }
        .btn:hover { background-color: var(--primary-hover); }
        .alert-success { background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; text-align: center; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        select[multiple] { height: 120px; }
        textarea { resize: vertical; min-height: 80px; }
    </style>
</head>
<body>

<div class="card">
    <h2>Анкета участника</h2>

    <?php if ($success): ?>
        <div class="alert-success">
            ✨ Данные успешно сохранены!
        </div>
    <?php endif; ?>

    <?php if (isset($errors['db'])): ?>
        <div class="error-msg" style="margin-bottom: 15px; text-align: center;"><b><?= htmlspecialchars($errors['db']) ?></b></div>
    <?php endif; ?>

    <form action="index.php" method="POST">
        <div class="form-group">
            <label>ФИО</label>
            <input type="text" name="fio" class="<?= getErrorClass('fio', $errors) ?>" value="<?= htmlspecialchars($val_fio) ?>">
            <?php if(isset($errors['fio'])): ?><span class="error-msg"><?= $errors['fio'] ?></span><?php endif; ?>
        </div>

        <div class="form-group">
            <label>Телефон</label>
            <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" class="<?= getErrorClass('phone', $errors) ?>" value="<?= htmlspecialchars($val_phone) ?>">
            <?php if(isset($errors['phone'])): ?><span class="error-msg"><?= $errors['phone'] ?></span><?php endif; ?>
        </div>

        <div class="form-group">
            <label>E-mail</label>
            <input type="text" name="email" placeholder="example@mail.com" class="<?= getErrorClass('email', $errors) ?>" value="<?= htmlspecialchars($val_email) ?>">
            <?php if(isset($errors['email'])): ?><span class="error-msg"><?= $errors['email'] ?></span><?php endif; ?>
        </div>

        <div class="form-group">
            <label>Дата рождения</label>
            <input type="date" name="birthday" class="<?= getErrorClass('birthday', $errors) ?>" value="<?= htmlspecialchars($val_birthday) ?>">
            <?php if(isset($errors['birthday'])): ?><span class="error-msg"><?= $errors['birthday'] ?></span><?php endif; ?>
        </div>

        <div class="form-group">
            <label>Пол</label>
            <div class="radio-group">
                <label class="radio-item">
                    <input type="radio" name="gender" value="male" <?= ($val_gender == 'male') ? 'checked' : '' ?>> Мужской
                </label>
                <label class="radio-item">
                    <input type="radio" name="gender" value="female" <?= ($val_gender == 'female') ? 'checked' : '' ?>> Женский
                </label>
            </div>
            <?php if(isset($errors['gender'])): ?><span class="error-msg"><?= $errors['gender'] ?></span><?php endif; ?>
        </div>

        <div class="form-group">
            <label>Любимые языки программирования</label>
            <select name="languages[]" multiple="multiple" class="<?= getErrorClass('languages', $errors) ?>">
                <?php 
                $langs = [1 => 'Pascal', 2 => 'C', 3 => 'C++', 4 => 'JavaScript', 5 => 'PHP', 6 => 'Python', 7 => 'Java', 8 => 'Haskel', 9 => 'Clojure', 10 => 'Prolog', 11 => 'Scala', 12 => 'Go'];
                foreach ($langs as $id => $name) {
                    $selected = in_array($id, $val_languages) ? 'selected' : '';
                    echo "<option value=\"$id\" $selected>$name</option>";
                }
                ?>
            </select>
            <?php if(isset($errors['languages'])): ?><span class="error-msg"><?= $errors['languages'] ?></span><?php endif; ?>
            <small style="color: #64748b; font-size: 12px;">Зажмите Ctrl (или Cmd), чтобы выбрать несколько</small>
        </div>

        <div class="form-group">
            <label>Биография</label>
            <textarea name="biography" class="<?= getErrorClass('biography', $errors) ?>" placeholder="Расскажите о своем опыте..."><?= htmlspecialchars($val_biography) ?></textarea>
            <?php if(isset($errors['biography'])): ?><span class="error-msg"><?= $errors['biography'] ?></span><?php endif; ?>
        </div>

        <label class="checkbox-item">
            <input type="checkbox" name="contract" <?= ($val_contract) ? 'checked' : '' ?>>
            <span style="<?= isset($errors['contract']) ? 'color: var(--error);' : '' ?>">Я подтверждаю, что ознакомлен(а) с условиями контракта.</span>
        </label>
        <?php if(isset($errors['contract'])): ?><span class="error-msg" style="margin-left: 25px;"><?= $errors['contract'] ?></span><?php endif; ?>

        <button type="submit" class="btn">Отправить анкету</button>
    </form>
</div>

</body>
</html>