"use client";

import { Project } from "@/components/types/DemoTypes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

  const data = [
  {
    name: "Jan",
    amt: 1000,
  },
  {
    name: "Feb",
    amt: 1300,
  },
  {
    name: "Mar",
    amt: 600,
  },
  {
    name: "Apr",
    amt: 1400,
  },
  {
    name: "May",
    amt: 3700,
  },
  {
    name: "Jun",
    amt: 5450,
  },
  {
    name: "Jul",
    amt: 2550,
  },
  {
    name: "Aug",
    amt: 1000,
  },
  {
    name: "Sep",
    amt: 2000,
  },
  {
    name: "Oct",
    amt: 6000,
  },
  {
    name: "Nov",
    amt: 5000,
  },
  {
    name: "Dec",
    amt: 3000,
  },
];

interface Props {
    project: Project;
}

const BudgetSpentOverTime = ({ project }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin', 'dataMax + 1000']}/>
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#228B22" fill="#228B22" />
        </AreaChart>
    </ResponsiveContainer>
  );
};

export default BudgetSpentOverTime;
