# Лекція 5. Робота з текстом та видимістю елементів

> **Мета лекції:** зрозуміти механізм успадкування стилів, опанувати властивості для оформлення тексту та навчитися правильно приховувати елементи.

📂 Матеріали: [презентація](presentation/index.html) · [приклади](examples/)

---

## Зміст

1. [Успадкування](#1-успадкування)
2. [Шрифт: font-*](#2-шрифт-font-)
3. [Вирівнювання та відступи тексту](#3-вирівнювання-та-відступи-тексту)
4. [Оформлення тексту](#4-оформлення-тексту)
5. [Перенесення та пробіли](#5-перенесення-та-пробіли)
6. [Тіні та виділення](#6-тіні-та-виділення)
7. [Видимість елементів](#7-видимість-елементів)
8. [Контрольні питання](#контрольні-питання)

---

## 1. Успадкування

**Успадкування** — механізм, за яким дочірні елементи отримують значення деяких властивостей від батьківського елемента.

```html
<div style="color: orange; border: 1px solid blue;">
  <h2><span>Успадкування</span> стилів</h2>
  <p>Текст про <b>успадкування</b></p>
</div>
```

Тут `h2`, `span`, `p`, `b` стануть **помаранчевими** (`color` успадковується), але **не отримають рамку** (`border` не успадковується).

| ✅ Успадковуються (переважно текстові) | ❌ Не успадковуються (переважно «коробкові») |
|---|---|
| `color` | `width`, `height` |
| `font` та `font-*` | `margin`, `padding` |
| `line-height` | `border` |
| `text-align`, `text-indent`, `text-transform` | `background` |
| `letter-spacing`, `word-spacing` | `display`, `position` |
| `white-space`, `visibility`, `cursor` | `opacity`, `box-shadow` |
| `list-style` | `overflow` |

> 💡 **Логіка проста:** якби `border` успадковувався, то кожне слово в абзаці отримало б рамку. 🙂

### Керування успадкуванням — ключові слова

| Значення | Дія |
|---|---|
| `inherit` | Примусово взяти значення від батька |
| `initial` | Скинути до початкового значення за специфікацією |
| `unset` | `inherit` для успадковуваних властивостей, `initial` — для решти |

```css
button { font: inherit; } /* кнопки не успадковують шрифт за замовчуванням! */
```

> 🔎 У DevTools (панель Styles) успадковані стилі показуються в блоці **«Inherited from …»**.

> 📄 Приклад: [01_inheritance.html](examples/01_inheritance.html)

---

## 2. Шрифт: font-*

| Властивість | Значення | Приклад |
|---|---|---|
| `font-family` | Список шрифтів з **запасним загальним сімейством** | `font-family: "Roboto", Arial, sans-serif;` |
| `font-size` | Розмір | `16px`, `1.25rem`, `120%` |
| `font-weight` | Насиченість | `normal` (=400), `bold` (=700), `100`…`900` |
| `font-style` | Накреслення | `normal`, `italic` |
| `line-height` | Міжрядковий інтервал | `1.5` (без одиниць — рекомендовано), `24px` |

**Загальні сімейства (generic families):** `serif` (із засічками), `sans-serif` (без засічок), `monospace` (моноширинний), `cursive`, `fantasy`, `system-ui`.

> ⚠️ Назви шрифтів із пробілами беріть у лапки: `"Times New Roman"`. Завжди закінчуйте список загальним сімейством — це запасний варіант, якщо жоден шрифт не знайдено.

### Скорочений запис `font`

```css
/* font: [style] [weight] size[/line-height] family; */
p { font: italic 700 18px/1.5 "Roboto", sans-serif; }
```

Обов'язкові частини: **`font-size`** та **`font-family`** (саме в такому порядку, в кінці).

### Підключення веб-шрифтів

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

```css
/* Або власний файл */
@font-face {
  font-family: "MyFont";
  src: url("fonts/myfont.woff2") format("woff2");
  font-weight: 400;
  font-display: swap; /* показати запасний шрифт, поки завантажується основний */
}
```

> 💡 `line-height` краще задавати **числом без одиниць** (`1.5`): тоді він масштабується разом із розміром шрифту в кожного нащадка.

> 📄 Приклад: [06_font.html](examples/06_font.html)

---

## 3. Вирівнювання та відступи тексту

| Властивість | Призначення | Значення |
|---|---|---|
| `text-align` | Горизонтальне вирівнювання **вмісту** блоку | `left`, `right`, `center`, `justify`, `start`, `end` |
| `text-indent` | Відступ першого рядка (абзацний) | `30px`, `2em` |
| `line-height` | Висота рядка | `1.5`, `24px` |
| `letter-spacing` | Відстань між літерами | `2px`, `0.1em` |
| `word-spacing` | Відстань між словами | `10px` |

```css
p {
  text-align: justify;
  text-indent: 50px;
  line-height: 1.6;
  letter-spacing: 1px;
}
```

> ⚠️ `text-align` працює для **блочних** елементів і вирівнює їхній **рядковий вміст**. Задати `text-align: center` для `<span>` — марно: він сам має ширину свого тексту. Щоб відцентрувати `span`, вирівнювання задають **батьківському** блоку.

> 💡 **Трюк:** якщо задати однорядковому тексту `line-height`, рівний висоті блоку, текст вирівняється по вертикалі по центру.

> 📄 Приклади: [02_text-align.html](examples/02_text-align.html), [03_letter-spacing_word-spacing.html](examples/03_letter-spacing_word-spacing.html), [04_text-indent_line-height.html](examples/04_text-indent_line-height.html)

---

## 4. Оформлення тексту

| Властивість | Значення |
|---|---|
| `color` | Колір тексту: `red`, `#ff0000`, `rgb(255 0 0)` |
| `text-decoration` | Лінія: `none`, `underline`, `overline`, `line-through` |
| `text-transform` | Регістр: `uppercase`, `lowercase`, `capitalize`, `none` |

```css
a { text-decoration: none; }           /* прибрати підкреслення посилань */
.old-price { text-decoration: line-through; color: gray; }
.btn { text-transform: uppercase; }     /* у HTML текст звичайний, у браузері — ВЕЛИКИМИ */
```

> 💡 `text-transform: uppercase` кращий за написання ВЕЛИКИМИ в HTML: скрінрідери не читають такий текст «по літерах», а дизайн легко змінити.

> 📄 Приклад: [05_text-decoration_text-transform.html](examples/05_text-decoration_text-transform.html)

---

## 5. Перенесення та пробіли

### `white-space`

Браузер за замовчуванням **згортає** кілька пробілів і переносів в один пробіл. `white-space` змінює цю поведінку:

| Значення | Переносить рядки? | Зберігає пробіли/переноси з коду? |
|---|---|---|
| `normal` (за замовч.) | ✅ | ❌ |
| `nowrap` | ❌ | ❌ |
| `pre` | ❌ | ✅ |
| `pre-wrap` | ✅ | ✅ |
| `pre-line` | ✅ | Лише переноси рядків |

### `word-break` та `overflow-wrap`

```css
.card { word-break: break-all; }       /* розриває слово в будь-якому місці */
.card { overflow-wrap: break-word; }   /* розриває лише довгі слова, що не вміщаються */
```

> 💡 Довгі URL, email та хештеги часто «розривають» мобільну верстку — `overflow-wrap: break-word` рятує.

> 📄 Приклади: [07_white-space.html](examples/07_white-space.html), [08_word-break.html](examples/08_word-break.html)

---

## 6. Тіні та виділення

### `text-shadow`

```css
/* text-shadow: зсув-x зсув-y розмиття колір; */
h1 { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); }

/* Кілька тіней через кому — ефект «неону» */
h2 { text-shadow: 0 0 3px blue, 0 0 7px aqua; }
```

`box-shadow` — схожа властивість, але для **всього блоку**: `box-shadow: 0 4px 10px rgba(0,0,0,.2);`

### `user-select`

```css
.no-copy  { user-select: none; } /* текст не виділяється */
.copy-all { user-select: all; }  /* один клік виділяє весь текст (зручно для промокодів) */
```

> 📄 Приклади: [09_text-shadow.html](examples/09_text-shadow.html), [10_user-select.html](examples/10_user-select.html)

---

## 7. Видимість елементів

Три основні способи «сховати» елемент — і вони **дуже різні**:

| Властивість | Займає місце? | Видно? | Клікабельний? | Читає скрінрідер? | Нащадки можуть показатися? |
|---|---|---|---|---|---|
| `display: none` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `visibility: hidden` | ✅ | ❌ | ❌ | ❌ | ✅ (з `visibility: visible`) |
| `opacity: 0` | ✅ | ❌ | ✅ (!) | ✅ | ❌ |

```css
.display-none      { display: none; }
.visibility-hidden { visibility: hidden; }
.opacity-0         { opacity: 0; }
```

### `opacity`

- Значення від `0` (повністю прозорий) до `1` (непрозорий): `opacity: 0.5` або `.5`.
- Прозорість застосовується до **всього елемента разом із нащадками**. Дочірній елемент з `opacity: 1` все одно буде прозорим, якщо прозорий батько.
- Щоб зробити прозорим **лише фон**, використовуйте `rgba()`: `background: rgba(0, 0, 255, 0.5);` (лекція 9).

### Як сховати візуально, але залишити для скрінрідера?

Популярний клас `.visually-hidden` (наприклад, для підпису до кнопки-іконки):

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

> 📄 Приклади: [11_opacity.html](examples/11_opacity.html), [12_visibility.html](examples/12_visibility.html)

---

## Резюме

- **Успадкування** — можливість нащадка використовувати стилі батька; успадковуються переважно текстові властивості.
- Шрифт налаштовується через `font-*` або скорочено `font`; завжди вказуйте запасне сімейство.
- `text-align` вирівнює вміст **усередині** блоку.
- **Прихований елемент** може займати своє місце (`visibility`, `opacity`) або повністю зникати з потоку (`display: none`).

## Корисні ресурси

- [MDN: Inheritance](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)
- [MDN: Fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals)
- [Google Fonts](https://fonts.google.com/) — безкоштовні шрифти з підтримкою кирилиці (фільтр *Cyrillic*)
- [css.in.ua](https://css.in.ua/css/properties) · [html-css.co.ua](https://html-css.co.ua/)

---

## Контрольні питання

1. Що таке успадкування в CSS? Наведіть приклад.
2. Які властивості успадковуються, а які ні? Чому `border` не успадковується?
3. Що роблять значення `inherit`, `initial` та `unset`?
4. Чому кнопки та поля форм часто мають «інший» шрифт, ніж решта сторінки? Як це виправити?
5. Як правильно записати `font-family`? Навіщо вказувати загальне сімейство в кінці?
6. Які частини скороченої властивості `font` обов'язкові та в якому порядку?
7. Чому `line-height` рекомендують задавати числом без одиниць?
8. Для чого потрібна властивість `text-align`? Чому `text-align: center` не працює для `<span>`?
9. Чим `letter-spacing` відрізняється від `word-spacing`?
10. Як прибрати підкреслення посилань? Як перекреслити текст?
11. Чим `text-transform: uppercase` кращий за набір тексту великими літерами в HTML?
12. Як браузер обробляє кілька пробілів поспіль у HTML? Як змінити цю поведінку?
13. Чим відрізняються значення `pre`, `pre-wrap` і `pre-line` властивості `white-space`?
14. Як не дати довгому URL «зламати» вузький блок?
15. Опишіть синтаксис `text-shadow`. Як задати кілька тіней?
16. Порівняйте `display: none`, `visibility: hidden` та `opacity: 0` (місце, клікабельність, доступність).
17. Чому дочірній елемент з `opacity: 1` усередині батька з `opacity: 0.5` теж напівпрозорий?
18. Як сховати текст візуально, але залишити його доступним для скрінрідерів?

---

## 🎯 Практичне завдання

Зверстайте **«Картку цитати»**:

- шрифт для цитати з Google Fonts (з підтримкою кирилиці) + запасний `serif`;
- цитата курсивом, `line-height: 1.6`, абзацний відступ;
- ім'я автора — `text-transform: uppercase`, `letter-spacing: 2px`, вирівнювання праворуч;
- тінь у заголовка;
- кнопка «Скопіювати» з `user-select: none`, а текст промокоду під цитатою — `user-select: all`;
- блок «Читати далі», прихований через `display: none`, і ще один — через `visibility: hidden`. Поясніть різницю в результаті.
