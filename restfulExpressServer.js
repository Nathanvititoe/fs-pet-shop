const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "petdb",
});

const express = require("express"); //bringing express library into our code
const { CLIENT_RENEG_LIMIT } = require("tls");
const app = express();
app.use(express.json());

const PORT = 3200;

app.get("/pets", async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM pets ORDER BY pet_id");
    if (!results.rows) {
      console.log("bad url");
      res.setHeader("content-type", "text/plain");
      res.status(400).send("bad url");
    }
    res.status(200).send(results.rows);
    return;
  } catch (err) {
    if (err) {
      console.log("internal error");
      res.setHeader("content-type", "text/plain");
      res.status(500).send("internal error");
    }
  }
});

app.get("/pets/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const results = await client.query(
      `SELECT * FROM pets WHERE pet_id = $1`, [id]
    );
    if (!results.rows) {
      console.log("server error");
      res.setHeader("Content-Type", "text/plain");
      res.status(404).send("internal error");
      return;
    }
    res.status(200).send(results.rows);
    return;
  } catch (err) {
    if (err) {
      console.log(err.message);
      res.setHeader("Content-Type", "text/plain");
      res.status(500).send("internal error");
      return;
    }
  }
});

app.post("/pets", async (req, res) => {
  const pet = req.body;
  try {
    if (
      !pet.hasOwnProperty("age") ||
      !pet.hasOwnProperty("kind") ||
      !pet.hasOwnProperty("name") ||
      pet["name"] === "" ||
      pet["age"] === "" ||
      pet["kind"] === "" ||
      !Number.isInteger(pet["age"])
    ) {
      console.log("user error");
      res.setHeader("Content-Type", "text/plain");
      res.status(400).send("user error");
      return;
    }
    const { age, kind, name } = pet;
    const results = await client.query(
      `INSERT INTO pets(age, kind, name) VALUES ($1, $2, $3)`,
      [age, kind, name]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
});

app.put("/pets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { age, kind, name } = req.body;
    const results = await client.query(
      `UPDATE pets SET age = $1, kind = $2, name = $3 WHERE pet_id = $4 RETURNING *`,
      [age, kind, name, id]
    );
    if (!results.rows) {
      console.log("nothing there");
      res.setHeader("content-type", "text/plain");
      res.status(400).send("nothing there");
    }
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.setHeader("content-type", "text/plain");
    res.status(500).send(err.message);
  }
});

app.delete("/pets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await client.query(`DELETE FROM pets WHERE pet_id = $1`, [id]);
    if (!results.rows) {
      console.log("bad url");
      res.setHeader("content-type", "text/plain");
      res.status(400).send("bad url");
    }
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log("internal error");
    res.setHeader("content-type", "text/plain");
    res.status(500).send("internal error");
  }
});

app.listen(PORT, function () {
  console.log("server is running");
});
