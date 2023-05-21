const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000


// password zQ0KCKBRzOc19218
// userName toyProjects

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://toyProjects:zQ0KCKBRzOc19218@cluster0.nsogw9w.mongodb.net/?retryWrites=true&w=majority";

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
    client.connect();


    const database = client.db("toysCategory");
    const clientCategory = database.collection("category");

    app.get('/categorys', async(req, res) =>{
        const client = clientCategory.find()
        const result = await client.toArray()
        res.send(result)

    })

    app.get('/categorys/:item', async(req, res) =>{
        const id = req.params.item
        const query = {
            subCategory: id
        }
        const options = {
            projection: { pictureUrl: 1, name: 1, price: 1, rating: 1, _id: 1 },
        }
        const client = clientCategory.find(query, options)
        const result = await client.toArray()
        res.send(result)

    })
    app.get('/user/:email', async(req, res) =>{
        const userEmail = req.params.email
        const myToy = {
            sellerEmail: userEmail
        }
        const options = {
            projection: { pictureUrl: 1, name: 1, price: 1, quantity: 1,subCategory: 1, _id: 1 },
        }
        const client = clientCategory.find(myToy, options)
        const result = await client.toArray()
        res.send(result)

    })

    // app.get('/user:/toy', async(req, res ) =>{
    //     const userEmail = req.params.toy
    //     console.log(userEmail) 
    //     const myToy = {
    //         sellerEmail: userEmail
    //     }
    //     const options = {
    //         projection: { pictureUrl: 1, name: 1, price: 1, quantity: 1, subCategory: 1, _id: 1 },
    //     }
    //     const client = clientCategory.find(myToy, options)
    //     const result = await client.toArray()
    //     res.send(result)
    // })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('hello toy')
})


app.listen(port, ()=>{
    console.log(`toy projects in running port ${port}`)
})