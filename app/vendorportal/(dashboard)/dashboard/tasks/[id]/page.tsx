import React from "react";
import TaskContext from "./TaskContext";
import { Task } from "@/components/types/DemoTypes";
import { GetTaskById } from "@/components/actions/tasks/TaskActions";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    // TODO this should throw maybe or just redirect?
    return <h1>id must be a number</h1>;
  }

  return (
    <div className="">
      <TaskContext task={await GetTaskById(Number(params.id))} />
    </div>
  );
};

export default page;
