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
import { useUsers } from "@/hooks";
import LoadingPage from "./LoadingPage";
import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { useForm } from "react-hook-form";

const PAGE_LIMIT = 10;

enum FilterColumns {
  NAME = "name",
  EMAIL = "email",
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

export const UserListPage = () => {
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

  const setSortEmail = useCallback(setSortCallback("email"), [setSortCallback]);
  const setSortName = useCallback(setSortCallback("name"), [setSortCallback]);
  const setSortCreatedDate = useCallback(setSortCallback("createdAt"), [
    setSortCallback,
  ]);
  const handleFilterFormSubmit = useCallback((data: FilterFormType) => {
    setSearchValue(data);
  }, []);

  useEffect(() => {
    setPage(parseInt(params.get("page") ?? "1"));
  }, [params]);

  const { data, isFetching } = useUsers({
    filters: {
      page: page,
      limit: PAGE_LIMIT,
      sortBy: sortBy ? sortBy[0] : undefined,
      sortOrder: sortBy && sortBy[1] ? "asc" : "desc",
      ...(seachValue?.[FilterInputs.FILTER_TYPE] === FilterColumns.NAME
        ? { name: seachValue?.[FilterInputs.FILTER_TEXT] }
        : { email: seachValue?.[FilterInputs.FILTER_TEXT] }),
    },
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <LoadingPage />;
  }
  return (
    <BasicLayout className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1>User List</h1>
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
                    <SelectItem value={FilterColumns.EMAIL}>
                      Search for email
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
                onClick={setSortEmail}
              >
                Email
              </Button>
            </TableHead>
            <TableHead align="center">Roles</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={setSortCreatedDate}
              >
                Created Date
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.users &&
            data.users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  {index + (page - 1) * PAGE_LIMIT + 1}
                </TableCell>
                <TableCell>
                  <Link
                    to={NAVIGATION_ROUTES.USER_DETAIL.replace(":id", user._id)}
                  >
                    <p className={user.bannedTimestamp ? "text-red-500" : ""}>
                      {user.name} {!!user.bannedTimestamp && "(Banned)"}
                    </p>
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.roles.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className="my-10">
        <PaginationContent>
          {data && page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${Math.max(page - 1, 1)}`} />
            </PaginationItem>
          )}
          {data && page < data.totalPages && (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </BasicLayout>
  );
};

export default UserListPage;
