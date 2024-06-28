"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { SlidersHorizontal, Edit } from "lucide-react";
// import { PriorityLevel, PriorityLevels, StatusLevels } from "./TaskTypes";
import { PriorityLevel, Task } from "@/components/types/DemoTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";

// const ChoosePriorityColor = (priority: PriorityLevel): string => {
//   switch (priority) {
//     case "Low":
//       return "text-green-400";
//     case "Medium":
//       return "text-amber-400";
//     case "High":
//       return "text-red-400";
//     case "Very High":
//       return "text-red-400";
//   }
// };

const ChoosePriorityColor = (priority: string): string => {
  switch (priority) {
    case "Low":
      return "text-green-400";
    case "Medium":
      return "text-amber-400";
    case "High":
      return "text-red-400";
    case "Very High":
      return "text-red-600";
    case "Immediate Action":
      return "text-red-800";
    default:
      return "";
  }
};

interface TasksTableProps {
  tasks: Task[] | null;
}

// If we want to make this table scrollable. Look at this
// https://github.com/shadcn-ui/ui/issues/1151#issuecomment-1797902759
const TasksTable = ({ tasks }: TasksTableProps) => {
  const router = useRouter();

  if (tasks == null) return <h1>Nothing to show</h1>;

  const GoToTask = (id: number) => {
    router.push(`/vendorportal/dashboard/tasks/${id}`);
  };

  return (
    <div>
      <div className="w-full h-full flex justify-between items-center mb-5">
        <div>
          <h1 className="font-medium text-xl">Recent Tasks</h1>
        </div>
        {/* <div>
          <Link href={`/dashboard/notifications`}>
            <Button variant={"outline"}>Create Task</Button>
          </Link>
        </div> */}
      </div>
      <div className="flex justify-between mb-5">
        <div className="w-full">
          <Card className="">
            <CardContent>
              <div className="flex space-x-2 mt-6">
                <Input type="search" placeholder="Title..." />
                <Input
                  className="w-6/12"
                  type="search"
                  placeholder="Owner..."
                />
                <Input className="w-6/12" type="search" placeholder="Id..." />
                <Input
                  className="w-6/12"
                  type="search"
                  placeholder="# Requests..."
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className="bg-white text-black border ml-5 hover:bg-gray-100"
                    >
                      <SlidersHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="">
                      <div className="">
                        <div>
                          <h1 className="font-bold text-lg">General</h1>
                          <Separator />
                          <div className="mt-2 flex justify-between">
                            <h1 className="text-md">Require Owner</h1>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-10 border shadow-lg rounded-lg bg-white">
        <Table className="rounded-lg">
          <TableHeader className="">
            <TableRow>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Requests</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className=""
                onClick={() => GoToTask(task.id)}
              >
                <TableCell
                  className={`font-bold ${ChoosePriorityColor(task.priority!)}`} // TODO yeah pls make priority a type...not enum
                >
                  <h1>{task.priority!}</h1>
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignee_name}</TableCell>
                <TableCell>{task.requests.length}</TableCell>
                <TableCell>
                  {task.description && task.description?.length <= 100
                    ? task.description
                    : task.description?.substring(0, 100) + "..."}
                </TableCell>
                <TableCell>{task.completed_at ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksTable;
