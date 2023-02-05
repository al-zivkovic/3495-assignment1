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
    const { field1, field2 } = req.body;
    // Add additional fields as needed

    connection.query("INSERT INTO data (field1, field2) VALUES (?, ?)", [field1, field2], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, error });
        }

        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
