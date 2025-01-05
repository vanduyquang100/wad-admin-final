import { GetUserRequest, GetUserResponse, userService } from "@/apis/users";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

type Props = {
  options?: UseQueryOptions<GetUserResponse>;
} & GetUserRequest;

export const useGetUser = ({ options, ...request }: Props) => {
  return useQuery<GetUserResponse>({
    queryKey: [QUERY_PARAMS.GET_USER, request.id],
    queryFn: () => userService.getUser(request),
    refetchOnWindowFocus: false,
    ...options,
  });
};
