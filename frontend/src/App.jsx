import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import "react-chat-elements/dist/main.css";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

import "./App.css";

import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import CandidateRouter from "./routes/CandidateRouter";
import AdminRouter from "./routes/AdminRouter";
import RecruiterRouter from "./routes/RecruiterRouter";

import ProtectedRoute from "./routes/privateRoutes/ProtectedRoute";
import CandidateOnly from "./routes/privateRoutes/CandidateOnly";
import RecruiterOnly from "./routes/privateRoutes/RecruiterOnly";

import NotFound from "./pages/NotFound";
import Hello from "./pages/Hello";
import VideoCall from "./pages/videocall/VideoCall";
import { useEffect, useState } from "react";
import ProRoute from "./routes/privateRoutes/ProRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProRoute />}>
        <Route path="/video-call/:id" element={<VideoCall />} />
      </Route>

      <Route path="/hello" element={<Hello />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<CandidateOnly />}>
        <Route path="/candidate/*" element={<CandidateRouter />} />
      </Route>
      <Route element={<RecruiterOnly />}>
        <Route path="/recruiter/*" element={<RecruiterRouter />} />
      </Route>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  console.log("app mounted");
  const [state, setState] = useState("hello");
  useEffect(() => {
    setState("whatsapp");
  });
  console.log(state);
  return <RouterProvider router={router} />;
}

export default App;
