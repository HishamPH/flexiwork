import express from 'express';
import AuthRepository from '../repository/authRepository';
import UserRepository from '../repository/userRepository';
import JwtTokenService from '../services/JwtToken';
import SendEmail from '../services/sendEmail';
import AuthUseCase from '../../usecases/authUseCases';
import UserUseCase from '../../usecases/userUseCases';
import AuthController from '../../controller/authController';
import UserController from '../../controller/userController';
import uploadImage,{uploadResume} from '../services/multer';
import { userAuth } from '../middlewares/userAuth';
import JobRepository from '../repository/jobRepository';
import JobUseCase from '../../usecases/jobUseCases';
import JobController from '../../controller/jobController';


import ApplicationRepository from '../repository/applicationRepository';
import ApplicationUseCase from '../../usecases/applicationUseCases';
import ApplicationController from '../../controller/applicationController';


const userRouter = express.Router()

const authRepository = new AuthRepository();

const JwtToken = new JwtTokenService();
const sendEmail = new SendEmail();
const authUseCase = new AuthUseCase(
  authRepository,
  sendEmail,
  JwtToken
)
const authController = new AuthController(authUseCase)


const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

const jobRepository = new JobRepository();
const jobUseCase = new JobUseCase(jobRepository);
const jobController = new JobController(jobUseCase);

const applicationRepository = new ApplicationRepository();
const applicationUseCase = new ApplicationUseCase(applicationRepository);
const applicationController = new ApplicationController(applicationUseCase);




userRouter.post('/signup',(req,res,next)=>{
  authController.registerUser(req,res,next);
})

userRouter.post('/register-user',(req,res,next)=>{
  authController.activateUser(req,res,next);
})

userRouter.post('/resend-otp',(req,res,next)=>{
  authController.resendOtp(req,res,next);
})

userRouter.post('/signin',(req,res,next)=>{
  authController.loginUser(req,res,next);
})


userRouter.post('/update-profile',uploadImage,
  (req,res,next)=>{
  userController.updateProfile(req,res,next);
})

userRouter.get('/get-user/:id',(req,res,next)=>{
  userController.getUser(req,res,next);
})

userRouter.get('/get-all-jobs',(req,res,next)=>{
  jobController.getAllJobs(req,res,next);
})

userRouter.post('/recruiter/add-job',(req,res,next)=>{
  jobController.addJob(req,res,next);
})

userRouter.post('/recruiter/edit-job/:id',(req,res,next)=>{
  jobController.editJob(req,res,next);
})

userRouter.get('/recruiter/get-jobs/:id',(req,res,next)=>{
  jobController.getRecruiterJobs(req,res,next);
})

userRouter.get('/recruiter/get-applicants/:id',(req,res,next)=>{
  jobController.getApplicants(req,res,next);
})

userRouter.get('/candidate/job-detail/:id',(req,res,next)=>{
  jobController.getJob(req,res,next);
})

userRouter.put('/candidate/apply-job/:id',uploadResume,(req,res,next)=>{
  applicationController.applyJob(req,res,next);
})

export default userRouter;