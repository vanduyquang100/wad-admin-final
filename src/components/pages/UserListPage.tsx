import {
  Badge,
  BasicLayout,
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
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PAGE_LIMIT = 10;

export const UserListPage = () => {
  const [params] = useSearchParams();
  const [page, setPage] = useState(parseInt(params.get("page") ?? "1"));

  useEffect(() => {
    setPage(parseInt(params.get("page") ?? "1"));
  }, [params]);

  const { data, isFetching } = useUsers({
    filters: { page: page, limit: PAGE_LIMIT },
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
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.users &&
            data.users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  {index + (page - 1) * PAGE_LIMIT + 1}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="flex space-x-2">
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
