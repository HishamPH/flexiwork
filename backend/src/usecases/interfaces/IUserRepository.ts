import User from "../../entity/userEntity";

interface IUserRepository {
  updateUser(user: User): Promise<{} | null>;
  findUser(id: string): Promise<{} | null>;
  isBlocked(userId: string): Promise<User | null>;
}

export default IUserRepository;
