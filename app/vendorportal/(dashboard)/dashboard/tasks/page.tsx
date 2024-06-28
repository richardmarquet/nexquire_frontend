import { Task } from "@/components/types/DemoTypes";
import TasksTable from "./_components/TasksTable";
import { GetAllTasks, GetAllUnassignedTasks } from "@/components/actions/tasks/TaskActions";
import TaskPageContent from "./_components/TaskPageContent";

const TasksPage = async () => {
  const tasks = await GetAllTasks();
  if (!tasks) {
    return <div>No Tasks to display</div>
  }

  return (
    <div className="">
      <TaskPageContent tasks={tasks}/>
      {/* <TasksTable tasks={await GetTasks()} /> */}
    </div>
  );
};

export default TasksPage;
