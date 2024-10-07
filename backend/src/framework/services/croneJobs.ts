import cron from "node-cron";

import UserUseCase from "../../usecases/userUseCases";
import UserRepository from "../repository/userRepository";

(() => {
  const userRepository = new UserRepository();
  const userUserCase = new UserUseCase(userRepository);

  // Run the updateProStatus function once on server startup
  userUserCase.updateProStatus();

  // Schedule the cron job to run at 12:01 AM every day
  cron.schedule("1 0 * * *", () => {
    userUserCase.updateProStatus();
  });

  console.log("User status updater initialized.");
})();

// const userRepository = new UserRepository();
// const userUserCase = new UserUseCase(userRepository);

// cron.schedule("1 0 * * *", () => userUserCase.updateProStatus());
