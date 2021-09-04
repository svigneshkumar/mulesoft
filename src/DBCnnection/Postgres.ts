const { Pool } = require("pg");

export default async function PostgresConnection() {
  try {
    console.log("creating DB connection");

    let connection: any = new Pool({
      connectionString:
        "postgresql://postgres:postgres@127.0.0.1:5432/movies_DB",
      max: 60,
      idleTimeoutMillis: 120000,
      connectionTimeoutMillis: 40000,
    });

    console.log("returning connection");
    return connection;
  } catch (error) {
    console.log(error);
  }
}
