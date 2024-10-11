import createServer from "./framework/config/server";
import { connectDB } from "./framework/config/connectDB";
import { server } from "./framework/services/socketIo";
import { config } from "dotenv";
config();

const startServer = async () => {
  try {
    await connectDB();
    const app = createServer();
    const port = process.env.PORT;
    server?.listen(port, async () => {
      console.log("server is running at port ", port);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
