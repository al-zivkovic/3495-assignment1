const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");
const { request } = require('http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "html");
app.use(express.static(__dirname + "/views"));

const connection = mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "password",
    database: "data"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get("/", (req, res) => {
    res.render("index", { error: null });
});


app.post("/submit-data", function(req, res) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const grade = req.body.grade;
    const sql = "INSERT INTO student_grades(first_name, last_name, grade) VALUES (?, ?, ?)";
    const values = [first_name, last_name, grade];

    connection.query(sql, values, function(err, results) {
        if (err) throw err;
        console.log("Data inserted into the database.");
        res.json({ success: true });
     });
    res.redirect("/");
});

app.listen(8001, function() {
    console.log("Server started on port 8001");
});


