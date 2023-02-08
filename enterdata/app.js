const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.set("view engine", "html");
app.use(express.static(__dirname + "/views"));

const connection = mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "password",
    database: "data",
    port: 3306
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get("/", (req, res) => {
    res.render("index", { error: null });
});

app.post("/submit-data", (req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var grade = req.body.grade;
    const sql = `INSERT INTO student_grades SET ?`;

    connection.query(sql, { first_name, last_name, grade }, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ success: false, error });
        } else {
            console.log(`Data inserted successfully.`);
            res.json({ success: true });
        }
    })
});

app.listen(8001, () => {
    console.log("Server started on port 8001");
});
