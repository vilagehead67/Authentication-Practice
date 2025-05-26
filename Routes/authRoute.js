

const express = require("express")
const { validateRegister, authorization } = require("../Middlewares")
const { handleUserRegistration, handleLogin, handleFogttenPassword, handleResetPassword, handleGetAllUsers } = require("../Controllers")

const router = express.Router()


router.post("/sign-up", validateRegister, handleUserRegistration)

router.post("/login", handleLogin)

router.post("/forgotten-password", handleFogttenPassword);

router.patch("/reset-password", authorization, handleResetPassword)

router.get("/all-users", authorization, handleGetAllUsers)



module.exports = router