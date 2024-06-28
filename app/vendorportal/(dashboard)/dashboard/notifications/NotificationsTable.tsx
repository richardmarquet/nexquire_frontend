import { Post } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { SlidersHorizontal } from "lucide-react";
import React from "react";
import { PriorityLevels, StatusLevels } from "./TaskTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { useRouter } from "next/navigation";

interface Props {
  notifications: Post[];
}
const NotificationsTable = ({ notifications }: Props) => {

  const router = useRouter();

  const GotoNotification = (notificationId: number) => {
    router.push(`/vendorportal/dashboard/notifications/${notificationId}`);
  }

  return (
    <div>
      <div className="flex justify-between mb-5 z-10">
        <div className="w-full">
          <Card className="">
            <CardContent>
              <div className="flex space-x-2 mt-6">
                <Input type="search" placeholder="Title..." />
                <Input
                  className="w-6/12"
                  type="search"
                  placeholder="Client..."
                />
                <Input
                  className="w-6/12"
                  type="search"
                  placeholder="Creator..."
                />
                <Input className="w-6/12" type="search" placeholder="Id..." />
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
                        <div className="mt-4">
                          <h1 className="font-bold text-lg">Priorities</h1>
                          <Separator />
                          {PriorityLevels.map((level) => (
                            <div
                              className="mt-2 flex justify-between"
                              key={level}
                            >
                              <h1 className="text-md">{level}</h1>
                              <Switch />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <h1 className="font-bold text-lg">Status</h1>
                          <Separator />
                          {StatusLevels.map((level) => (
                            <div
                              className="mt-2 flex justify-between"
                              key={level}
                            >
                              <h1 className="text-md">{level}</h1>
                              <Switch />
                            </div>
                          ))}
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
          <TableHeader className="w-screen">
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Post Title</TableHead>
              <TableHead>Request Count</TableHead>
              <TableHead>Posted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {notifications.map((notification) => (
              <TableRow
                className=""
                key={notification.id}
                onClick={() => GotoNotification(notification.id)}
              >
                <TableCell>{notification.client_name}</TableCell>
                <TableCell>{notification.title}</TableCell>
                <TableCell>{notification.requests.length}</TableCell>
                <TableCell>
                  {moment(notification.created_at).toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NotificationsTable;
