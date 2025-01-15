"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

export function AppBarChart({ chartData }) {
  // Subtracting and calculating percentage change between the last two months (June - May)
  const m1 = chartData[chartData.length - 1].desktop;
  const m2 = chartData[chartData.length - 2].desktop;

  // Calculate the difference and percentage change
  const lastTwoMonthsDifference = m1 - m2;
  const percentageChange = ((lastTwoMonthsDifference / m2) * 100).toFixed(2); // Percentage change formatted to 2 decimal places

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="text-black w-[35vw] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">Bar Chart - Horizontal</CardTitle>
        <CardDescription className="text-black">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "#e0e0e0" }} // Lighter Y-axis labels for contrast
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#00b300" radius={5} />{" "}
            {/* Indigo bars */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm text-black">
        <div className="flex gap-2 font-medium leading-none text-black">
          Trending up by {percentageChange}% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-black">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
