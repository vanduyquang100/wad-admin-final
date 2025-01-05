import { Pie, PieChart, Cell, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Configuration for the pie chart
const pieChartConfig = {
  revenue: {
    label: "Revenue Distribution",
  },
} satisfies ChartConfig;

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

type Props = {
  chartData: {
    _id: string;
    name: string;
    price: number;
    totalRevenue: number;
  }[];
};

export const TopProductsPieChart = ({ chartData }: Props) => {
  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-sm text-gray-600">
        No Data
      </div>
    );
  }

  return (
    <ChartContainer config={pieChartConfig}>
      <PieChart width={400} height={400} className="mx-auto">
        <Pie
          data={chartData}
          dataKey="totalRevenue"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          paddingAngle={5}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(1)}%`
          }
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
      </PieChart>
    </ChartContainer>
  );
};
