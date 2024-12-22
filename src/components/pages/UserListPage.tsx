import {
  Badge,
  BasicLayout,
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
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

const PAGE_LIMIT = 10;

export const UserListPage = () => {
  const [params] = useSearchParams();
  const [page, setPage] = useState(parseInt(params.get("page") ?? "1"));
  const [sortBy, setSortBy] = useState<[string, boolean] | undefined>(
    undefined
  );

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

  useEffect(() => {
    setPage(parseInt(params.get("page") ?? "1"));
  }, [params]);

  const { data, isFetching } = useUsers({
    filters: {
      page: page,
      limit: PAGE_LIMIT,
      sortBy: sortBy ? sortBy[0] : undefined,
      sortOrder: sortBy && sortBy[1] ? "asc" : "desc",
    },
  });

  if (isFetching) {
    return <LoadingPage />;
  }
  return (
    <BasicLayout className="p-8 w-full">
      <h1 className="mb-8">User List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={setSortEmail}
              >
                Email
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={setSortName}
              >
                Name
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
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell>{user.name}</TableCell>
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
