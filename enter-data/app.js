const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
    host: "sql-database",
    user: "root",
    password: "secret",
    database: "data"
});

app.use(express.json());

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

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
