# DuckDB Node Neo

Tried [DuckDB Node Neo Client](https://duckdb.org/2024/12/18/duckdb-node-neo-client.html)

## How to TRY

```sh
docker compose down&&docker compose up -d --build
open http://localhost:3000
```

## How to DEV

COMMENT OUT the `remix` section in [compose.yaml](compose.yaml#L2)

```diff
services:
- remix:
- ...
+ # remix:
+ # ...

  minio:
```

and

```sh
docker compose down&&docker compose up -d --build
S3_HOST=localhost S3_PORT="9000" S3_ACCESS_KEY_ID=minio S3_SECRET_ACCESS_KEY=minio123 npm run dev
# ACCESS http://localhost:5173
```
