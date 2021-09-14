const express = require("express");
const cors = require("cors");

// DATABASE
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "taskadmin",
    password: "tasklist",
    database: "taskdatabase",
  },
});

// middlewares
const app = express();
app.use(express.json());
app.use(cors());

// routes routes
app.get("/hello", (req, res) => {
  res.json({
    hello: "hello",
  });
});

app.post("/tasks", (req, res) => {
  const body = req.body;
  const headers = req.headers;
  console.log(body);
  db.insert(body)
    .into("tasklist")
    .returning("*")
    .then((data) => {
      res.send(data);
    });

  // console.log("adding", result);
  // res.text("New Merchant Added");
});

app.delete("/tasks/:id", (req, res) => {
  const body = req.body;
  const headers = req.headers;
  console.log("delete", body);
  db("tasklist")
    .del()
    .where({
      id: req.params.id,
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });

  // res.json({
  //   delete: "delete",
  // });
});

app.get("/", async (req, res, next) => {
  const result = await db.select("*").from("tasklist").orderBy("id", "ASC");

  res.json({
    dblisttask: result,
  });
});

app.listen(3001, () => {
  console.log(`app is running on port 3001`);
});
