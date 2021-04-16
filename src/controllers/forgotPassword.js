import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

import moment from 'moment'
dotenv.config()

import User from '../models/userSchema'
//import Token from '../models/token'
import { changeValidator, forgotValidator } from'../validators/forgotValidator'

export const forgot = (req, res) => {
    const {errors, isValid} = forgotValidator(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
     const time = moment().add(1,'hours').format('llll')
  
User.findOne({
    email: req.body.email
}).then(user=>{
if (!user) {
    res.status(402).json({
        email: 'user not in database'
    }) }
    else  {
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
        user.resetPasswordExpires = Date.now() + 6000000
        //const newToken =new Token({ userId: user._id, token: crypto.randomBytes(20).toString('hex')}) 
user.save()
.then (user=>{

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
    
    ` Dear ${user.firstName} ${user.lastName} You are receiving this email because have requested for reset of password for your account. \n\n`
    + 'Please click the following link to rest it.\n\n'
    +`http://localhost:8000/api/v1/reset/${user.resetPasswordToken}\n\n`
    +`expires: ${time}\n`
    }

    console.log('sendin email')
    transport.sendMail(mailoptions,( err, response) =>{
        if(err){
    console.error('there was an error', err)
    } else {
    console.log('here is the res', response)
    res.status(200).json(` http://localhost:8000/api/v1/reset/${user.resetPasswordToken}`)
    }
        })
}).catch(err => res.status(500).json ({message: err.message}))
}
})
} 


          
  


export const changeUserName = (req, res) => {
    const {errors, isValid} = changeValidator(req.body)
    
    const email = req.body.email
    const userName = req.body.userName
 
 if (!isValid) {
     return res.status(400).json(errors);
 }
 User.findOneAndUpdate({email
 }, {userName} ).then(user => {
     if (!user) {
     return    res.status(402).json({
             email: 'user not in database'
         })
      }
      else {
          res.status(400).json({
           message:   'user updated'
          })
      }
 })
}
