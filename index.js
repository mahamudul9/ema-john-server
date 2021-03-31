var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ywjyr.mongodb.net/emaJohnStore?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const products = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
  app.post('/addProducts', (req,res)=>{
      const product= req.body;
      
      console.log(product)
      products.insertMany(product)
      .then(result=>{
          console.log(result);
      })
  })
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(5000);