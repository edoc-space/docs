---
title: Cache
description: How documentation cache works and why production needs a prune task.
sidebar_label: Cache
sidebar_position: 3
translation_key: docs.start.cache
---

# Cache

E-Doc can render documentation without a database. For production, it is still useful to cache the documentation index and rendered documents, because building navigation and parsing Markdown or MDX on every request can become expensive.

## Enable cache

Documentation cache is controlled by two environment variables:

```env
APP_DOCUMENTATION_CACHE=1
APP_DOCUMENTATION_CACHE_TTL=86400
```

`APP_DOCUMENTATION_CACHE=1` enables the documentation cache.
Set it to `0`, `false`, `off`, or `no` to disable documentation cache.

`APP_DOCUMENTATION_CACHE_TTL` defines cache lifetime in seconds.
The default value is one day.
If the value is `0` or lower, cache entries are written without expiration.

## Why prune is needed

`phpsoftbox/cache` removes an expired file cache entry when the same key is requested again. That is useful, but it does not clean every old file.

Documentation cache keys include the content fingerprint. When a document changes, E-Doc writes a new cache key. The old key may never be requested again, so lazy expiration will not touch it.

Temporary files can also remain after an interrupted cache write. They are not real cache entries and are never removed by reading a key.

For that reason, production should run cache prune periodically.

## Cron

E-Doc does not require `phpsoftbox/scheduler` for this task. A regular OS cron is enough and keeps the base installation smaller.

For a simple PHP deployment:

```cron
17 3 * * * cd /path/to/edoc/local/backend && php psb cache:prune --tmp-max-age-hours=24 --max-age-days=30
```

For a Docker deployment:

```bash
docker compose run --rm php-cli php psb cache:prune \
  --tmp-max-age-hours=24 \
  --max-age-days=30
```

## What prune removes

`cache:prune` removes:

- expired cache entries;
- broken cache files;
- old temporary cache files;
- permanent cache entries older than `--max-age-days`, only when this option is passed.

It does not call `cache:clear`, so valid fresh cache remains in place.
