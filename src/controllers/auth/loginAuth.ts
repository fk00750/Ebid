import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import User from "../../models/user";
import CustomErrorHandler from "../../utils/CustomErrorHandler";
import { checkPasswordValid, issueJWT } from "../../utils/helperFunctions";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginValidateSchema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
    });

    const { error } = loginValidateSchema.validate(req.body);

    if (error) return next(CustomErrorHandler.serverError(error.message));

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return next(new Error("User not found"));

      const passwordValid = await checkPasswordValid(
        req.body.password,
        user.password
      );

      if (passwordValid) {
        const tokenObj = issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObj.token,
          expires: tokenObj.expiresIn,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "You entered the wrong password",
        });
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {}
};

export default loginUser;
