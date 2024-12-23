import { AllProductsResponse, GetAllProductsFilters } from "@/apis/products";
import { productService } from "@/apis/products";
import { QUERY_PARAMS } from "@/constants/queries";
import { useQuery, UseQueryOptions } from "react-query";

interface UseUsersOptions extends UseQueryOptions<AllProductsResponse> {
  filters?: GetAllProductsFilters;
}

const defaultFilter = {
  page: 0,
  limit: 10,
};

export const useProducts = (
  { filters, ...options }: UseUsersOptions = { filters: defaultFilter }
) => {
  return useQuery<AllProductsResponse>({
    queryKey: [QUERY_PARAMS.ALL_PRODUCTS, filters],
    queryFn: () => productService.getAllProducts(filters ?? defaultFilter),
    ...options,
  });
};
