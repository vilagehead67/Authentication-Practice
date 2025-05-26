const nodemailer = require("nodemailer")

const sendForgottenPasswordEmail = async(email, token) =>{
    try {
        const mailTranport = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })


        const mailDetails = {
            from: `${process.env.EMAIL}`,
            to: `${email}`,
            subject: "Reset Password Notification",
                html: `<h1> Here is the token to reset your password please click on the button,
                 <a style="background-color: #4CAF50; 
                 color: #fff; 
                 padding: 10px 20px;
                 border: none;
                 border-radius: 5px;
                 cursor: pointer;
                 font-size: 16px
                 " href='https://wwww.yourcareerex.com/reset-password/${token}'>Reset Password</a>
                if the button does not work for any reason, please click the linkk below
                 <a href='https://wwww.yourcareerex.com/reset-password/${token}'>Reset Password<a/>

                 ${token}
                 </h1>`
                
        }

        await mailTranport.sendMail(mailDetails)
    } catch (error) {
        console.log(error)
    }
}

 const validEmail = (email) => {
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

module.exports = {
    sendForgottenPasswordEmail, 
     validEmail
}

// a package in nodejs used to send an email
// bcrypt for hashing password
// for generating token


