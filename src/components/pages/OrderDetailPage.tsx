import {
  Badge,
  BasicLayout,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useOrderDetail } from "@/hooks";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { formatPrice, relativeServerLinkToURL } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FilterCategory } from "@/constants/enums/order";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";

export const OrderDetailPage = () => {
  const { id = "" } = useParams();
  const [editStatusValue, setEditStatusValue] = useState<
    Exclude<FilterCategory, FilterCategory.ALL> | undefined | ""
  >();
  const { data: order } = useOrderDetail({
    id: id,
    options: {
      enabled: id !== "",
    },
  });

  const { mutate } = useUpdateOrderStatus();

  const handleConfirmEdit = () => {
    if (editStatusValue !== undefined && editStatusValue !== "") {
      mutate({ id, status: editStatusValue });
      setEditStatusValue(undefined);
    }
  };

  const handleAbortEdit = () => {
    setEditStatusValue(undefined);
  };

  const handleStartingToEdit = () => {
    setEditStatusValue("");
  };

  if (!order) {
    return <LoadingPage />;
  }

  return (
    <BasicLayout className="p-8 w-full">
      <div className="justify-between items-center mb-8">
        <h1 className="text-left">Order Detail</h1>
        {order.items.map((item) => (
          <div
            key={item._id}
            className="rounded-lg shadow-lg px-4 py-2 flex justify-between space-x-2 items-center"
          >
            <div className="flex h-24 space-x-4 items-center">
              <div className="aspect-square w-24 rounded-xl  overflow-hidden">
                <img
                  src={relativeServerLinkToURL(item.productId.imageUrl)}
                  alt={item.productId._id}
                />
              </div>
              <div>
                <p className="text-lg font-semibold">{item.productId.name}</p>
                <p className="text-sm font-light">
                  {item.productId.description}
                </p>
              </div>
            </div>
            <div>
              <p>
                Quantity:{" "}
                <span className="text-md font-semibold">{item.quantity}</span>
              </p>
              <div>
                Pricing:{" "}
                {formatPrice(
                  item.productId.promotePrice ?? item.productId.price
                )}
              </div>
            </div>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center justify-between">
            <div className="flex space-x-4 items-center">
              <p>Status</p>
              <Badge>{order.status}</Badge>
              {editStatusValue === undefined && (
                <Button
                  className=" min-h-0 py-1"
                  variant="ghost"
                  title="Edit Status"
                  onClick={handleStartingToEdit}
                >
                  <Pencil />
                </Button>
              )}
            </div>
            {editStatusValue !== undefined && (
              <div className="ml-auto flex space-x-4 items-center">
                <Select
                  value={editStatusValue}
                  onValueChange={(value) =>
                    setEditStatusValue(
                      value as unknown as Exclude<
                        FilterCategory,
                        FilterCategory.ALL
                      >
                    )
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {Object.entries(FilterCategory)
                        .filter(([_, value]) => value !== FilterCategory.ALL)
                        .map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex space-x-4 my-2 items-center">
                  <Button variant="secondary" onClick={handleAbortEdit}>
                    Cancel
                  </Button>
                  <Button variant="default" onClick={handleConfirmEdit}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
          {!!order.address && (
            <div className="flex flex-col items-end">
              <div className="font-semibold">Deliver to </div>
              <div className="flex justify-between">{order.address}</div>
            </div>
          )}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          Total
          <span className="font-bold text-xl">
            {formatPrice(order.totalPrice)}
          </span>
        </div>
      </div>
    </BasicLayout>
  );
};

export default OrderDetailPage;
