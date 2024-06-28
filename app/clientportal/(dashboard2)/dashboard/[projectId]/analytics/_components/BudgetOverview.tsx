"use client";

import { Project } from "@/components/types/DemoTypes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 1000,
  },
  {
    name: "Feb",
    total: 2300,
  },
  {
    name: "Mar",
    total: 2900,
  },
  {
    name: "Apr",
    total: 4300,
  },
  {
    name: "May",
    total: 8000,
  },
  {
    name: "Jun",
    total: 13450,
  },
  {
    name: "Jul",
    total: 16000,
  },
  {
    name: "Aug",
    total: 17000,
  },
  {
    name: "Sep",
    total: 19000,
  },
  {
    name: "Oct",
    total: 25000,
  },
  {
    name: "Nov",
    total: 30000,
  },
  {
    name: "Dec",
    total: 33000,
  },
];

interface Props {
    project: Project;
}

const BudgetOverview = ({ project }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ReferenceLine
          y={project.budget}
          stroke="#228B22"
          strokeDasharray="3 3"
          label={{ value: "Budget", position: "top", fill: "#228B22", dy: -10 }}
          className="opacity-50"
        />
        <Bar dataKey="total" fill="#7a66ff" radius={[4, 4, 0, 0]} className="">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.total > project.budget ? "#ff0000" : "#228B22"}
            />
          ))}
        </Bar>
        <Tooltip cursor={{ fill: "transparent" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetOverview;
