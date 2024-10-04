import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./video.css";
import { Button } from "@material-tailwind/react";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillMicFill,
  BsMicMuteFill,
} from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";

const APP_ID = import.meta.env.VITE_APP_ID;
const TOKEN = import.meta.env.VITE_TOKEN;
// For production, use a token server
const CHANNEL = import.meta.env.VITE_CHANNEL;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = ({ appId, token, channel }) => {
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);

  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const [remoteUser, setRemoteUser] = useState(null);
  useEffect(() => {
    const initAgora = async () => {
      try {
        await client.join(APP_ID, CHANNEL, TOKEN, null);
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        setLocalVideoTrack(videoTrack);
        setLocalAudioTrack(audioTrack);
        await client.publish([videoTrack, audioTrack]);

        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            setRemoteUser(user);
            user.videoTrack?.play(`remote-video`);
          }
          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        });

        client.on("user-unpublished", (user, mediaType) => {
          if (mediaType === "video") {
            setRemoteUser(null);
          }
          if (mediaType === "audio") {
            user.audioTrack?.stop();
          }
        });
      } catch (error) {
        console.log("some error has occurred", error);
      }
    };

    initAgora();

    return () => {
      localVideoTrack?.close();
      localAudioTrack?.close();
      client.removeAllListeners();
      client.leave();
    };
  }, []);

  useEffect(() => {
    if (localVideoTrack) {
      localVideoTrack.play("local-video");
    }
  }, [localVideoTrack]);

  const toggleMute = () => {
    setAudio((prev) => !prev);
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!localAudioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    setVideo((prev) => !prev);
    if (localVideoTrack) {
      localVideoTrack.setEnabled(!localVideoTrack.enabled);
    }
  };

  return (
    <div className="video-call-container bg-gray-900 h-screen">
      <div className="flex">
        <div
          id="remote-video"
          className="remote-video-player bg-gray-800 rounded-md"
        >
          {" "}
          <div
            id="local-video"
            className="local-video-player bg-gray-900 rounded-md"
          ></div>
        </div>
      </div>

      <div className="controls">
        {audio ? (
          <Button className="rounded-full bg-gray-800" onClick={toggleMute}>
            <BsFillMicFill size={20} />
          </Button>
        ) : (
          <Button className="rounded-full bg-red-800" onClick={toggleMute}>
            <BsMicMuteFill size={20} />
          </Button>
        )}
        {video ? (
          <Button className="rounded-full bg-gray-800" onClick={toggleVideo}>
            <BsCameraVideoFill size={20} />
          </Button>
        ) : (
          <Button className="rounded-full bg-red-800" onClick={toggleVideo}>
            <BsCameraVideoOffFill size={20} />
          </Button>
        )}

        <Button className="rounded-full bg-red-800">
          <ImPhoneHangUp size={20} />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;
