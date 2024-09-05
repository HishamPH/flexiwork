import Chat from "../../entity/chatEntity";
import Message from "../../entity/messageEntity";
import IChatRepsoitory from "../../usecases/interfaces/IChatRepository";
import chatModel from "../databases/chatModel";
import messageModel from "../databases/messageModel";

export default class ChatRepository implements IChatRepsoitory {
  async sendMessage(message: Message): Promise<{} | null> {
    try {
      const newJob = await messageModel.create(message);
      return newJob;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
