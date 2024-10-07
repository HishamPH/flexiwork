import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userAuth";
import { Success, Failed } from "../helper/popup";
import { useCallback, memo, useMemo } from "react";
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Logout clicked");
      try {
        await dispatch(logoutUser());
        Success("Logout successful");
        navigate("/");
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      }
    },
    [dispatch, navigate]
  );
  return { handleLogout, navigate };
};
