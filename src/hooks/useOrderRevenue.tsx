import {
  GetRevenueInTimeRange,
  GetRevenueInTimeRangeResponse,
  orderService,
} from "@/apis/orders";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

type Props = {
  options?: UseQueryOptions;
} & GetRevenueInTimeRange;

export const useOrderRevenue = ({ start, end, ...options }: Props) => {
  return useQuery<GetRevenueInTimeRangeResponse>({
    queryKey: [QUERY_PARAMS.REVENUE, start, end],
    queryFn: () => orderService.getRevenueInRange({ start, end }),
    ...options,
  });
};
