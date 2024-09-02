import { ResolveFnOutput } from "module";
import Job from "../entity/jobEntity";
import IJobRepsoitory from "./interfaces/IJobRepository";
interface ResponseType {
  _id?: string;
  result?: Job | {}|null;
  status?: boolean;
  statusCode: number;
  message?: string;
}

class JobUseCase {
  private iJobRepository: IJobRepsoitory;
  constructor(iJobRepository: IJobRepsoitory) {
    this.iJobRepository = iJobRepository;
  }

  async addJob(job: Job): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.addJob(job);
      return {
          status: true,
          statusCode: 200,
          message:'job added Successfully',
          ...result
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getRecruiterJobs(recruiterId:string):Promise<ResponseType>{
    try {
      const result = await this.iJobRepository.getRecruiterJobs(recruiterId);
      return {
          status: true,
          statusCode: 200,
          message:'job added Successfully',
          result
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getAllJobs():Promise<ResponseType>{
    try {
      const result = await this.iJobRepository.getAllJobs();
      return {
          status: true,
          statusCode: 200,
          message:'job added Successfully',
          result
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getJob(jobId:string):Promise<ResponseType>{
    try {
      const result = await this.iJobRepository.getJob(jobId);
      return {
          status: true,
          statusCode: 200,
          message:'got the job detail',
          result
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async applyJob(jobId:string,userId:string):Promise<ResponseType>{
    try {
      const result = await this.iJobRepository.applyJob(jobId,userId);
      return {
          status: true,
          statusCode: 200,
          message:'applied for the job',
          result
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async getApplicants(jobId:string):Promise<ResponseType>{
    try {
      const result = await this.iJobRepository.getApplicants(jobId);
      return {
          status: true,
          statusCode: 200,
          message:'applied for the job',
          result
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
}

export default JobUseCase;
