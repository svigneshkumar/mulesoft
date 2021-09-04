import PostgresConnection from "./DBCnnection/Postgres";

const express = require("express");

const app = express();

const port = 2121;

app.use(express.json());

app.post("/create/movie", async (req: any, res: any) => {
  try {
    let reqBody: any = req.body;
    let connection: any = await PostgresConnection();
    let client: any = await connection.connect();
    if (reqBody.actor && reqBody.actress && reqBody.year && reqBody.director) {
      let queryForInserting: string = `insert into movies_table
  (lead_actor, actress, year_of_release, director)
  values('${reqBody.actor}','${reqBody.actress}', '${reqBody.year}', '${reqBody.director}') returning *`;

      let response: any = await client.query(queryForInserting);

      let result: any = {
        status: "true",
        message: "data inserted",
      };

      res.status(200).send(result);
    } else {
      throw Error;
    }
  } catch (error) {
    let result: any = {
      status: "false",
      message: "error in inserting data ",
    };
    res.status(400).send(result);
  }
});

app.get("/get/movies", async (req: any, res: any) => {
  try {
    let queryParams: any = req.query;
    let connection: any = await PostgresConnection();
    let client: any = await connection.connect();
    let actor: string = queryParams.id;
    if (actor) {
      let queryForgetting: string = `select * from movies_table where lead_actor='${actor}'`;

      let response: any = await client.query(queryForgetting);

      let result: any = {
        status: "true",
        message: "Movies Data",
        response: response.rows,
      };

      res.status(200).send(result);
    } else {
      let queryForgetting: string = `select * from movies_table`;

      let response: any = await client.query(queryForgetting);

      let result: any = {
        status: "true",
        message: "Movies data",
        response: response.rows,
      };

      res.status(200).send(result);
    }
  } catch (error) {
    let result: any = {
      status: "false",
      message: "error in getting data",
    };
    res.status(400).send(result);
  }
});

app.listen(port, () => console.log(`App is running in port:${port}`));
