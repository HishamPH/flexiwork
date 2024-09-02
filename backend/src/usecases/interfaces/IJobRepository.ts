import Job from "../../entity/jobEntity";
interface IJobRepsoitory{
  addJob(job:Job):Promise<{}|null>
  getRecruiterJobs(recruiterId:string):Promise<{}|null>
  editJob(job:Job):Promise<{}|null>
  getAllJobs():Promise<{}|null>
  getJob(jobId:string):Promise<{}|null>
  applyJob(jobId:string,userId:string):Promise<{}|null>
  getApplicants(jobId:string):Promise<{}|null>
}
export default IJobRepsoitory;





