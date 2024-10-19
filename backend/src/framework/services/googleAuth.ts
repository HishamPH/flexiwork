import { OAuth2Client } from "google-auth-library";
import IGoogleAuth from "../../usecases/interfaces/IGoogleAuth";

const clientId = process.env.GOOGLE_CLIENT_ID;

export default class GoogleAuth implements IGoogleAuth {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(clientId);
  }

  async verifyToken(token: string): Promise<any> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid token");
    }
    return payload;
  }
}
