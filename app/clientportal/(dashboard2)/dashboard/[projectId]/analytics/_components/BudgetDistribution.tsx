import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Concrete: 40, Wood: 30, Steel: 25, Other: 5 },
  { month: "Feb", Concrete: 30, Wood: 40, Steel: 25, Other: 5 },
  { month: "Mar", Concrete: 20, Wood: 50, Steel: 20, Other: 10 },
  { month: "Apr", Concrete: 27, Wood: 39, Steel: 25, Other: 9 },
  { month: "May", Concrete: 18, Wood: 48, Steel: 19, Other: 15 },
  { month: "Jun", Concrete: 23, Wood: 38, Steel: 30, Other: 9 },
];

const BudgetDistribution = () => (
  <ResponsiveContainer width="100%" height={350} className={""}>
    <AreaChart
      data={data}
      stackOffset="expand"
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={(value) => `${value * 100}%`} />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="Concrete"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="Wood"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Area
        type="monotone"
        dataKey="Steel"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
      <Area
        type="monotone"
        dataKey="Other"
        stackId="1"
        stroke="#6495ED"
        fill="#6495ED"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default BudgetDistribution;
