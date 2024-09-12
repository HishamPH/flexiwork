import JwtTokenService from "../framework/services/JwtToken";
import IAdminRepository from "./interfaces/IAdminRepository";
import Admin from "../entity/adminEntity";

import { Request } from "express";

import SendEmail from "../framework/services/sendEmail";

interface ResponseType {
  _id?: string;
  result?: Admin | {};
  status?: boolean;
  statusCode: number;
  message?: string;
  refreshToken?: string;
  accessToken?: string;
  totalPage?: number;
}

class AdminUseCase {
  private iAdminRepository: IAdminRepository;
  private JwtToken: JwtTokenService;
  private sendEmail: SendEmail;
  constructor(
    iAdminRepository: IAdminRepository,
    JwtToken: JwtTokenService,
    sendEmail: SendEmail
  ) {
    this.iAdminRepository = iAdminRepository;
    this.JwtToken = JwtToken;
    this.sendEmail = sendEmail;
  }

  async loginAdmin(email: string, password: string): Promise<ResponseType> {
    try {
      const emailExists = (await this.iAdminRepository.findByEmail(
        email
      )) as Admin;

      if (!emailExists) {
        return {
          statusCode: 401,
          message: "Admin Not Found",
        };
      }

      const hash = emailExists.password;
      const pass = await this.iAdminRepository.loginAdmin(password, hash);
      if (!pass) {
        return {
          statusCode: 401,
          message: "Invalid Credentials",
        };
      }
      const accessToken = await this.JwtToken.SignInAccessToken({
        id: emailExists._id as string,
        role: emailExists.role as string,
      });

      const refreshToken = await this.JwtToken.SignInRefreshToken({
        id: emailExists._id as string,
        role: emailExists.role as string,
      });
      return {
        statusCode: 200,
        accessToken,
        refreshToken,
        message: "Admin logged Successfully",
        _id: emailExists._id,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async getCandidates(): Promise<ResponseType> {
    try {
      const result = await this.iAdminRepository.getCandidates();
      return {
        ...result,
        statusCode: 200,
        message: "Admin logged Successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async getRecruiters(): Promise<ResponseType> {
    try {
      const result = await this.iAdminRepository.getRecruiters();
      return {
        ...result,
        statusCode: 200,
        message: "Admin logged Successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async blockUser(userId: string, action: string): Promise<ResponseType> {
    try {
      const result = await this.iAdminRepository.blockUser(userId, action);
      if (result) {
        return {
          statusCode: 200,
          message:
            action == "block"
              ? "User Blocked successfully"
              : "User Unblocked successfully",
        };
      }

      return {
        statusCode: 409,
        message: "unknown conflict",
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: "Internal Server error",
      };
    }
  }
}

export default AdminUseCase;
