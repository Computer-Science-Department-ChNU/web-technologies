# Лекція 12. CSS Grid Layout

> **Мета лекції:** опанувати двовимірну систему сіток CSS Grid — від базових понять до іменованих областей та адаптивних сіток без медіазапитів; навчитися обирати між Grid і Flexbox.

📂 Матеріали: [презентація](presentation/index.html) · [приклади](examples/) · [макет сайту на Grid](examples/site-layout/)

---

## Зміст

1. [Основні поняття](#1-основні-поняття)
2. [Grid чи Flexbox?](#2-grid-чи-flexbox)
3. [Створення сітки: grid-template-columns/rows](#3-створення-сітки-grid-template-columnsrows)
4. [Одиниця fr](#4-одиниця-fr)
5. [Функція repeat()](#5-функція-repeat)
6. [Явна та неявна сітка, minmax()](#6-явна-та-неявна-сітка-minmax)
7. [Проміжки: gap](#7-проміжки-gap)
8. [Розміщення за лініями](#8-розміщення-за-лініями)
9. [Ключове слово span та grid-area](#9-ключове-слово-span-та-grid-area)
10. [Іменовані області: grid-template-areas](#10-іменовані-області-grid-template-areas)
11. [Адаптивна сітка без медіазапитів: auto-fill / auto-fit](#11-адаптивна-сітка-без-медіазапитів-auto-fill--auto-fit)
12. [grid-auto-flow](#12-grid-auto-flow)
13. [Вирівнювання в Grid](#13-вирівнювання-в-grid)
14. [Контрольні питання](#контрольні-питання)

---

## 1. Основні поняття

**CSS Grid Layout** — **двовимірна** система сіток: керує одночасно рядками **і** колонками. Підходить і для каркаса сторінки, і для дрібних компонентів.

```
     1         2         3         4      ← номери ліній колонок
   1 ┌─────────┬─────────┬─────────┐
     │  cell   │         │         │      ← grid cell (клітинка)
   2 ├─────────┼─────────┴─────────┤
     │         │    grid area      │      ← grid area (область з кількох клітинок)
   3 ├─────────┼───────────────────┤
     │         │                   │
   4 └─────────┴───────────────────┘
     ↑ номери ліній рядків
     └─ grid track (доріжка) — простір між двома сусідніми лініями (колонка або рядок)
```

| Поняття | Визначення |
|---|---|
| **Grid container** | Елемент з `display: grid` (блочна сітка) або `display: inline-grid` (поводиться як inline-block) |
| **Grid item** | Прямий нащадок контейнера |
| **Grid line** (лінія) | Умовна лінія між колонками/рядками. Нумерується **з 1**; також з кінця — **з -1** |
| **Grid track** (доріжка, трек) | Простір між двома сусідніми лініями — одна колонка або один рядок |
| **Grid cell** (клітинка) | Перетин одного рядка й однієї колонки — найменша одиниця сітки |
| **Grid area** (область) | Прямокутник з кількох клітинок. Форму «L» створити неможливо |

> 🔎 **Grid Inspector:** у DevTools біля елемента з `display: grid` є бейдж **`grid`** — клацніть, і браузер намалює лінії сітки з номерами. Обов'язково користуйтеся!

> 📄 Приклад: [01-grid-container.html](examples/01-grid-container.html)

---

## 2. Grid чи Flexbox?

| | **Flexbox** | **Grid** |
|---|---|---|
| Вимірність | **Одновимірний**: рядок **або** колонка | **Двовимірний**: рядки **і** колонки |
| Підхід | «Від вмісту» — елементи визначають розмір | «Від макета» — сітка визначає місце |
| Найкраще для | Меню, панелі кнопок, центрування, картки в ряд | Каркас сторінки, галереї, дашборди, складні сітки |

**Просте питання:**

- Керувати розміщенням у **рядку або колонці**? → **Flexbox**
- Керувати розміщенням у **рядку та колонці одночасно**? → **Grid**

> 💪 **FlexBox + Grid = Power!** Вони не конкурують, а доповнюють один одного: Grid — для каркаса сторінки, Flexbox — для вмісту всередині комірок.

---

## 3. Створення сітки: grid-template-columns/rows

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  /* 3 колонки */
  grid-template-rows: auto 100px;          /* 2 рядки */
}
```

Розмір треку можна задати будь-якою одиницею: `px`, `%`, `em`, `rem`, `fr`, `auto`, а також функціями `minmax()`, `min-content`, `max-content`, `fit-content()`.

> 📄 Приклади: [02-grid-template-columns.html](examples/02-grid-template-columns.html) … [09-grid-template-columns.html](examples/09-grid-template-columns.html)

---

## 4. Одиниця fr

**`fr`** (fraction) — **частка вільного місця** в контейнері.

```css
grid-template-columns: 1fr 1fr 1fr;     /* три рівні колонки */
grid-template-columns: 2fr 1fr 1fr;     /* перша вдвічі ширша */
grid-template-columns: 300px 1fr 2fr;   /* фіксована + гнучкі */
```

### Як рахується `300px 1fr 2fr` при ширині 900px?

```
1. Віднімаємо фіксоване:  900 − 300 = 600px вільно
2. Ділимо на частки:      1fr + 2fr = 3 частки → 1fr = 200px
3. Результат:             300px | 200px | 400px
```

> 💡 На відміну від `%`, `fr` **враховує `gap`**: `repeat(3, 1fr)` з `gap: 20px` — ідеально, а `repeat(3, 33.33%)` з gap — переповнить контейнер.

> 📄 Приклади: [03-grid-template-columns.html](examples/03-grid-template-columns.html), [04-grid-template-columns.html](examples/04-grid-template-columns.html), [05-grid-template-columns.html](examples/05-grid-template-columns.html)

---

## 5. Функція repeat()

```css
grid-template-columns: repeat(3, 1fr);               /* = 1fr 1fr 1fr */
grid-template-columns: 20px repeat(6, 1fr) 20px;     /* 8 колонок: 20px, 6 × 1fr, 20px */
grid-template-columns: repeat(5, 1fr 2fr);           /* 10 колонок: шаблон «1fr 2fr» × 5 */
grid-template-columns: repeat(12, 1fr);              /* класична 12-колонкова сітка */
```

> 📄 Приклади: [06-grid-template-columns.html](examples/06-grid-template-columns.html), [07-grid-template-columns.html](examples/07-grid-template-columns.html), [08-grid-template-columns.html](examples/08-grid-template-columns.html), [09-grid-template-columns.html](examples/09-grid-template-columns.html)

---

## 6. Явна та неявна сітка, minmax()

- **Явна сітка (explicit)** — треки, які ви задали через `grid-template-columns/rows`.
- **Неявна сітка (implicit)** — треки, які браузер створює **сам**, коли елементів більше, ніж клітинок (або елемент розміщено за межами явної сітки).

Розмір неявних треків задають `grid-auto-rows` та `grid-auto-columns`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* колонки задали явно */
  grid-auto-rows: 200px;                  /* усі автоматичні рядки — по 200px */
}
```

### `minmax(min, max)`

Трек **не менше `min`** і **не більше `max`**:

```css
grid-auto-rows: minmax(100px, auto);
/* рядок щонайменше 100px, але розтягнеться, якщо вмісту більше */
```

> 📄 Приклади: [11-grid-auto-rows.html](examples/11-grid-auto-rows.html), [12-grid-auto-rows-minmax.html](examples/12-grid-auto-rows-minmax.html)

---

## 7. Проміжки: gap

```css
.grid {
  gap: 20px;           /* між рядками і колонками */
  gap: 20px 40px;      /* row-gap column-gap */
  row-gap: 20px;
  column-gap: 40px;
}
```

- Проміжки — лише **між** треками, не по краях контейнера.
- У проміжок нічого не можна розмістити; з точки зору ліній — це «товста лінія».
- Старі назви `grid-gap`, `grid-row-gap`, `grid-column-gap` досі працюють, але сучасний запис — без префікса `grid-`.

> 📄 Приклади: [15-grid-gap.html](examples/15-grid-gap.html), [16-grid-lines-gap.html](examples/16-grid-lines-gap.html)

---

## 8. Розміщення за лініями

Ми **задаємо треки**, а браузер автоматично **нумерує лінії**. Елемент розміщується між лініями:

```css
.item-1 {
  grid-column-start: 1;
  grid-column-end: 4;     /* від лінії 1 до 4 — три колонки */
  grid-row-start: 1;
  grid-row-end: 3;        /* два рядки */
}

/* Скорочено: початок / кінець */
.item-1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.item-2 { grid-column: 1; }          /* кінцеву лінію можна не вказувати — займе 1 трек */
.full   { grid-column: 1 / -1; }     /* ✅ на всю ширину сітки, скільки б не було колонок */
```

Елементи без явної позиції браузер розставляє **автоматично** у вільні клітинки.

> 💡 Від'ємні номери рахуються з кінця: `-1` — остання лінія явної сітки.

> 📄 Приклади: [13-grid-lines.html](examples/13-grid-lines.html), [14-grid-lines-shorthand.html](examples/14-grid-lines-shorthand.html)

---

## 9. Ключове слово span та grid-area

### `span` — «займи N треків»

```css
.wide  { grid-column: span 2; }       /* 2 колонки, звідки б не почав */
.big   { grid-column: 2 / span 3; }   /* з лінії 2, на 3 колонки */
.tall  { grid-row: span 2; }
```

### `grid-area` — чотири лінії в одній властивості

Порядок значень: **row-start / column-start / row-end / column-end** (проти годинникової стрілки: верх, ліво, низ, право).

```css
.item { grid-area: 1 / 1 / 3 / 4; }
/* = grid-row: 1 / 3;  grid-column: 1 / 4; */
```

> ⚠️ Порядок `grid-area` **протилежний** до `margin`/`padding` (там — за годинниковою). Легко сплутати!

> 📄 Приклади: [19-grid-template-columns-rows.html](examples/19-grid-template-columns-rows.html), [20-grid-template-columns-rows.html](examples/20-grid-template-columns-rows.html), [21-grid-area.html](examples/21-grid-area.html)

---

## 10. Іменовані області: grid-template-areas

Найнаочніший спосіб описати макет — **«намалювати» його текстом**:

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
  gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
```

```
┌───────────── header ─────────────┐
├──────────┬───────────────────────┤
│ sidebar  │        content        │
├──────────┴───────────────────────┤
│              footer              │
└──────────────────────────────────┘
```

**Правила:**

- кожен рядок у лапках — рядок сітки; кількість «слів» = кількості колонок;
- `.` — порожня клітинка;
- область має бути **прямокутною**.

### Адаптивність — просто «перемалюйте» карту

```css
@media (max-width: 768px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content"
      "sidebar"
      "footer";
  }
}
```

### Іменування ліній

Лініям можна дати імена й посилатися на них замість номерів:

```css
.grid {
  grid-template-columns: [full-start] 1fr [content-start] 3fr [content-end] 1fr [full-end];
}
.article { grid-column: content-start / content-end; }
```

> 📄 Приклади: [22-grid-template-areas.html](examples/22-grid-template-areas.html), [site-layout/](examples/site-layout/)

---

## 11. Адаптивна сітка без медіазапитів: auto-fill / auto-fit

**Найкорисніший рядок CSS Grid** 🏆:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

Читаємо: «Створи **стільки колонок, скільки вміститься**, кожна **не менше 200px**, а вільне місце розподіли порівну (`1fr`)». Картки самі перебудовуються з 4 у ряд на десктопі до 1 на телефоні — **без жодного медіазапиту**.

### `auto-fill` vs `auto-fit`

Різниця видна, лише коли елементів **мало** і вони не заповнюють рядок:

| | Поведінка |
|---|---|
| `auto-fill` | Створює порожні треки «про запас» → елементи **не розтягуються** на всю ширину |
| `auto-fit` | Згортає порожні треки → елементи **розтягуються** на всю ширину |

```
auto-fill:  [ 1 ][ 2 ][   ][   ]     ← порожні колонки лишаються
auto-fit:   [   1   ][   2   ]       ← елементи розтягнулись
```

> 📄 Приклади: [17-grid-auto-fill.html](examples/17-grid-auto-fill.html), [18-grid-auto-fill-minmax.html](examples/18-grid-auto-fill-minmax.html)

---

## 12. grid-auto-flow

Керує алгоритмом **автоматичного розміщення**:

| Значення | Поведінка |
|---|---|
| `row` (за замовч.) | Заповнювати рядок за рядком |
| `column` | Заповнювати колонку за колонкою |
| `dense` | «Щільна упаковка»: заповнювати «дірки», що лишилися від великих елементів (порядок може змінитися) |

```css
.masonry-like {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-flow: dense;   /* без дірок у галереї з різними розмірами плиток */
}
```

**Анонімні grid-елементи:** текст, що лежить безпосередньо в контейнері (без тегу), браузер обгортає в «анонімний» елемент, і він теж займає клітинку.

---

## 13. Вирівнювання в Grid

| Властивість | Кого вирівнює | Вісь |
|---|---|---|
| `justify-items` | Усі елементи **всередині клітинок** | → горизонтальна (inline) |
| `align-items` | Усі елементи всередині клітинок | ↓ вертикальна (block) |
| `place-items` | Скорочення `align-items justify-items` | обидві |
| `justify-self` / `align-self` / `place-self` | Один конкретний елемент | — |
| `justify-content` / `align-content` | **Усю сітку** всередині контейнера (якщо вона менша за контейнер) | — |

Значення: `start`, `end`, `center`, `stretch` (за замовч.), а для `*-content` ще й `space-between`, `space-around`, `space-evenly`.

### 🏆 Найкоротше центрування в CSS

```css
.parent {
  display: grid;
  place-items: center;
}
```

### Накладання елементів

Кілька елементів можна розмістити в ту саму клітинку — вони накладуться; порядок керується `z-index`:

```css
.hero > * { grid-area: 1 / 1; }   /* картинка і текст в одній клітинці */
.hero__text { z-index: 1; align-self: end; }
```

---

## Шпаргалка

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: auto;
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas: "a b" "c d";
  gap: 20px;
  place-items: center;
}
.item {
  grid-column: 1 / -1;     /* або span 2 */
  grid-row: 2 / 4;
  grid-area: a;            /* або 1 / 1 / 3 / 4 */
  place-self: end;
}
```

## Корисні ресурси

- [Grid Garden](https://cssgridgarden.com/#uk) 🥕 — гра для тренування (є українська!)
- [CSS-Tricks: A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN: Grid layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)
- [Grid by Example (Rachel Andrew)](https://gridbyexample.com/)
- [CSS Grid за 13 хвилин — Сергій Бабіч](https://www.youtube.com/results?search_query=CSS+Grid+за+13+хвилин+Сергій+Бабіч)
- [Inspect CSS Grid — Chrome DevTools](https://developer.chrome.com/docs/devtools/css/grid)
- [caniuse: CSS Grid](https://caniuse.com/css-grid)

---

## Контрольні питання

1. Що таке CSS Grid Layout? Чим двовимірна розкладка відрізняється від одновимірної?
2. Дайте визначення: grid line, grid track, grid cell, grid area.
3. Чим `display: grid` відрізняється від `display: inline-grid`?
4. Коли варто обрати Grid, а коли Flexbox? Чи можна поєднувати їх?
5. Що означає одиниця `fr`? Розрахуйте ширину колонок `200px 1fr 3fr` у контейнері шириною 1000px.
6. Чому `repeat(3, 1fr)` краще за `repeat(3, 33.33%)` при наявності `gap`?
7. Скільки колонок створить `grid-template-columns: 20px repeat(4, 1fr 2fr) 20px`?
8. Що таке явна та неявна сітки? Якими властивостями задається розмір неявних треків?
9. Що робить `minmax(100px, auto)`?
10. Як задати відстань між рядками й колонками? Чи з'являються проміжки по краях контейнера?
11. Як розмістити елемент від другої до четвертої лінії колонок? Як розтягнути його на всю ширину сітки, не знаючи кількості колонок?
12. Що означає `grid-column: span 3`?
13. У якому порядку задаються значення `grid-area: 1 / 2 / 3 / 4`?
14. Як описати макет сторінки за допомогою `grid-template-areas`? Які обмеження на форму областей?
15. Як зробити макет адаптивним, змінюючи лише `grid-template-areas`?
16. Поясніть запис `repeat(auto-fill, minmax(200px, 1fr))`.
17. Чим `auto-fill` відрізняється від `auto-fit`?
18. Що робить `grid-auto-flow: dense`?
19. Чим `justify-items` відрізняється від `justify-content` у Grid?
20. Як відцентрувати елемент двома рядками коду за допомогою Grid?
21. Як за допомогою DevTools побачити лінії сітки?

---

## 🎯 Практичні завдання

1. Пройдіть усі 28 рівнів [Grid Garden](https://cssgridgarden.com/#uk) 🥕.
2. Зверстайте **каркас сайту** через `grid-template-areas`: header, nav, main, aside, footer. На мобільних — одна колонка, на планшетах — дві, на десктопі — три. Footer завжди притиснутий донизу (`min-height: 100vh`).
3. Зверстайте **адаптивну фотогалерею** без жодного медіазапиту (`auto-fill` + `minmax`). Кожне п'яте фото — подвійної ширини і висоти (`:nth-child(5n)` + `span 2`), без «дірок» (`dense`).
4. Зверстайте **дашборд** із картками різного розміру на 12-колонковій сітці.
