import { Request, Response, NextFunction } from "express";
import ApplicationUseCase from "../usecases/applicationUseCases";


class ApplicationController{
  private applicationCase:ApplicationUseCase;
  constructor(applicationCase:ApplicationUseCase){
    this.applicationCase  = applicationCase;
  }
  async applyJob(req:Request,res:Response,next:NextFunction){
    try {
      let jobId = req.params.id;
      const {...application} = req.body;
      application.jobId = jobId;
      console.log(req.file);
      application.resume = req.file?.filename
      console.log(application)
      const result = await this.applicationCase.applyJob(application);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ApplicationController;











