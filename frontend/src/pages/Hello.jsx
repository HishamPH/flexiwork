import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Navigate } from "react-router-dom";

const Hello = () => {
  const [videoCall, setVideoCall] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const agoraClientRef = useRef(null);
  const localTracksRef = useRef({});

  const rtcProps = {
    appId: import.meta.env.VITE_APP_ID,
    channel: import.meta.env.VITE_CHANNEL,
    token: import.meta.env.VITE_TOKEN,
  };

  useEffect(() => {
    const initializeAgora = async () => {
      agoraClientRef.current = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });

      // Join the channel
      await agoraClientRef.current.join(
        rtcProps.appId,
        rtcProps.channel,
        rtcProps.token
      );

      // Create local tracks
      const [microphoneTrack, cameraTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = { microphoneTrack, cameraTrack };

      // Publish local tracks
      await agoraClientRef.current.publish([microphoneTrack, cameraTrack]);

      // Display the local video
      if (localVideoRef.current) {
        cameraTrack.play(localVideoRef.current);
      }

      // Subscribe to remote users
      agoraClientRef.current.on("user-published", async (user, mediaType) => {
        await agoraClientRef.current.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack.play(remoteVideoRef.current);
        }
      });
    };

    initializeAgora();

    // Cleanup when component unmounts
    return () => {
      cleanupAgoraResources();
    };
  }, []);

  const cleanupAgoraResources = async () => {
    if (agoraClientRef.current) {
      await agoraClientRef.current.leave();

      // Stop all local tracks
      const { microphoneTrack, cameraTrack } = localTracksRef.current;
      microphoneTrack.stop();
      microphoneTrack.close();
      cameraTrack.stop();
      cameraTrack.close();

      localTracksRef.current = {}; // Clear the local tracks
      agoraClientRef.current = null; // Clear the Agora client reference
    }
  };

  return videoCall ? (
    <div className="video-call-container">
      <div
        className="local-video"
        ref={localVideoRef}
        style={{ width: "400px", height: "300px", backgroundColor: "black" }}
      />
      <div
        className="remote-video"
        ref={remoteVideoRef}
        style={{ width: "400px", height: "300px", backgroundColor: "gray" }}
      />
      <button
        onClick={() => {
          setVideoCall(false);
          cleanupAgoraResources();
        }}
      >
        End Call
      </button>
    </div>
  ) : (
    <Navigate to="/recruiter/meetings" />
  );
};

export default Hello;
