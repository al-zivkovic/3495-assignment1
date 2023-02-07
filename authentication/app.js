const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const { request } = require('http');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/', (req, res) => {
    res.render('index', { error: null });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/authentication/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname + '/views/style.css'));
});

const cor_user = 'admin';
const cor_pass = 'admin';

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // const query = `SELECT * FROM authentication.users WHERE username = '${username}' AND password = '${password}'`;
    // connection.query(query, (err, result) => {
    //     if (result.length > 0) {
    //         res.redirect('/home');
    //     }
    //     else {
    //         res.redirect('/home');
    //     };
    // });

    if (username === cor_user && password === cor_pass) {
        res.redirect('/home');
    }
    else {
        res.render('index', { error: 'Invalid username or password' });
    }
});


app.listen(3000, () => {
    console.log('Auth service is listening on port 3000');
});
