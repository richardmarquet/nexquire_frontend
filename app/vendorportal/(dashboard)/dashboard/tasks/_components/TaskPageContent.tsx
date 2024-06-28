import { Task } from "@/components/types/DemoTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChartTaskPriority from "./BarChartTaskPriority";
import TasksTable from "./TasksTable";

interface Props {
  tasks: Task[];
}

const CalcTotalReqsBasedOnTasks = (tasks: Task[]) => {
  let amount = 0;
  tasks.forEach((task) => {
    amount += task.requests.length;
  });
  return amount;
}

const TaskPageContent = ({ tasks }: Props) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground text-green-700">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Tasks
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{3}</div>
              <p className="text-xs text-muted-foreground text-green-700">
                The number of tasks that have been marked as completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of Requests
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{CalcTotalReqsBasedOnTasks(tasks)}</div>
              <p className="text-xs text-muted-foreground text-green-700">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartTaskPriority tasks={tasks}/>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="">
        <TasksTable tasks={tasks}/>
      </div>
      {/* <div className="grid grid-cols-4">
        <div className="flex justify-center items-center col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SideBarChartTaskPriority />
            </CardContent>
          </Card>
        </div>
      </div> */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recently Created Tasks</CardTitle>
            <CardDescription>
              You've got your work cut out for you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTasks />
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default TaskPageContent;
