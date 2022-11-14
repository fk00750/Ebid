import { Request, Response, NextFunction } from "express";
import User from "../../models/user";
import Joi from "joi";
import CustomErrorHandler from "../../utils/CustomErrorHandler";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerValidateSchemaa = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
    });

    const { error } = registerValidateSchemaa.validate(req.body);

    if (error) {
      return next(error);
    }

    // checking user exists
    try {
      const exist = await User.exists({ email: req.body.email });

      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is not available")
        );
      }
    } catch (error) {
      return next(error);
    }

    const { username, email, password  } = req.body;

    // create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    try {
      const user = await newUser.save();
      if (user) {
        res.status(200).json({
          message: "User Registered Successfully",
          user: user,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    return next(error);
  }
};

export default registerUser;
