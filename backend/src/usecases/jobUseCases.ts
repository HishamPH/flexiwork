import { ResolveFnOutput } from "module";
import Job from "../entity/jobEntity";
import IJobRepsoitory from "./interfaces/IJobRepository";

interface ResponseType {
  _id?: string;
  result?: Job | {} | null;
  status?: boolean;
  statusCode: number;
  message?: string;
  isApplied?: boolean | null;
}

interface JobQuery {
  page?: number; // Optional, page number for pagination
  limit?: number; // Optional, limit of jobs per page
  name?: string; // Optional, job title or name to search for
  type?: string; // Optional, type of employment (e.g., "Applied", "Reviewed", etc.)
  location?: string; // Optional, location to filter by
  minSalary?: number; // Optional, minimum salary for filtering
  maxSalary?: number; // Optional, maximum salary for filtering
  remote?: boolean; // Optional, filter for remote jobs
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
        message: "job added Successfully",
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async editJob(job: Job, jobId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.editJob(job, jobId);
      return {
        status: true,
        statusCode: 200,
        message: "job Edited Successfully",
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getRecruiterJobs(recruiterId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.getRecruiterJobs(recruiterId);
      return {
        status: true,
        statusCode: 200,
        message: "job added Successfully",
        result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getAllJobs(query: JobQuery): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.getAllJobs(query);
      return {
        status: true,
        statusCode: 200,
        message: "all jobs are returned",
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getJob(jobId: string, userId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.getJob(jobId);
      const isApplied = await this.iJobRepository.isApplied(jobId, userId);
      return {
        status: true,
        statusCode: 200,
        message: "got the job detail",
        result,
        isApplied,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async applyJob(jobId: string, userId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.applyJob(jobId, userId);
      return {
        status: true,
        statusCode: 200,
        message: "applied for the job",
        result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async getApplicants(jobId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.getApplicants(jobId);
      return {
        status: true,
        statusCode: 200,
        message: "applied for the job",
        result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async blockJob(jobId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.blockJob(jobId);
      return {
        status: true,
        statusCode: 200,
        message: "job status changed",
        result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async deleteJob(jobId: string): Promise<ResponseType> {
    try {
      const result = await this.iJobRepository.deleteJob(jobId);
      return {
        status: true,
        statusCode: 200,
        message: "applied for the job",
        result,
      };
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
