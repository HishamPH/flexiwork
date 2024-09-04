import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "react-chat-elements/dist/main.css";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCandidatePage from "./pages/admin/AdminCandidatePage";

import "./App.css";

import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";

import CandidateRouter from "./routes/CandidateRouter";
import AdminRouter from "./routes/AdminRouter";
import RecruiterRouter from "./routes/RecruiterRouter";
import NotFound from "./pages/NotFound";
import Hello from "./pages/Hello";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/hello" element={<Hello />} />
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/candidate/*" element={<CandidateRouter />} />
      <Route path="/recruiter/*" element={<RecruiterRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

let hello = false;
function App() {
  return <RouterProvider router={router} />;
}

export default App;
