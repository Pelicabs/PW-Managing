const { Passport } = require('passport')
const authRouter = require('./auth')
const Password = require('../models/Password.model')

const AsyncRouter = require("express-async-router").AsyncRouter
const router = AsyncRouter()

//Actions
//Add new password [DONE]
//Edit existing password (edit value/label) [DONE]
//Remove an existing password [DONE]
//Collectively view all passwords [DONE]
//View a password (unasterisk it) [DONE]

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

router.put('/:id', async (req,res) => {
    const existingPW = await Password.findOne({_id: req.params.id}) 
    if (!existingPW) {
        res.status(404).send()
        return
    }
    const updates = {}
    if (req.body.newLabel && req.body.newLabel !== existingPW.label) {
        const sameLabel = await Password.findOne({label: req.body.newLabel})
        if (sameLabel) {
            res.status(400).send()
            return
        }
        updates.label = req.body.newLabel
    }
    if (req.body.newValue && req.body.newValue !== existingPW.value) {
        updates.value = req.body.newValue
    }
    await Password.updateOne({_id: req.params.id}, updates)

    res.send()
})

router.delete('/:id', async (req,res) => {
    const existingPW = await Password.findOne({_id: req.params.id}) 
    if (!existingPW) {
        res.status(404).send()
        return
    }
    await Password.deleteOne({_id: req.params.id})

    res.send()
})

router.get('/', async (req,res) => {
    const foundPasswords = await Password.find({userID: req.user._id}, {label: 1})
    res.send(foundPasswords)
})

router.get('/:id', async (req,res) => {
    const singlePassword = await Password.findOne({_id: req.params.id}, {label: 1, value: 1})
    res.send(singlePassword)
})

module.exports = router