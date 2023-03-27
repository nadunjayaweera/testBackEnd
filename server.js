const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const uri = "mongodb+srv://nadunmj:EYO4y6xhMq0PzxDX@cluster0.idbvi1f.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// connect to the MongoDB Atlas cluster
client.connect(err => {
  if (err) {
    console.log("Error connecting to MongoDB Atlas: ", err);
  } else {
    console.log("Connected successfully to MongoDB Atlas");
    db = client.db("test"); // get a reference to the database
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// define a route that retrieves data from the database
app.get('/users', (req, res) => {
  db.collection('users').find({}).toArray((err, docs) => {
    if (err) {
      console.log("Error retrieving data from MongoDB Atlas: ", err);
      res.status(500).send("Error retrieving data from MongoDB Atlas");
    } else {
      console.log("Retrieved data from MongoDB Atlas: ", docs);
      res.send(docs);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


// Username- nadunmj
// Password- EYO4y6xhMq0PzxDX
// URL- mongodb+srv://nadunmj:<password>@cluster0.idbvi1f.mongodb.net/?retryWrites=true&w=majority