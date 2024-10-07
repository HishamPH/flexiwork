import User from "../entity/userEntity";
import IUserRepository from "./interfaces/IUserRepository";
import Payment from "../framework/services/payment";

interface ResponseType {
  _id?: string;
  result?: User | {} | null;
  status?: boolean;
  statusCode: number;
  message?: string;
  activationToken?: string;
  accessToken?: string;
  refreshToken?: string;
  authToken?: string;
}

class UserUseCase {
  private iUserRepository: IUserRepository;

  constructor(iUserRepository: IUserRepository) {
    this.iUserRepository = iUserRepository;
  }
  async updateProfile(user: User): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.updateUser(user);
      return {
        status: true,
        statusCode: 200,
        message: "user updated Successfully",
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getUser(id: string): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.findUser(id);
      return {
        status: true,
        statusCode: 200,
        message: "user found Successfully",
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async updateProStatus(): Promise<any> {
    try {
      const result = await this.iUserRepository.updateProStatus();
      return result;
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async demoteUser(userId: string): Promise<ResponseType> {
    try {
      console.log("userUseCase 76 ie a user is being demoted");
      const result = await this.iUserRepository.demoteUser(userId);
      return {
        status: true,
        statusCode: 200,
        message: "user found Successfully",
        result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
}

export default UserUseCase;
