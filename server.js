require('dotenv').config()
const express = require("express")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')
const mongoose = require('mongoose');
const authRouter = require('./server/api/auth')
require("./server/lib/passport")

const app = express()

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

async function run() { 
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database")
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // app.use((req, res, next) => {
    //     req.user = {
    //         _id: '12345',
    //         username: 'marcus',
    //         password: 'hashedpassword',
    //     }

    //     next()
    // })

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
    }));
    app.use(passport.session())

    app.use('/api/auth', authRouter)

    // req = request, res = response
    app.get('/', (req, res) => {
        res.send("hello there")
    })

    app.listen(3000, () => {
        console.log('server started on port 3000')
    }) 
  }

  run().catch(console.dir);
