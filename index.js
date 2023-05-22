const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port =process.env.PORT || 5400;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c70onov.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toysCollection = client.db('toyDB').collection('toys')
    console.log('database connected successfully');

    app.post('/posttoys', async(req, res) => {
      const body = req.body;
      console.log(body);
      const result = await toysCollection.insertOne(body);
      res.send(result);
      console.log(body);
    })
    app.get('/alltoys', async(req, res) => {
      const result = await toysCollection.find({}).toArray();
      res.send(result);
    });
    app.get('/alltoys/:text', async(req, res) => {
      if(req.params.text === "movement" || req.params.text === "Small world toys" || req.params.text === "Creative toys"){
      const result = await toysCollection.find({category: req.params.text}).toArray();
      return res.send(result);
      }
      const result = await toysCollection.find({}).toArray();
      return res.send(result);
      
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})