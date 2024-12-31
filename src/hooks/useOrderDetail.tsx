import { GetOrderDetail, orderService } from "@/apis/orders";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

type Props = {
  options?: UseQueryOptions;
} & GetOrderDetail;

export const useOrderDetail = ({ id, ...options }: Props) => {
  return useQuery<OrderDetail>({
    queryKey: [QUERY_PARAMS.ORDER_DETAIL, id],
    queryFn: () => orderService.getOrderDetail({ id }),
    ...options,
  });
};
