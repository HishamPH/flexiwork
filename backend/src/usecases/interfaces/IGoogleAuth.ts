export default interface IGoogleAuth {
  verifyToken(token: string): Promise<any>;
}
