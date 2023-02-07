const express = require("express");
const mongo = require("mongodb");
const app = express();

app.set("view engine", "html");
app.use(express.static(__dirname + "/views"));

// Connect to MongoDB
mongo.connect("mongodb://mongodb:27017", (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db("data");
  const collection = db.collection("analytics");

  app.get("/", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error(err);
        res.send("Error getting data from MongoDB");
        return;
      }

      res.send(`
        <html>
        <head>
          <link rel="stylesheet" type="text/css" href="style.css">
        </head>
        <body>
          <h1>Show Results</h1>
          <table>
            <tr>
              <th>Data Type</th>
              <th>Max</th>
              <th>Min</th>
              <th>Average</th>
            </tr>
            ${data.map(d => `
              <tr>
                <td>${d.dataType}</td>
                <td>${d.max}</td>
                <td>${d.min}</td>
                <td>${d.average}</td>
              </tr>
            `).join("")}
          </table>
        </body>
        </html>
      `);
    });
  });

  app.listen(8004, () => {
    console.log("Show Results service is listening on port 8004");
  });
});
