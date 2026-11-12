# Лекція 9. Кольори та фони в CSS

> **Мета лекції:** розібратися з форматами кольорів у CSS, навчитися керувати прозорістю та повністю опанувати фонові зображення: повторення, розмір, позицію, прокрутку, область відображення і кілька фонів одночасно.

📂 Матеріали: [приклади](examples/) (презентації до цієї теми немає — конспект побудовано на прикладах)

---

## Зміст

1. [Формати кольорів](#1-формати-кольорів)
2. [Прозорість: opacity vs rgba](#2-прозорість-opacity-vs-rgba)
3. [background-color та background-image](#3-background-color-та-background-image)
4. [background-repeat](#4-background-repeat)
5. [background-size](#5-background-size)
6. [background-position](#6-background-position)
7. [background-attachment](#7-background-attachment)
8. [background-clip та background-origin](#8-background-clip-та-background-origin)
9. [Кілька фонів одночасно](#9-кілька-фонів-одночасно)
10. [Скорочений запис background](#10-скорочений-запис-background)
11. [Бонус: градієнти](#11-бонус-градієнти)
12. [Контрольні питання](#контрольні-питання)

---

## 1. Формати кольорів

| Формат | Приклад | Пояснення |
|---|---|---|
| **Ключове слово** | `red`, `tomato`, `transparent`, `currentColor` | ~148 іменованих кольорів |
| **HEX** | `#ff0000`, `#f00`, `#ff000080` | `#RRGGBB` у 16-ковій системі; скорочено `#RGB`; 8 цифр — з прозорістю |
| **RGB** | `rgb(255, 0, 0)` / `rgb(255 0 0)` | Червоний, зелений, синій: 0–255 |
| **RGBA** | `rgba(255, 0, 0, 0.5)` / `rgb(255 0 0 / 50%)` | + альфа-канал (прозорість) 0–1 |
| **HSL** | `hsl(0, 100%, 50%)` | Hue (тон, 0–360°), Saturation (насиченість), Lightness (світлота) |
| **HSLA** | `hsla(0, 100%, 50%, 0.5)` | + прозорість |

### Колірне коло HSL 🎨

```
          0° / 360° червоний
        300° пурпурний   60° жовтий
       240° синій          120° зелений
               180° блакитний
```

> 💡 **HSL — найзручніший для людей.** Хочете темніший варіант того ж кольору для `:hover`? Просто зменште Lightness: `hsl(220, 80%, 50%)` → `hsl(220, 80%, 40%)`. З HEX так не вийде «на око».

> 💡 `currentColor` — поточне значення `color` елемента. Зручно для рамок та SVG-іконок, які мають бути «в колір тексту».

> 📄 Приклад: [01_Палітра кольорів.html](<examples/01_Палітра кольорів.html>)

---

## 2. Прозорість: opacity vs rgba

```css
.block1 {
  background: rgb(35, 180, 35);
  opacity: 0.5;                          /* прозорий ВЕСЬ блок: фон, текст, діти */
}
.block2 {
  background-color: rgba(35, 180, 35, 0.5); /* прозорий ЛИШЕ фон, текст чіткий ✅ */
}
```

| | `opacity` | `rgba()` / `hsla()` |
|---|---|---|
| Що стає прозорим | Увесь елемент + усі нащадки | Лише конкретна властивість (фон, колір, рамка) |
| Текст | Теж прозорий | Залишається чітким |
| Типове застосування | Ефекти появи/зникнення, неактивні елементи | Напівпрозорі підкладки, оверлеї на фото |

> 📄 Приклад: [02_opacity и rgba().html](<examples/02_opacity и rgba().html>)

---

## 3. background-color та background-image

```css
div {
  width: 200px;
  height: 200px;                          /* ⚠️ без висоти порожній блок має 0px — фону не видно! */
  background-color: lightgray;            /* колір під картинкою (і запасний варіант) */
  background-image: url('img/mini.png');  /* шлях — відносно CSS-файлу! */
}
```

- Фонове зображення — **декоративне**: його не бачать скрінрідери, у нього немає `alt`. Якщо картинка несе зміст (фото товару) — використовуйте `<img>`.
- Фон відображається під **вмістом, padding і border** (за замовчуванням).
- `background-color` малюється **під** `background-image`. Задавайте його завжди: поки картинка завантажується, текст на фоні має бути читабельним.

> ⚠️ Шлях у `url()` рахується **від CSS-файлу**, а не від HTML! Якщо CSS лежить у `css/style.css`, а картинка в `img/`, пишіть `url('../img/bg.jpg')`.

> 📄 Приклад: [03_Властивість background-image.html](<examples/03_Властивість background-image.html>)

---

## 4. background-repeat

| Значення | Поведінка |
|---|---|
| `repeat` (за замовч.) | Плиткою по обох осях |
| `no-repeat` | Одне зображення |
| `repeat-x` | Лише по горизонталі |
| `repeat-y` | Лише по вертикалі |
| `space` | Плиткою без обрізання, проміжки між плитками |
| `round` | Плиткою, масштабуючи так, щоб вмістилася ціла кількість |

> 📄 Приклад: [04_Властивість background-repeat.html](<examples/04_Властивість background-repeat.html>)

---

## 5. background-size

| Значення | Поведінка |
|---|---|
| `auto` (за замовч.) | Оригінальний розмір |
| `133px 133px` | Точний розмір: ширина висота |
| `50% auto` | Відносно розміру блоку |
| `100% 100%` | Розтягнути на весь блок (⚠️ спотворює пропорції) |
| `cover` | **Заповнити** весь блок зі збереженням пропорцій (частина може обрізатися) |
| `contain` | **Вмістити** повністю зі збереженням пропорцій (можуть лишитися порожні поля) |

```
cover:    ┌──────────┐        contain:  ┌──────────┐
          │██████████│                  │  ██████  │
          │██████████│ (краї обрізано)  │  ██████  │ (поля по боках)
          └──────────┘                  └──────────┘
```

> 💡 Для **hero-банерів** майже завжди: `background-size: cover; background-position: center;`

> 📄 Приклад: [05_Властивість background-size.html](<examples/05_Властивість background-size.html>)

---

## 6. background-position

```css
background-position: 30px 50px;   /* x y від лівого верхнього кута */
background-position: top right;   /* ключові слова */
background-position: center;      /* = 50% 50% */
background-position: 50% -25%;    /* відсотки, можна від'ємні */
background-position: right 20px bottom 10px; /* відступ від правого й нижнього краю */
```

| Ключове слово | Відсоток |
|---|---|
| `left` / `top` | 0% |
| `center` | 50% |
| `right` / `bottom` | 100% |

> ℹ️ Відсотки працюють «хитро»: `50% 50%` суміщає **центр картинки** з **центром блоку**, а `100% 100%` — правий нижній кут картинки з правим нижнім кутом блоку.

> 📄 Приклад: [06_Властивість background-position.html](<examples/06_Властивість background-position.html>)

---

## 7. background-attachment

Поведінка фону під час прокручування:

| Значення | Поведінка |
|---|---|
| `scroll` (за замовч.) | Фон рухається разом зі сторінкою, але «прикріплений» до самого елемента (при внутрішньому скролі елемента — нерухомий) |
| `fixed` | Фон зафіксовано відносно **вікна браузера** — ефект «паралакса» |
| `local` | Фон прокручується разом із **вмістом** елемента (помітно в блоках з `overflow: auto`) |

```css
.parallax {
  background-image: url('img/mountains.jpg');
  background-attachment: fixed;
  background-size: cover;
}
```

> ⚠️ `background-attachment: fixed` погано підтримується на мобільних (особливо iOS) і може гальмувати прокручування.

> 📄 Приклад: [07_Властивість background-attachment.html](<examples/07_Властивість background-attachment.html>)

---

## 8. background-clip та background-origin

**`background-clip`** — до якої межі **обрізається** фон:

| Значення | Фон видно… |
|---|---|
| `border-box` (за замовч.) | Під рамкою, padding і вмістом |
| `padding-box` | До внутрішнього краю рамки |
| `content-box` | Лише під вмістом |
| `text` | Лише «всередині» літер тексту ✨ |

**`background-origin`** — від якої межі **відраховується позиція** фонового зображення (`padding-box` за замовч., `border-box`, `content-box`).

### Трюк: градієнтний текст

```css
.gradient-text {
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

> 📄 Приклад: [08_Властивість background-clip.html](<examples/08_Властивість background-clip.html>)

---

## 9. Кілька фонів одночасно

Фони перелічуються **через кому**. **Перший у списку — зверху**:

```css
body {
  background-image: url(img/JS.png), url(img/HTML5.png);
  background-size: 200px 200px, 600px 600px;   /* для кожного фону — своє значення */
  background-position: top left, center;
  background-repeat: no-repeat;                /* одне значення — для всіх */
}
```

> 💡 Класичний прийом — **затемнення фото** під текстом:
>
> ```css
> .hero {
>   background:
>     linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),
>     url('img/hero.jpg') center / cover no-repeat;
> }
> ```

> 📄 Приклад: [09_Мульти фон.html](<examples/09_Мульти фон.html>)

---

## 10. Скорочений запис background

```css
/* background: color image position / size repeat attachment; */
.hero {
  background: #333 url('img/hero.jpg') center / cover no-repeat fixed;
}
```

- Порядок здебільшого довільний, але `size` пишеться **лише після `position` через `/`**.
- ⚠️ Скорочення **скидає** всі не вказані підвластивості до значень за замовчуванням. Якщо раніше задали `background-size`, а потім написали `background: red;` — `size` скинеться.

---

## 11. Бонус: градієнти

Градієнт — це **зображення**, тому задається через `background-image` (або `background`).

```css
/* Лінійний */
background: linear-gradient(to right, #4facfe, #00f2fe);
background: linear-gradient(135deg, tomato 0%, gold 50%, seagreen 100%);

/* Радіальний */
background: radial-gradient(circle at center, white, steelblue);

/* Конічний — наприклад, кругова діаграма */
background: conic-gradient(tomato 0 40%, gold 40% 70%, seagreen 70% 100%);

/* Повторюваний — «смужки» */
background: repeating-linear-gradient(45deg, #eee 0 10px, #ddd 10px 20px);
```

> 🎨 Генератори: [cssgradient.io](https://cssgradient.io/), [uiGradients](https://uigradients.com/)

---

## Корисні ресурси

- [MDN: Backgrounds and borders](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders)
- [MDN: color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
- [HSL Color Picker](https://hslpicker.com/)
- [Coolors](https://coolors.co/) — генератор палітр
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — перевірка контрасту тексту й фону

---

## Контрольні питання

1. Назвіть п'ять форматів запису кольору в CSS. Наведіть приклад червоного кольору в кожному.
2. Що означають компоненти H, S, L у форматі HSL? Чим HSL зручніший за HEX?
3. Що таке альфа-канал? Як записати напівпрозорий білий колір трьома способами?
4. Чим відрізняється `opacity: 0.5` від `background-color: rgba(…, 0.5)`?
5. Чому фонового зображення не видно в порожньому `<div>` без заданої висоти?
6. Відносно якого файлу рахується шлях у `url()` в CSS?
7. Коли використовувати `background-image`, а коли `<img>`?
8. Які значення має `background-repeat`?
9. Чим відрізняються `background-size: cover` та `contain`? Коли використовувати кожне?
10. Як розмістити фонове зображення в правому нижньому куті з відступом 20px від країв?
11. Які значення має `background-attachment`? Як створити ефект паралакса?
12. Що робить `background-clip`? Як створити градієнтний текст?
13. Як задати кілька фонових зображень? Яке з них буде зверху?
14. Як затемнити фонову фотографію, щоб текст на ній був читабельним?
15. Які «пастки» має скорочена властивість `background`?
16. Які види градієнтів існують у CSS?

---

## 🎯 Практичне завдання

Зверстайте **hero-банер** для сайту туристичної агенції:

1. Висота 100vh (на весь екран), фото гір на фоні — `cover`, по центру.
2. Затемнення через градієнт поверх фото (мультифон).
3. Заголовок із градієнтним текстом (`background-clip: text`).
4. Кнопка: фон у форматі HSL, при `:hover` — темніша на 10% (змінюється лише L).
5. Напівпрозора «скляна» плашка з текстом: `rgba`-фон, текст залишається чітким.
6. Нижче банера — секція з ефектом паралакса (`background-attachment: fixed`).
