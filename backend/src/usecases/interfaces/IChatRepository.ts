import Chat from "../../entity/chatEntity";
import Message from "../../entity/messageEntity";

interface IChatRepsoitory {
  sendMessage(message: Message): Promise<{} | null>;
}
export default IChatRepsoitory;
