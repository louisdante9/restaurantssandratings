import { loginValidator } from '../validators/loginValidator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema'






export const login = (req, res) => {
    const { errors, isValid } = loginValidator(req.body);
   
      if (!isValid) {
        return res.status(400).json(errors);
      }
    const userName = req.body.userName;
      const password = req.body.password;
   
      User.findOne({ userName }).then(user => {
       
        if (!user) {
          return res.status(404).json({ userName: "UserName not found" });
        }
    
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            
            const payload = {
              id: user.id,
              email: user.email
            };
  
            jwt.sign(
              payload,
              "sercet",
              {
                expiresIn: 3600
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ password: "Password incorrect" });
          }
        });
      });
}


export const deleteUser = (req, res) => {
  const {errors, isValid} = loginValidator(req.body)
  
  const userName = req.body.userName
  const password = req.body.password

if (!isValid) {
   return res.status(400).json(errors);
}
User.findOneAndDelete({userName
} ).then(user => {
   if (!user) {
    return   res.status(402).json({
           email: 'user not in database'
       })
    }
    else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          res.status(402).json({
            user: 'User is deleted'
        })
        }
        else {
          return res
          .status(400)
          .json({ password: "Password incorrect" });
        }
      })
    }
})
}