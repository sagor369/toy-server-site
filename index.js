const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


    app.use(cors())
    app.use(express.json())



    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nsogw9w.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });

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

                    // subcategory toys list url 

                    app.get('/toys/:item', async(req, res) =>{
                            const itemCategory = req.params.item
                            console.log(itemCategory)
                            const query = {
                                subCategory: itemCategory
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
                                projection: { pictureUrl: 1,sellerName: 1, sellerEmail: 1,  name: 1, price: 1, quantity: 1,subCategory: 1, _id: 1 },
                            }
                            const client = clientCategory.find(myToy, options)
                            const result = await client.toArray()
                            res.send(result)
                    
                        })

                    app.post('/addtoy', async(req, res) =>{
                        const data = req.body
                        const result = await clientCategory.insertOne(data)
                        res.send(result)
                        
                    })
                    

                    app.delete('/remove/:id', async(req, res) => {
                        const id = req.params.id 
                        const query = { _id: new ObjectId(id) }
                        const result = await clientCategory.deleteOne(query)
                        res.send(result)
                    })

                app.put('/update/:id', async(req, res) =>{
                    console.log(req.body)
                    const id = req.params.id;
                    const filter = { _id: new ObjectId(id) };
                    const name = req.body.name
                    const price = req.body.price
                    const quantity = req.body.quantity
                    const detailDescription = req.body.detailDescription
                    const updateData = {
                        $set:{
                            name,
                            price,
                            quantity,
                            detailDescription

                        }
                    }
                    const result = await clientCategory.updateOne(filter ,updateData)
                        res.send(result)

                })
                    




                await client.db("admin").command({ ping: 1 });
                console.log("Pinged your deployment. You successfully connected to MongoDB!")

            }
            finally{

            }
        }
        run().catch(console.dir);



    app.get('/', (req,res) =>{
        res.send('hello touy senter')
    })


    app.listen(port, ()=>{
        console.log(`toy projects in running port ${port}`)
    })