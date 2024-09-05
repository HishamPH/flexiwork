import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const CandidateOnly = () => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo && userInfo.role === "candidate") {
    return <Outlet />;
  } else if (userInfo && userInfo.role === "recruiter") {
    return <Navigate to="/recruiter/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default CandidateOnly;
