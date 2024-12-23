import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { errorhandler } from "./middleware/errorHandler";
import routes from "./routes/index.route";
import connectDatabase from "./database/database";

const app = express();
app.use(
  cors({
    origin: process.env.APP_ORIGIN!,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();
app.use(config.BASE_PATH, routes);

app.use(errorhandler);

app.listen(config.PORT, () => {
  console.log("run http://localhost:" + config.PORT);
});
