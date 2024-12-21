import {
  AuthenticationContext,
  AuthenticationContextInterface,
} from "@/contexts";
import { useContext } from "react";

export const useUserInfoContext = () => {
  return useContext<AuthenticationContextInterface>(AuthenticationContext);
};
