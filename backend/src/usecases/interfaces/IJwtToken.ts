import User from '../../entity/userEntity'

interface IJwtToken {
  SignInAccessToken(user: {}): Promise<string>
  SignInRefreshToken(user: {}): Promise<string>
  SignUpActivationToken(user: User, code: string): Promise<string>

  
}

export default IJwtToken