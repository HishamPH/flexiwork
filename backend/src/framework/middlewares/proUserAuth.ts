import { NextFunction, Request, Response } from "express";
import UserRepository from "../repository/userRepository";

// declare global {
//   namespace Express {
//     interface Request {
//       user: DecodedToken;
//     }
//   }
// }

export const proUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = new UserRepository();
    let id = req.user.id;
    let user = await userRepository.findUser(id);
    if (user && user.isPro) {
      if (user.proExpiry.getTime() <= Date.now()) {
        const result = await userRepository.demoteUser(user._id);
        console.log("the user had to be demoted this way");
        res.status(401).json({
          message: "Very unauthorised route",
          isProExpired: true,
          user,
        });
      }
    } else {
      console.log("like i said very unauthorized route scary!!!!");
      res.status(401).json({
        message: "Very unauthorised route",
        isProExpired: true,
        user,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "internal server error or db error",
    });
    console.log(error);
  }
};
