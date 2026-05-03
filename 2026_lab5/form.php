<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Анкета</title>
    <style>
        .error { border: 2px solid red; background-color: #fee; }
        .msg { padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <?php if (!empty($_SESSION['login'])): ?>
        <div style="float: right;">
            Вы вошли как: <b><?php echo $_SESSION['login']; ?></b> | <a href="login.php?logout=1">Выйти</a>
        </div>
    <?php endif; ?>

    <?php if (!empty($messages)) {
        foreach ($messages as $m) echo '<div class="msg">' . $m . '</div>';
    } ?>

    <form action="index.php" method="POST">
        ФИО:<br/>
        <input name="fio" <?php if(!empty($errors['fio'])) echo 'class="error"'; ?> value="<?php echo htmlspecialchars($values['fio']); ?>" /><br/>
        
        Телефон:<br/>
        <input name="phone" value="<?php echo htmlspecialchars($values['phone']); ?>" /><br/>
        
        E-mail:<br/>
        <input name="email" value="<?php echo htmlspecialchars($values['email']); ?>" /><br/>
        
        Дата рождения:<br/>
        <input type="date" name="birthday" value="<?php echo htmlspecialchars($values['birthday']); ?>" /><br/>
        
        Пол:<br/>
        <input type="radio" name="gender" value="male" <?php if($values['gender']=='male') echo 'checked'; ?>> М 
        <input type="radio" name="gender" value="female" <?php if($values['gender']=='female') echo 'checked'; ?>> Ж<br/>
        
        Любимый ЯП:<br/>
        <select name="languages[]" multiple="multiple">
            <?php 
            $all_langs = [1=>'Pascal', 2=>'C', 3=>'C++', 4=>'JavaScript', 5=>'PHP', 6=>'Python', 7=>'Java'];
            foreach($all_langs as $id => $name) {
                $sel = (is_array($values['languages']) && in_array($id, $values['languages'])) ? 'selected' : '';
                echo "<option value='$id' $sel>$name</option>";
            }
            ?>
        </select><br/>
        
        Биография:<br/>
        <textarea name="biography"><?php echo htmlspecialchars($values['biography']); ?></textarea><br/>
        
        <input type="checkbox" name="contract" checked> С контрактом ознакомлен<br/>
        
        <input type="submit" value="Сохранить" />
    </form>
</body>
</html>