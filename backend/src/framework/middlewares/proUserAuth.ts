import { NextFunction, Request, Response } from "express";
import jwt, {
  Secret,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import JwtTokenService from "../services/JwtToken";
import UserRepository from "../repository/userRepository";

const jwtToken = new JwtTokenService();

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: DecodedToken;
    }
  }
}

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
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized route",
        isProExpired: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error or db error",
    });
    console.log(error);
  }
};
