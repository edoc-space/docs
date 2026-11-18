---
title: RSS
description: Публичная RSS 2.0 лента блога по локалям без email-подписки.
sidebar_position: 8
---

# RSS

Когда `blog.enabled=true` в корневом `site.json`, лента текущей локали доступна по `/blog/rss.xml`, а при префиксе `/en` — по `/en/blog/rss.xml`. Откройте ссылку **RSS** в списке или статье и скопируйте адрес в свой RSS-клиент. Браузер может показать исходный XML или предложить скачать файл: это поведение его просмотрщика, а не форма подписки.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Пример · Блог</title>
    <link>https://example.test/blog</link>
    <description>Описание сайта</description>
    <language>ru</language>
    <item>
      <title>Первая статья</title>
      <link>https://example.test/blog/first-post</link>
      <guid isPermaLink="true">https://example.test/blog/first-post</guid>
      <pubDate>Fri, 13 Nov 2026 12:00:00 +0000</pubDate>
      <description>Краткое описание &amp; следующий шаг.</description>
    </item>
  </channel>
</rss>
```

Это синтетический пример структуры; домен вашего сайта берётся из фактического HTTP-запроса через общий SEO helper и настроенную границу доверенных прокси. В production проверьте внешний HTTPS origin, чтобы ссылки не указывали на внутренний адрес стенда.

Лента имеет тип `application/rss+xml; charset=UTF-8`. `title`, `link`, `description`, `language` описывают канал. Каждый элемент содержит заголовок, абсолютные `link` и `guid`, дату RFC 822 и description из frontmatter статьи. `guid` равен canonical статьи и не зависит от её даты; изменение slug или origin изменяет идентичность URL. Символы XML экранируются стандартным XML writer. MDX не исполняется; полный текст, приватные descriptors и исходные пути не передаются.

## Публичность и актуальность

Лента содержит все публичные статьи текущей локали, без тегового/годового отбора и пагинации, в порядке `date DESC, slug ASC`. Это тот же публичный набор, что в [блоге](blog.md) и [opt-in подборке на странице](content-model.mdx#последние-статьи-на-странице). До даты публикации статья отсутствует, с наступлением даты появляется при следующем запросе. Изменение draft или перенос даты в будущее отзывает её без пересборки и очистки кеша. Включённый пустой блог возвращает валидный канал без item; выключенный блог — 404 для ленты.

GET и HEAD используют `Cache-Control: no-store`, без ETag/Last-Modified и устаревшего 304. HEAD возвращает те же заголовки без тела. Уже сохранённую RSS-клиентом копию сервер удалить не может. Дата, draft и включение модуля меняются без build; изменение тела MDX и зависимостей требует отдельной production-сборки сайта.

Список и статья обеих тем содержат RSS-ссылку, а initial HTML head — `<link rel="alternate" type="application/rss+xml">` текущей локали. Выбранные тег, год и страница не превращают её в другую ленту. [Языковые правила](languages.mdx) сохраняются.

RSS не собирает адреса и не хранит подписчиков. Email-формы, рассылка, комментарии и доставка сообщений не входят в этот сценарий.


Ссылка RSS в стандартной теме на синтетическом наборе из 13 русских статей (production, mobile 390 × 520):

![Блог и ссылка RSS в default](/storage/edoc/static/examples/composition/default-blog-rss-mobile.png)
