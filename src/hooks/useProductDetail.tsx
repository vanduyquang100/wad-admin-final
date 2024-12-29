import { GetProductDetail } from "@/apis/products";
import { productService } from "@/apis/products";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

type Props = {
  options?: UseQueryOptions;
} & GetProductDetail;

export const useProductDetail = ({ id, ...options }: Props) => {
  return useQuery<Product>({
    queryKey: [QUERY_PARAMS.PRODUCT_DETAIL, id],
    queryFn: () => productService.getProductDetail({ id }),
    ...options,
  });
};
