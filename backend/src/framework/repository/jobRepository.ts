import Job from "../../entity/jobEntity";
import IJobRepsoitory from "../../usecases/interfaces/IJobRepository";
import jobModel from "../databases/jobModel";
import applicationModel from "../databases/applicationModel";

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

export default class JobRepository implements IJobRepsoitory {
  async addJob(job: Job): Promise<{} | null> {
    try {
      const newJob = await jobModel.create(job);
      return newJob;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getRecruiterJobs(recruiterId: string): Promise<{} | null> {
    try {
      const jobs = await jobModel.find({ recruiterId: recruiterId });
      return jobs;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async editJob(job: Job, jobId: string): Promise<{} | null> {
    try {
      const updatedJob = await jobModel.findByIdAndUpdate(
        jobId,
        {
          $set: {
            jobName: job.jobName,
            description: job.description,
            responsibilities: job.responsibilities,
            niceToHaves: job.niceToHaves,
            postDate: job.postDate,
            dueDate: job.dueDate,
            jobType: job.jobType,
            minSalary: job.minSalary,
            maxSalary: job.maxSalary,
            skills: job.skills,
            location: job.location,
            remote: job.remote,
          },
        },
        { new: true }
      );
      return updatedJob;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getAllJobs(query: JobQuery): Promise<{} | null> {
    try {
      const {
        page = 1,
        limit = 4,
        name,
        type,
        location,
        minSalary,
        maxSalary,
        remote,
      } = query;
      console.log(remote);
      const queryObj: any = {};
      if (name) {
        queryObj.jobName = { $regex: name, $options: "i" };
      }

      if (location) {
        queryObj.location = { $regex: location, $options: "i" };
      }

      if (type !== "All") {
        queryObj.jobType = type;
      }

      if (minSalary || maxSalary) {
        if (minSalary) {
          queryObj.minSalary = { $gte: minSalary };
        }

        if (maxSalary) {
          queryObj.maxSalary = { $lte: maxSalary };
        }
      }

      if (remote === true) {
        queryObj.remote = remote;
      }

      const totalDocuments = await jobModel.countDocuments(queryObj);

      const jobs = await jobModel
        .find(queryObj)
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit);

      const totalPages = Math.ceil(totalDocuments / limit);
      return { jobs, totalPages };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getJob(jobId: string): Promise<{} | null> {
    try {
      const job = await jobModel.findById(jobId).select("-__v");
      return job;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async isApplied(jobId: string, userId: string): Promise<boolean | null> {
    try {
      const isApplied = await applicationModel.findOne({
        candidateId: userId,
        jobId: jobId,
      });
      if (isApplied) return true;
      else return false;
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
        { new: true }
      );
      return job;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getApplicants(jobId: string): Promise<{} | null> {
    try {
      const applicants = await applicationModel
        .find({ jobId: jobId })
        .populate({ path: "candidateId", select: "-password -__v" });
      return applicants;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
