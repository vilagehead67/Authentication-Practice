

const Auth = require("../models/authModels")

const findUsers = async()=> {
    const allUsers = await Auth.find()

    return allUsers
}


const resetPassword = async() => {
    const user = await Auth.findOne({email: req.user.email})

    return user
}

module.exports ={
    findUsers,
    resetPassword
}