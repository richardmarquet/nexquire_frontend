"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Task } from "@/components/types/DemoTypes";
import { PriorityLevel } from "@/components/types/DemoTypes";

const data2 = [
  { name: "Low", value: 100, fillColor: "#92d050" },
  { name: "Medium", value: 200, fillColor: "#00b050" },
  { name: "High", value: 300, fillColor: "#ffc000" },
  { name: "Very High", value: 400, fillColor: "#ff0000" },
  { name: "Immediate", value: 500, fillColor: "#c00000" },
];

// I'm lazt so I'm doing this
let maxValueSeen = 0;
const BuildTaskDataArray = (tasks: Task[]) => {
  const taskMap = new Map<PriorityLevel, number>();
  tasks.forEach((task) => {
    taskMap.set(task.priority!, (taskMap.get(task.priority!) ?? 0) + 1);
  });

  console.log(taskMap);

  const data = [
    { name: "Low", value: taskMap.get("Low"), fillColor: "#92d050" },
    { name: "Medium", value: taskMap.get("Medium"), fillColor: "#00b050" },
    { name: "High", value: taskMap.get("High"), fillColor: "#ffc000" },
    { name: "Very High", value: taskMap.get("Very High"), fillColor: "#ff0000" },
    { name: "Immediate", value: taskMap.get("Immediate Action"), fillColor: "#c00000" },
  ];

  maxValueSeen = Math.max(...Array.from(taskMap.values()));

  return data;
}

interface Props {
  tasks: Task[];
}

const BarChartTaskPriority = ({ tasks }: Props) => {
  const data = BuildTaskDataArray(tasks);

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data} layout="horizontal">
        <XAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <YAxis type="number" tickLine={false} axisLine={false} domain={[0, maxValueSeen + Math.ceil((maxValueSeen * .20))]}/>
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" label={{ position: "top" }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fillColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartTaskPriority;
