import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export const generateToken = async (
  channelName: any,
  uid: any = 0,
  role: any = "recruiter",
  expire: any
) => {
  try {
    const appId = process.env.AGORA_APP_ID;
    const appCeritificate = process.env.AGORA_APP_CERTIFICATE;
    if (!appId || !appCeritificate) {
      throw new Error(
        "AGORA_APP_ID or AGORA_APP_CERTIFICATE is not set in the environment variables."
      );
    }

    const RTCrole =
      role === "recruiter" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expire;

    console.log(
      appId,
      appCeritificate,
      channelName,
      uid,
      RTCrole,
      privilegeExpireTime
    );

    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCeritificate,
      channelName,
      uid,
      RTCrole,
      privilegeExpireTime
    );

    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};
