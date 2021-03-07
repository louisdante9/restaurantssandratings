import express, { json, response, urlencoded } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import { globalErrorHandler } from './utilities/errors/globalErrorHandler';
import { routes } from './routes';
import { DB } from './config/db'
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT) || 3000;


mongoose.connect(DB, { useNewUrlParser: true }).then(
  (res) => {console.log('Connected' + res) },
 
).catch( err => console.log('Can not connect to the database'+ err))


app.use(
  json(),
  urlencoded({ extended: false }),
  morgan('dev'),
  cors()
);

app.use('/api/v1', routes(express));

app.use(globalErrorHandler);
app.get('/', (req, res)=> {
  res.send('Hello There')
})
app.get('*', (req, res)=> {
  res.send({
    err: 'not found'
  })
})
app.listen(port, (err) => {
  if (err) {
    throw new Error(err.message)
  }
  console.log(`Server is running on port ${port}`);
});
