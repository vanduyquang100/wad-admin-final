import {
  Badge,
  BasicLayout,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useOrders } from "@/hooks/useOrders";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { formatPrice } from "@/lib/utils";

enum FilterCategory {
  PENDING = "pending",
  COMPLETE = "complete",
  ALL = "All",
}

const PAGE_LIMIT = 10;

export const OrderListPage = () => {
  const [params] = useSearchParams();
  const [page, setPage] = useState(parseInt(params.get("page") ?? "1"));
  const [seachValue, setSearchValue] = useState<FilterCategory | undefined>();

  const { data, isFetching } = useOrders({
    filters: {
      page: page,
      limit: PAGE_LIMIT,
      status: seachValue,
    },
    refetchOnWindowFocus: false,
  });

  const handleValueChange = useCallback((value: string) => {
    if (value === FilterCategory.ALL) {
      setSearchValue(undefined);
    } else {
      setSearchValue(value as unknown as FilterCategory);
    }
  }, []);

  useEffect(() => {
    setPage(parseInt(params.get("page") ?? "1"));
    setSearchValue(
      Object.values<string>(FilterCategory).includes(params.get("status") ?? "")
        ? (params.get("status") as unknown as FilterCategory)
        : undefined
    );
  }, [params]);

  if (isFetching) {
    return <LoadingPage />;
  }
  return (
    <BasicLayout className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1>Order List</h1>
        <Select value={seachValue} onValueChange={handleValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {Object.entries(FilterCategory).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Created Time</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead>Payment Info</TableHead>
            <TableHead className="text-center">User ID</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.orders &&
            data.orders.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {index + (page - 1) * PAGE_LIMIT + 1}
                </TableCell>
                <TableCell>
                  <Link
                    to={NAVIGATION_ROUTES.PRODUCT_DETAIL.replace(
                      ":id",
                      order._id
                    )}
                  >
                    {new Date(order.createdAt).toLocaleString()}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="font-normal">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.totalPrice)}
                </TableCell>
                <TableCell>{order.paymentInfo ?? "No payment info"}</TableCell>
                <TableCell className="text-center font-mono text-sm">
                  {order.userId}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className="my-10">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${Math.max(page - 1, 1)}`} />
            </PaginationItem>
          )}
          {!!data && data.pagination.totalPages > page && (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </BasicLayout>
  );
};

export default OrderListPage;
