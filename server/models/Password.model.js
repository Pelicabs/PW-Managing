const mongoose = require("mongoose");

const PwSchema = new mongoose.Schema({
    label: String,
    value: String,
    userID: String
})

const Password = mongoose.model('Password', PwSchema)

module.exports = Password