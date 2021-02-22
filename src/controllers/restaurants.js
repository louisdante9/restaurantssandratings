import { getAll } from '../repositories/restaurantRepository';
import { success } from '../utilities/helpers/response';

export const fetchAll = async (req, res) => {
  const restaurants = await getAll();
  return success(res, { restaurants })
}
