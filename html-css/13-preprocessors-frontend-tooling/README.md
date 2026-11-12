# Лекція 13. Pug, SCSS/SASS та автоматизація процесів верстки

> **Мета лекції:** перейти від «ручної» верстки до професійного робочого процесу: керувати залежностями через npm, писати HTML і CSS швидше за допомогою препроцесорів Pug і SASS, автоматизувати збірку (Gulp, Webpack, Vite), обробляти CSS (PostCSS), оптимізувати зображення та контролювати якість коду.

📂 Матеріали: [презентація](presentation/index.html) · приклади: [pug-start (Gulp-шаблон)](examples/pug-start/) · [pug-example](examples/pug-example/) · [компоненти Pug](examples/components/) · [SCSS-картка](examples/sass/card.scss) · PDF-довідки з Pug у папці [examples](examples/)

---

## Зміст

1. [Загальна картина](#1-загальна-картина)
2. [npm: менеджер пакетів](#2-npm-менеджер-пакетів)
3. [Semantic Versioning](#3-semantic-versioning)
4. [Шаблонізатори та Pug](#4-шаблонізатори-та-pug)
5. [SASS/SCSS](#5-sassscss)
6. [Чи потрібен SASS у сучасному CSS?](#6-чи-потрібен-sass-у-сучасному-css)
7. [Збирачі: Gulp, Webpack, Vite](#7-збирачі-gulp-webpack-vite)
8. [PostCSS, Autoprefixer, Browserslist](#8-postcss-autoprefixer-browserslist)
9. [Оптимізація зображень](#9-оптимізація-зображень)
10. [Якість коду: Prettier, Stylelint, Git hooks](#10-якість-коду-prettier-stylelint-git-hooks)
11. [Контрольні питання](#контрольні-питання)

---

## 1. Загальна картина

```
src/                                                   dist/
├─ pug/*.pug    ── Pug ──────────────────────────►     *.html
├─ scss/*.scss  ── Sass ── PostCSS ──────────────►     css/style.css
│                        (Autoprefixer, cssnano)
└─ images/*     ── imagemin / sharp ─────────────►     images/*.webp

▲  Gulp / Vite / Webpack запускають усі кроки, стежать за змінами (watch)
│  і піднімають dev-сервер з автооновленням

Prettier + Stylelint ── у редакторі та перед комітом (husky + lint-staged)
```

| Етап | Інструмент | Роль |
|---|---|---|
| Залежності | **npm** | Встановлює інструменти та фіксує їхні версії |
| Препроцесори | **Pug, SASS** | Зручніша мова для написання коду |
| Постпроцесори | **PostCSS** | Підготовка CSS для браузерів (префікси, мініфікація) |
| Оптимізація | **sharp, imagemin, Squoosh** | Легші зображення |
| Збирання | **Vite, Gulp, Webpack** | Запуск усіх кроків, dev-сервер |
| Якість | **Prettier, Stylelint, husky** | Однаковий стиль коду в команді |

> 🧭 **Препроцесор** — інструмент, що перетворює код **з іншої мови** в HTML/CSS (Pug → HTML, SCSS → CSS). **Постпроцесор** — обробляє **вже готовий** CSS (додає префікси, мініфікує).

---

## 2. npm: менеджер пакетів

**npm** (Node Package Manager) — менеджер пакетів для JavaScript/Node.js і найбільший у світі реєстр бібліотек. Встановлюється разом із [Node.js](https://nodejs.org/) (беріть **LTS**-версію).

```bash
node -v   # перевірити версію Node.js
npm -v    # перевірити версію npm
```

### Основні команди

| Команда | Дія |
|---|---|
| `npm init -y` | Створити `package.json` з налаштуваннями за замовчуванням |
| `npm install` / `npm i` | Встановити **всі** залежності з `package.json` |
| `npm i назва` | Встановити пакет (у `dependencies`) |
| `npm i -D назва` | Встановити пакет лише для розробки (у `devDependencies`) |
| `npm i назва@1.2.3` | Встановити конкретну версію |
| `npm i -g назва` | Встановити глобально (доступний у системі) |
| `npm update назва` | Оновити пакет |
| `npm uninstall назва` | Видалити пакет |
| `npm run назва` | Запустити скрипт із `package.json` |
| `npx назва` | Запустити пакет **без** глобального встановлення |
| `npm list -g` | Список глобальних пакетів |
| `npm cache verify` | Перевірити кеш |

### Файли проєкту

```json
{
  "name": "my-site",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "stylelint \"src/**/*.scss\""
  },
  "dependencies": {},
  "devDependencies": {
    "sass": "^1.77.0",
    "vite": "^5.4.0"
  }
}
```

| Файл / папка | Що це | У Git? |
|---|---|---|
| `package.json` | Метадані проєкту, скрипти, перелік залежностей | ✅ |
| `package-lock.json` | **Точні** версії всіх встановлених пакетів (і їхніх залежностей) — щоб у всієї команди було однаково | ✅ |
| `node_modules/` | Самі пакети (сотні мегабайт!) | ❌ Додайте в `.gitignore` |

- **`dependencies`** — потрібні для **роботи** застосунку (бібліотеки, які потрапляють у браузер).
- **`devDependencies`** — потрібні лише для **розробки** (sass, vite, prettier).

> 💡 У `node_modules` ви побачите набагато більше папок, ніж встановлювали: це **транзитивні залежності** — пакети, від яких залежать ваші пакети.

> ⚠️ **Ніколи** не комітьте `node_modules` і не пересилайте його архівом. Достатньо `package.json` + `package-lock.json` — інший розробник виконає `npm install`.

---

## 3. Semantic Versioning

Версії пакетів записуються у форматі **`MAJOR.MINOR.PATCH`** (наприклад, `5.1.3`):

| Частина | Коли змінюється | Сумісність |
|---|---|---|
| **MAJOR** | Несумісні зміни API | ❌ Може зламати ваш код |
| **MINOR** | Новий функціонал | ✅ Зворотно сумісна |
| **PATCH** | Виправлення помилок | ✅ Зворотно сумісна |

| Запис | Дозволені версії | Простими словами |
|---|---|---|
| `^5.1.0` | `>=5.1.0 <6.0.0` | Оновлюй MINOR і PATCH (за замовчуванням у npm) |
| `~5.1.0` | `>=5.1.0 <5.2.0` | Оновлюй лише PATCH |
| `5.1.0` | Лише `5.1.0` | Жодних оновлень |

> 🔗 Поекспериментувати: [npm semver calculator](https://semver.npmjs.com/)

---

## 4. Шаблонізатори та Pug

**Шаблонізатор** (template engine) — інструмент, що **поєднує шаблон із даними** й генерує готовий документ (HTML). Приклади: **Pug**, Handlebars, EJS (JavaScript); Jinja2 (Python); Twig, Blade (PHP).

**Pug** (до 2016 — **Jade**, перейменовано через конфлікт торговельних марок) — шаблонізатор для Node.js з лаконічним синтаксисом на основі **відступів** (як у Python). Браузер Pug не розуміє — його компілюють у HTML локально або на сервері.

**Переваги:** короткий синтаксис, вкладеність без закриваючих тегів, змінні, цикли, умови, міксини, include/extends.

### Синтаксис: теги, класи, атрибути

```pug
doctype html
html(lang="uk")
  head
    meta(charset="utf-8")
    title Мій сайт
  body
    header.header#top
      a.logo(href="/") Logo
    .container
      p Простий текст
      p
        | Багаторядковий текст
        | через вертикальну риску
      a(href="#" class="btn btn--primary" target="_blank") Кнопка
      input(type="checkbox" checked)
```

```html
<!-- Результат -->
<header class="header" id="top"><a class="logo" href="/">Logo</a></header>
<div class="container">
  <p>Простий текст</p>
  …
</div>
```

| Pug | HTML |
|---|---|
| `p Текст` | `<p>Текст</p>` |
| `.card` | `<div class="card">` (тег `div` за замовчуванням) |
| `#main` | `<div id="main">` |
| `a.link(href="#")` | `<a class="link" href="#">` |
| `ul: li Пункт` | Вкладеність в один рядок |
| `// коментар` | `<!-- коментар -->` (потрапляє в HTML) |
| `//- коментар` | Не потрапляє в HTML |

> ⚠️ **Відступи — це синтаксис.** Не змішуйте пробіли й табуляції — Pug видасть помилку. Налаштуйте редактор на 2 пробіли.

### Змінні та інтерполяція

```pug
- const user = { name: 'Олена', age: 20 }
- const title = 'Головна'

h1= title
p Привіт, #{user.name}! Тобі #{user.age}.
a(href=`/users/${user.name}`) Профіль
```

### Умови та case

```pug
if user.age >= 18
  p Доступ дозволено
else
  p Доступ заборонено

case user.role
  when 'admin'
    p Адміністратор
  when 'student'
    p Студент
  default
    p Гість
```

### Цикли

```pug
- const courses = ['HTML', 'CSS', 'JavaScript']
ul
  each course, index in courses
    li #{index + 1}. #{course}
```

### Міксини — «функції» для розмітки

```pug
mixin card(title, text, img)
  article.card
    img.card__img(src=img alt=title)
    h3.card__title= title
    p.card__text= text
    if block
      block

+card('Pug', 'Шаблонізатор', 'img/pug.png')
+card('SASS', 'Препроцесор CSS', 'img/sass.png')
  //- вкладений вміст потрапляє у block міксина
  a.card__btn(href="#") Детальніше
```

### include та extends — макети

```pug
//- layout.pug — базовий макет
doctype html
html(lang="uk")
  head
    meta(charset="utf-8")
    block head
      title Мій сайт
  body
    include includes/header
    main
      block content
    include includes/footer
```

```pug
//- index.pug — сторінка
extends layout

append head
  link(rel="stylesheet" href="css/home.css")

block content
  h1 Головна сторінка
  p Контент сторінки
```

| Директива | Дія |
|---|---|
| `include файл` | Вставити вміст іншого файлу (шапка, футер) |
| `extends макет` | Успадкувати макет |
| `block назва` | «Слот», який сторінка може перевизначити |
| `append` / `prepend` | Додати в кінець / на початок блоку, не замінюючи його |

> 💡 Шапку змінили в одному файлі `header.pug` — і вона оновилась на **всіх** 20 сторінках сайту. У цьому вся сила шаблонізації.

> 📄 Приклади: [components/card.pug](examples/components/card.pug), [components/btn.pug](examples/components/btn.pug), [pug-start/](examples/pug-start/), PDF-довідки *Attributes, Code, Conditionals, Case, Iteration, Mixins, Includes, Template Inheritance, Comments* у папці [examples](examples/).

---

## 5. SASS/SCSS

**SASS** (Syntactically Awesome Style Sheets) — мова стилів, що **компілюється в CSS**. Має два синтаксиси:

| SCSS ✅ (популярніший) | SASS (відступний) |
|---|---|
| `.scss`, фігурні дужки й `;` — як у CSS | `.sass`, без дужок і `;`, на відступах |
| Будь-який CSS — валідний SCSS | Потрібно переписувати |

```scss
// SCSS
.nav {
  ul { margin: 0; }
}
```

```sass
// SASS
.nav
  ul
    margin: 0
```

### Змінні та вкладеність

```scss
$primary: #3b82f6;
$radius: 8px;

.card {
  border-radius: $radius;

  .title { color: $primary; }   // → .card .title

  &:hover { box-shadow: 0 4px 12px rgb(0 0 0 / 20%); } // & — батьківський селектор
}
```

> ⚠️ **Правило трьох рівнів:** не вкладайте глибше 3 рівнів. Інакше отримаєте `.page .content .section .card .title span` — велику специфічність і роздутий CSS.

### БЕМ і батьківський селектор `&`

```scss
.card {
  padding: 16px;

  &__title { font-size: 1.25rem; }   // → .card__title
  &__img   { width: 100%; }          // → .card__img
  &--featured { border: 2px solid gold; } // → .card--featured
}
```

### Міксини та функції

```scss
@use 'sass:math';

@mixin flex-center($dir: row) {
  display: flex;
  flex-direction: $dir;
  justify-content: center;
  align-items: center;
}

@mixin mobile {
  @media (max-width: 767px) { @content; }
}

@function rem($px) {
  @return math.div($px, 16) * 1rem;
}

.hero {
  @include flex-center(column);
  font-size: rem(32);          // → 2rem
  @include mobile { font-size: rem(24); }
}
```

### @extend, цикли, map

```scss
%btn-base { padding: 8px 16px; border-radius: 4px; }  // плейсхолдер — сам у CSS не потрапляє
.btn-primary { @extend %btn-base; background: blue; }

$colors: (primary: #3b82f6, danger: #ef4444, success: #22c55e);

@each $name, $color in $colors {
  .btn--#{$name} { background: $color; }
}

@for $i from 1 through 5 {
  .mt-#{$i} { margin-top: #{$i * 4}px; }
}
```

### Модулі `@use` та `@forward`

`@import` у SASS **застарів** — використовуйте `@use`:

```scss
// abstracts/_index.scss
@forward 'variables';
@forward 'mixins';

// components/_card.scss
@use '../abstracts' as *;
.card { color: $primary; }
```

Файли з `_` на початку (**partials**) самі в CSS не компілюються — лише через `@use`.

### Структура проєкту

```
scss/
├─ abstracts/   _variables.scss, _mixins.scss, _index.scss
├─ base/        _reset.scss, _typography.scss
├─ layout/      _header.scss, _footer.scss
├─ components/  _btn.scss, _card.scss
└─ style.scss   ← єдиний вхідний файл з @use
```

Один файл — один компонент (популярний патерн **7-1**).

### Встановлення та компіляція

```bash
npm install -D sass                          # офіційна реалізація — Dart Sass
npx sass src/scss/style.scss dist/css/style.css
npx sass src/scss:dist/css --watch           # уся папка + стеження
npx sass src/scss/style.scss dist/css/style.min.css --style=compressed --no-source-map
```

> 💡 **Source map** (`style.css.map`) дозволяє DevTools показувати рядок у `.scss`, а не в скомпільованому CSS.
>
> ⚠️ Пакети `node-sass` і LibSass — **застарілі**, не використовуйте їх.

> 📄 Приклад: [sass/card.scss](examples/sass/card.scss)

---

## 6. Чи потрібен SASS у сучасному CSS?

| Можливість | SASS | Сучасний CSS |
|---|---|---|
| Змінні | `$primary` — підставляються при компіляції | `--primary` — живуть у браузері, змінюються в медіазапитах і через JS |
| Вкладеність | ✅ | ✅ CSS Nesting (з 2023 року) |
| Обчислення | `math.div()`, `+ - * /` | `calc()`, `min()`, `max()`, `clamp()` |
| Кольори | `color.adjust()`, `color.mix()` | `color-mix()`, відносні кольори |
| Міксини, функції | ✅ | Поки без широкої підтримки |
| Цикли, умови, map | ✅ | ❌ |
| Об'єднання файлів | `@use` → один файл | `@import` = окремі запити |

```css
/* Сучасний CSS уже вміє */
:root { --primary: #3b82f6; }
.card {
  color: var(--primary);
  &:hover { color: color-mix(in srgb, var(--primary), black 20%); }
}
```

**Висновок:** для невеликих проєктів часто вистачає сучасного CSS + PostCSS. SASS лишається корисним для великих кодових баз і дизайн-систем. Обидва підходи поєднуються: `$змінні` SASS — для налаштувань збірки, `--змінні` CSS — для тем і динаміки.

**Переваги SASS:** зручність, модульність, швидша розробка. **Недоліки:** потрібна компіляція; надмірні вкладеність і `@extend` роздувають CSS; частина можливостей уже є в CSS.

---

## 7. Збирачі: Gulp, Webpack, Vite

### Gulp — таск-раннер

Автоматизує рутинні задачі через **задачі (tasks)** та **плагіни (plugins)**, що обробляють **потік файлів**:

```js
// gulpfile.js
import gulp from 'gulp';
import pug from 'gulp-pug';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

export const html = () =>
  gulp.src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream());

export const styles = () =>
  gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(bs.stream());

export function serve() {
  bs.init({ server: 'dist' });
  gulp.watch('src/pug/**/*.pug', html);
  gulp.watch('src/scss/**/*.scss', styles);
}

export default gulp.series(gulp.parallel(html, styles), serve);
```

- `gulp.src` → `.pipe(плагін)` → `gulp.dest` — потік файлів;
- `series` — послідовно, `parallel` — паралельно, `watch` — перезапуск при змінах;
- запуск: `npx gulp`. Готовий шаблон: [examples/pug-start](examples/pug-start/).

### Webpack — збирач модулів (bundler)

Починає з **точки входу** (entry), будує **граф залежностей** (JS, CSS, зображення) і пакує все в **bundle**.

- **Loaders** — перетворюють файли (SCSS → CSS). Застосовуються **знизу вгору**: `sass-loader → postcss-loader → css-loader → style-loader`.
- **Plugins** — генерація HTML, мініфікація, винесення CSS.

### Vite — збирач нового покоління ⚡

Створений Еваном Ю (автором Vue). Використовує **нативні ES-модулі** браузера → миттєвий старт і надшвидкий **HMR** (Hot Module Replacement — оновлення лише змінених модулів без перезавантаження).

```bash
npm create vite@latest my-site   # шаблон: Vanilla, JavaScript
cd my-site
npm install
npm install -D sass              # SCSS — без жодних налаштувань
npm run dev                      # dev-сервер з HMR
npm run build                    # продакшн-збірка в dist/
npm run preview                  # перегляд збірки
```

### Порівняння

| | **Vite** | **Gulp** | **Webpack** |
|---|---|---|---|
| Тип | Збирач + dev-сервер | Таск-раннер | Bundler |
| Швидкість старту | ⚡ Дуже швидко | Залежить від задач | 🐢 Повільно |
| HMR | ⚡ Надшвидкий | Лише live reload (BrowserSync) | Є, повільніший |
| Конфігурація | Мінімальна | Середня | Складна |
| Ідеально для | Сучасних SPA і сайтів | Копіювання файлів, Sass, оптимізація зображень | Великих enterprise-SPA |

> 💡 **Що обрати для нового проєкту?** Майже завжди — **Vite**. Gulp і Webpack ви зустрінете в існуючих проєктах.

---

## 8. PostCSS, Autoprefixer, Browserslist

**PostCSS** — інструмент для **трансформації CSS за допомогою JS-плагінів**. Сам по собі нічого не робить — усе через плагіни.

| Плагін | Що робить |
|---|---|
| **Autoprefixer** | Додає вендорні префікси (`-webkit-`, `-moz-`) там, де потрібно |
| **cssnano** | Мініфікує CSS |
| **postcss-preset-env** | Дозволяє писати майбутній CSS сьогодні |

```js
// postcss.config.js
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    autoprefixer(),
    ...(process.env.NODE_ENV === 'production' ? [cssnano()] : []),
  ],
};
```

### Autoprefixer: до і після

```css
/* Ви пишете */
.box { user-select: none; }

/* Отримуєте */
.box {
  -webkit-user-select: none;
  user-select: none;
}
```

### Browserslist — які браузери підтримуємо

```json
// package.json
"browserslist": [
  "> 0.5%",
  "last 2 versions",
  "not dead"
]
```

Цей список читають Autoprefixer, Babel та інші інструменти. Перевірити запит: [browsersl.ist](https://browsersl.ist/).

> 💡 Vite підтримує PostCSS **з коробки** — достатньо створити `postcss.config.js`.

---

## 9. Оптимізація зображень

Зображення — зазвичай **найважча** частина сторінки. Легші картинки = швидше завантаження = кращі метрики (LCP) і SEO.

### Формати

| Формат | Для чого | Особливості |
|---|---|---|
| **JPEG** | Фотографії | Стиснення з втратами, без прозорості |
| **PNG** | Графіка з прозорістю, скріншоти | Без втрат, але важкий |
| **WebP** ✅ | Універсальний | На 25–35% легший за JPEG, прозорість, анімація |
| **AVIF** ✅ | Універсальний | Ще легший за WebP, повільніше кодується |
| **SVG** ✅ | Іконки, логотипи, ілюстрації | Векторний, масштабується без втрат |

### Адаптивні зображення: srcset та sizes

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Опис фото"
  width="800" height="600"
  loading="lazy">
```

Браузер сам обирає найменший файл, достатній для екрана й щільності пікселів.

### `<picture>` з сучасними форматами

```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Опис фото" width="800" height="600" loading="lazy">
</picture>
```

### Автоматизація

- вручну: [Squoosh](https://squoosh.app/), TinyPNG;
- у збірці: `sharp`, `imagemin`, `vite-plugin-image-optimizer`, `gulp-imagemin`.

> 💡 `loading="lazy"` — для зображень **нижче першого екрана**. Для головного банера навпаки — `fetchpriority="high"`.

---

## 10. Якість коду: Prettier, Stylelint, Git hooks

### Prettier — форматер

Автоматично форматує код (відступи, лапки, переноси) за єдиними правилами. Більше жодних суперечок «таби чи пробіли» в команді.

```bash
npm i -D prettier
npx prettier --write "src/**/*.{html,scss,js}"
```

```json
// .prettierrc
{ "singleQuote": true, "printWidth": 100 }
```

### Stylelint — лінтер для CSS/SCSS

Знаходить **помилки** та порушення домовленостей: невідомі властивості, дублікати селекторів, порожні блоки, неправильні назви класів, надмірну вкладеність.

```bash
npm i -D stylelint stylelint-config-standard-scss
npx stylelint "src/**/*.scss" --fix
```

```json
// .stylelintrc.json
{ "extends": ["stylelint-config-standard-scss"] }
```

> **Prettier** відповідає за **вигляд** коду, **Stylelint** — за **правильність**. Використовуйте обидва.

### Git hooks — перевірка перед комітом

**Git hook** — скрипт, який Git запускає автоматично на певній події (`pre-commit`, `commit-msg`, `pre-push`).

| Інструмент | Роль |
|---|---|
| **husky** | Зручно встановлює Git hooks через npm |
| **lint-staged** | Запускає лінтери **лише для змінених (staged) файлів** — швидко |
| **commitlint** | Перевіряє повідомлення комітів (стандарт [Conventional Commits](https://www.conventionalcommits.org/)) |
| **Lefthook** | Альтернатива husky (швидкий, один конфіг) |
| **pre-commit** | Фреймворк хуків (Python-екосистема, але працює з будь-якими мовами) |

```bash
npm i -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

```json
// package.json
"lint-staged": {
  "*.scss": ["stylelint --fix", "prettier --write"],
  "*.{html,js}": "prettier --write"
}
```

Тепер при `git commit` код автоматично відформатується й перевіриться, а коміт з помилками **не пройде**.

**Conventional Commits** — формат повідомлень: `feat: додати картку товару`, `fix: виправити відступ у шапці`, `docs: оновити README`.

> ⚠️ Хуки можна обійти (`git commit --no-verify`), тому в командах ту саму перевірку дублюють у **CI**. Хуки мають бути **швидкими** — інакше їх почнуть вимикати.

---

## Корисні ресурси

- [Документація npm](https://docs.npmjs.com/) · [About Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning)
- [Pug: Getting Started](https://pugjs.org/api/getting-started.html)
- [Офіційна документація Sass](https://sass-lang.com/documentation/) · [Sass Guidelines](https://sass-guidelin.es/)
- [Gulp Quick Start](https://gulpjs.com/docs/en/getting-started/quick-start) · [Vite](https://vite.dev/) · [Webpack](https://webpack.js.org/)
- [PostCSS](https://postcss.org/) · [Autoprefixer](https://github.com/postcss/autoprefixer) · [Browserslist](https://browsersl.ist/)
- [web.dev: Learn Images](https://web.dev/learn/images) · [Squoosh](https://squoosh.app/)
- [Prettier](https://prettier.io/) · [Stylelint](https://stylelint.io/)
- [Pro Git: Гаки Git](https://git-scm.com/book/uk/v2/Налаштування-Git-Гаки-Git) · [husky](https://typicode.github.io/husky/) · [lint-staged](https://github.com/lint-staged/lint-staged) · [commitlint](https://commitlint.js.org/)

---

## Контрольні питання

1. Що таке npm і для чого він потрібен? Як перевірити, що Node.js і npm встановлено?
2. Чим відрізняються `dependencies` та `devDependencies`? Як встановити пакет у кожну з груп?
3. Яку роль виконує `package-lock.json`? Чому `node_modules` не додають у Git?
4. Що таке транзитивні залежності?
5. Для чого потрібна команда `npx`?
6. Розшифруйте формат `MAJOR.MINOR.PATCH`. Які версії дозволяють записи `^2.3.1`, `~2.3.1` та `2.3.1`?
7. Що таке шаблонізатор? Наведіть приклади шаблонізаторів для різних мов.
8. Чому Jade перейменували на Pug?
9. Як у Pug задається вкладеність? Що станеться, якщо змішати пробіли й табуляції?
10. Як у Pug записати `<a class="btn" href="#">Текст</a>`?
11. Чим `//` відрізняється від `//-` у Pug?
12. Що таке міксин у Pug? Як передати в нього вміст через `block`?
13. Чим відрізняються `include` і `extends`? Для чого `append`/`prepend`?
14. Чим SCSS відрізняється від SASS-синтаксису?
15. Що робить символ `&` у SCSS? Як за його допомогою писати БЕМ-класи?
16. Чим міксин відрізняється від функції в SASS? А від `@extend`?
17. Чому `@import` у SASS застарів і чим його замінити? Що таке partials?
18. Чим змінні SASS (`$var`) відрізняються від CSS custom properties (`--var`)?
19. Які можливості SASS уже з'явилися в чистому CSS, а яких ще немає?
20. Чим таск-раннер (Gulp) відрізняється від bundler-а (Webpack)?
21. Чому Vite запускається так швидко? Що таке HMR?
22. Що таке PostCSS? Чим постпроцесор відрізняється від препроцесора?
23. Що робить Autoprefixer і звідки він знає, для яких браузерів додавати префікси?
24. Порівняйте формати JPEG, PNG, WebP, AVIF, SVG. Коли використовувати кожен?
25. Як працюють атрибути `srcset` і `sizes`?
26. Чим Prettier відрізняється від Stylelint?
27. Що таке Git hooks? Навіщо поєднувати husky з lint-staged?
28. Що таке Conventional Commits? Наведіть три приклади повідомлень.

---

## 🎯 Практичне завдання (з лекції)

Зверстайте сторінку, використовуючи **всі інструменти лекції**. Основа — стартовий шаблон [Vite Pug Template](https://github.com/Computer-Science-Department-ChNU/vite-pug-scss-template/tree/main).

- **Pug:** макет `layout.pug` з `block`, шапка й футер через `include`, міксин `card`, дані карток — масив об'єктів, вивід через `each`.
- **SCSS:** структура папок з `@use` / `@forward`, змінні, міксин для медіазапитів, БЕМ-класи через `&__` і `&--`.
- **PostCSS:** Autoprefixer + Browserslist, cssnano для продакшн-збірки.
- **Зображення:** WebP/AVIF, `<picture>`, `srcset`, `loading="lazy"` для карток.
- **Якість коду:** Prettier і Stylelint, npm-скрипти `format` і `lint`, pre-commit хук через husky + lint-staged (за бажанням — commitlint).

**Результат:** репозиторій без `node_modules` і `dist` (додати в `.gitignore`); `npm install` + `npm run build` збирають робочу сторінку; `npm run lint` проходить без помилок.
