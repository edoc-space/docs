---
title: Changelog plugin
description: Как подключить @edoc-space/plugin-changelog и вывести историю изменений на MDX-странице.
sidebar_label: Changelog plugin
sidebar_position: 3
---

# Changelog plugin

`@edoc-space/plugin-changelog` выводит историю изменений из Markdown или JSON. Его удобно использовать для страницы “Changelog”, release notes или короткого списка изменений продукта.

Плагин не заставляет вести историю изменений в отдельной системе. Источник остается файлом в `static`.

## Установка

Установите пакет в пользовательский слой плагинов:

```bash
cd local/plugins
yarn add @edoc-space/plugin-changelog
```

или через npm:

```bash
cd local/plugins
npm install @edoc-space/plugin-changelog
```

Пакет на npm: [@edoc-space/plugin-changelog](https://www.npmjs.com/package/@edoc-space/plugin-changelog)

## Подготовить Markdown-файл

Создайте файл:

```text
local/storage/edoc/static/changelog.md
```

Минимальный пример:

```markdown
# Changelog

## 1.1.0 - 2026-06-30

### Added

- Добавлена публичная страница API.
- Добавлен поиск по документации.

### Fixed

- Исправлена навигация между разделами.
```

Публичный путь к файлу будет таким:

```text
/storage/edoc/static/changelog.md
```

## Создать MDX-страницу

Создайте страницу:

```text
local/storage/edoc/ru/pages/changelog.mdx
```

```mdx
---
title: Changelog
slug: changelog
nav_label: Changelog
nav_position: 40
---

import { Changelog } from '@edoc-space/plugin-changelog'

# Changelog

<Changelog
  title="История изменений"
  source="/storage/edoc/static/changelog.md"
/>
```

После обновления сайта страница откроется по адресу:

```text
/changelog
```

## Полезные свойства

Компонент можно настроить через props:

```mdx
<Changelog
  title="История изменений"
  source="/storage/edoc/static/changelog.md"
  repositoryUrl="https://github.com/edoc-space/edoc"
  categoryLabels={{
    added: 'Добавлено',
    fixed: 'Исправлено',
    changed: 'Изменено'
  }}
/>
```

Основные параметры:

- `title` - заголовок блока;
- `source` - URL Markdown или JSON-файла;
- `repositoryUrl` - ссылка на репозиторий, если нужно связывать задачи и изменения;
- `categoryLabels` - подписи категорий изменений.

## JSON-источник

Если Markdown неудобен, можно использовать JSON:

```json
{
  "entries": [
    {
      "version": "1.1.0",
      "date": "2026-06-30",
      "changes": {
        "added": [
          "Добавлена публичная страница API."
        ],
        "fixed": [
          "Исправлена навигация между разделами."
        ]
      }
    }
  ]
}
```

Для большинства проектов Markdown проще: его легче читать в репозитории и редактировать без генерации.

## Проверка результата

Откройте страницу и проверьте:

- релизы идут в ожидаемом порядке;
- категории изменений подписаны понятными словами;
- Markdown-файл открывается по прямому URL;
- в консоли браузера нет ошибки загрузки `changelog.md`.

Если пакет не резолвится, вернитесь к странице [Плагины](/ru/docs/plugins/overview) и проверьте установку в `local/plugins`.
