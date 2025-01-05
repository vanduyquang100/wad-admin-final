import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Configuration for the chart
const chartConfig = {
  revenue: {
    label: "Revenue: ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  chartData: { date: string; revenue: number }[];
};

export const RevenueChart = ({ chartData }: Props) => {
  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-sm text-gray-600">
        No Data
      </div>
    );
  }
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.split("-").slice(1).join("/")}
        />
        <YAxis
          tickFormatter={(value) => `${(value / 1e6).toFixed(1)}M VND`}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="revenue"
          type="natural"
          fill="var(--color-revenue)"
          fillOpacity={0.4}
          stroke="var(--color-revenue)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
