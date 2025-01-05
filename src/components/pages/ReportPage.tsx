import {
  BasicLayout,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  RevenueChart,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  TopProductsPieChart,
} from "@/components/ui";
import { useOrderRevenue, useTopProductRevenue } from "@/hooks";
import { useState } from "react";
import LoadingPage from "./LoadingPage";

enum TimeRange {
  TODAY = "Today",
  THIS_WEEK = "This week",
  THIS_MONTH = "This month",
  THIS_YEAR = "This year",
}

const today = new Date(Date.now()).setHours(23, 59, 59, 999);

const timeRangeValues: Record<TimeRange, [number, number]> = {
  [TimeRange.TODAY]: [today - 86400000, today],
  [TimeRange.THIS_WEEK]: [today - 86400000 * 7, today],
  [TimeRange.THIS_MONTH]: [today - 86400000 * 31, today],
  [TimeRange.THIS_YEAR]: [today - 86400000 * 365, today],
};

export const UserListPage = () => {
  const [timeRangeEnum, setTimeRangeEnum] = useState<TimeRange>(
    TimeRange.THIS_WEEK
  );
  const timeRangePair = timeRangeValues[timeRangeEnum];
  const { data: orderRevenueData } = useOrderRevenue({
    start: timeRangePair[0],
    end: timeRangePair[1],
  });

  const { data: productRevenueData } = useTopProductRevenue({
    start: timeRangePair[0],
    end: timeRangePair[1],
  });

  const selectTimeRange = (value: TimeRange) => {
    setTimeRangeEnum(value);
  };
  return (
    <BasicLayout className="p-8 max-w-screen-lg">
      <h1>Reports</h1>
      <Select value={timeRangeEnum} onValueChange={selectTimeRange}>
        <SelectTrigger className="w-[180px] my-4">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Time Range</SelectLabel>
            {Object.entries(TimeRange).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex w-full my-4 flex-wrap gap-2">
        <Card className="flex-grow max-w-[45%]">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>
              This is the total revenue day by day from{" "}
              {new Date(timeRangePair[0]).toLocaleDateString()} to{" "}
              {new Date(timeRangePair[1]).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orderRevenueData ? (
              <RevenueChart chartData={orderRevenueData?.totalRevenue} />
            ) : (
              <LoadingPage />
            )}
          </CardContent>
        </Card>
        <Card className="flex-grow max-w-[45%]">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Top Revenue Products within the time range
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productRevenueData ? (
              <TopProductsPieChart chartData={productRevenueData} />
            ) : (
              <LoadingPage />
            )}
          </CardContent>
        </Card>
      </div>
    </BasicLayout>
  );
};

export default UserListPage;
