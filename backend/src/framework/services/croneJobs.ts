import cron from "node-cron";

import UserUseCase from "../../usecases/userUseCases";
import UserRepository from "../repository/userRepository";

const userRepository = new UserRepository();
const userUserCase = new UserUseCase(userRepository);

cron.schedule("1 0 * * *", () => userUserCase.updateProStatus());
