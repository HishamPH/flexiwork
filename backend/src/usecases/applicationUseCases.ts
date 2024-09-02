
import Application from "../entity/applicationEntity";
import IApplicationRepository from "./interfaces/IApplicationRepository";

interface ResponseType {
  _id?: string;
  result?: Application|{}|null;
  status?: boolean;
  statusCode: number;
  message?: string;
}

class ApplicationUseCase{
  private iApplicationRepository:IApplicationRepository
  constructor(iApplicationRepository:IApplicationRepository){
    this.iApplicationRepository = iApplicationRepository;
  }
  async applyJob(application:Application):Promise<ResponseType>{
    try {
      const result = await this.iApplicationRepository.applyJob(application);
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

export default ApplicationUseCase;