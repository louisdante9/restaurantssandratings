import { db } from '../config/firebase';

export const getAll = async () => {
  try {
    const restRef = await db.collection('restaurants').get();
    const restaurants = restRef.docs.map((restaurant) => restaurant.data());
    return restaurants;
  } catch (error) {
    return error
  }
}
