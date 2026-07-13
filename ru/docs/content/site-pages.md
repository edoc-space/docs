---
title: Страницы сайта
description: Как создавать отдельные страницы сайта, добавлять их в меню и использовать MDX-блоки.
sidebar_label: Страницы сайта
sidebar_position: 2
---

# Страницы сайта

Страницы сайта - это материалы вне основного раздела `/ru/docs` в русской версии. Они нужны для главной страницы, описания проекта, страницы плагинов, changelog или любых разделов, которые должны жить в верхнем меню.

Такие файлы лежат в:

```text
local/storage/edoc/ru/pages
```

## Markdown или MDX

Для обычного текста достаточно `.md`:

```text
pages/about.md
```

Если на странице нужны React-компоненты, используйте `.mdx`:

```text
pages/index.mdx
```

Простое правило:

- `.md` - текст, заголовки, списки, ссылки, изображения;
- `.mdx` - все то же самое плюс компоненты вроде `Hero`, `Grid`, `Feature`, `OpenApi`, `Changelog`.

Не нужно начинать с MDX, если страница состоит из обычного текста.

## Front matter

В начале страницы можно указать настройки:

```markdown
---
title: О проекте
description: Коротко о проекте и его документации.
slug: about
container: constrained
nav_label: О проекте
nav_position: 10
---
```

Эта часть называется front matter. Она не отображается как текст страницы, а помогает E-Doc понять, как страницу назвать и где ее показать.

## Ширина контейнера страницы

Страница сайта может выбрать режим контейнера через `container`:

```yaml
container: constrained
```

Доступные значения:

- `fluid` - контейнер занимает всю доступную ширину страницы. Подходит для главных страниц, help center, таблиц, сеток, dashboards и страниц с широкими MDX-компонентами.
- `constrained` - стандартный ограниченный контейнер до `1080px`. Хороший выбор по умолчанию для обычных страниц с текстом, несколькими блоками и умеренно широкими компонентами.
- `wide` - широкий контейнер до `1280px`. Используйте для страниц, где нужен простор для карточек, сравнительных таблиц, OpenAPI-блоков или больших примеров, но не хочется растягивать контент на весь экран.
- `narrow` - узкий контейнер до `760px`. Подходит для текстовых страниц, заметок, legal-текста и changelog, где важнее комфортная длина строки.

Хлебные крошки используют тот же контейнер, что и контент страницы, поэтому их левый край совпадает с началом документа.

На маленьких экранах режимы почти не отличаются: контейнер все равно занимает доступную ширину с внутренними отступами. Разница заметна на desktop и широких мониторах.

Пример текстовой страницы:

```markdown
---
title: О проекте
slug: about
container: narrow
nav_label: О проекте
---
```

Пример страницы с широкими блоками:

```markdown
---
title: API
slug: api
container: wide
nav_label: API
---
```

## Создать простую страницу

Создайте файл:

```text
local/storage/edoc/ru/pages/about.md
```

Содержимое:

```markdown
---
title: О проекте
description: Что это за проект и где искать документацию.
slug: about
container: constrained
nav_label: О проекте
nav_position: 10
---

# О проекте

Здесь можно коротко объяснить, для кого этот проект и с чего начать чтение.
```

После обновления сайта страница будет доступна по адресу:

```text
/about
```

А пункт `О проекте` появится в верхнем меню.

## Скрыть страницу из меню

Если страница должна открываться по ссылке, но не должна появляться в меню, не указывайте `nav_label` или добавьте:

```yaml
nav_hidden: true
```

Это удобно для служебных страниц, черновых разделов или страниц, на которые ведут только внутренние ссылки.

## Порядок в меню

Порядок задается через `nav_position`:

```yaml
nav_position: 20
```

Чем меньше число, тем раньше пункт появится в меню.

Если у нескольких страниц нет позиции, они будут отсортированы по названию.

## Главная страница

Главная страница - это файл:

```text
local/storage/edoc/ru/pages/index.mdx
```

Ее `slug` можно не указывать: `index.mdx` автоматически соответствует `/`.

Главная обычно использует MDX, потому что на ней нужны блоки:

```mdx
import { Hero, Section, Grid, Feature } from '@/Components/Mdx'

<Hero
  title="E-Doc"
  subtitle="Документация как код для self-hosted проектов."
  href="/ru/docs"
  label="Начать"
/>

<Section title="Для чего">
  E-Doc помогает хранить документацию в файлах и публиковать ее как сайт.
</Section>

<Grid columns={3}>
  <Feature title="Markdown">Пишите текст в обычных `.md` файлах.</Feature>
  <Feature title="MDX">Добавляйте React-блоки там, где Markdown тесен.</Feature>
  <Feature title="Git">Обновляйте документацию вместе с проектом.</Feature>
</Grid>
```

Если главная должна быть центром помощи, используйте `HelpCenter`. По умолчанию он лениво загружает статический индекс `/docs/search-index.json` только после открытия поиска:

> `HelpCenter` и `searchProvider` доступны с E-Doc v1.1.0.

```mdx
import {
  HelpCenter,
  HelpFaq,
  HelpLink,
  HelpSection,
} from '@/Components/Mdx'

<HelpCenter
  title="База знаний"
  subtitle="Как мы можем помочь?"
  searchProvider="static"
  searchPlaceholder="Поиск по базе знаний"
>
  <HelpSection title="Популярные задачи" columns={4}>
    <HelpLink href="/ru/docs/receiving" icon="📦">Приемка</HelpLink>
    <HelpLink href="/ru/docs/shipping" icon="📤">Отгрузка</HelpLink>
    <HelpLink href="/ru/docs/inventory" icon="📋">Инвентаризация</HelpLink>
    <HelpLink href="/ru/docs/labels" icon="🏷">Напечатать этикетку</HelpLink>
  </HelpSection>

  <HelpSection title="По ролям">
    <HelpLink href="/ru/docs/roles/employee" icon="👷">Сотрудник</HelpLink>
    <HelpLink href="/ru/docs/roles/manager" icon="👨‍💼">Менеджер</HelpLink>
    <HelpLink href="/ru/docs/roles/admin" icon="🛠">Администратор</HelpLink>
  </HelpSection>

  <HelpSection title="Частые вопросы" columns={2}>
    <HelpFaq question="Как выбрать склад?" href="/ru/docs/start/warehouse" />
    <HelpFaq question="Как перепечатать этикетку?" href="/ru/docs/labels/reprint" />
  </HelpSection>
</HelpCenter>
```

Для больших проектов позже можно переключить тот же компонент на backend search provider:

```mdx
<HelpCenter
  title="База знаний"
  subtitle="Как мы можем помочь?"
  searchProvider={{ type: 'api', endpoint: '/api/docs/search' }}
/>
```

## Страница с плагином

MDX-страница может импортировать plugin component:

```mdx
---
title: API
slug: api
nav_label: API
nav_position: 30
---

import { OpenApi } from '@edoc-space/plugin-openapi'

# API

<OpenApi source="/storage/edoc/static/openapi.json" />
```

Так можно собрать страницу, которую обычным Markdown было бы неудобно поддерживать вручную.

## Частые ошибки

### Страница не открывается

Проверьте:

- файл лежит в `local/storage/edoc/ru/pages`;
- расширение `.md` или `.mdx`;
- `slug` не начинается с `/`;
- в YAML front matter нет ошибки с отступами.

### Страница не появилась в меню

Проверьте:

- указан `nav_label`;
- не указан `nav_hidden: true`;
- `site.json` включает navigation source `pages`.

### MDX import не работает

Проверьте:

- пакет установлен в `local/plugins`, а не в core `package.json`;
- Vite dev server перезапущен после установки нового пакета;
- имя импорта совпадает с package name.

## Следующий шаг

После отдельных страниц можно переходить к основной документации проекта: разделам, каталогам и `index.json`.
