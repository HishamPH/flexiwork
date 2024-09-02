import express from 'express';
import AdminRepository from '../repository/adminRepository';
import AdminController from '../../controller/adminController';
import AdminUseCase from '../../usecases/adminUseCases';

import JwtTokenService from '../services/JwtToken';

import { adminAuth } from '../middlewares/adminAuth';
import SendEmail from '../services/sendEmail';

const adminRouter = express.Router()

const jwtToken = new JwtTokenService();
const repository = new AdminRepository();
const sendEmail = new SendEmail();
const adminUseCase = new AdminUseCase(
  repository,
  jwtToken,
  sendEmail
);
const controller = new AdminController(adminUseCase)

adminRouter.post('/login',(req,res,next)=>{
  controller.loginAdmin(req,res,next);
});
adminRouter.get('/logout',(req,res,next)=>{
  controller.logoutAdmin(req,res,next);
})

adminRouter.get('/fetch-candidates',(req,res,next)=>{
  controller.getCandidates(req,res,next);
})

adminRouter.get('/fetch-recruiters',(req,res,next)=>{
  controller.getRecruiters(req,res,next);
})

adminRouter.post('/block-user',(req,res,next)=>{
  controller.blockUser(req,res,next);
})


export default adminRouter;