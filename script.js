require('dotenv').config()
const { MongoClient } = require("mongodb");
const express = require("express")

const app = express()

async function run() { 
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // req = request, res = response
    app.get('/', (req, res) => {
        res.send("hello there")
    })

    app.listen(3000, () => {
        console.log('server started on port 3000')
    }) 
  }

  run().catch(console.dir);
