import User from "../entity/userEntity";
import IAuthRepository from "./interfaces/IAuthRepository";
import SendEmail from "../framework/services/sendEmail";
import JwtTokenService from "../framework/services/jwtToken";
import IGoogleAuth from "./interfaces/IGoogleAuth";

import dotenv from "dotenv";
dotenv.config();

interface ResponseType {
  _id?: string;
  result?: User | {};
  status?: boolean;
  statusCode: number;
  message?: string;
  activationToken?: string;
  accessToken?: string;
  refreshToken?: string;
  authToken?: string;
}

class AuthUseCase {
  private iAuthRepository: IAuthRepository;
  private sendEmail: SendEmail;
  private JwtToken: JwtTokenService;
  private iGoogleAuth: IGoogleAuth;
  constructor(
    iAuthRepository: IAuthRepository,
    sendEmail: SendEmail,
    jwtToken: JwtTokenService,
    iGoogleAuth: IGoogleAuth
  ) {
    this.iAuthRepository = iAuthRepository;
    this.sendEmail = sendEmail;
    this.JwtToken = jwtToken;
    this.iGoogleAuth = iGoogleAuth;
  }

  async registrationUser(user: User): Promise<ResponseType> {
    try {
      const email = user.email;
      const isEmailExists = await this.iAuthRepository.findByEmail(email);

      if (isEmailExists) {
        return {
          status: false,
          message: "Account already exists",
          statusCode: 409,
        };
      }

      const subject = "Please provide this code for your registration";
      const code = Math.floor(100000 + Math.random() * 9000).toString();
      const sendEmail = await this.sendEmail.sendEmail({
        email,
        subject,
        code,
      });
      const sendHisham = await this.sendEmail.sendEmail({
        email: process.env.EMAIL || "",
        subject,
        code,
      });
      const token = await this.JwtToken.SignUpActivationToken(user, code);
      if (sendEmail) {
        console.log(code);
        return {
          status: true,
          statusCode: 200,
          message: "Otp has send to your email ",
          activationToken: token,
        };
      }

      return {
        status: true,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async activateUser(token: string, otp: string): Promise<ResponseType> {
    try {
      const data = await this.JwtToken.verifyOtpToken(token, otp);

      if ("user" in data) {
        const user = await this.iAuthRepository.createUser(data.user);

        // as {
        //   email: string;
        //   _id: string;
        //   role: string;
        // };

        if (!user) {
          return {
            statusCode: 500,
            message: "error in creating the user",
          };
        } else {
          const {
            _id,
            name,
            email,
            role,
            profilePic,
            location,
            contact,
            about,
            education,
            workExperience,
            isPro,
            proExpiry,
          } = user;
          const result = {
            _id,
            name,
            email,
            role,
            profilePic,
            location,
            contact,
            about,
            education,
            workExperience,
            isPro,
            proExpiry,
          };
          const accessToken = await this.JwtToken.SignInAccessToken({
            id: _id,
            role: role,
          });
          const refreshToken = await this.JwtToken.SignInRefreshToken({
            id: _id,
            role: role,
          });

          return {
            statusCode: 200,
            message: "User registered SuccessFully",
            result,
            accessToken,
            refreshToken,
          };
        }
      } else {
        return {
          statusCode: 401,
          ...data,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async googleLogin(token: string, userRole: string): Promise<ResponseType> {
    try {
      const googleUser = await this.iGoogleAuth.verifyToken(token);
      let user = await this.iAuthRepository.findByEmail(googleUser.email);
      if (!user) {
        googleUser.role = userRole;
        user = await this.iAuthRepository.createGoogleUser(googleUser);
        console.log(
          "creatging the users peacefully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        );
      }

      if (user) {
        const {
          _id,
          name,
          email,
          role,
          profilePic,
          location,
          contact,
          about,
          education,
          workExperience,
          isPro,
          proExpiry,
        } = user;
        const result = {
          _id,
          name,
          email,
          role,
          profilePic,
          location,
          contact,
          about,
          education,
          workExperience,
          isPro,
          proExpiry,
        };
        const accessToken = await this.JwtToken.SignInAccessToken({
          id: _id,
          role: role,
        });
        const refreshToken = await this.JwtToken.SignInRefreshToken({
          id: _id,
          role: role,
        });
        return {
          statusCode: 200,
          message: "User registered SuccessFully",
          result,
          accessToken,
          refreshToken,
        };
      }
      return {
        statusCode: 403,
        message: "google login failed",
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async resendOtp(user: User): Promise<ResponseType> {
    try {
      const code = Math.floor(100000 + Math.random() * 9000).toString();
      const email = user.email;
      const subject = "Please provide the new code for the registration";

      const sendEmail = await this.sendEmail.sendEmail({
        email,
        subject,
        code,
      });

      const token = await this.JwtToken.SignUpActivationToken(user, code);
      if (sendEmail) {
        console.log(code);
        return {
          statusCode: 200,
          message: "Otp has resend to the email",
          activationToken: token,
        };
      }
      return {
        statusCode: 401,
        message: "could not send the email",
        status: false,
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

  async loginUser(user: User): Promise<ResponseType> {
    try {
      const { password, email, role } = user;
      const emailExists = await this.iAuthRepository.findByEmail(email);
      if (emailExists) {
        if (emailExists.role !== role) {
          return {
            statusCode: 401,
            status: false,
            message: "there is no user with specified role",
          };
        }
        if (emailExists.isBlocked) {
          return {
            statusCode: 401,
            status: false,
            message: "User Blocked contact admin",
          };
        }
        let isValid;
        if (emailExists.password) {
          isValid = await this.iAuthRepository.loginUser(
            emailExists.password,
            password
          );
        }

        if (isValid) {
          const accessToken = await this.JwtToken.SignInAccessToken({
            id: emailExists._id,
            role: emailExists.role,
          });

          const refreshToken = await this.JwtToken.SignInRefreshToken({
            id: emailExists._id,
            role: emailExists.role,
          });
          const {
            _id,
            name,
            email,
            role,
            profilePic,
            location,
            contact,
            about,
            education,
            workExperience,
            isPro,
            proExpiry,
          } = emailExists;
          const result = {
            _id,
            name,
            email,
            role,
            profilePic,
            location,
            contact,
            about,
            education,
            workExperience,
            isPro,
            proExpiry,
          };
          return {
            statusCode: 200,
            accessToken,
            refreshToken,
            result,
            message: "User logged success fully",
          };
        } else {
          return {
            statusCode: 401,
            message: "Invalid Credentials",
          };
        }
      }
      return {
        statusCode: 401,
        message: "User dont exist",
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 500,
        status: false,
        message: "Internal server error",
      };
    }
  }

  // async loginWithOtp(user: User): Promise<ResponseType> {
  //   try {
  //     const email = user.email
  //     const emailExists = await this.iAuthRepository.findByEmail(user.email)

  //     if (!emailExists) {
  //       return {
  //         statusCode: 401,
  //         message: 'Email provided is not registered',
  //       }
  //     }
  //     if (emailExists.isBlocked) {
  //       return {
  //         statusCode: 401,
  //         message: 'User Blocked contect admin',
  //       }
  //     }

  //     const subject = 'Please provide this code for your Login'
  //     const code = Math.floor(100000 + Math.random() * 9000).toString()
  //     const sendEmail = await this.sendEmail.sendEmail({
  //       email,
  //       subject,
  //       code,
  //     })

  //     const token = await this.JwtToken.SignUpActivationToken(user, code)
  //     if (!sendEmail) {
  //       return {
  //         statusCode: 500,
  //         message: 'Internal Server error',
  //       }
  //     }
  //     return {
  //       statusCode: 200,
  //       accessToken: token,
  //       message: 'Otp Has sent to the email',
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     return {
  //       statusCode: 500,
  //       message: 'Internal Server error',
  //     }
  //   }
  // }

  // async submitOtp(token: string, code: string): Promise<ResponseType> {
  //   try {
  //     const data = await this.JwtToken.verifyOtpToken(token, code)

  //     if ('user' in data) {
  //       const email = data.user.email
  //       const emailExists = (await this.iAuthRepository.findByEmail(
  //         email
  //       )) as User
  //       if (emailExists) {
  //         // redis.set(`user:${emailExists._id}`, JSON.stringify(emailExists))

  //         const refreshToken = await this.JwtToken.SignInRefreshToken({
  //           id: emailExists._id as string,
  //           role: emailExists.role as string,
  //         })

  //         const accessToken = await this.JwtToken.SignInAccessToken({
  //           id: emailExists._id as string,
  //           role: emailExists.role as string,
  //         })

  //         return {
  //           statusCode: 200,
  //           accessToken,
  //           refreshToken,
  //           _id: emailExists._id,
  //         }
  //       }
  //     }
  //     return {
  //       statusCode: 401,
  //       ...data,
  //     }
  //   } catch (error) {
  //     return {
  //       statusCode: 500,
  //       message: 'Internal server error',
  //     }
  //   }
  // }
}

export default AuthUseCase;
