import { Request, Response, NextFunction } from "express";
import ApplicationUseCase from "../usecases/applicationUseCases";

class ApplicationController {
  private applicationCase: ApplicationUseCase;
  constructor(applicationCase: ApplicationUseCase) {
    this.applicationCase = applicationCase;
  }
  async applyJob(req: Request, res: Response, next: NextFunction) {
    try {
      let jobId = req.params.id;
      const { ...application } = req.body;
      application.jobId = jobId;
      console.log(req.file);
      application.resume = req.file?.filename;
      console.log(application);
      const result = await this.applicationCase.applyJob(application);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const result = await this.applicationCase.getApplications(userId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("heeeeelooooo");
      const { applicationId, status } = req.body;
      const result = await this.applicationCase.changeStatus(
        applicationId,
        status
      );
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ApplicationController;
