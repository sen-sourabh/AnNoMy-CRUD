const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "annomy",
  port: 3306,
});

//Test Database Connection
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database is connected...");
});

//get tasks data
app.get("/api/tasks", (req, res) => {
  console.log("this is the Request: ", req);
  let sql = "SELECT * FROM Tasks";
  db.query(sql, (err, result) => {
    if (err) {
      err.send({
        code: res.statusCode,
        message: "Execution Failed.",
      });
    } else {
      res.send({
        code: res.statusCode,
        message: "Query execution successfully",
        data: result,
      });
    }
  });
});

//get task by id
app.get("/api/tasks/:id", (req, res) => {
  console.log(req);
  let sql = "SELECT * FROM Tasks WHERE Id= " + req.params.id;
  db.query(sql, (err, result) => {
    if (err) {
      err.send({
        code: res.statusCode,
        message: "Execution Failed.",
      });
    } else {
      res.send({
        code: res.statusCode,
        message: "Query execution successfully.",
        data: result,
      });
    }
  });
});

app.post("/api/addTasks", (req, res) => {
  console.log(req.body);
  let newTask = req.body;
  console.log(newTask);
  let name = req.body.name;
  let desc = req.body.description;
  let sql = `INSERT INTO Tasks (Name, Description) VALUES ('${name}', '${desc}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        code: res.statusCode,
        message: "Task added successfully.",
        data: result,
      });
    }
  });
});

app.put("/api/editTask", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let desc = req.body.description;
  let sql = `UPDATE Tasks SET Name='${name}', Description='${desc}' WHERE Id='${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        code: res.statusCode,
        message: "Task updated successfully.",
        data: result,
      });
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM Tasks WHERE Id='${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        code: res.statusCode,
        message: "Task deleted successfully.",
        data: result,
      });
    }
  });
});

//Test Server Connection
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
