import { DuckDBInstance } from "@duckdb/node-api";

export const fetchCSV = async () => {
  const instance = await DuckDBInstance.create();
  const con = await instance.connect();

  await con.run(
    `
  INSTALL httpfs;
  LOAD httpfs;
  `
  );
  await con.run(
    `
  CREATE SECRET secret1 (
    TYPE S3,
    KEY_ID '${process.env.S3_ACCESS_KEY_ID}',
    SECRET '${process.env.S3_SECRET_ACCESS_KEY}',
    REGION 'us-east-1',
    ENDPOINT '${process.env.S3_HOST}:${process.env.S3_PORT}',
    USE_SSL false,
    URL_STYLE 'path'
  );
  `
  );

  const result = await con.run(
    "SELECT * FROM read_csv_auto('s3://mybucket/sample.csv');"
  );

  return { header: result.columnNames(), rows: await result.getRows() };
};
