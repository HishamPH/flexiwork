import mongoose from "mongoose";
import Application from "../../entity/applicationEntity";
import Interview from "../../entity/interviewEntity";
import IApplicationRepository from "../../usecases/interfaces/IApplicationRepository";
import applicationModel from "../databases/applicationModel";

import interviewModel from "../databases/interviewModel";
import userModel from "../databases/userModel";

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

  async getApplication(applicationId: string): Promise<{} | null> {
    try {
      const app = await applicationModel
        .findById(applicationId)
        .populate([
          {
            path: "candidateId",
            select: "-password -paymentDetails -isBlocked -__v",
          },
          { path: "interview" },
        ])
        .select("-__v");

      return app;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getInterviews(userId: string): Promise<{} | null> {
    try {
      const user = await userModel.findById(userId);

      if (user?.role === "candidate") {
        const interviews = await interviewModel
          .find({
            candidate: userId,
          })
          .select("-__v")
          .populate([
            {
              path: "recruiter",
              select: "-password -paymentDetails -isBlocked -__v",
            },
            {
              path: "candidate",
              select: "-password -paymentDetails -isBlocked -__v",
            },
          ]);
        return interviews;
      } else if (user?.role === "recruiter") {
        const interviews = await interviewModel
          .find({
            recruiter: userId,
          })
          .select("-__v")
          .populate([
            {
              path: "recruiter",
              select: "-password -paymentDetails -isBlocked -__v",
            },
            {
              path: "candidate",
              select: "-password -paymentDetails -isBlocked -__v",
            },
          ]);
        return interviews;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateInterview(
    applicationId: string,
    interview: Interview
  ): Promise<Interview | null> {
    try {
      const app = await applicationModel
        .findById(applicationId)
        .populate("candidateId");

      if (app) {
        if (app.interview) {
          const interviewId = app.interview._id;
          const updatedInterview = await interviewModel.findByIdAndUpdate(
            interviewId,
            interview,
            {
              new: true,
            }
          );
          return updatedInterview;
        } else {
          interview.candidate = app.candidateId._id;
          const newInterview = await interviewModel.create(interview);
          app.interview = newInterview._id;
          await app.save();
          return newInterview;
        }
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async deleteInterview(applicationId: string): Promise<{} | null> {
    try {
      const app = await applicationModel.findById(applicationId);

      if (app && app.interview) {
        const interviewId = app.interview;
        const newInterview = await interviewModel.findByIdAndDelete(
          interviewId
        );
        app.interview = null;
        await app.save();
        return newInterview;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
