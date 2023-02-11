require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose');
const Password = require('./server/models/Password.model');



const app = express()

async function run() { 
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database")
    const Tim = new Password({
        label: 'Email',
        value: '45678',
        userID: 'Tim'
    })
    await Tim.save()
    const passwords = await Password.find()
    console.log(passwords)
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
        req.user = {
            _id: '12345',
            username: 'marcus',
            password: 'hashedpassword',
        }

        next()
    })

    // req = request, res = response
    app.get('/', (req, res) => {
        res.send("hello there")
    })

    app.listen(3000, () => {
        console.log('server started on port 3000')
    }) 
  }

  run().catch(console.dir);
