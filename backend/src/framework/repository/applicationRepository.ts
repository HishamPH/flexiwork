import Application from "../../entity/applicationEntity";
import IApplicationRepository from "../../usecases/interfaces/IApplicationRepository";
import applicationModel from "../databases/applicationModel";
import jobModel from "../databases/jobModel";

export default class ApplicationRepository implements IApplicationRepository {
  async applyJob(application: Application): Promise<{} | null> {
    try {
      const newApplication = await applicationModel.create(application);
      return newApplication;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
