import { AllUserResponse, GetAllUserFilters, userService } from "@/apis/users";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

interface UseUsersOptions extends UseQueryOptions<AllUserResponse> {
  filters?: GetAllUserFilters;
}

const defaultFilter = {
  page: 0,
  limit: 10,
};

export const useUsers = (
  { filters, ...options }: UseUsersOptions = { filters: defaultFilter }
) => {
  return useQuery<AllUserResponse>({
    queryKey: [QUERY_PARAMS.ALL_USERS, filters],
    queryFn: () => userService.getAllUsers(filters ?? defaultFilter),
    ...options,
  });
};
