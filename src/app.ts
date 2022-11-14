import express, { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import passportConfig from "./config/passport";
import errorHandler from "./middlewares/errorHandler";
import AuthRouter from "./routes";
import CustomErrorHandler from "./utils/CustomErrorHandler";

passportConfig(passport);

const app: Express = express();

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", AuthRouter);

app.use(errorHandler);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("<h1>Welcome to Ebid Website</h1>");
  } catch (error) {
    return next(CustomErrorHandler.serverError(error.message));
  }
});

export default app;
