import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { globalErrorHandler } from './utilities/errors/globalErrorHandler';
import { routes } from './routes';
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT) || 3000;

app.use(
  json(),
  urlencoded({ extended: false }),
  morgan('dev'),
  cors()
);

app.use('/api/v1', routes(express));
app.use(globalErrorHandler);

app.listen(port, (err) => {
  if (err) {
    throw new Error(err.message)
  }
  console.log(`Server is running on port ${port}`);
});
