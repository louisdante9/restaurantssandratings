import { Schema, model } from "mongoose"

const restaurant = new Schema({
  name: { type: String },
  location: String,
  status: String,
  comments: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, comment: String }]
});
const Restaurant = model('Restaurant', restaurant);
export default Restaurant
