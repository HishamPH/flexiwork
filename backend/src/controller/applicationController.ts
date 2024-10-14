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
      application.resume = req.file?.filename;
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

  async getInterviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, applicationId } = req.body;
      const result = await this.applicationCase.getInterviews(
        userId,
        applicationId
      );
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async updateInterview(req: Request, res: Response, next: NextFunction) {
    try {
      const { applicationId, interview } = req.body;
      const result = await this.applicationCase.updateInterview(
        applicationId,
        interview
      );
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async deleteInterview(req: Request, res: Response, next: NextFunction) {
    try {
      const { applicationId } = req.body;
      const result = await this.applicationCase.deleteInterview(applicationId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getMeetings(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { date, role } = req.query;
      const result = await this.applicationCase.getMeetings(id, date, role);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getMeetingToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.applicationCase.getMeetingToken(id);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ApplicationController;
