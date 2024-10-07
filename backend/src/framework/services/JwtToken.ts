import jwt, { JwtPayload, Secret, TokenExpiredError } from "jsonwebtoken";
import IJwtToken from "../../usecases/interfaces/IJwtToken";
import User from "../../entity/userEntity";

import dotenv from "dotenv";
dotenv.config();

interface Response {
  statusCode: number;
  message: string;
  id?: string | JwtPayload;
}
interface DecodedToken {
  user: string;
  iat: number;
  exp: number;
}

class JwtTokenService implements IJwtToken {
  async SignInAccessToken(user: {}): Promise<string> {
    try {
      const token = jwt.sign(
        { ...user },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: "30min",
        }
      );

      if (token) return token;
      return "";
    } catch (error) {
      console.log(error);

      return "";
    }
  }

  async SignInRefreshToken(user: {}): Promise<string> {
    const token = jwt.sign(
      { ...user },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: "30d",
      }
    );
    if (token) return token;
    return "";
  }

  async SignUpActivationToken(user: User, code: string): Promise<string> {
    const token = jwt.sign(
      { user, code },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      {
        expiresIn: "90s",
      }
    );
    return token;
  }

  async verifyOtpToken(
    activationToken: string,
    otp: string
  ): Promise<
    | { user: User; code: string; email: string }
    | { status: boolean; message: string }
  > {
    try {
      const payload = jwt.verify(
        activationToken,
        process.env.ACCESS_TOKEN_SECRET as Secret
      ) as { user: User; code: string; email: string };

      if (otp == "resend") {
        return payload;
      }

      if (payload.code == otp) {
        return payload;
      } else {
        return { status: false, message: "Otp Does not match" };
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return {
          status: false,
          message: "otp expired try resending it",
        };
      }
      return { status: false, message: "Jwt error" };
    }
  }
}

export default JwtTokenService;
