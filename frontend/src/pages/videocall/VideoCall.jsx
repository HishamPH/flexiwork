import { useState, useRef, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import AgoraRTC from "agora-rtc-sdk-ng";
AgoraRTC.setLogLevel(4);
import Loader from "../../helper/Loader";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { useSelector } from "react-redux";

const VideoCall = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [videoCall, setVideoCall] = useState(true);
  const [loading, setLoading] = useState(false);
  const agoraKit = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const rtcProps = {
    appId: import.meta.env.VITE_APP_ID,
    channel: id,
  };

  const endCall = async () => {
    navigate("/recruiter/meetings");
    window.location.reload();
    setVideoCall(false);
  };

  const callbacks = {
    EndCall: () => endCall(),
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axiosInstance.get(`/user/get-meeting-token/${id}`, {
          params: {
            role: userInfo.role,
          },
        });
        rtcProps.token = res.data.token;
        setVideoCall(true);
      } catch (err) {
        alert("Error fetching meeting token");
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
    return () => {
      if (agoraKit.current) {
        endCall();
      }
    };
  }, []);

  if (loading) {
    return <Loader />; // Show loader while fetching token
  }

  return videoCall ? (
    <div className="flex w-[100vw] h-[100vh] bg-gray-800">
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={callbacks}
        styleProps={styleProps}
        enableLog={false}
        //ref={agoraKit} // Pass the ref to AgoraUIKit
      />
    </div>
  ) : (
    <Navigate to="/recruiter/meetings" />
  );
};

// Define styles for the Agora UI components
const styleProps = {
  container: {
    backgroundColor: "#2d2d2d",
    height: "100%",
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
      backgroundColor: "#ea4335",
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
    margin: 5,
    borderRadius: 30,
    backgroundColor: "#1c1c1e",
    position: "relative",
  },
  pinnedVideoStyle: {
    position: "absolute",
    borderRadius: 8,
    height: "20%",
    width: "20%",
    bottom: 10,
    right: 10,
    border: "2px solid #ffffff44",
  },
};

export default VideoCall;
