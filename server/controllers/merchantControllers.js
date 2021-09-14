const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "my_user",
    password: "12345",
    database: "my_database",
  },
});

exports.getMerchants = async (req, res) => {
  console.log("pass");

  const result = await db.select("*").from("merchants").orderBy("id", "ASC");

  res.json({
    result,
  });
};
