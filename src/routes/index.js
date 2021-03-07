// import { AsyncWrapper } from '../middlewares/AsyncWrapper';
// import { success } from '../utilities/helpers/response';
// import { fetchAll } from '../controllers/restaurants';
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
  return router;
};
