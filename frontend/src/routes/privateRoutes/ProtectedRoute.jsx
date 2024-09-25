import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo && userInfo.role === "candidate") {
    console.log("hellow world with wonderful things");
    return <Navigate to="/candidate/home" />;
  } else if (userInfo && userInfo.role === "recruiter") {
    return <Navigate to="/recruiter/home" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
