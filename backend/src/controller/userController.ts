import { Request, Response, NextFunction } from "express";

import UserUseCase from "../usecases/userUseCases";

class UserController {
  private userCase: UserUseCase;
  constructor(userCase: UserUseCase) {
    this.userCase = userCase;
  }
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { ...userData } = req.body;
      if (req.file) {
        userData.profilePic = req.file.filename;
      }
      const user = await this.userCase.updateProfile(userData);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userCase.getUser(id);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default UserController;
