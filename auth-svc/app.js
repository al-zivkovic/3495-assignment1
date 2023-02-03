var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/';

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render("index");
});

app.post("/login", function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db("data-analytics");
        var collection = db.collection("users");
        var username = req.body.username;
        var password = req.body.password;
        collection.find({ username: username, password: password }).toArray(function (err, data) {
            if (data.length > 0) {
                res.redirect("/show-results");
            } else {
                res.render("index", { error: "Incorrect username or password" });
            }
            client.close();
        });
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});