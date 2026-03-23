<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 3 - geontar</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f0f4f8; color: #333; display: flex; justify-content: center; padding: 20px; }
        .container { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: 100%; max-width: 500px; }
        h2 { text-align: center; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .field { margin-bottom: 18px; }
        label { display: block; font-weight: 600; margin-bottom: 5px; font-size: 14px; }
        input[type="text"], input[type="tel"], input[type="email"], input[type="date"], select, textarea {
            width: 100%; padding: 10px; border: 1px solid #dcdfe6; border-radius: 6px; box-sizing: border-box; transition: border 0.3s;
        }
        input:focus { border-color: #3498db; outline: none; }
        .error { color: #e74c3c; background: #fdf2f2; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 13px; border-left: 4px solid #e74c3c; }
        .success { color: #27ae60; background: #f2faf5; padding: 15px; border-radius: 6px; text-align: center; font-weight: bold; }
        .btn { background: #3498db; color: white; border: none; padding: 12px; width: 100%; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; transition: 0.3s; }
        .btn:hover { background: #2980b9; }
    </style>
</head>
<body>
<div class="container">
    <h2>Анкета geontar</h2>

    <?php if (!empty($messages)): ?>
        <div class="messages">
            <?php foreach($messages as $m) echo $m; ?>
        </div>
    <?php endif; ?>

    <form action="index.php" method="POST">
        <div class="field">
            [cite_start]<label>ФИО[cite: 2]:</label>
            <input type="text" name="fio" placeholder="Только буквы и пробелы" maxlength="150" required>
        </div>
        <div class="field">
            [cite_start]<label>Телефон[cite: 3]:</label>
            <input type="tel" name="phone" placeholder="+7..." required>
        </div>
        <div class="field">
            [cite_start]<label>E-mail[cite: 4]:</label>
            <input type="email" name="email" required>
        </div>
        <div class="field">
            [cite_start]<label>Дата рождения[cite: 5]:</label>
            <input type="date" name="birthday" required>
        </div>
        <div class="field">
            [cite_start]<label>Пол[cite: 6]:</label>
            <input type="radio" name="gender" value="male" checked> Мужской
            <input type="radio" name="gender" value="female"> Женский
        </div>
        <div class="field">
            [cite_start]<label>Любимый язык программирования[cite: 9]:</label>
            <select name="languages[]" multiple="multiple" size="6" required>
                <option value="1">Pascal</option> <option value="2">C</option>
                <option value="3">C++</option> <option value="4">JavaScript</option>
                <option value="5">PHP</option> <option value="6">Python</option>
                <option value="7">Java</option> <option value="8">Haskel</option>
                <option value="9">Clojure</option> <option value="10">Prolog</option>
                <option value="11">Scala</option> <option value="12">Go</option>
            </select>
        </div>
        <div class="field">
            [cite_start]<label>Биография[cite: 10]:</label>
            <textarea name="biography" rows="3"></textarea>
        </div>
        <div class="field">
            [cite_start]<label><input type="checkbox" name="contract" required> С контрактом ознакомлен(а) [cite: 11]</label>
        </div>
        [cite_start]<button type="submit" class="btn">Сохранить [cite: 12]</button>
    </form>
</div>
</body>
</html>