import Job from "../../entity/jobEntity";
import IJobRepsoitory from "../../usecases/interfaces/IJobRepository";
import jobModel from "../databases/jobModel";


export default class JobRepository implements IJobRepsoitory {
  async addJob(job:Job): Promise<{} | null> {
    try {
      const {jobName} = job;
      const newJob = await jobModel.create(job);;
      return newJob;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getRecruiterJobs(recruiterId: string): Promise<{} | null> {
    try {
      const jobs = await jobModel.find({recruiterId:recruiterId});
      return jobs;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async editJob(job: Job): Promise<{} | null> {
    try {
      const job = await jobModel.findByIdAndUpdate;
      console.log(job)
      return job;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getAllJobs(): Promise<{} | null> {
    try {
      const jobs = await jobModel.find().select('-applicants -__v');
      return jobs;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getJob(jobId: string): Promise<{} | null> {
    try {
      const job = await jobModel.findById(jobId).select('-__v');
      return job;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async applyJob(jobId: string, userId: string): Promise<{} | null> {
    try {
      const job = await jobModel.findByIdAndUpdate(
        jobId,
        { $addToSet: { applicants: userId } },
        { new: true}
      );
      return job;
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  async getApplicants(jobId: string): Promise<{} | null> {
    try {
      const applicants = await jobModel.findById(jobId,{applicants:1}).populate('applicants').select('-password');
      return applicants;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
