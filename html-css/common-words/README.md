# Слова, які часто використовуються в CSS-класах

## Зображення

`image`, `img`, `picture`, `pic` — картинка

`icon` — іконка

`logo` — логотип

`userpic`, `avatar` — юзерпік, маленька картинка користувача

`thumbnail`, `thumb` — мініатюра, зменшене зображення

## Текст

`title`, `subject`, `heading`, `headline`, `caption` — заголовок

`subtitle` — підзаголовок

`slogan` — слоган

`lead`, `tagline` — лід-абзац в тексті (абзац під заголовком, який має на меті зацікавити та спонукати користувача
читати далі)

`text` — текстовий контент

`desc`, `description` — опис, варіант текстового контенту

`excerpt` —уривок тексту зазвичай використовується перед посиланням «Читати далі...»

`quote`, `blockquote` — цитата

`snippet` — приклад кода

`link` — посилання

`copyright`, `copy` — копірайт

## Списки

`list`, `items` — список

`item` — елемент списку

## Блоки

`page` - кореневий елемент сторінки

`header` - шапка (сторінки або елемента)

`footer` - підвал (сторінки або елемента)

`section` - розділ контенту (один із декількох)

`main`, `body` - основна частина (сторінки або елемента)

`content` - вміст елемента

`sidebar` - бічна колонка (сторінки або елемента)

`aside` - блок із додатковою інформацією

`widget` - віджет, наприклад, у бічній колонці

## Лейаут

`wrapper`, `wrap` - обгортка, зазвичай зовнішня

`inner` - внутрішня обгортка

`container`, `holder`, `box` - контейнер

`grid` - розкладка (сторінки або елемента) у вигляді сітки (зазвичай містить у собі `row` і `col`)

`row` - контейнер у вигляді рядка

`col`, `column` - контейнер у вигляді стовпця

## Елементи керування

`button`, `btn` - кнопка, наприклад, для відправлення форми

`control` - елемент керування, наприклад, стрілки «Вперед/назад» у фотогалереї, кнопки керування слайдером

`dropdown` - список, що випадає

## Медіавирази

`phone`, `mobile` - мобільні пристрої

`phablet` - телефони з великим екраном

`tablet` - планшети

`notebook`, `laptop` - ноутбуки

`desktop` - настільні комп'ютери

## Розміри

`tiny`, `xs` - маленький, крихітний

`small`, `sm` - невеликий

`medium`, `base` - середній

`big`, `large`, `lg` - великий

`huge`, `xl` - величезний

`narrow` - вузький

`wide` - широкий

## Різне

`search` - пошук

`socials` - блок іконок соцмереж

`advertisement`, `adv`, `commercial`, `promo` - рекламний блок (ріжуться Адблоком, не рекомендується використовувати
такі
класи для блоків із внутрішньою рекламою)

`features`, `benefits` - список основних особливостей товару, послуги

`slider`, `carousel` - слайдер, інтерактивний елемент із прокруткою вмісту

`pagination` - посторінкова навігація

`user`, `author` - користувач, автор запису або коментаря

`meta` - блок із додатковою інформацією, наприклад, блок тегів і дати в пості

`cart`, `basket` - кошик

`breadcrumbs` - навігаційний ланцюжок, «хлібні крихти»

`more`, `all` - посилання на повну інформацію

`modal` - модальне (діалогове) вікно

`popup` - спливаюче вікно

`tooltip`, `tip` - спливаюче підказки

`preview` - анонс, уривок, наприклад новини або поста, може складатися із заголовка, опису та картинки. Передбачається
посилання на повну версію

`overlay`,`backdrop`, `paranja` - шар, що перекриває, наприклад, для затемнення зображень або створення модальних вікон

## Стани

`active`, `current` - активний елемент, наприклад, поточний пункт меню

`visible` - видимий елемент

`hidden` - прихований елемент

`error` - статус помилки

`warning` - статус попередження

`success` - статус успішного виконання завдання

`pending` - стан очікування, наприклад, перед зміною статусу на error або success

## Приклади використання

### Простий список

```html

<ul class="list">
    <li class="item">Перше</li>
    <li class="item">Друге</li>
    <li class="item">Третє</li>
</ul>
```

### Картинка користувача (юзерпік)

```html

<div class="user">
    <img class="user__img" src="userpic.png" alt="Пес Патрон">
    <a class="user__link" href="#">Пес Патрон</a>
</div>
```

### Галерея

```html

<div class="gallery">
    <ul class="gallery__list">
        <li class="gallery__item">
            <img class="gallery__img" src="flowers.jpg" alt="Цвітемо як востаннє">
        </li>
        <li class="gallery__item">
            <img class="gallery__img" src="trees.jpg" alt="Парк Т.Г. Шевченко">
        </li>
    </ul>
</div>
```

### Навігація

```html

<nav class="nav">
    <a class="nav__link nav__link--active">Головна</a>
    <a class="nav__link" href="#">Про нас</a>
    <a class="nav__link" href="#">Каталог</a>
    <a class="nav__link" href="#">Розпродаж</a>
    <a class="nav__link" href="#">Контакти</a>
</nav>
```

```html

<nav class="nav">
    <ul class="nav__list">
        <li class="nav__item nav__item--current">
            <a class="nav__link">Головна</a>
        </li>
        <li class="nav__item">
            <a class="nav__link" href="#">Блог</a>
        </li>
        <li class="nav__item">
            <a class="nav__link" href="#">Галерея</a>
        </li>
        <li class="nav__item">
            <a class="nav__link" href="#">Контакти</a>
        </li>
    </ul>
</nav>
```

### Віджет у бічній колонці (sidebar widget)

```html

<div class="widget">
    <h4 class="widget__title">Вирощуємо желе</h4>

    <div class="widget__content">
        <p>Щоб виростити товариське дружелюбне желе,
            нам знадобиться рулон поролону, два кілограми цукру,
            три яйця і пів чайної чашки ацетону.</p>

        <a class="widget__link" href="#">Не читати далі...</a>
    </div>
</div>
```

### Блок новин

```html

<div class="news">
    <h3 class="news__title">Вчорашні новини</h3>

    <ul class="news__list">
        <!-- до класу елемента додаємо клас блоку,
            щоб створити новий простір імен -->
        <li class="news__item item-news">
            <h4 class="item-news__title">Змагання серед різних видів спорту</h4>
            <div class="item-news__text">
                <p>Перемогла команда "Вуйки"</p>

                <a href="#" class="item-news__link">Читати далі</a>
            </div>
        </li>

        <li class="news__item item-news">
            <h4 class="item-news__title">Учені уточнили роль напильнику в догляді за нігтями</h4>
            <div class="item-news__text">
                <p>Британські вчені високо оцінили внесок напилка у відрощування півтораметрових нігтів.</p>

                <a href="#" class="item-news__link">Не читати далі</a>
            </div>
        </li>
    </ul>
</div>
```

### Стаття або пост у блозі (простий варіант)

```html

<article class="article">
    <h3 class="article__title">Намацуємо чакри у пучка петрушки</h3>
    <time class="article__datetime">11 квітня, 10:87</time>

    <div class="article__author author-article">
        <img class="author-article__img" src="userpic.png" alt="Клешня Андріївна">
        <a class="author-article__link" href="#">Клешня Андріївна Згорблена</a>
        <div class="author-article__desc">Наш експерт по чакрах</div>
    </div>

    <div class="article__content">
        Сходіть на ринок і купіть у бабусь пучок петрушки грам на 100.
        Як слід переберіть, очистіть від жуків і гусениць. Жуків віддайте погратися
        котові, гусениць поселіть у горщик із кактусами, нехай одна буде Джоном,
        друга Біллі, а у вас у горщику тепер буде Дикий Захід. Поверніться
        до пучка петрушки. Лагідно погляньте на нього і як слід почухайте
        за вухом, можна собі або коту. Перев'яжіть атласною стрічкою,
        неодмінно зав'яжіть бант. Вітаємо! Тепер у вас є повністю
        одомашнений пучок петрушки, який весело бігатиме за вами
        по п'ятах і пророщуватиме своє насіння у ваших капцях.
    </div>
</article>
```

### Стаття або пост у блозі (складний варіант)

```html

<article class="entry">
    <header class="entry__header">
        <h3 class="entry__title title-entry">
            <a class="title-entry__link" href="#">Гумові качечки як спосіб самопізнання</a>
        </h3>

        <time class="entry__datetime">31 травня, 10:87</time>
    </header>

    <div class="entry__author author-entry">
        <img class="author-entry__img" src="userpic.png" alt="Василина Сергійович">

        <a class="author-entry__link" href="#">Василина Сергійович</a>
    </div>

    <div class="entry__content">
        Дістаньте з горища коробку з півсотнею гумових качечок,
        що залишилися після святкування нового року. З качечок
        і палаючих свічок викладіть пентаграму на підлозі кімнати.
        Сядьте посередині в позу лотоса, у кожну руку візьміть
        по німецько-бразильському словнику, прокашляйтеся, наберіть
        повні груди повітря і голосно та впевнено,
        з повною самовіддачею скажіть «Кря!»
    </div>

    <div class="entry__tags tags-entry">
        <h4 class="tags-entry__title">Теги</h4>

        <ul class="tags-entry__list">
            <li class="tags-entry__item">
                <a class="tags-entry__link" href="#">тег 1</a>
            </li>
            <li class="tags-entry__item">
                <a class="tags-entry__link" href="#">тег 2</a>
            </li>
            <li class="tags-entry__item">
                <a class="tags-entry__link" href="#">тег 3</a>
            </li>
        </ul>
    </div>

    <div class="entry__actions actions-entry">
        <ul class="actions-entry__list">
            <li class="actions-entry__item actions-entry__item--read">
                <a class="actions-entry__link" href="#">238 відповідей</a>
            </li>
            <li class="actions-entry__item actions-entry__item--write">
                <a class="actions-entry__link" href="#">Написати нам</a>
            </li>
            <li class="actions-entry__item actions-entry__item--share">
                <a class="actions-entry__link" href="#">Поділитися у соцмережах</a>
            </li>
        </ul>
    </div>
</article>
```
