import { AsyncWrapper } from '../middlewares/AsyncWrapper';
import { success } from '../utilities/helpers/response';
import { fetchAll } from '../controllers/restaurants';


import gravatar from 'gravatar'
import bcrypt from 'bcrypt'

import User from '../models/userSchema'
import registerValidator from '../validators/registerValidator'


export const routes = ({ Router }) => {
  const router = Router();

  router.get('/', AsyncWrapper((req, res) => {
    success(res, {
      message: 'Welcome to the Resturant rating API'
    });
  }))
  router.get('/restaurants', AsyncWrapper(fetchAll));

  router.post('/register', function (req, res,) {

    const { errors, isValid } = registerValidator(req.body);
  
    if (!isValid) {
        return res.status(400).json(errors);
    }
  
    User.findOne({
        email: req.body.email
       
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists',
                userName: 'UserName already exists'
            });
        }
        else {
            const profilePic = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
  
  
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                userName: req.body.userName,
                profilePic,
            })
  
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    if (!user) {
                                        return res.status(400).send({
                                            message: 'an errror occured'
                                        })
                                    }
                                    res.json(user)
                                  
  
                                });
  
                        }
                    });
                }
            });
        }
    });
  });

  return router;
};
