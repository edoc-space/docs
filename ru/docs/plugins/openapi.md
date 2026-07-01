---
title: OpenAPI plugin
description: Как подключить @edoc-space/plugin-openapi и вывести API reference на MDX-странице.
sidebar_label: OpenAPI plugin
sidebar_position: 2
---

# OpenAPI plugin

`@edoc-space/plugin-openapi` выводит OpenAPI-спецификацию внутри MDX-страницы: группирует endpoints, показывает методы, пути, параметры, request body и responses.

Плагин подходит для страницы “API”, где важно не пересказывать спецификацию вручную, а читать ее из одного файла.

## Установка

Установите пакет в пользовательский слой плагинов:

```bash
cd local/plugins
yarn add @edoc-space/plugin-openapi
```

или через npm:

```bash
cd local/plugins
npm install @edoc-space/plugin-openapi
```

Пакет на npm: [@edoc-space/plugin-openapi](https://www.npmjs.com/package/@edoc-space/plugin-openapi)

## Подготовить спецификацию

Положите OpenAPI-файл в `static`:

```text
local/storage/edoc/static/openapi.json
```

Минимальный пример:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Project API",
    "version": "1.0.0"
  },
  "paths": {
    "/health": {
      "get": {
        "summary": "Проверить состояние",
        "tags": ["system"],
        "responses": {
          "200": {
            "description": "Приложение отвечает"
          }
        }
      }
    }
  }
}
```

Публичный путь к файлу будет таким:

```text
/storage/edoc/static/openapi.json
```

## Создать MDX-страницу

Создайте страницу:

```text
local/storage/edoc/ru/pages/api.mdx
```

```mdx
---
title: API
slug: api
nav_label: API
nav_position: 30
---

import { OpenApi } from '@edoc-space/plugin-openapi'

# API

<OpenApi
  source="/storage/edoc/static/openapi.json"
/>
```

После обновления сайта страница откроется по адресу:

```text
/api
```

## Полезные свойства

Компонент можно настроить через props:

```mdx
<OpenApi
  title="Project API"
  source="/storage/edoc/static/openapi.json"
  groupBy="tag"
  showSearch={true}
  defaultExpanded={false}
/>
```

Основные параметры:

- `title` - заголовок блока;
- `source` - URL JSON-файла;
- `groupBy` - группировка, сейчас обычно `tag`;
- `showSearch` - показывать поиск по endpoints;
- `defaultExpanded` - раскрывать операции по умолчанию.

## Проверка результата

Откройте страницу и проверьте:

- endpoints сгруппированы по тегам;
- методы и пути видны без раскрытия всех деталей;
- параметры и responses открываются внутри нужной операции;
- в консоли браузера нет ошибки загрузки `openapi.json`.

## Если спецификация не загрузилась

Чаще всего причина в пути к файлу. Проверьте, что файл лежит в `local/storage/edoc/static`, а в компоненте указан путь с `/storage/edoc/static`.

Если пакет не резолвится, вернитесь к странице [Плагины](/ru/docs/plugins/overview) и проверьте установку в `local/plugins`.
