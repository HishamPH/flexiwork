import { NextFunction, Request, Response } from "express";
import jwt, { Secret, TokenExpiredError } from "jsonwebtoken";
import JwtTokenService from "../services/jwtToken";

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
      admin: DecodedToken;
    }
  }
}

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.adminAccessToken;
    // if (!accessToken) {
    //   throw new TokenExpiredError("access Token expires", new Date());
    // }
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as DecodedToken;
    req.admin = decoded;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      try {
        const refreshToken = req.cookies.adminRefreshToken;
        if (!refreshToken) {
          res.status(401).json({
            message: "Refresh Token not Available",
            tokenExpired: true,
            isAdmin: true,
          });
        }
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as Secret
        ) as DecodedToken;
        const { id, role } = decoded;

        const newAccessToken = await jwtToken.SignInAccessToken({ id, role });
        res.cookie("adminAccessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        req.admin = decoded;

        console.log("this is the code for refreshing the accessToken", decoded);
        next();
      } catch (error) {
        console.log(error);
        if (error instanceof TokenExpiredError) {
          res.status(401).json({
            message: "RefreshToken Expired Login again",
            tokenExpired: true,
            isAdmin: true,
          });
        }
      }
    } else {
      console.log(error);
    }
  }
};
