import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RecruiterOnly = () => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo && userInfo.role === "recruiter") {
    return <Outlet />;
  } else if (userInfo && userInfo.role === "candidate") {
    return <Navigate to="/candidate/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RecruiterOnly;
