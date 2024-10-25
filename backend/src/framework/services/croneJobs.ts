import cron from "node-cron";
import UserUseCase from "../../usecases/userUseCases";
import UserRepository from "../repository/userRepository";
import { socketIo } from "./socketIo";

const userRepository = new UserRepository();
const userUserCase = new UserUseCase(userRepository, socketIo);
userUserCase.updateProStatus();

cron.schedule("1 0 * * *", () => {
  userUserCase.updateProStatus();
});

console.log("User status updater initialized.");
