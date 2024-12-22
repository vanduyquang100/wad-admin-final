import { authenticationService } from "@/apis/authentication";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery } from "react-query";

export const useUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_PARAMS.ME],
    queryFn: authenticationService.me,
    refetchOnWindowFocus: false,
  });
};
