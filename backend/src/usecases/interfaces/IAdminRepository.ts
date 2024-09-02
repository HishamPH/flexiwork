import Admin from "../../entity/adminEntity";
import User from "../../entity/userEntity";
import { Request } from "express";
interface IAdminRepository {
  findByEmail(email:string):Promise<Admin | null>
  loginAdmin(password:string,hash:string):Promise<boolean>

  blockUser(userId:string,action:string):Promise<boolean>
  getCandidates():Promise<{users:User[]}|null>
  getRecruiters():Promise<{users:User[]}|null>
}


export default IAdminRepository;
