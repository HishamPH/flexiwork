import { Request,Response,NextFunction } from "express";
import AuthUseCase from "../usecases/authUseCases";



class AuthController {
  private authCase : AuthUseCase 

  constructor(authCase:AuthUseCase){
    this.authCase = authCase
  }

  async registerUser(req:Request,res:Response,next:NextFunction){
    try {
      const userData = req.body;

      // add interfaces 
      
      const user = await this.authCase.registrationUser(userData) 
      if(user.activationToken){
        res.cookie('activationToken',user.activationToken,{
          httpOnly:true,
          secure:true
        })
      }
      return res.status(user?.statusCode).json({...user});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { otp } = req.body
      const token = req.cookies.activationToken
      const user = await this.authCase.activateUser(token, otp)
      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 10000,
      })
      let message
      if (user?.message) {
        message = user.message
      }
      return res.status(user?.statusCode).json({message,...user })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.activationToken as string
      const type = req.body.type as string

      const user = await this.authCase.resendOtp(token)
      if (user.activationToken) {
        res.cookie('activationToken', user.activationToken, {
          httpOnly: true,
          secure: true,
        })
      }
      console.log(user)

      res.status(user?.statusCode).json({ message: user.message, ...user })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }


  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body
      const result = await this.authCase.loginUser(user)

      if (result.refreshToken) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 10000,
        })
      }
      res.status(result.statusCode).json({ ...result })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  // tokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
  //   const refreshToken = req.cookies.refreshToken;
  //   if (!refreshToken) {
  //     return {
  //       statusCode:401,
  //       status:false,
  //       message:'there is not refresh token'
  //     }
  //   }
  
  //   try {
  //     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  //     const newAccessToken = jwt.sign(
  //       { id: decoded.id, role: decoded.role },
  //       process.env.JWT_ACCESS_SECRET,
  //       { expiresIn: "5m" }
  //     );
  
  //     res.status(200).json({ success: true, accessToken: newAccessToken });
  //   } catch (err) {
  //     return next(error);
  //   }
  // };

}

export default AuthController;