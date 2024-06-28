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
    total: 10,
  },
  {
    name: "Feb",
    total: 6,
  },
  {
    name: "Mar",
    total: 2,
  },
  {
    name: "Apr",
    total: 8,
  },
  {
    name: "May",
    total: 3,
  },
  {
    name: "Jun",
    total: 11,
  },
  {
    name: "Jul",
    total: 4,
  },
  {
    name: "Aug",
    total: 6,
  },
  {
    name: "Sep",
    total: 10,
  },
  {
    name: "Oct",
    total: 12,
  },
  {
    name: "Nov",
    total: 4,
  },
  {
    name: "Dec",
    total: 1,
  },
];

interface Props {
    project: Project;
}

const PostsOvertime = ({ project }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
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
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#7a66ff" radius={[4, 4, 0, 0]} className="">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill="#228B22"
            />
          ))}
        </Bar>
        <Tooltip cursor={{ fill: "transparent" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PostsOvertime;
