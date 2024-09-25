import { Request, Response, NextFunction } from "express";

import AdminUseCase from "../usecases/adminUseCases";

class AdminController {
  private adminCase: AdminUseCase;
  constructor(adminCase: AdminUseCase) {
    this.adminCase = adminCase;
  }

  async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await this.adminCase.loginAdmin(email, password);
      if (result.accessToken && result.refreshToken) {
        res.cookie("adminAccessToken", result.accessToken, {
          maxAge: 30 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("adminRefreshToken", result.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 10000,
          httpOnly: true,
        });
      }
      res.status(result.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async blockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, action } = req.body;
      const result = await this.adminCase.blockUser(userId, action);
      res.status(result.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCandidates(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adminCase.getCandidates();
      res.status(result.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getRecruiters(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adminCase.getRecruiters();
      res.status(result.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async logoutAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("adminAccessToken");
      res.clearCookie("adminRefreshToken");
      res.status(200).json({ message: "Admin logged Out success Fully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default AdminController;
