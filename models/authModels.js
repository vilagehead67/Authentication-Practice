

const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    firstName:{type: String, default: true},
    lastName: {type: String, default: true},
    state: {type: String, default: ""},
    verified: {type:Boolean, default: false}
}, {timestamps: true})

const Auth = new mongoose.model("Auth", authSchema)
module.exports = Auth