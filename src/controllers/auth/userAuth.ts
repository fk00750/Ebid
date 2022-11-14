import { Request, Response, NextFunction } from "express";

const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.user.role);
    res.status(200).json({
      success: true,
      message: "You are successfully authenticated to this route",
    });
  } catch (error) {}
};

export default userProfile;
