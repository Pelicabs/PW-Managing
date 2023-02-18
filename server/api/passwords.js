const express = require('express')
const { Passport } = require('passport')
const authRouter = require('./auth')
const Password = require('../models/Password.model')

const router = express.Router()

//Actions
//Add new password
//Edit existing password (edit value/label)
//Remove an existing password
//View a password (unasterisk it)

//Collectively view all passwords

// authRouter.get('/current-user', (req, res) => {
//     if (!req.user) {
//       return res.json(null)
//     }
  
//     res.json({
//       email: req.user.email,
//     })
//   })

//   label: String,
//   value: String,
//   userID: String

//   const user = await User.create({ email, password });

router.post('/', async (req,res) => {
    const existingPW = await Password.findOne({label: req.body.label})
    if (existingPW) {
        res.status(400).send()
        return
    }
    await Password.create({
        label: req.body.label,
        value: req.body.value,
        userID: req.user._id
    })
    res.send()
})

module.exports = router