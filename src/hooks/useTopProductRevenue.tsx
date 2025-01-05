import {
  GetProductRevenueInTimeRange,
  GetProductRevenueInTimeRangeResponse,
  orderService,
} from "@/apis/orders";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

type Props = {
  options?: UseQueryOptions;
} & GetProductRevenueInTimeRange;

export const useTopProductRevenue = ({ start, end, ...options }: Props) => {
  return useQuery<GetProductRevenueInTimeRangeResponse>({
    queryKey: [QUERY_PARAMS.PRODDUCT_REVENUE, start, end],
    queryFn: () => orderService.getProductRevenueInRange({ start, end }),
    ...options,
  });
};
