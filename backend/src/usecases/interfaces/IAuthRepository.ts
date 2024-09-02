import User from "../../entity/userEntity";

interface IAuthRepository {
  findByEmail(email:string):Promise<User | null>,
  findUserById(id:string):Promise<User | null>,
  findByEmailAndUserId(id:string,email:string):Promise<User | null>
  createUser(user:User):Promise<{}|null>,
  loginUser(hashPass:string,password:string):Promise<boolean>
}

export default IAuthRepository