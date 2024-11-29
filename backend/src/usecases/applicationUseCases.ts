import Application from "../entity/applicationEntity";
import IApplicationRepository from "./interfaces/IApplicationRepository";
import Interview from "../entity/interviewEntity";
import IAgendaScheduler from "./interfaces/IAgendaScheduler";
import { generateToken } from "../framework/services/agoraio";

interface ResponseType {
  _id?: string;
  result?: Application | Interview | {} | null;
  status?: boolean;
  statusCode: number;
  message?: string;
  app?: Application | {} | null;
  token?: any;
}

class ApplicationUseCase {
  private iApplicationRepository: IApplicationRepository;
  private iAgendaScheduler: IAgendaScheduler;
  constructor(
    iApplicationRepository: IApplicationRepository,
    iAgendaScheduler: IAgendaScheduler
  ) {
    this.iApplicationRepository = iApplicationRepository;
    this.iAgendaScheduler = iAgendaScheduler;
  }
  async applyJob(application: Application): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.applyJob(application);
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

  async getApplications(userId: string): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.getApplications(userId);
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

  async changeStatus(
    applicationId: string,
    status: string
  ): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.changeStatus(
        applicationId,
        status
      );
      return {
        status: true,
        statusCode: 200,
        message: "Status changed",
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

  async getInterviews(
    userId: string,
    applicationId: string
  ): Promise<ResponseType> {
    try {
      const app = await this.iApplicationRepository.getApplication(
        applicationId
      );
      const result = await this.iApplicationRepository.getInterviews(userId);
      return {
        status: true,
        statusCode: 200,
        message: "interviews are returned",
        result,
        app,
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

  async updateInterview(
    applicationId: string,
    interview: Interview
  ): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.updateInterview(
        applicationId,
        interview
      );

      let date = new Date();
      if (result) {
        date = new Date(new Date(result?.start).getTime() - 5 * 60 * 1000);
      }
      const job = await this.iAgendaScheduler.scheduleJob(
        "meet alert",
        date,
        result
      );

      return {
        status: true,
        statusCode: 200,
        message: "interview scheduled",
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

  async deleteInterview(applicationId: string): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.deleteInterview(
        applicationId
      );
      return {
        status: true,
        statusCode: 200,
        message: "Interview deleted",
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

  async getMeetings(
    userId: string,
    query: any,
    role: any
  ): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.getMeetings(
        userId,
        query,
        role
      );
      return {
        status: true,
        statusCode: 200,
        message: "meetins are fetched",
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

  async getMeetingToken(
    interviewId: string,
    role: string
  ): Promise<ResponseType> {
    try {
      const result = await this.iApplicationRepository.getInterview(
        interviewId
      );
      const { _id, start, to } = result;
      const expire = (to - start) / 1000;
      const token = await generateToken(interviewId, 0, role, expire);
      return {
        status: true,
        statusCode: 200,
        message: "meetins are fetched",
        result,
        token,
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

export default ApplicationUseCase;
