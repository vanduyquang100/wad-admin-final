import { useUserInfo, useUserInfoContext } from "@/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { useEffect } from "react";

export const PrivateWrapper = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useUserInfo();
  const { setUser } = useUserInfoContext();

  useEffect(() => {
    if (!isFetching) {
      if (!data) {
        navigate(NAVIGATION_ROUTES.LOGIN);
      }
    }
  }, [navigate, data, isFetching]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isFetching) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default PrivateWrapper;
