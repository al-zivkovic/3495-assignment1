const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");
const { request } = require('http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "html");
app.use(express.static(__dirname + "/views"));

const connection = mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "password",
    database: "data"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get("/", (req, res) => {
    res.send(`
    <form action="/submit-data" method="post">
        <div>
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name">
        </div>
        <div>
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name">
        </div>
        <br>
        <div>
            <label for="grade">Grade:</label>
            <input type="number" id="grade" name="grade">
        </div>
        <div>
        <button type="submit">Submit</button>
        </div>
    </form>
  `);
});


app.post("/submit-data", function (req, res) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const grade = req.body.grade;
    const sql = "INSERT INTO student_grades(first_name, last_name, grade) VALUES (?, ?, ?)";
    const values = [first_name, last_name, grade];

    connection.query(sql, values, function (err, results) {
        if (err) throw err;
        console.log("Data inserted into the database.");
        res.json({ success: true });
    });
    res.redirect("/");
});

app.listen(8001, function () {
    console.log("Server started on port 8001");
});


