import { AsyncWrapper } from '../middlewares/AsyncWrapper';
import { success } from '../utilities/helpers/response';
import { fetchAll } from '../controllers/restaurants';
export const routes = ({ Router }) => {
  const router = Router();

  router.get('/', AsyncWrapper((req, res) => {
    success(res, {
      message: 'Welcome to the Resturant rating API'
    });
  }))
  router.get('/restaurants', AsyncWrapper(fetchAll));
  return router;
};
