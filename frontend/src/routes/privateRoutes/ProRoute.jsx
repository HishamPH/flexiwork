import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { openModal } from "../../redux/slices/modalSlice";

const ProRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (userInfo && userInfo.isPro) {
    return <Outlet />;
  } else {
    dispatch(openModal());
  }
};

export default ProRoute;
