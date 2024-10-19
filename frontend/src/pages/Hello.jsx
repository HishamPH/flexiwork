//========================================================================================================================

// import React, { useEffect, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";

// const APP_ID = "9dd6ac3911884a1fa2bec02d525ecfb7";
// const TOKEN = "YOUR_TEMP_TOKEN"; // For production, use a token server
// const CHANNEL = "main";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// const Hello = () => {
//   const [localVideoTrack, setLocalVideoTrack] = useState(null);
//   const [localAudioTrack, setLocalAudioTrack] = useState(null);

//   const [remoteUser, setRemoteUser] = useState(null);

//   useEffect(() => {
//     const initAgora = async () => {
//       alert(APP_ID);
//       await client.join(APP_ID, CHANNEL, TOKEN, null);
//       const videoTrack = await AgoraRTC.createCameraVideoTrack();
//       const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//       setLocalVideoTrack(videoTrack);
//       setLocalAudioTrack(audioTrack);
//       await client.publish([videoTrack, audioTrack]);

//       client.on("user-published", async (user, mediaType) => {
//         await client.subscribe(user, mediaType);
//         if (mediaType === "video") {
//           setRemoteUser(user);
//           user.videoTrack?.play(`remote-video`);
//         }
//         if (mediaType === "audio") {
//           user.audioTrack?.play();
//         }
//       });

//       client.on("user-unpublished", (user, mediaType) => {
//         if (mediaType === "video") {
//           setRemoteUser(null);
//         }
//         if (mediaType === "audio") {
//           user.audioTrack?.stop();
//         }
//       });
//     };

//     initAgora();

//     return () => {
//       localVideoTrack?.close();
//       localAudioTrack?.close();
//       client.removeAllListeners();
//       client.leave();
//     };
//   }, []);

//   useEffect(() => {
//     if (localVideoTrack) {
//       localVideoTrack.play("local-video");
//     }
//   }, [localVideoTrack]);

//   const toggleMute = () => {
//     if (localAudioTrack) {
//       localAudioTrack.setEnabled(!localAudioTrack.enabled);
//     }
//   };

//   const toggleVideo = () => {
//     if (localVideoTrack) {
//       localVideoTrack.setEnabled(!localVideoTrack.enabled);
//     }
//   };

//   return (
//     <div className="video-call-container">
//       <div id="local-video" className="video-player"></div>
//       {remoteUser && <div id="remote-video" className="video-player"></div>}
//       <div className="controls">
//         <button onClick={toggleMute}>Toggle Mute</button>
//         <button onClick={toggleVideo}>Toggle Video</button>
//       </div>
//     </div>
//   );
// };

// export default Hello;

//======================================================================================================================

import { useState, useRef, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Navigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";

const Hello = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState(null);
  const [token, setToken] = useState(null);

  const agoraEngineRef = useRef(null);

  const rtcProps = {
    appId: import.meta.env.VITE_APP_ID,
    channel: import.meta.env.VITE_CHANNEL,
    token: import.meta.env.VITE_TOKEN,
    logConfig: { level: 1 },
  };

  const callbacks = {
    EndCall: () => {
      cleanupAgoraResources();
      setVideoCall(false);
    },
  };

  useEffect(() => {
    const initializeAgora = async () => {
      agoraEngineRef.current = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });
      await agoraEngineRef.current.join(
        rtcProps.appId,
        rtcProps.channel,
        rtcProps.token,
        null
      );
    };
    initializeAgora();
    return () => {
      cleanupAgoraResources();
    };
  }, []);

  const cleanupAgoraResources = () => {
    if (agoraEngineRef.current) {
      agoraEngineRef.current.leave();
      agoraEngineRef.current.removeAllListeners();
      agoraEngineRef.current = null;
    }
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        if (device.kind === "videoinput" || device.kind === "audioinput") {
          navigator.mediaDevices
            .getUserMedia({
              video: device.kind === "videoinput",
              audio: device.kind === "audioinput",
            })
            .then((mediaStream) => {
              mediaStream.getTracks().forEach((track) => track.stop());
            });
        }
      });
    });
  };

  return videoCall ? (
    <div className="flex w-[100vw] h-[100vh] bg-gray-800">
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={callbacks}
        styleProps={styleProps}
      />
    </div>
  ) : (
    <Navigate to="/recruiter/meetings" />
  );
};

const styleProps = {
  container: {
    backgroundColor: "#2d2d2d", // Dark gray background
    height: "100%", // Full height to ensure proper display
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  localBtnContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    left: 399,
    width: "30%",
    borderRadius: 30,
    padding: 10,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  localBtnStyles: {
    muteLocalAudio: {
      backgroundColor: "#303134", // Gray background for mute button
      color: "#fff",
      borderRadius: "50%",
      height: 50,
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    muteLocalVideo: {
      backgroundColor: "#303134",
      color: "#fff",
      borderRadius: "50%",
      height: 50,
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    endCall: {
      backgroundColor: "#ea4335", // Google Meet's red color for hang-up
      color: "#fff",
      borderRadius: "50%",
      height: 50,
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  maxViewStyles: {
    justifyContent: "center",
    //alignItems: "center",
    margin: 5,
    borderRadius: 30,
    backgroundColor: "#1c1c1e", // Dark gray background for the main video
    position: "relative", // Make the main video container relative
  },
  pinnedVideoStyle: {
    position: "absolute",
    borderRadius: 8,
    height: "20%", // Smaller size for the pinned video
    width: "20%",

    bottom: 10, // Position it inside the main video container
    right: 10, // Adjust right positioning to be within the container
    border: "2px solid #ffffff44", // Add a subtle border
  },
};

export default Hello;

//=============================================================================================================

// import React, { useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { Navigate } from "react-router-dom";

// const Hello = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const agoraClientRef = useRef(null);
//   const localTracksRef = useRef({});

//   const rtcProps = {
//     appId: import.meta.env.VITE_APP_ID,
//     channel: import.meta.env.VITE_CHANNEL,
//     token: import.meta.env.VITE_TOKEN,
//   };

//   useEffect(() => {
//     const initializeAgora = async () => {
//       agoraClientRef.current = AgoraRTC.createClient({
//         mode: "rtc",
//         codec: "vp8",
//       });

//       // Join the channel
//       await agoraClientRef.current.join(
//         rtcProps.appId,
//         rtcProps.channel,
//         rtcProps.token
//       );

//       // Create local tracks
//       const [microphoneTrack, cameraTrack] =
//         await AgoraRTC.createMicrophoneAndCameraTracks();
//       localTracksRef.current = { microphoneTrack, cameraTrack };

//       // Publish local tracks
//       await agoraClientRef.current.publish([microphoneTrack, cameraTrack]);

//       // Display the local video
//       if (localVideoRef.current) {
//         cameraTrack.play(localVideoRef.current);
//       }

//       // Subscribe to remote users
//       agoraClientRef.current.on("user-published", async (user, mediaType) => {
//         await agoraClientRef.current.subscribe(user, mediaType);
//         if (mediaType === "video") {
//           const remoteVideoTrack = user.videoTrack;
//           remoteVideoTrack.play(remoteVideoRef.current);
//         }
//       });
//     };

//     initializeAgora();

//     // Cleanup when component unmounts
//     return () => {
//       cleanupAgoraResources();
//     };
//   }, []);

//   const cleanupAgoraResources = async () => {
//     if (agoraClientRef.current) {
//       await agoraClientRef.current.leave();

//       // Stop all local tracks
//       const { microphoneTrack, cameraTrack } = localTracksRef.current;
//       microphoneTrack.stop();
//       microphoneTrack.close();
//       cameraTrack.stop();
//       cameraTrack.close();

//       localTracksRef.current = {}; // Clear the local tracks
//       agoraClientRef.current = null; // Clear the Agora client reference
//     }
//   };

//   return videoCall ? (
//     <div className="video-call-container">
//       <div
//         className="local-video"
//         ref={localVideoRef}
//         style={{ width: "400px", height: "300px", backgroundColor: "black" }}
//       />
//       <div
//         className="remote-video"
//         ref={remoteVideoRef}
//         style={{ width: "400px", height: "300px", backgroundColor: "gray" }}
//       />
//       <button
//         onClick={() => {
//           setVideoCall(false);
//           cleanupAgoraResources();
//         }}
//       >
//         End Call
//       </button>
//     </div>
//   ) : (
//     <Navigate to="/recruiter/meetings" />
//   );
// };

// export default Hello;

//=========================================================================================================================
