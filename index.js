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






app.get('/', (req,res) =>{
    res.send('hello touy senter')
})


app.listen(port, ()=>{
    console.log(`toy projects in running port ${port}`)
})