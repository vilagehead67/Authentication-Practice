
const express = require('express')

const mongoose = require('mongoose')

 const dotenv = require('dotenv')

 const bcrypt = require('bcryptjs')

 const jwt = require("jsonwebtoken")

const Auth = require('./models/authModels')

const routes = require("./Routes")


dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000


mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("Mongodb connected.....")
app.listen(PORT, () =>{
    console.log("Server running on port " + PORT)
})

})

app.get("/", async(req, res) =>{
    res.status(200).json("Welcome To My First Deployed Backend Project")
})

app.use(routes)


// login

// forgotten Password


// Sunday class 18th May, 2025
// MVCR Model View Controller  - The professional way of structuring Backend. 
// View is for frontend
// Middleware / Authorization / Validations 

// Deployment
// using render

//https://authentication-practice-payg.onrender.com




