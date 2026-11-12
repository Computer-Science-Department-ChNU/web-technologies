# Лекція 11. Генерований вміст, CSS layout, одиниці вимірювання, Flexbox, медіазапити

> **Мета лекції:** навчитися додавати декоративний вміст засобами CSS, розібратися з техніками побудови макетів та одиницями вимірювання, опанувати Flexbox і зробити сторінку адаптивною за допомогою медіазапитів.

📂 Матеріали: [презентація](presentation/index.html) · [приклади](examples/) · [приклади Flexbox](examples/flex/)

---

## Зміст

1. [Генерований вміст: ::before та ::after](#1-генерований-вміст-before-та-after)
2. [CSS-лічильники](#2-css-лічильники)
3. [Техніки побудови макетів](#3-техніки-побудови-макетів)
4. [Одиниці вимірювання](#4-одиниці-вимірювання)
5. [Flexbox: основи](#5-flexbox-основи)
6. [Властивості flex-контейнера](#6-властивості-flex-контейнера)
7. [Властивості flex-елементів](#7-властивості-flex-елементів)
8. [Медіазапити та адаптивність](#8-медіазапити-та-адаптивність)
9. [Контрольні питання](#контрольні-питання)

---

## 1. Генерований вміст: ::before та ::after

**Генерований вміст** — вміст, який додається через CSS **без зміни HTML**. Для цього використовують **псевдоелементи** `::before` (на початку вмісту елемента) та `::after` (в кінці).

```css
.required::after {
  content: " *";             /* ⚠️ без content псевдоелемент не з'явиться! */
  color: crimson;
}
```

| Значення `content` | Результат |
|---|---|
| `"текст"` | Рядок тексту |
| `""` | Порожній псевдоелемент — для декоративних фігур |
| `url(icon.svg)` | Зображення |
| `attr(data-label)` | Значення атрибута елемента |
| `counter(name)` | Значення лічильника |
| `open-quote` / `close-quote` | Лапки |

```css
/* Показати адресу посилання при друці */
@media print {
  a[href^="http"]::after { content: " (" attr(href) ")"; }
}

/* Тултіп з data-атрибута */
.hint::after { content: attr(data-tip); }

/* Декоративна лінія під заголовком */
h2::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  margin-top: 8px;
  background: tomato;
}
```

- Псевдоелемент за замовчуванням **рядковий** — для розмірів додайте `display: block` або `inline-block`.
- Псевдоелементи **не працюють** для порожніх (void) елементів: `<img>`, `<input>`, `<br>`.
- Запис з **двома** двокрапками `::` — для псевдоелементів, з однією `:` — для псевдокласів.

> ⚠️ Генерований вміст **не можна виділити й скопіювати**, а скрінрідери читають його непослідовно. Використовуйте лише для **декору**, а не для важливого тексту.

> 📄 Приклади: [01-content.html](examples/01-content.html), [02-content-url.html](examples/02-content-url.html), [07-content-attr.html](examples/07-content-attr.html)

---

## 2. CSS-лічильники

CSS уміє рахувати сам! Три кроки:

```css
body       { counter-reset: section; }            /* 1. створити лічильник (=0) */
h2         { counter-increment: section; }        /* 2. збільшувати на кожному h2 */
h2::before { content: "Розділ " counter(section) ". "; } /* 3. вивести */
```

### Вкладена нумерація (1, 1.1, 1.2, 2…)

```css
ol { counter-reset: item; list-style: none; }
li { counter-increment: item; }
li::before { content: counters(item, ".") " "; } /* counters — з усіх рівнів через «.» */
```

### Кілька лічильників та «магія» з checkbox

```css
/* Підрахунок обраних пунктів без JavaScript */
.list           { counter-reset: selected; }
input:checked   { counter-increment: selected; }
.total::after   { content: "Обрано: " counter(selected); }
```

> 📄 Приклади: [03-counter.html](examples/03-counter.html), [03-counter-heading.html](examples/03-counter-heading.html), [03-counter-list-sublist.html](examples/03-counter-list-sublist.html), [04-multi-counter.html](examples/04-multi-counter.html), [05-total-selected.html](examples/05-total-selected.html), [06-counter-game.html](examples/06-counter-game.html) 🎮

---

## 3. Техніки побудови макетів

**Layout (лейаут)** — спосіб розміщення блоків на сторінці.

| Техніка | Суть | Сьогодні |
|---|---|---|
| **Звичайний потік** (block/inline) | Блоки один під одним | Основа всього |
| **`inline-block`** | Блоки в ряд, як слова | Для дрібних елементів (теги, кнопки) |
| **`float`** | Обтікання текстом | ⚠️ Застаріло для макетів; лише обтікання картинок текстом |
| **`position: absolute`** | Точне розміщення | Лише для «точкових» елементів |
| **Multi-column** | Текст у кілька колонок, як у газеті | Для текстів |
| **Flexbox** ✅ | Одновимірне розміщення (рядок **або** колонка) | Компоненти, меню, картки |
| **Grid** ✅ | Двовимірне (рядки **і** колонки) | Каркас сторінки, галереї (лекція 12) |

### Типові задачі макета

- Розташувати блоки **горизонтально** → `flex`, `grid`, `inline-block`.
- Не дати вмісту **переповнити** колонку → `min-width`, `overflow`.
- Не дати колонкам «провалитися» одна під одну → сума ширин ≤ 100%, `box-sizing: border-box`.

```css
/* Багатоколонковий текст */
.article {
  column-count: 3;
  column-gap: 2rem;
  column-rule: 1px solid #ddd;
}
```

> 📄 Приклади: [08-layout-inline-block.html](examples/08-layout-inline-block.html), [09-layout-float.html](examples/09-layout-float.html), [10-layout-absolute.html](examples/10-layout-absolute.html), [11-layout-absolute.html](examples/11-layout-absolute.html), [12-layout-multi-column.html](examples/12-layout-multi-column.html), [13-layout-flex.html](examples/13-layout-flex.html)

---

## 4. Одиниці вимірювання

### Абсолютні

| Одиниця | Опис |
|---|---|
| `px` | CSS-піксель. На Retina-екранах 1px може містити кілька фізичних точок |

### Відносні

| Одиниця | Відносно чого | Коли використовувати |
|---|---|---|
| `%` | Розміру батька | Ширини колонок |
| `em` | `font-size` **поточного** елемента (для `font-size` — батька) | Відступи, що масштабуються з текстом компонента |
| `rem` | `font-size` **кореневого** елемента `<html>` (зазвичай 16px) | ✅ Розміри шрифтів, відступи — передбачувано |
| `ex` | Висоти малої літери «x» | Рідко, типографіка |
| `vw` / `vh` | 1% ширини / висоти вікна | Повноекранні секції |
| `vmin` / `vmax` | 1% меншої / більшої сторони вікна | Адаптивні розміри |
| `dvh`, `svh`, `lvh` | «Динамічна»/мала/велика висота вікна | Мобільні: враховують панель адреси браузера |
| `fr` | Частка вільного місця | Лише в Grid |

### `em` vs `rem` — пастка вкладеності

```css
html   { font-size: 16px; }
.box   { font-size: 1.5em; }  /* 24px */
.box p { font-size: 1.5em; }  /* 36px (1.5 × 24) — em накопичується! 😱 */
.box p { font-size: 1.5rem; } /* 24px — завжди від html ✅ */
```

### Функції обчислення

```css
.sidebar { width: calc(100% - 300px); }               /* змішування одиниць */
.title   { font-size: clamp(1.5rem, 4vw, 3rem); }     /* мін, бажане, макс — «гумовий» шрифт */
.box     { width: min(90%, 1200px); }                  /* менше з двох */
.hero    { min-height: max(400px, 50vh); }             /* більше з двох */
```

> ⚠️ У `calc()` пробіли довкола `+` і `-` **обов'язкові**: `calc(100% - 20px)` ✅, `calc(100%-20px)` ❌.

> 📄 Приклади: [14-units.html](examples/14-units.html), [15-units-em-rem-ex.html](examples/15-units-em-rem-ex.html), [16-units-vw-vh.html](examples/16-units-vw-vh.html), [17-calc.html](examples/17-calc.html)

---

## 5. Flexbox: основи

**Flexbox** (CSS Flexible Box Layout) — модель для розміщення елементів **в одному напрямку** (рядок або колонка) з гнучким розподілом вільного місця та вирівнюванням.

```css
.container { display: flex; } /* цього достатньо, щоб діти стали в рядок */
```

| Термін | Значення |
|---|---|
| **Flex container** | Батько з `display: flex` (або `inline-flex`) |
| **Flex item** | **Прямий** нащадок контейнера (онуки — ні!) |
| **Main axis** (головна вісь) | Напрямок розміщення елементів — задається `flex-direction` |
| **Cross axis** (поперечна вісь) | Перпендикулярна головній |

```
flex-direction: row  (за замовчуванням)

        main axis ──────────────────────────►
      ┌──────────────────────────────────────┐
cross │ ┌──────┐ ┌──────┐ ┌──────┐           │
axis  │ │item 1│ │item 2│ │item 3│           │
  │   │ └──────┘ └──────┘ └──────┘           │
  ▼   └──────────────────────────────────────┘
  justify-content → вздовж main axis
  align-items     → вздовж cross axis
```

> 🧠 **Головне правило:** `justify-content` — **завжди головна вісь**, `align-items` — **завжди поперечна**. Якщо змінити `flex-direction` на `column`, осі «повертаються» — і разом із ними повертається дія цих властивостей.

> 📄 Приклади: [01_display flex.html](<examples/flex/01_display flex.html>), [02_flexbox-element.html](examples/flex/02_flexbox-element.html)

---

## 6. Властивості flex-контейнера

### `flex-direction` — напрямок головної осі

| Значення | Напрямок |
|---|---|
| `row` (за замовч.) | → зліва направо |
| `row-reverse` | ← справа наліво |
| `column` | ↓ зверху вниз |
| `column-reverse` | ↑ знизу вгору |

### `justify-content` — вирівнювання по головній осі

```
flex-start     [1][2][3]· · · · · ·
flex-end       · · · · · ·[1][2][3]
center         · · ·[1][2][3]· · ·
space-between  [1]· · · ·[2]· · · ·[3]
space-around   ·[1]· · ·[2]· · ·[3]·
space-evenly   · ·[1]· ·[2]· ·[3]· ·
```

### `align-items` — вирівнювання по поперечній осі

| Значення | Поведінка |
|---|---|
| `stretch` (за замовч.) | Розтягнути на всю висоту контейнера (якщо не задано `height`) |
| `flex-start` | До початку поперечної осі (верх) |
| `flex-end` | До кінця (низ) |
| `center` | По центру |
| `baseline` | По базовій лінії тексту |

### `flex-wrap` — перенесення на новий рядок

| Значення | Поведінка |
|---|---|
| `nowrap` (за замовч.) | Усі в один рядок (елементи стискаються) |
| `wrap` | Переносяться на новий рядок |
| `wrap-reverse` | Переносяться вгору |

### Інше

```css
.container {
  display: flex;
  flex-flow: row wrap;          /* скорочення direction + wrap */
  gap: 16px;                    /* ✅ відступи МІЖ елементами (без margin-хаків) */
  align-content: space-between; /* вирівнювання РЯДКІВ при wrap */
}
```

### 🏆 Центрування по обох осях — у 3 рядки

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

> 📄 Приклади: [05_justify-content.html](examples/flex/05_justify-content.html), [06_align-items.html](examples/flex/06_align-items.html), [07_flex-direction.html](examples/flex/07_flex-direction.html), [08_flex-wrap.html](examples/flex/08_flex-wrap.html)

---

## 7. Властивості flex-елементів

| Властивість | Призначення |
|---|---|
| `flex-grow` | Яку частку **вільного** місця забрати (0 — не рости) |
| `flex-shrink` | Наскільки стискатися при нестачі місця (0 — не стискатися) |
| `flex-basis` | Базовий розмір до розподілу місця (`auto`, `200px`, `30%`) |
| `flex` | Скорочення: `flex: grow shrink basis` |
| `order` | Порядок відображення (за замовч. 0) |
| `align-self` | Власне вирівнювання по поперечній осі (перекриває `align-items`) |

```css
.item  { flex: 1; }           /* = 1 1 0% — усі рівні, ділять місце порівну */
.main  { flex: 2; }           /* удвічі ширший за flex: 1 */
.side  { flex: 0 0 250px; }   /* фіксовані 250px, не росте й не стискається */
```

### margin у flexbox — суперсила

У flex-елементів `margin: auto` працює **по обох осях** і «з'їдає» все вільне місце:

```css
.nav         { display: flex; }
.nav__login  { margin-left: auto; } /* притиснути кнопку входу праворуч */
.child       { margin: auto; }      /* ідеальний центр */
```

Вертикальні margin у flex-елементів **не схлопуються** і **не провалюються**.

> 📄 Приклади: [03_flexbox-elem-sizes1.html](examples/flex/03_flexbox-elem-sizes1.html), [04_flexbox-elem-sizes2.html](examples/flex/04_flexbox-elem-sizes2.html), [09_flexboxs_margin.html](examples/flex/09_flexboxs_margin.html), [10-navigation.html](examples/flex/10-navigation.html), [11-pricing-plans.html](examples/flex/11-pricing-plans.html)

---

## 8. Медіазапити та адаптивність

**Медіазапит** (media query) застосовує стилі лише за певних умов: ширина екрана, орієнтація, тема, друк.

```css
@media <тип> <оператор> (умова) { /* правила */ }
```

```css
/* Mobile First ✅: базові стилі — для мобільних, далі «нарощуємо» */
.cards { display: flex; flex-direction: column; gap: 16px; }

@media (min-width: 768px) {
  .cards { flex-direction: row; flex-wrap: wrap; }
  .card  { flex: 1 1 calc(50% - 16px); }
}

@media (min-width: 1200px) {
  .card { flex-basis: calc(33.333% - 16px); }
}
```

### Підключення

```html
<!-- У тегі link -->
<link rel="stylesheet" media="(max-width: 800px)" href="mobile.css">
<!-- ⚠️ Без цього тега на телефоні медіазапити не спрацюють як очікується -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Стилі для різних середовищ

| Задача | Медіазапит |
|---|---|
| Адаптивний дизайн | `@media (min-width: 768px)` |
| Темна тема 🌙 | `@media (prefers-color-scheme: dark)` |
| Друк 🖨️ | `@media print` |
| Менше анімацій | `@media (prefers-reduced-motion: reduce)` |
| Орієнтація | `@media (orientation: landscape)` |
| Пристрої з наведенням | `@media (hover: hover)` |

```css
@media print {
  nav, .ads, footer { display: none; }
  body { color: black; background: white; }
}

@media (prefers-color-scheme: dark) {
  body { background: #121212; color: #eee; }
}
```

### Типові breakpoints

| Пристрій | Ширина |
|---|---|
| 📱 Мобільні | 320–480px |
| 📱 Планшети | 481–768px |
| 💻 Ноутбуки | 769–1024px |
| 🖥️ Десктопи | 1025–1200px |
| 📺 Великі екрани | 1201px+ |

> 💡 **Не прив'язуйтесь до конкретних пристроїв.** Ставте breakpoint там, де **ваш дизайн починає «ламатися»**: звужуйте вікно браузера і дивіться. А в DevTools увімкніть режим пристроїв (`Ctrl+Shift+M`).

### Mobile First vs Desktop First

| | Mobile First | Desktop First |
|---|---|---|
| Базові стилі | Для мобільних | Для десктопа |
| Медіазапити | `min-width` | `max-width` |
| Переваги | Простіші базові стилі, легше нарощувати, фокус на головному | Звично, якщо макет лише десктопний |

> 📄 Приклади: [18-media-query.html](examples/18-media-query.html), [19-media-query.html](examples/19-media-query.html), [20-media-query.html](examples/20-media-query.html), [21-media-query.html](examples/21-media-query.html)

---

## Корисні ресурси (обов'язкові 🔥)

- [What The Flexbox?!](https://flexbox.io/) — безкоштовний відеокурс від Wes Bos
- [Flexbox Froggy](https://flexboxfroggy.com/#uk) 🐸 — гра (є українська мова!)
- [11 things I learned reading the flexbox spec](https://hackernoon.com/11-things-i-learned-reading-the-flexbox-spec-5f0c799c776b)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — шпаргалка
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [web.dev: Responsive web design basics](https://web.dev/articles/responsive-web-design-basics)

---

## Контрольні питання

1. Що таке генерований вміст? Які псевдоелементи для цього використовуються?
2. Чому без властивості `content` псевдоелемент `::before` не відображається?
3. Чому `::after` не працює для `<img>` та `<input>`?
4. Як вивести значення атрибута елемента через CSS?
5. Чому важливий текст не варто додавати через генерований вміст?
6. Які три властивості потрібні для роботи CSS-лічильника? Чим `counter()` відрізняється від `counters()`?
7. Назвіть основні техніки побудови макетів. Чому `float` сьогодні не використовують для макетів?
8. Чим `em` відрізняється від `rem`? Чому `em` «накопичується» при вкладеності?
9. Що означають `vw`, `vh`, `vmin`, `vmax`?
10. Для чого потрібні `calc()` та `clamp()`? Наведіть приклади.
11. Що таке flex-контейнер і flex-елемент? Чи стають flex-елементами онуки контейнера?
12. Що таке головна та поперечна осі? Як `flex-direction` впливає на них?
13. Яка властивість вирівнює елементи по головній осі, а яка — по поперечній?
14. Чим відрізняються `space-between`, `space-around` та `space-evenly`?
15. Що робить `flex-wrap: wrap`?
16. Як відцентрувати елемент по обох осях за допомогою Flexbox?
17. Розшифруйте записи `flex: 1` та `flex: 0 0 200px`.
18. Як притиснути останній пункт меню до правого краю у flex-контейнері?
19. Що таке медіазапит? Наведіть синтаксис.
20. Навіщо потрібен метатег `viewport` для адаптивної верстки?
21. Чим підхід Mobile First відрізняється від Desktop First? Які медіа-умови використовуються в кожному?
22. Як за допомогою CSS підтримати темну тему операційної системи? Як підготувати сторінку до друку?

---

## 🎯 Практичні завдання

1. Пройдіть усі 24 рівні [Flexbox Froggy](https://flexboxfroggy.com/#uk) 🐸.
2. Зверстайте **навігаційне меню**: логотип ліворуч, пункти по центру, кнопка «Увійти» праворуч (`margin-left: auto`).
3. Зверстайте **блок тарифів** (3 картки): на мобільних — у колонку, з 768px — у рядок, середня картка — виділена й на мобільних показується першою (`order`).
4. Зробіть **зміст статті** з автоматичною нумерацією «1., 1.1., 1.2., 2.» через CSS-лічильники.
5. Додайте до сторінки темну тему (`prefers-color-scheme`) та стилі для друку.
