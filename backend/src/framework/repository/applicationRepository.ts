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

  async getApplications(userId: string): Promise<{} | null> {
    try {
      const applications = await applicationModel
        .find({ candidateId: userId })
        .populate("jobId")
        .select("-__v");

      if (applications) return applications;
      else return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async changeStatus(
    applicationId: string,
    status: string
  ): Promise<{} | null> {
    try {
      const application = await applicationModel.findByIdAndUpdate(
        applicationId,
        {
          status: status,
        },
        { new: true }
      );
      return application;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
