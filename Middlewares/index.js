
const jwt = require("jsonwebtoken")
const Auth = require("../models/authModels")


const validateRegister = (req, res, next) =>{
    const { email, password, firstName, lastName, state } = req.body

    const errors = []

    if (!email) {
        errors.push("Please add your email")
    }

    if (!password) {
        errors.push("Please add a password")
    }

    if (errors.length > 0) {
        return res.status(400).json({message: errors})
    }

  next()

}

const authorization = async (req, res, next) =>{
      const token = req.header("Authorization")

      if (!token) {
          return res.status(401).json({message: "Please login"})
      }
      const splitToken = token.split(" ")

      const realToken = splitToken[1]

      const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`)

      if (!decoded) {
        return realToken.status(401).json({meassage: "Please login"})
      }

      const user = await Auth.findById(decoded.id)
       
      if (!user) {
           return res.status(404).json({message: "User account doest not exist. Please register."})
      }

      req.user
      next()

      console.log(user)
      
}



module.exports ={
    validateRegister,
    authorization
}