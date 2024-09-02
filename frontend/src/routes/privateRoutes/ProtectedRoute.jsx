import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img className="w-[60px]" src={spinner} alt="spinner" />
      </div>
    );
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;