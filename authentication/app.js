const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

const connection = mysql.createConnection({
    host: 'mysql_db',
    user: 'root',
    password: 'password',
    database: 'authentication',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// render the index page (index.ejs)
app.get('/', (req, res) => {
    res.render('index', { error: null });
});


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM authentication.users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(query, (err, result) => {
        if (result.length > 0) {
            console.log('User logged in');
        }
        else {
            res.render('index', { error: 'Invalid username or password' });
        }
    });
});


app.listen(3000, () => {
    console.log('Auth service is listening on port 3000');
});
