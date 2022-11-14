import { loginUser, registerUser, userProfile } from "../controllers";

import express from "express";
import passport from "passport";
const AuthRouter = express.Router();

AuthRouter.route("/register").post(registerUser);
AuthRouter.route("/login").post(loginUser);
AuthRouter.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userProfile
);

export default AuthRouter;
