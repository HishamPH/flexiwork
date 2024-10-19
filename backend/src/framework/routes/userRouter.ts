import express from "express";
import AuthRepository from "../repository/authRepository";
import UserRepository from "../repository/userRepository";
import JwtTokenService from "../services/jwtToken";
import SendEmail from "../services/sendEmail";
import AuthUseCase from "../../usecases/authUseCases";
import UserUseCase from "../../usecases/userUseCases";
import AuthController from "../../controller/authController";
import UserController from "../../controller/userController";
import { uploadImage, uploadResume } from "../services/multer";
import { userAuth } from "../middlewares/userAuth";
import { proUserAuth } from "../middlewares/proUserAuth";
import JobRepository from "../repository/jobRepository";
import JobUseCase from "../../usecases/jobUseCases";
import JobController from "../../controller/jobController";

import ApplicationRepository from "../repository/applicationRepository";
import ApplicationUseCase from "../../usecases/applicationUseCases";
import ApplicationController from "../../controller/applicationController";

import ChatRepository from "../repository/chatRepository";
import ChatUseCase from "../../usecases/chatUseCases";
import ChatController from "../../controller/chatController";
import Payment from "../services/payment";
import PaymentUseCase from "../../usecases/paymentUseCases";

import { socketIo } from "../services/socketIo";
import { AgendaScheduler } from "../services/agenda";
import GoogleAuth from "../services/googleAuth";

const userRouter = express.Router();
const agendaScheduler = new AgendaScheduler(socketIo);

const googleAuth = new GoogleAuth();
const JwtToken = new JwtTokenService();
const sendEmail = new SendEmail();
const payment = new Payment();
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const jobRepository = new JobRepository();
const applicationRepository = new ApplicationRepository();
const chatRepository = new ChatRepository();

const authUseCase = new AuthUseCase(
  authRepository,
  sendEmail,
  JwtToken,
  googleAuth
);
const paymentUseCase = new PaymentUseCase(userRepository, payment);
const userUseCase = new UserUseCase(userRepository, socketIo);
const jobUseCase = new JobUseCase(jobRepository);
const applicationUseCase = new ApplicationUseCase(
  applicationRepository,
  agendaScheduler
);
const chatUseCase = new ChatUseCase(chatRepository, socketIo);

const authController = new AuthController(authUseCase);
const userController = new UserController(userUseCase, paymentUseCase);
const jobController = new JobController(jobUseCase);
const applicationController = new ApplicationController(applicationUseCase);
const chatController = new ChatController(chatUseCase);

userRouter.post("/google/auth", (req, res, next) => {
  authController.googleLogin(req, res, next);
});

userRouter.post("/signup", (req, res, next) => {
  authController.registerUser(req, res, next);
});

userRouter.post("/register-user", (req, res, next) => {
  authController.activateUser(req, res, next);
});

userRouter.post("/resend-otp", (req, res, next) => {
  authController.resendOtp(req, res, next);
});

userRouter.post("/signin", (req, res, next) => {
  authController.loginUser(req, res, next);
});

userRouter.post("/update-profile", userAuth, uploadImage, (req, res, next) => {
  userController.updateProfile(req, res, next);
});

userRouter.get("/get-user/:id", userAuth, (req, res, next) => {
  userController.getUser(req, res, next);
});

userRouter.get("/get-all-jobs", userAuth, (req, res, next) => {
  jobController.getAllJobs(req, res, next);
});

userRouter.post("/recruiter/add-job", userAuth, (req, res, next) => {
  jobController.addJob(req, res, next);
});

userRouter.post("/recruiter/edit-job/:id", userAuth, (req, res, next) => {
  jobController.editJob(req, res, next);
});

userRouter.post("/recruiter/delete-job", userAuth, (req, res, next) => {
  jobController.deleteJob(req, res, next);
});

userRouter.post("/recruiter/block-job", userAuth, (req, res, next) => {
  jobController.blockJob(req, res, next);
});

userRouter.get("/recruiter/get-jobs/:id", userAuth, (req, res, next) => {
  jobController.getRecruiterJobs(req, res, next);
});

userRouter.put(
  "/candidate/apply-job/:id",
  userAuth,
  uploadResume,
  (req, res, next) => {
    applicationController.applyJob(req, res, next);
  }
);

userRouter.get(
  "/candidate/get-applications/:id",
  userAuth,
  (req, res, next) => {
    applicationController.getApplications(req, res, next);
  }
);

userRouter.get("/recruiter/get-applicants/:id", userAuth, (req, res, next) => {
  jobController.getApplicants(req, res, next);
});

userRouter.post("/recruiter/application-status", userAuth, (req, res, next) => {
  applicationController.changeStatus(req, res, next);
});

userRouter.post("/get-interviews", userAuth, proUserAuth, (req, res, next) => {
  applicationController.getInterviews(req, res, next);
});

userRouter.get("/get-meetings/:id", userAuth, (req, res, next) => {
  applicationController.getMeetings(req, res, next);
});

userRouter.post(
  "/recruiter/update-interview",
  userAuth,
  proUserAuth,
  (req, res, next) => {
    applicationController.updateInterview(req, res, next);
  }
);

userRouter.post(
  "/recruiter/delete-interview",
  userAuth,
  proUserAuth,
  (req, res, next) => {
    applicationController.deleteInterview(req, res, next);
  }
);

userRouter.get(
  "/get-meeting-token/:id",
  userAuth,
  //proUserAuth,
  (req, res, next) => {
    applicationController.getMeetingToken(req, res, next);
  }
);

userRouter.get("/candidate/job-detail/:id", userAuth, (req, res, next) => {
  jobController.getJob(req, res, next);
});

userRouter.post("/chat/get-messages/:id", userAuth, (req, res, next) => {
  chatController.getMessages(req, res, next);
});

userRouter.get("/get-notifications/:id", userAuth, (req, res, next) => {
  chatController.getNotifications(req, res, next);
});

userRouter.post("/clear-notifications", userAuth, (req, res, next) => {
  chatController.clearNotifications(req, res, next);
});

userRouter.post("/delete-notification", userAuth, (req, res, next) => {
  chatController.deleteNotification(req, res, next);
});

userRouter.post("/chat/get-conversations", userAuth, (req, res, next) => {
  chatController.getConversations(req, res, next);
});

userRouter.post("/chat/send-message/:id", userAuth, (req, res, next) => {
  chatController.sendMessage(req, res, next);
});

userRouter.post("/upgrade-request", userAuth, (req, res, next) => {
  userController.upgradeUserRequest(req, res, next);
});

userRouter.post("/upgrade-verification", userAuth, (req, res, next) => {
  userController.verifyPayment(req, res, next);
});

userRouter.post("/demote-user", userAuth, (req, res, next) => {
  userController.demoteUser(req, res, next);
});

userRouter.post("/logout", (req, res, next) => {
  authController.logoutUser(req, res, next);
});

export default userRouter;
