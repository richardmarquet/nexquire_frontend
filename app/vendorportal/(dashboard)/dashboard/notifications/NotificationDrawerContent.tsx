import { Post } from "@/components/types/DemoTypes";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Ref } from "react";
import { toast } from "sonner";
import NotificationDrawerTaskCreation from "./NotificationDrawerTaskCreation";
import { User } from "@/components/types/DemoTypes";
import { CreateTask } from "@/components/actions/tasks/TaskActions";

interface NotificationDrawerContentProps {
  post: Post;
  users: User[];
  openDialog: boolean;
  setOpenDrawer: (open: boolean) => void;
  subDivRef: Ref<HTMLDivElement>;
}

const NotificationDrawerContent = ({
  post,
  users,
  openDialog,
  setOpenDrawer,
  subDivRef,
}: NotificationDrawerContentProps) => {

  // Called from NotificationDrawerTaskCreation 
  const createTask = async (
    title: string,
    description: string,
    requestIds: number[],
    userId: string,
    priority: string,
    dueDate: Date
  ) => {
    const res = await CreateTask(title, requestIds, priority, userId, dueDate, description);

    if (!res) {
      toast("Error...", {
        description: `Task Failed to be Created...`,
        duration: 2000,
      });
      return;
    }

    toast("Task Created Successfully", {
      description: `User ${userId.toString()} has been assigned to new task...`,
      duration: 2000,
    });

    setOpenDrawer(false);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-10/12 h-full m-5">
        <div className="mb-5">
          <h1 className="font-bold text-3xl">{post.client_name}</h1>
          <Separator className="mt-1" />
        </div>
        <div className="mb-5">
          <h1 className="text-xl font-bold mb-2">Description</h1>
          <p>{post.description}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-2">Requests</h1>
          <NotificationDrawerTaskCreation
            post={post}
            users={users}
            createTask={createTask}
            subDivRef={subDivRef}
          />
        </div>
        <Tabs defaultValue={`${post.requests[0].item_name}`} className="h-full">
          <TabsList>
            {post.requests.map((request) => (
              <TabsTrigger value={`${request.item_name}`} key={request.id}>
                {request.item_name}
              </TabsTrigger>
            ))}
          </TabsList>
          {post.requests.map((request) => (
            <TabsContent
              value={`${request.item_name}`}
              key={request.id}
              className="h-3/5"
            >
              <ScrollArea className="h-full">
                <Card className="h-full">
                  <CardContent className="">
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-2xl">
                        {request.item_name}{" "}
                        <span className="text-xs">
                          ({request.quantity} {request.unit_of_measure})
                        </span>
                      </p>
                    </div>
                    <div className="mb-2">
                      <h1 className="text-sm">
                        Deliver to{" "}
                        <span className="font-bold italic">
                          {request.city},{request.state}
                        </span>{" "}
                        by{" "}
                        <span className="font-bold italic">
                          {/* {request.timeframe} */}
                          December
                        </span>
                      </h1>
                    </div>
                    <p className="">{request.description}</p>
                    <div className="">
                      <p className="mt-2 text-md">{request.primary_tag}</p>
                      <p className="text-xs opacity-60 italic">
                        {request.secondary_tags.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default NotificationDrawerContent;
