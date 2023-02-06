const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "password",
    database: "data",
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "index.html"));
});

app.post("/submit-data", (req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var grade = req.body.grade;
    const sql = `INSERT INTO student_grades (first_name, last_name, grades) VALUES (?, ?, ?)`;
    const values = [first_name, last_name, grade]

    connection.query(sql, values, (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, error });
        } else {
            console.log(`Data inserted successfully.`);
            res.json({ success: true });
        }
    })
});

app.listen(3002, () => {
    console.log("Server started on port 3002");
});
