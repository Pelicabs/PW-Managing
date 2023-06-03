require('dotenv').config()
const express = require("express")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')
const mongoose = require('mongoose');
const authRouter = require('./api/auth')
const passwordRouter = require('./api/passwords')
require("./lib/passport")

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
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
    }));
    app.use(passport.session())

    app.use((req, res, next) => {
        req.user = {
            _id: "63f0733b552e36a3cbe87494",
            email: "timmyichen@mail",
            password: "timmyichen"
        }

        next()
    })

    app.use('/api/auth', authRouter)

    app.use('/api/passwords', passwordRouter)

    // req = request, res = response
    app.get('/', (req, res) => {
        res.send("hello there")
    })

    app.listen(3001, () => {
        console.log('server started on port 3001')
    }) 
  }

  run().catch(console.dir);
