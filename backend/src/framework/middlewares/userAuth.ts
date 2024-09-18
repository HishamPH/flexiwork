import { NextFunction, Request, Response } from "express";
import jwt, { Secret, TokenExpiredError } from "jsonwebtoken";
import JwtTokenService from "../services/JwtToken";
import userModel from "../databases/userModel";

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

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const authHeader = req.headers["authorization"];
  // const bearerToken = authHeader && authHeader.split(" ")[1];

  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new TokenExpiredError("access Token expires", new Date());
    }
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as DecodedToken;
    req.user = decoded;
    let user = await userModel.findById(decoded.id);
    if (user && user.isBlocked) {
      return res.status(401).json({
        message: "The user is blocked by Admin",
        tokenExpired: true,
      });
    }
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          return res.status(401).json({
            message: "Refresh Token not Available",
            tokenExpired: true,
          });
        }
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as Secret
        ) as DecodedToken;
        const { id, role } = decoded;

        const newAccessToken = await jwtToken.SignInAccessToken({ id, role });
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000,
        });
        req.user = decoded;

        console.log("this is the code for refreshing the accessToken", decoded);
        next();
      } catch (error) {
        console.log(error);
        if (error instanceof TokenExpiredError) {
          return res.status(401).json({
            message: "RefreshToken Expired Login again",
            tokenExpired: true,
          });
        }
      }
    }
  }
};
