import { NextFunction, Request, Response } from "express";
import jwt, {
  Secret,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import JwtTokenService from "../services/JwtToken";
import UserRepository from "../repository/userRepository";

import {
  getReceiverSocketId,
  io,
  getAllReciverSocketId,
  SocketEntry,
} from "../services/socketIo";

// const jwtToken = new JwtTokenService();

// interface DecodedToken {
//   id: string;
//   role: string;
//   iat: number;
//   exp: number;
// }

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
        // const allReciverSocketId: SocketEntry[] = await getAllReciverSocketId(
        //   decoded.id
        // );
        // if (allReciverSocketId?.length !== 0) {
        //   allReciverSocketId.forEach((item: SocketEntry) => {
        //     io.to(item.socketId).emit("proUserDemoted", result);
        //   });
        // }
        // req.session.isProExpired = true;
      }
    } else {
      console.log("like i said very unauthorized route scary!!!!");
      return res.status(401).json({
        message: "Very unauthorised route",
        isProExpired: true,
        user,
      });
    }
    console.log("pro user Authentication is working properly");
    next();
  } catch (error) {
    res.status(500).json({
      message: "internal server error or db error",
    });
    console.log(error);
  }
};
