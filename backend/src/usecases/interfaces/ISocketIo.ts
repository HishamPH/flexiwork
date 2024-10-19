export default interface ISocketIo {
  sendMessage(
    sender: string,
    receiver: string,
    data: any,
    roomId: string
  ): Promise<any>;
  meetAlert(sender: string, receiver: string, data: any): Promise<any>;
  demoteUser(users: any): Promise<any>;
}
