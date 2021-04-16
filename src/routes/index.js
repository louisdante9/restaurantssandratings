 import { AsyncWrapper } from '../middlewares/AsyncWrapper';
// import { success } from '../utilities/helpers/response';
// import { fetchAll } from '../controllers/restaurants';
import { signup, changePassword } from '../controllers/auth'
import { login, deleteUser } from '../controllers/logIn'
import { forgot, changeUserName} from '../controllers/forgotPassword'
import { reset, resetPassword } from '../controllers/resetPassword'

export const routes = ({ Router }) => {
  const router = Router();

  router.get('/restaurants', (req, res) => {
    res.send({
      message: 'restaurants fetched successfully',
      restaurants: [{
        name: "The place",
        location: "Satellite town",
        status: "open",
        daysOpen: "monday-sunday",
        comments: [{
          userid: 1,
          comments: "food is trash"
        }],
        ratings: [{
          userid: 1,
          rating: '2/5'
        }],
        avarageRating: '3/5'
      }]
    })
  })
  router.post('/register', AsyncWrapper(signup))
  router.post('/login', AsyncWrapper(login))
  router.post('/forgot', AsyncWrapper(forgot))            
  router.post('/change', AsyncWrapper(changeUserName))            
  router.post('/delete', AsyncWrapper(deleteUser))            
  router.post('/update', AsyncWrapper(changePassword))            
  router.get('/reset/:token', AsyncWrapper(reset))            
  router.post('/reset/:token', AsyncWrapper(resetPassword))            
  return router;
};
   