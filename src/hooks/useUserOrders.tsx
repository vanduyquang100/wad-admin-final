import { GetUserOrders, orderService, UserOrderResponse } from "@/apis/orders";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

interface UseUsersOrderOptions extends GetUserOrders {
  options?: UseQueryOptions<UserOrderResponse>;
}

export const useUserOrders = ({
  options,
  ...request
}: UseUsersOrderOptions) => {
  return useQuery<UserOrderResponse>({
    queryKey: [QUERY_PARAMS.GET_USER_ORDERS, request],
    queryFn: () => orderService.getOrdersOfAUser(request),
    ...options,
  });
};
