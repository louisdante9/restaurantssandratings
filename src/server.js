import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { globalErrorHandler } from "./utilities/errors/globalErrorHandler";
import { routes } from "./routes";
import db from "./config";
import dbconnect from "./config/dbcnx";
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || 8000;

app.use(json(), urlencoded({ extended: false }), morgan("dev"), cors());

dbconnect(db)
  .then(() => {
    app.use("/api/v1", routes(express));
    app.get("/", (req, res) =>
      res.send("welcome to restaurants and ratings api")
    );
    app.use(globalErrorHandler);
    app.get("*", (req, res) => res.send({ err: "route not found" }));
    console.log("Database connected on port 27017");
    app.listen(port, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => err);
