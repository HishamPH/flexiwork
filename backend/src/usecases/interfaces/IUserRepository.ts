import User from "../../entity/userEntity";

interface IUserRepository {
    updateUser(user:User):Promise<{}|null>,
    findUser(id:string):Promise<{}|null>
}

export default IUserRepository;