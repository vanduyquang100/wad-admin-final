import {
  Badge,
  BasicLayout,
  Button,
  Form,
  FormField,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useProducts } from "@/hooks";
import LoadingPage from "./LoadingPage";
import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { useForm } from "react-hook-form";
import { formatPrice } from "@/lib/utils";
import { Edit, Plus, Trash } from "lucide-react";

const PAGE_LIMIT = 10;

enum FilterColumns {
  NAME = "name",
  CATEGORY = "category",
}

enum FilterInputs {
  FILTER_TYPE = "filter_type",
  FILTER_TEXT = "filter_text",
}

type FilterFormType = {
  [FilterInputs.FILTER_TYPE]: FilterColumns;
  [FilterInputs.FILTER_TEXT]?: string;
};

const defaultFilterFormValues: FilterFormType = {
  [FilterInputs.FILTER_TYPE]: FilterColumns.NAME,
  [FilterInputs.FILTER_TEXT]: undefined,
};

export const ProductListPage = () => {
  const [params] = useSearchParams();
  const [page, setPage] = useState(parseInt(params.get("page") ?? "1"));
  const [sortBy, setSortBy] = useState<[string, boolean] | undefined>(
    undefined
  );
  const [seachValue, setSearchValue] = useState<FilterFormType>(
    defaultFilterFormValues
  );
  const filterMethods = useForm<FilterFormType>({
    defaultValues: defaultFilterFormValues,
  });

  const setSortCallback = useCallback(
    (sortColumn: string) => () => {
      setSortBy((prev) => {
        const isSameColumn = (prev ? prev[0] : undefined) === sortColumn;
        if (isSameColumn) {
          return [sortColumn, prev ? !prev[1] : true];
        }
        return [sortColumn, true];
      });
    },
    []
  );

  const setSortCategory = useCallback(setSortCallback("category"), [
    setSortCallback,
  ]);
  const setSortName = useCallback(setSortCallback("name"), [setSortCallback]);
  const setSortPrice = useCallback(setSortCallback("price"), [setSortCallback]);
  const setSortStock = useCallback(setSortCallback("stock"), [setSortCallback]);
  const setSortPromotePrice = useCallback(setSortCallback("promotePrice"), [
    setSortCallback,
  ]);
  const setSortCreatedDate = useCallback(setSortCallback("createdAt"), [
    setSortCallback,
  ]);
  const handleFilterFormSubmit = useCallback((data: FilterFormType) => {
    setSearchValue(data);
  }, []);

  const { data, isFetching } = useProducts({
    filters: {
      page: page,
      limit: PAGE_LIMIT,
      sortBy: sortBy ? sortBy[0] : undefined,
      sortOrder: sortBy && sortBy[1] ? "asc" : "desc",
      ...(seachValue?.[FilterInputs.FILTER_TYPE] === FilterColumns.NAME
        ? { name: seachValue?.[FilterInputs.FILTER_TEXT] }
        : { category: seachValue?.[FilterInputs.FILTER_TEXT] }),
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setPage(parseInt(params.get("page") ?? "1"));
  }, [params]);

  if (isFetching) {
    return <LoadingPage />;
  }
  return (
    <BasicLayout className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1>Product List</h1>
          <Link to={NAVIGATION_ROUTES.CREATE_PRODUCT}>
            <Button variant="outline" className="rounded-full">
              <Plus size="1rem" />
              <p>Create Product</p>
            </Button>
          </Link>
        </div>
        <Form {...filterMethods}>
          <form
            onSubmit={filterMethods.handleSubmit(handleFilterFormSubmit)}
            className="flex space-x-2 items-center"
          >
            <FormField
              control={filterMethods.control}
              name={FilterInputs.FILTER_TYPE}
              render={({ field }) => (
                <Select
                  value={field.value}
                  name={field.name}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Search for name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={FilterColumns.NAME}>
                      Search for name
                    </SelectItem>
                    <SelectItem value={FilterColumns.CATEGORY}>
                      Search for category
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              control={filterMethods.control}
              name={FilterInputs.FILTER_TEXT}
              render={({ field }) => <Input placeholder="Search" {...field} />}
            />
            <Button variant="secondary">Search</Button>
          </form>
        </Form>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={setSortName}
              >
                Name
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={setSortCategory}
              >
                Category
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-end"
                onClick={setSortPrice}
              >
                Price
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-end"
                onClick={setSortPromotePrice}
              >
                Promote Price
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-end"
                onClick={setSortStock}
              >
                Stock
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={setSortCreatedDate}
              >
                Created Date
              </Button>
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.docs &&
            data.docs.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  {index + (page - 1) * PAGE_LIMIT + 1}
                </TableCell>
                <TableCell>
                  <Link
                    to={NAVIGATION_ROUTES.PRODUCT_DETAIL.replace(
                      ":id",
                      product._id
                    )}
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell className="text-right">
                  {product.promotePrice
                    ? formatPrice(product.promotePrice)
                    : "Not available"}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button data-product-id={product._id} variant="outline">
                      <Edit size="1rem" />
                    </Button>
                    <Button data-product-id={product._id} variant="outline">
                      <Trash className="stroke-red-500" size="1rem" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className="my-10">
        <PaginationContent>
          {data && data.hasPrevPage && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${Math.max(page - 1, 1)}`} />
            </PaginationItem>
          )}
          {data && data.hasNextPage && (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </BasicLayout>
  );
};

export default ProductListPage;
