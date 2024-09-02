import { Request, Response, NextFunction } from "express";
import JobUseCase from "../usecases/jobUseCases";

class JobController {
  private jobCase: JobUseCase;
  constructor(jobCase: JobUseCase) {
    this.jobCase = jobCase;
  }
  async addJob(req: Request, res: Response, next: NextFunction) {
    try {
      const jobData = req.body;
      const job = await this.jobCase.addJob(jobData);
      return res.status(job?.statusCode).json({ ...job });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async editJob(req: Request, res: Response, next: NextFunction) {
    let jobId = req.params.id;
  }
  async getRecruiterJobs(req: Request, res: Response, next: NextFunction) {
    try {
      let recruiterId = req.params.id;
      const result = await this.jobCase.getRecruiterJobs(recruiterId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getAllJobs(req:Request,res:Response,next:NextFunction){
    try {
      const result = await this.jobCase.getAllJobs();
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getJob(req:Request,res:Response,next:NextFunction){
    try {
      const jobId = req.params.id;
      const result = await this.jobCase.getJob(jobId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async applyJob(req:Request,res:Response,next:NextFunction){
    try {
      const jobId = req.params.id;
      const {userId} = req.body;
      console.log(req.file);
      const result = await this.jobCase.applyJob(jobId,userId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getApplicants(req:Request,res:Response,next:NextFunction){
    try {
      const jobId = req.params.id;
      const result = await this.jobCase.getApplicants(jobId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default JobController;
