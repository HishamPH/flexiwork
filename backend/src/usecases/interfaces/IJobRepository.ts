import Job from "../../entity/jobEntity";
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

interface IJobRepsoitory {
  addJob(job: Job): Promise<{} | null>;
  getRecruiterJobs(recruiterId: string): Promise<{} | null>;
  editJob(job: Job, jobId: string): Promise<{} | null>;
  getAllJobs(query: JobQuery): Promise<{} | null>;
  getJob(jobId: string): Promise<{} | null>;
  applyJob(jobId: string, userId: string): Promise<{} | null>;
  getApplicants(jobId: string): Promise<{} | null>;
  isApplied(jobId: string, userId: string): Promise<boolean | null>;
  blockJob(jobId: string): Promise<{} | null>;
  deleteJob(jobId: string): Promise<{} | null>;
}
export default IJobRepsoitory;
