<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Отчет по безопасности (Задание 7)</title>
    <style>
        :root { --primary: #4f46e5; --bg: #f8fafc; --text: #1e293b; --border: #e2e8f0; --code-bg: #1e1e1e; }
        body { font-family: -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding: 40px 20px; }
        .report-container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        h1 { font-size: 32px; color: #0f172a; border-bottom: 3px solid var(--primary); padding-bottom: 10px; margin-bottom: 30px; }
        h2 { font-size: 22px; color: var(--primary); margin-top: 40px; border-left: 5px solid var(--primary); padding-left: 15px; }
        .section { margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px; }
        .code-block { background: var(--code-bg); color: #d4d4d4; padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 13px; overflow-x: auto; white-space: pre; }
        .code-label { font-weight: bold; margin-bottom: 5px; display: block; font-size: 12px; text-transform: uppercase; }
        .label-before { color: #f87171; }
        .label-after { color: #4ade80; }
        .desc { background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 10px; font-size: 14px; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #e2e8f0; margin-bottom: 5px; }
    </style>
</head>
<body>

<div class="report-container">
    <h1>Отчет: Веб-безопасность (Задание 7)</h1>
    <p>В ходе выполнения задания были проанализированы основные векторы атак на PHP-приложения и внедрены соответствующие механизмы защиты для обеспечения целостности данных и безопасности пользователей.</p>

    <div class="section">
        <h2>1. Защита от CSRF (Cross-Site Request Forgery)</h2>
        <div class="badge">МЕЖСАЙТОВАЯ ПОДДЕЛКА ЗАПРОСА</div>
        <p>Суть: Злоумышленник может заставить браузер жертвы отправить скрытый запрос на ваш сервер (например, изменить данные в анкете), пока жертва авторизована.</p>
        
        <div class="grid">
            <div>
                <span class="code-label label-before">Было (Уязвимо):</span>
                <div class="code-block">&lt;form action="index.php" method="POST"&gt;
  &lt;!-- Поля формы без проверки --&gt;
&lt;/form&gt;</div>
            </div>
            <div>
                <span class="code-label label-after">Стало (Защищено):</span>
                <div class="code-block">&lt;input type="hidden" name="csrf_token" 
  value="&lt;?php echo $_SESSION['csrf_token']; ?&gt;"&gt;

// Проверка на сервере:
if (!hash_equals($_SESSION['csrf_token'], 
    $_POST['csrf_token'])) {
  die('CSRF Attack Detected');
}</div>
            </div>
        </div>
        <div class="desc"><b>Результат:</b> Теперь каждый POST-запрос сопровождается уникальным одноразовым токеном, который злоумышленник не может предугадать или прочитать с другого сайта.</div>
    </div>

    <div class="section">
        <h2>2. Защита от XSS (Cross-Site Scripting)</h2>
        <div class="badge">МЕЖСАЙТОВЫЙ СКРИПТИНГ</div>
        <p>Суть: Внедрение вредоносного JS-кода через поля ввода (например, ФИО или Биографию), который выполнится в браузере другого пользователя (админа).</p>
        
        <div class="grid">
            <div>
                <span class="code-label label-before">Было (Уязвимо):</span>
                <div class="code-block">echo $values['fio'];
echo $_COOKIE['fio_error'];</div>
            </div>
            <div>
                <span class="code-label label-after">Стало (Защищено):</span>
                <div class="code-block">echo htmlspecialchars($values['fio'], 
     ENT_QUOTES, 'UTF-8');</div>
            </div>
        </div>
        <div class="desc"><b>Результат:</b> Все данные, выводимые в браузер, проходят через функцию <code>htmlspecialchars</code>. Опасные символы вроде <code>&lt;</code> превращаются в безопасные сущности <code>&amp;lt;</code>.</div>
    </div>

    <div class="section">
        <h2>3. Защита от Session Fixation и Cookie Security</h2>
        <div class="badge">ФИКСАЦИЯ СЕССИИ</div>
        <p>Суть: Хакер может "подсунуть" свой ID сессии жертве. Также необходимо защитить куки от кражи через JavaScript.</p>
        
        <div class="grid">
            <div>
                <span class="code-label label-before">Было (Уязвимо):</span>
                <div class="code-block">session_start();</div>
            </div>
            <div>
                <span class="code-label label-after">Стало (Защищено):</span>
                <div class="code-block">ini_set('session.cookie_httponly', 1);
session_start();
// При авторизации:
session_regenerate_id(true);</div>
            </div>
        </div>
        <div class="desc"><b>Результат:</b> Флаг <code>HttpOnly</code> запрещает доступ к сессионной куке из JS. Команда <code>session_regenerate_id</code> меняет ключ сессии сразу после входа, аннулируя старый ID.</div>
    </div>

    <div class="section">
        <h2>4. Защита от SQL Injection</h2>
        <div class="badge">SQL-ИНЪЕКЦИЯ</div>
        <p>Суть: Изменение логики SQL-запроса через кавычки в полях ввода.</p>
        
        <div class="grid">
            <div>
                <span class="code-label label-before">Было (Теоретически):</span>
                <div class="code-block">$db->query("INSERT INTO app ... 
  VALUES ('".$_POST['fio']."')");</div>
            </div>
            <div>
                <span class="code-label label-after">Стало (Всегда было):</span>
                <div class="code-block">$stmt = $db->prepare("INSERT INTO ... 
  VALUES (?, ?, ?)");
$stmt->execute([$fio, $phone, ...]);</div>
            </div>
        </div>
        <div class="desc"><b>Результат:</b> Использование <b>Prepared Statements</b> (Подготовленных запросов) полностью исключает возможность внедрения кода в SQL-запрос, так как данные передаются отдельно от самой команды.</div>
    </div>

    <div class="section">
        <h2>5. Защитные HTTP-заголовки</h2>
        <div class="badge">БЕЗОПАСНОСТЬ ОКРУЖЕНИЯ</div>
        <div class="code-block" style="background: #f8fafc; color: #1e293b; border: 1px solid var(--border);">header('X-Frame-Options: DENY'); // Запрет встраивания в iframe (Anti-Clickjacking)
header('X-Content-Type-Options: nosniff'); // Запрет браузеру угадывать тип контента
header('X-XSS-Protection: 1; mode=block'); // Принудительный фильтр XSS</div>
    </div>

</div>

</body>
</html>