const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


async function run() {
    try {
        client.connect()


        const database = client.db("toysCategory");
        const clientCategory = database.collection("category");

        const reviewDB = client.db("reviewDB");
        const reviews = reviewDB.collection("reviews");

        // home page toy url 

        app.get('/review', async(req, res) =>{
            const client = reviews.find()
            const result = await client.toArray()
            res.send(result)
    
        })

    app.get('/data', async(req,res) =>{
        const result = await clientCategory.estimatedDocumentCount();
        res.send({totalData: result })
    })

    app.get('/toys', async(req, res) =>{
        console.log(req.query)
        const page = parseInt(req.query.page) || 0
        const perpage = parseInt(req.query.perPage)
        const skip = page * perpage
        console.log(skip)
            const result = await clientCategory.find().skip(skip).limit(perpage).toArray()
            res.send(result)
    
        })


    app.get('/toys/sort', async(req, res) =>{
            const client = clientCategory.find({}, { sort: { price: 1 }})
            const result = await client.toArray()
            res.send(result)
    
        })

        app.get('/toy/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
                    
                    const options = {
                        projection: { pictureUrl: 1, quantity:1,  name: 1, price: 1, rating: 1, _id: 1, detailDescription: 1                                },
                    }
                    const client = clientCategory.find(query, options)
                    const result = await client.toArray()
                    res.send(result)
            
        })







app.get('/', (req,res) =>{
    res.send('hello touy senter')
})


app.listen(port, ()=>{
    console.log(`toy projects in running port ${port}`)
})