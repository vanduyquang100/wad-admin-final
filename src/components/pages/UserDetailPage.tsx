import {
  Badge,
  BasicLayout,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  useGetUser,
  useUpdateOtherUser,
  useUserInfoContext,
  useUserOrders,
} from "@/hooks";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { formatPrice } from "@/lib/utils";
import { UserRoles } from "@/constants/global";

const roleOrders: Record<UserRoles, number> = {
  [UserRoles.ADMIN]: 1,
  [UserRoles.USER]: 0,
};

const UserDetailPage = () => {
  const { id = "" } = useParams();
  const { user } = useUserInfoContext();
  const { mutate } = useUpdateOtherUser();
  const { data, isFetching } = useGetUser({
    id: id,
    options: {
      enabled: id !== "",
    },
  });

  const { data: orders } = useUserOrders({
    userId: id,
    options: {
      enabled: id !== "",
    },
  });

  if (!data && isFetching) {
    return <LoadingPage />;
  }

  if (!data || !user) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        No Data
      </div>
    );
  }

  const banUser = () => {
    if (!!data.bannedTimestamp) {
      mutate({
        _id: data._id,
        bannedTimestamp: null,
      });
      return;
    }
    mutate({
      _id: data._id,
      bannedTimestamp: Date.now(),
    });
  };

  const switchUserRole = () => {
    if (data.roles.includes(UserRoles.ADMIN)) {
      mutate({
        _id: data._id,
        roles: data.roles.filter((r) => r !== UserRoles.ADMIN),
      });
      return;
    }
    mutate({
      _id: data._id,
      roles: [...data.roles, UserRoles.ADMIN],
    });
  };

  return (
    <BasicLayout className="p-8 w-full">
      <div className="flex justify-between">
        <h1 className="text-left">User Detail</h1>
        {data._id !== user._id && (
          <Button variant="destructive" onClick={banUser}>
            {data.bannedTimestamp ? "Unban Account" : "Ban Account"}
          </Button>
        )}
      </div>
      <div className="my-12">
        <section className="flex space-x-4 items-center">
          <div className="w-24 h-24 relative">
            <img
              className="rounded-full w-24 h-24"
              src={data.profilePic}
              alt="Profile"
            />
            {!!data.bannedTimestamp && (
              <p className="rounded-lg px-8 py-2 bg-black text-white font-bold rotate-45 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 origin-center">
                Banned
              </p>
            )}
          </div>
          <div>
            <p className="text-md font-bold">{data.name}</p>
            <p className="text-sm text-gray-600">{data.email}</p>
          </div>
        </section>
        <hr className="my-8" />
        <section className="my-8 space-y-2">
          <div className="flex space-x-4 items-center justify-between">
            <div>
              <span className="font-bold">Roles:&nbsp;</span>{" "}
              <Badge variant="secondary" className="text-xs font-medium">
                {data.roles
                  .sort((r1, r2) =>
                    roleOrders[r1 as UserRoles] < roleOrders[r2 as UserRoles]
                      ? 1
                      : -1
                  )
                  .at(0)}
              </Badge>
            </div>
            {data.roles && (
              <Button
                variant="outline"
                className="ml-auto"
                onClick={switchUserRole}
              >
                {data.roles.includes(UserRoles.ADMIN)
                  ? "Downgrade role"
                  : "Promote to admin"}
              </Button>
            )}
          </div>
          <p>
            <span className="font-bold">Created at:&nbsp;</span>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </section>
        <hr className="my-8" />
        <section className="my-2">
          <p className="font-medium text-lg">
            Recent Orders ({orders ? orders.length : 0})
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Created Time</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead>Payment Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!orders &&
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Link
                        to={NAVIGATION_ROUTES.ORDER_DETAIL.replace(
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
                    <TableCell>
                      {order.paymentInfo ?? "No payment info"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </BasicLayout>
  );
};

export default UserDetailPage;
