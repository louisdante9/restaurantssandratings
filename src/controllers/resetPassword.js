import User from '../models/userSchema'
import { resetValidator } from '../validators/registerValidator'
import nodemailer from 'nodemailer'
import moment from 'moment'
import dotenv from 'dotenv'
dotenv.config()

 export const reset = (req, res) => {
  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
      .then((user) => {
          if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

          //Redirect user to form with the email address
          res.status(200).json('successful')
      })
      .catch(err => res.status(500).json({message: err.message}));
};

export const resetPassword = (req, res) => {
const {errors, isValid } = resetValidator(req.body)
if (!isValid) {
  return res.status(400).json(errors);
}
const time = moment().fromNow('m')


  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
      .then((user) => {
          if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

          //Set the new password
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          // Save
          user.save((err) => {
              if (err) return res.status(500).json({message: err.message});

              const transport = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                },
            })

              const mailoptions = {
                  to: `${user.email}`,
                  from: `${process.env.EMAIL_ADDRESS}`,
                  subject: "Your password has been changed",
                  text: `Hi ${user.firstName}  ${user.lastName}\n 
                  This is a confirmation that the password for your account ${user.email} has just been changed  ${time}.\n`
              };
              console.log('sendin email')
              transport.sendMail(mailoptions,( err, response) =>{
                  if(err){
              console.error('there was an error', err)
              } else {
              console.log('here is the res', response)
              res.status(200).json(`password updated ${time}`)
              }
                  })
          });
      });
};