const Auth = require("../models/authModels")
const jwt = require("jsonwebtoken")

const {validEmail, sendForgottenPasswordEmail} = require("../sendMail")

const bcrypt = require("bcryptjs")


const {findUsers, resetPassword} = require("../service/index")

const handleGetAllUsers = async(req,res) =>{
     const allUsers = await findUsers()
     res.status(200).json({
        message: "Successful", 
        allUsers
    })

}


 const handleUserRegistration = async(req, res) =>{
      try {
        const {email, password, firstName, lastName, state} = req.body
        if (!email) {
           return res.status(400).json({message: "Please enter your email"})
        }
        if (!password) {
            return res.status(400).json({
                message: "Enter your password"
            })
        }

        const existingUser = await Auth.findOne({email})

        if (existingUser) {
            return res.status(400).json({
                message: "Account already exist"
            })
        }

        if (!validEmail(email)) {
    return res.status(400).json({message: "Please provide a valid email address"})
 }


        if (password.length < 8) {
            return res.status(400).json({
                message: "Password should be minimum of 8 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new Auth({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            state
        })
        await newUser.save()

         res.status(201).json({     
            message: "User account created successfully",
            newUser: {email, firstName, lastName, state }
         }) 
    } catch (error) {
           res.status(500).json({
            message: error.message
           })
    }


 }

 const handleLogin = async(req, res) =>{
    try {
        const {email, password} = req.body

        const user = await Auth.findOne({email})

        // .select("-password")

        if(!user){
            return res.status(404).json({message: "User account does not exist."})
        }
    
        const isMatch = await bcrypt.compare(password, user?.password)

        if (!isMatch) {
            return res.status(400).json({message: "Incorrect email or password."})
        }

// Generate a token

const accessToken = jwt.sign(
    {id:user?._id},
    process.env.ACCESS_TOKEN,
    {expiresIn: "5h"}
)

const refreshToken = jwt.sign(
    {id: user?._id},
    process.env.REFRESH_TOKEN,
    {expiresIn: "30d"}
)

res.status(200).json({
    message: "Login successful",
    accessToken,
    user:{
       email: user?.email,
       firstName: user?.firstName,
       lastName: user?.lastName,
       state: user?.state
    },
    refreshToken
})
} catch (error) {
    res.status(500).json({
        message: error.message
    })
}
}

    const handleResetPassword = async(req, res) =>{
    const {password} = req.body
    const user = await resetPassword()

    if (!user) {
        return res.status(404).json({message: "User account not found"})
    }

   
    const hashedPassword = await bcrypt.hash(password, 12)
    user.password = hashedPassword
    await user.save()
    res.status(200).json({message: "Password reset successfully."})
}


const handleFogttenPassword = async (req, res) =>{
    const {email} = req.body
    const user = await Auth.findOne({email})
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }

    // send the user an email with their token
    const accessToken = await jwt.sign(
        {user}, 
        `${process.env.ACCESS_TOKEN}`, 
        {expiresIn: "5m"})
        await sendForgottenPasswordEmail(email, accessToken)

        // send OTP
        res.status(200).json({message: "Please check your email inbox"});
}


module.exports ={
    handleGetAllUsers,
    handleResetPassword,
    handleUserRegistration,
    handleFogttenPassword,
    handleLogin
}