import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ThemeProvider } from "@material-tailwind/react";
import { SocketProvider } from "./socket/SocketContext.jsx";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider>
          <SocketProvider>
            <ToastContainer
              style={{
                zIndex: 99999,
              }}
            />

            <App />
          </SocketProvider>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
