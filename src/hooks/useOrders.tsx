import {
  AllOrdersResponse,
  GetAllOrdersFilters,
  orderService,
} from "@/apis/orders";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

interface UseUsersOptions extends UseQueryOptions<AllOrdersResponse> {
  filters?: GetAllOrdersFilters;
}

const defaultFilter = {
  page: 0,
  limit: 10,
};

export const useOrders = (
  { filters, ...options }: UseUsersOptions = { filters: defaultFilter }
) => {
  return useQuery<AllOrdersResponse>({
    queryKey: [QUERY_PARAMS.ALL_PRODUCTS, filters],
    queryFn: () => orderService.getAllOrders(filters ?? defaultFilter),
    ...options,
  });
};
