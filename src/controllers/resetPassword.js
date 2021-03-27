import User from '../models/userSchema'
import { resetValidator } from '../validators/resetValidator'
import bcrypt from 'bcrypt'


export const resetPassword = (req, res)=> {
const{errors, isValid} = resetValidator(req.body)
if(!isValid) {
  return res.status(400).json(errors)
}
    User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordTokenExpire: {
          $gt: Date.now()
        }
    
      })
    


}