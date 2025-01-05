import {
  Badge,
  BasicLayout,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useGetUser, useUserOrders } from "@/hooks";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { formatPrice } from "@/lib/utils";

const UserDetailPage = () => {
  const { id = "" } = useParams();
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

  if (!data) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        No Data
      </div>
    );
  }

  return (
    <BasicLayout className="p-8 w-full">
      <h1 className="text-left">User Detail</h1>
      <div className="my-12">
        <section className="flex space-x-10">
          <img src={data.profilePic} alt="Profile" />
          <div>
            <p className="text-md font-bold">{data.name}</p>
            <p className="text-sm text-gray-600">{data.email}</p>
          </div>
        </section>
        <hr className="my-8" />
        <section className="my-8 space-y-2">
          <p>
            <span className="font-bold">Roles:&nbsp;</span>{" "}
            <Badge variant="secondary" className="text-xs font-medium">
              {data.roles}
            </Badge>
          </p>
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
