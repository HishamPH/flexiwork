import { Request, Response, NextFunction } from "express";
import AuthUseCase from "../usecases/authUseCases";

class AuthController {
  private authCase: AuthUseCase;

  constructor(authCase: AuthUseCase) {
    this.authCase = authCase;
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;

      // add interfaces

      const user = await this.authCase.registrationUser(userData);
      if (user.activationToken) {
        res.cookie("activationToken", user.activationToken, {
          httpOnly: true,
          secure: true,
        });
      }
      return res.status(user?.statusCode).json({ ...user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { otp } = req.body;
      const token = req.cookies.activationToken;
      const user = await this.authCase.activateUser(token, otp);
      if (user.accessToken && user.refreshToken) {
        res.cookie("refreshToken", user.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", user.accessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(user?.statusCode).json({ ...user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.activationToken as string;
      const type = req.body.type as string;

      const user = await this.authCase.resendOtp(token);
      if (user.activationToken) {
        res.cookie("activationToken", user.activationToken, {
          httpOnly: true,
          secure: true,
        });
      }
      res.status(user?.statusCode).json({ ...user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const result = await this.authCase.loginUser(user);

      if (result.refreshToken && result.accessToken) {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", result.accessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      res.status(result.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("logout");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User LogOut success fully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default AuthController;
