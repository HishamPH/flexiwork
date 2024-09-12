import Application from "../../entity/applicationEntity";

interface IApplicationRepository {
  applyJob(application: Application): Promise<{} | null>;
  getApplications(userId: string): Promise<{} | null>;
  changeStatus(applicationId: string, status: string): Promise<{} | null>;
}

export default IApplicationRepository;
