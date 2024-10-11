import Application from "../../entity/applicationEntity";
import Interview from "../../entity/interviewEntity";

interface IApplicationRepository {
  applyJob(application: Application): Promise<{} | null>;
  getApplications(userId: string): Promise<{} | null>;
  changeStatus(applicationId: string, status: string): Promise<{} | null>;
  getInterviews(userId: string): Promise<{} | null>;
  updateInterview(
    applicationId: string,
    interview: Interview
  ): Promise<Interview | null>;
  deleteInterview(applicationId: string): Promise<{} | null>;

  getApplication(applicationId: string): Promise<{} | null>;
}

export default IApplicationRepository;
