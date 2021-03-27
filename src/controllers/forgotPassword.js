import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import moment from 'moment'
dotenv.config()

import User from '../models/userSchema'
import { forgotValidator } from'../validators/forgotValidator'


export const forgot = (req, res) => {
    
    const {errors, isValid} = forgotValidator(req.body)
    
    const time = moment().add(1,'hours').format('llll')

if (!isValid) {
    return res.status(400).json(errors);
}
User.findOne({
    email: req.body.email
}).then(user=>{
if (!user) {
    res.status(402).json({
        email: 'user not in database'
    }) }
    else {
const token = crypto.randomBytes(20).toString('hex')
user.update({
    resetPassword: token,
    resetPasswordExpires: Date.now() + 3600
})
const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    },
})
const mailoptions = {
from: 'jumboperebara0@gmail.com',
to: `${user.email}`,
subject: 'Link to Reset Password',
text:

` Dear ${user.firstName}You are receiving this email because have requested for reset of password for your account. \n\n`
+ 'Please click the following link to rest it\n\n'
+`http://localhost:8000/api/v1/reset/${token}\n\n`
+`expires: ${time}\n`
}
console.log('sendin email')
transport.sendMail(mailoptions,( err, response) =>{
    if(err){
console.error('there was an error', err)
} else {
console.log('here is the res', response)
res.status(200).json('recovery email sent')
}
    })
}
})
} 