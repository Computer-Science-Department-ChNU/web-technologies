# Лекція 3. Інтерактивність інтерфейсів: форми, мультимедіа та клавіатурна навігація

> **Мета лекції:** навчитися створювати зручні та доступні HTML-форми з вбудованою валідацією, вбудовувати аудіо й відео та забезпечувати повноцінну роботу інтерфейсу з клавіатури.

📂 Матеріали: [презентація](presentation/index.html) · приклади: [форми](presentation/examples/01-form/) · [аудіо та відео](presentation/examples/02-audio-video/)

---

## Зміст

1. [Навіщо потрібні форми](#1-навіщо-потрібні-форми)
2. [Анатомія тегу form](#2-анатомія-тегу-form)
3. [GET vs POST](#3-get-vs-post)
4. [Поле input та його типи](#4-поле-input-та-його-типи)
5. [label: підписи до полів](#5-label-підписи-до-полів)
6. [Декларативна валідація](#6-декларативна-валідація)
7. [textarea, select, checkbox, radio](#7-textarea-select-checkbox-radio)
8. [Кнопки](#8-кнопки)
9. [Аудіо та відео](#9-аудіо-та-відео)
10. [Клавіатурна навігація та tabindex](#10-клавіатурна-навігація-та-tabindex)
11. [Контрольні питання](#контрольні-питання)

---

## 1. Навіщо потрібні форми

Форми — основний спосіб **отримати дані від користувача**: реєстрація, пошук, замовлення, зворотний зв'язок, коментарі.

- Форми з'явилися **ще до JavaScript**: дані передавались через HTTP з переходом на нову сторінку.
- Елементи форм — частина **DOM**, тому JavaScript може читати, змінювати й перевіряти поля та надсилати дані асинхронно (без перезавантаження).

```
Користувач заповнює поля ──► натискає submit ──► браузер перевіряє (валідація)
     ──► формує HTTP-запит (GET/POST) на адресу action ──► сервер обробляє ──► відповідь
```

---

## 2. Анатомія тегу form

```html
<form action="/register" method="post" autocomplete="on">
  <label for="name">Ім'я</label>
  <input type="text" id="name" name="name">
  <button type="submit">Надіслати</button>
</form>
```

| Атрибут | Призначення |
|---|---|
| `action` | URL обробника форми. Якщо не вказано — дані надсилаються на поточну сторінку |
| `method` | `get` (за замовчуванням) або `post` |
| `target` | Де показати відповідь: `_self` (поточна вкладка), `_blank` (нова) |
| `autocomplete` | `on` / `off` — дозволити браузеру підставляти збережені дані |
| `novalidate` | Вимкнути вбудовану перевірку браузера (булевий атрибут, без значення) |
| `enctype` | Кодування даних (див. нижче) |

### `enctype` — тип кодування

| Значення | Коли використовувати |
|---|---|
| `application/x-www-form-urlencoded` | За замовчуванням. Пробіли → `+`, кирилиця → `%D0%A1%D1%82...` |
| `multipart/form-data` | **Обов'язково для завантаження файлів** (`<input type="file">`) |
| `text/plain` | Майже не використовується (налагодження) |

> 💡 На сторінці може бути скільки завгодно форм, але одночасно надсилається лише одна.
>
> ⚠️ **Ключове правило:** у кожного поля, яке має потрапити на сервер, повинен бути атрибут **`name`**. Без `name` значення поля **не надсилається**!

> 📄 Приклад: [00-send-form.html](presentation/examples/01-form/00-send-form.html)

---

## 3. GET vs POST

| | **GET** | **POST** |
|---|---|---|
| Де дані | В URL: `site.com/search?q=css&page=2` | У тілі запиту |
| Обсяг | Обмежений довжиною URL (кілька тисяч символів) | Практично необмежений |
| Видимість | Видно в адресному рядку, історії, логах | Не видно в URL |
| Закладки | Можна зберегти/поділитися посиланням | Ні |
| Файли | ❌ | ✅ (з `multipart/form-data`) |
| Типове застосування | Пошук, фільтри, пагінація | Реєстрація, логін, замовлення, завантаження файлів |

> 🔐 POST **не робить** дані зашифрованими — він лише ховає їх з URL. Захист забезпечує **HTTPS**.

---

## 4. Поле input та його типи

`<input>` — непарний тег; його поведінку визначає атрибут `type`.

| Тип | Призначення | Особливість на мобільних 📱 |
|---|---|---|
| `text` | Звичайний текст (за замовчуванням) | Звичайна клавіатура |
| `email` | Email | Клавіатура з `@` і `.`; автоматична перевірка формату |
| `tel` | Телефон | Цифрова клавіатура (формат **не** перевіряється — потрібен `pattern`) |
| `password` | Пароль | Символи приховані |
| `number` | Число | Цифрова клавіатура; `min`, `max`, `step` |
| `range` | Повзунок | `min`, `max`, `step`; число не показує (див. `<output>`) |
| `date`, `time`, `datetime-local`, `month`, `week` | Дата/час | Нативний календар; `value` завжди у форматі `YYYY-MM-DD` |
| `url` | Посилання | Клавіатура з `/` і `.com` |
| `search` | Пошук | Кнопка «Знайти» на клавіатурі, хрестик очищення |
| `color` | Вибір кольору | Палітра |
| `file` | Завантаження файлів | `accept="image/*"`, `multiple` |
| `checkbox`, `radio` | Прапорці / перемикачі | — |
| `hidden` | Приховане службове значення | Не відображається |

### Корисні атрибути `<input>`

| Атрибут | Дія |
|---|---|
| `name` | Ключ, під яким значення піде на сервер |
| `value` | Початкове значення |
| `placeholder` | Підказка всередині порожнього поля (**не замінює `label`!**) |
| `autocomplete` | Підказка браузеру: `email`, `tel`, `name`, `new-password`, `current-password`, `off` |
| `inputmode` | Уточнює тип екранної клавіатури: `numeric`, `decimal`, `email`, `tel` |
| `disabled` | Поле вимкнене: не редагується, **не надсилається** |
| `readonly` | Лише читання: не редагується, але **надсилається** |
| `autofocus` | Фокус при завантаженні сторінки |

```html
<label for="email">Email</label>
<input type="email" id="email" name="email"
       autocomplete="email" placeholder="name@example.com">

<label for="vol">Гучність</label>
<input type="range" id="vol" name="vol" min="0" max="100" value="50">
<output for="vol">50</output>
```

> 💡 Відключайте кнопку (`disabled`) на час відправки форми — так користувач, що «втратив терпіння», не надішле дані двічі.

> 📄 Приклад: [02-input-types.html](presentation/examples/01-form/02-input-types.html)

---

## 5. label: підписи до полів

**Кожне поле повинно мати підпис.** Два способи зв'язати `<label>` з полем:

```html
<!-- 1. Явний зв'язок через for + id -->
<label for="login">Логін</label>
<input id="login" name="login">

<!-- 2. Неявний — поле всередині label -->
<label>
  <input type="checkbox" name="agree"> Погоджуюсь з умовами
</label>
```

**Переваги:** клік по підпису фокусує поле (або перемикає checkbox — більша зона кліку!), скрінрідер озвучує назву поля.

> ⚠️ `placeholder` — **не** заміна `label`: він зникає під час введення, має низький контраст і погано читається скрінрідерами.

---

## 6. Декларативна валідація

Браузер може перевірити форму **без жодного рядка JavaScript** — при натисканні submit.

| Атрибут | Перевірка | Для яких полів |
|---|---|---|
| `required` | Поле не порожнє | Майже всі |
| `minlength` / `maxlength` | Довжина тексту | text, email, password, textarea… |
| `min` / `max` | Діапазон значень | number, range, date… |
| `step` | Крок значення (`step="any"` — дробові) | number, range, date |
| `pattern` | Регулярний вираз | text, tel, email, password… |
| `type="email"` / `type="url"` | Формат | email, url |

```html
<form action="/register" method="post">
  <label for="user">Логін</label>
  <input id="user" name="user" required minlength="3" maxlength="20"
         pattern="[A-Za-z0-9_]+" title="Лише латиниця, цифри та символ _">

  <label for="phone">Телефон</label>
  <input id="phone" name="phone" type="tel"
         pattern="\+380\d{9}" title="Формат: +380501234567">

  <label for="age">Вік</label>
  <input id="age" name="age" type="number" min="18" max="99" required>

  <button type="submit">Зареєструватися</button>
</form>
```

- `pattern` автоматично «прив'язаний» до початку й кінця рядка (не треба `^...$`).
- `title` браузер показує в повідомленні про помилку.
- Стилізувати стан поля можна псевдокласами CSS: `:valid`, `:invalid`, `:required`, `:user-invalid`.

> 🔐 **Важливо:** клієнтська валідація — для **зручності користувача**, а не для безпеки. Її легко обійти через DevTools, тому сервер **завжди** перевіряє дані повторно.

> 📄 Приклад: [03-input-html-validation.html](presentation/examples/01-form/03-input-html-validation.html)

---

## 7. textarea, select, checkbox, radio

### `<textarea>` — багаторядковий текст

```html
<label for="msg">Повідомлення</label>
<textarea id="msg" name="msg" rows="4" maxlength="500"
          placeholder="Опишіть проблему"></textarea>
```

Початкове значення пишеться **між тегами**, а не в `value`. Можливість змінювати розмір контролюється CSS-властивістю `resize`.

### `<select>` — випадаючий список

```html
<label for="city">Місто</label>
<select id="city" name="city" required>
  <option value="">— оберіть місто —</option>
  <optgroup label="Західна Україна">
    <option value="lviv">Львів</option>
    <option value="cv" selected>Чернівці</option>
  </optgroup>
  <optgroup label="Центр">
    <option value="kyiv">Київ</option>
  </optgroup>
</select>
```

- `selected` — обраний за замовчуванням варіант;
- `<optgroup>` — групування варіантів;
- `multiple` (+ `size`) — множинний вибір;
- перший `<option value="">` + `required` — користувач не зможе надіслати «заглушку».

### `radio` vs `checkbox`

| | **radio** 🔘 | **checkbox** ☑️ |
|---|---|---|
| Вибір | **Один** з групи | **Будь-яка кількість** |
| Група | Однаковий `name` | Можна однаковий `name` (масив значень) |
| Приклад | Спосіб доставки, стать | Додаткові опції, згода з умовами |

```html
<fieldset>
  <legend>Спосіб доставки</legend>
  <label><input type="radio" name="delivery" value="post" required> Пошта</label>
  <label><input type="radio" name="delivery" value="courier" checked> Кур'єр</label>
</fieldset>

<fieldset>
  <legend>Додатково</legend>
  <label><input type="checkbox" name="extras" value="gift"> Подарункове пакування</label>
  <label><input type="checkbox" name="extras" value="sms" checked> SMS-повідомлення</label>
</fieldset>
```

**`<fieldset>` + `<legend>`** — семантичне групування пов'язаних полів із заголовком групи. Скрінрідер озвучить «Спосіб доставки, Пошта, перемикач».

> 📄 Приклад: [04-textarea-select-checkbox-radio.html](presentation/examples/01-form/04-textarea-select-checkbox-radio.html)

---

## 8. Кнопки

| Тип `<button>` | Дія |
|---|---|
| `type="submit"` | Надсилає форму (**значення за замовчуванням** всередині форми!) |
| `type="reset"` | Скидає поля до початкових значень (рідко використовується в UX) |
| `type="button"` | Нічого не робить сама по собі — для JavaScript |

```html
<form id="order" action="/order" method="post">
  <input name="qty" type="number" required>
  <button type="submit">Замовити</button>
  <!-- Перевизначення action та вимкнення валідації лише для цієї кнопки -->
  <button type="submit" formaction="/draft" formnovalidate>Зберегти чернетку</button>
  <!-- Кнопка-іконка: потрібна доступна назва -->
  <button type="button" aria-label="Закрити">✕</button>
</form>

<!-- Кнопка поза формою, але прив'язана до неї -->
<button type="submit" form="order">Замовити</button>
```

> ⚠️ **Типова помилка:** кнопка «Показати пароль» всередині форми без `type="button"` відправляє форму. Завжди вказуйте `type` явно!

### `<button>` чи `<a>`?

- **Посилання `<a>`** — *переходить* кудись (інша сторінка, якір).
- **Кнопка `<button>`** — *виконує дію* (надіслати, відкрити меню, лайкнути).

> 📄 Приклад: [05-button.html](presentation/examples/01-form/05-button.html)

---

## 9. Аудіо та відео

### `<audio>`

```html
<audio controls>
  <source src="audio/Vivaldi.mp3" type="audio/mpeg">
  <source src="audio/Vivaldi.ogg" type="audio/ogg">
  Ваш браузер не підтримує аудіо.
</audio>
```

### `<video>` з субтитрами

```html
<video controls width="640" height="360"
       poster="preview.jpg" preload="metadata" playsinline>
  <source src="lecture.webm" type="video/webm">
  <source src="lecture.mp4"  type="video/mp4">
  <track kind="subtitles" src="lecture.uk.vtt" srclang="uk" label="Українська" default>
  <track kind="subtitles" src="lecture.en.vtt" srclang="en" label="English">
  <p>Ваш браузер не підтримує відео. <a href="lecture.mp4">Завантажити</a>.</p>
</video>
```

| Атрибут | Дія |
|---|---|
| `controls` | Показати панель керування |
| `autoplay` | Автозапуск. ⚠️ Більшість браузерів дозволяє його **лише разом із `muted`** |
| `muted` | Без звуку |
| `loop` | Відтворювати по колу |
| `poster` | Обкладинка до запуску (лише video) |
| `preload` | `none` / `metadata` (лише тривалість і розміри) / `auto` |
| `playsinline` | На iOS не розгортати на весь екран автоматично |

- Браузер бере **перший підтримуваний** `<source>`; атрибут `type` дає змогу пропустити непідтримуваний формат без завантаження.
- `<track>` підключає субтитри у форматі **WebVTT** (`.vtt`). `kind`: `subtitles`, `captions`, `descriptions`, `chapters`.

### Формати

| Аудіо | Відео |
|---|---|
| **MP3** — найпоширеніший | **MP4 (H.264)** — універсальна підтримка |
| **AAC** — краща якість, ніж MP3 | **WebM (VP8/VP9/AV1)** — відкритий формат Google |
| **OGG (Vorbis/Opus)** — відкритий | **OGV (Theora)** — застарілий |
| **WAV** — без стиснення, великий | |

Приклад файлу субтитрів `lecture.uk.vtt`:

```
WEBVTT

00:00:01.000 --> 00:00:04.000
Вітаю на лекції з вебтехнологій!

00:00:04.500 --> 00:00:08.000
Сьогодні говоримо про форми.
```

> 📄 Приклади: [01-audio-element.html](presentation/examples/02-audio-video/01-audio-element.html), [02-audio-element.html](presentation/examples/02-audio-video/02-audio-element.html), [03-video-element.html](presentation/examples/02-audio-video/03-video-element.html), [04-video.html](presentation/examples/02-audio-video/04-video.html)

---

## 10. Клавіатурна навігація та tabindex

**Фокус** — елемент, що зараз отримує введення з клавіатури. Клавіатурна навігація потрібна користувачам скрінрідерів, людям з порушеннями моторики, а також «power users».

### Основні клавіші

| Клавіша | Дія |
|---|---|
| `Tab` / `Shift+Tab` | Наступний / попередній елемент |
| `Enter` | Активувати посилання чи кнопку, надіслати форму з поля |
| `Space` | Натиснути кнопку, перемкнути checkbox |
| `←` `→` `↑` `↓` | Перемикання radio, вибір у select |
| `Esc` | Закрити діалог / випадаючий список |

**Нативно фокусуються:** `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`, `<summary>`, `<audio controls>`, `<video controls>`, елементи з `contenteditable`.

> 📌 Порядок переходу по `Tab` визначається **порядком у DOM**, а не візуальним розташуванням на екрані.

### Атрибут `tabindex`

| Значення | Ефект |
|---|---|
| `tabindex="0"` | Елемент стає фокусованим і стоїть у природному порядку DOM |
| `tabindex="-1"` | Фокусується лише програмно (JS `element.focus()`), але **не** через Tab |
| `tabindex="1+"` | Примусовий порядок. ⚠️ **Анти-патерн** — ламає логіку навігації |

```html
<!-- ❌ Погано: div замість кнопки — не фокусується, не реагує на Enter/Space -->
<div class="btn" onclick="buy()">Купити</div>

<!-- ✅ Добре: нативна кнопка вже вміє все -->
<button type="button" onclick="buy()">Купити</button>
```

> ⚠️ Ніколи не прибирайте рамку фокусу (`outline: none`) без альтернативи — користувач клавіатури «загубиться» на сторінці. Краще стилізуйте `:focus-visible`.

> 🧪 **Тест «без миші»:** відкладіть мишку і спробуйте заповнити й відправити свою форму лише клавіатурою. Якщо не вийшло — форма не доступна.

---

## Чек-лист якісної форми ✅

- [ ] Кожне поле має `<label>`
- [ ] Кожне поле, що надсилається, має `name`
- [ ] Використано правильні `type` (email, tel, date…) — зручна клавіатура на мобільних
- [ ] Вказано `autocomplete`
- [ ] Обов'язкові поля мають `required`
- [ ] Пов'язані поля згруповано в `<fieldset>` з `<legend>`
- [ ] Кнопки мають явний `type`
- [ ] Для файлів — `method="post"` та `enctype="multipart/form-data"`
- [ ] Форму можна заповнити й надіслати лише клавіатурою

## Корисні ресурси

- [MDN: Web forms](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [MDN: `<input>` types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [MDN: Video and audio content](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
- [web.dev: Learn Forms](https://web.dev/learn/forms)
- [regex101.com](https://regex101.com/) — перевірка регулярних виразів для `pattern`

---

## Контрольні питання

1. Для чого використовуються HTML-форми? Наведіть 3–4 приклади з реальних сайтів.
2. Які атрибути має тег `<form>`? Що станеться, якщо не вказати `action`?
3. Чим відрізняються методи GET та POST? Коли використовувати кожен?
4. Яке значення `enctype` обов'язкове для завантаження файлів і чому?
5. Навіщо полю атрибут `name`? Що станеться з полем без нього?
6. Назвіть 6–8 типів `<input>`. Як `type` впливає на роботу форми на мобільних пристроях?
7. Чим `disabled` відрізняється від `readonly`?
8. Як зв'язати `<label>` з полем вводу (два способи)? Які переваги це дає?
9. Чому `placeholder` не може замінити `<label>`?
10. Які атрибути декларативної валідації ви знаєте? Наведіть приклад `pattern` для номера телефону.
11. Чому клієнтська валідація не замінює серверну?
12. Чим `radio` відрізняється від `checkbox`? Як об'єднати radio-кнопки в групу?
13. Для чого потрібні `<fieldset>` та `<legend>`?
14. Як зробити так, щоб у `<select>` користувач обов'язково обрав значення, а не залишив «заглушку»?
15. Які типи кнопок існують? Яке значення `type` у `<button>` за замовчуванням і до якої помилки це може призвести?
16. Коли використовувати `<a>`, а коли `<button>`?
17. Як забезпечити відтворення відео в різних браузерах? Яку роль відіграють кілька `<source>`?
18. Як додати субтитри до відео? Що таке формат WebVTT?
19. Чому `autoplay` часто не спрацьовує і як це виправити?
20. Що таке фокус? Які елементи фокусуються нативно? Що визначає порядок переходу по Tab?
21. Поясніть значення `tabindex="0"`, `tabindex="-1"` та `tabindex="5"`. Чому додатні значення — анти-патерн?

---

## 🎯 Практичне завдання

Створіть форму **«Реєстрація на IT-конференцію»**:

- ПІБ (`required`, `minlength="5"`), email, телефон з `pattern` для формату `+380XXXXXXXXX`;
- дата народження (`min`/`max` — учасникам від 16 років);
- `<select>` з секціями доповідей, згрупованими через `<optgroup>`;
- формат участі — `radio` (онлайн / офлайн), додаткові опції — `checkbox` (обід, сертифікат);
- `<textarea>` «Питання до спікерів» (`maxlength="300"`);
- завантаження фото (`<input type="file" accept="image/*">`) — не забудьте `enctype`;
- обов'язкова згода з умовами;
- кнопки «Зареєструватися» та «Зберегти чернетку» (`formnovalidate`);
- відео-запрошення з `poster` і субтитрами.

Пройдіть «тест без миші»: заповніть і надішліть форму лише клавіатурою.
