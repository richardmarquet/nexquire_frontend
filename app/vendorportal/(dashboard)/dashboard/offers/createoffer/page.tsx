import React from "react";
import CreateOfferForm from "./CreateOfferForm";
import { GetAllTasks, GetTaskById } from "@/components/actions/tasks/TaskActions";
import { CreateOffer } from "@/components/actions/offers/OfferActions";
import { GetCurrentUser } from "@/components/actions/users/UserActions";
import { Task } from "@/components/types/DemoTypes";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const { taskId } = searchParams ?? { taskId: "" }

  const GetTaskByIdIfGiven = async (): Promise<Task | null> => {
    const taskIdNumber = Number(taskId);

    if (isNaN(taskIdNumber)) {
      return null;
    }

    return await GetTaskById(Number(taskId));
  }

  return (
    <div>
      <CreateOfferForm
        tasks={await GetAllTasks()}
        defaultTask={await GetTaskByIdIfGiven()}
        currentUser={await GetCurrentUser()}
      />
    </div>
  );
};

export default page;
