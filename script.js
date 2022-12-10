require('dotenv').config()
const { MongoClient } = require("mongodb");
const express = require("express")

const app = express()
const client = new MongoClient(process.env.MONGO_URI)

async function run() {
    try {
        const database = client.db('authentication');
        const users = database.collection('users');
        // await users.insertOne({
        //     username: 'tim',
        //     password: 'verydifficulttoguess'
        // })

        const user = await users.findOne({ username: 'tim' })
        console.log('found user', user)
        
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // req = request, res = response
        app.get('/', (req, res) => {
            res.send("hello there")
        })

        app.listen(3000, () => {
            console.log('server started on port 3000')
        })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
  }

  run().catch(console.dir);
