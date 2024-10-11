import User from "../../entity/userEntity";

interface IUserRepository {
  updateUser(user: User): Promise<{} | null>;
  findUser(id: string): Promise<{} | null>;
  isBlocked(userId: string): Promise<User | null>;
  upgradeUser(userId: string, paymentId: string): Promise<User | null>;
  demoteUser(userId: string): Promise<User | null>;
  updateProStatus(): Promise<any>;
}

export default IUserRepository;
