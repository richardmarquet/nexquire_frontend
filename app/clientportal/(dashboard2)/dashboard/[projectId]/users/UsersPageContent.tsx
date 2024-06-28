import { Project, User } from "@/components/types/DemoTypes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit, Trash, UserPlus, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  project: Project;
  users: User[];
}

const UsersPageContent = ({ project, users }: Props) => {
  let admin_users: User[] = []
  let regular_users: User[] = [];

  users.forEach((user) => {
    if (user.role >= 5) {
      admin_users.push(user);
    } else {
      regular_users.push(user);
    }
  });

  return (
    <div>
      <div className="">
        <div className="mb-5">
          <Card>
            <CardContent>
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl mt-3">Admin</h1>
                <div className="flex justify-center items-center space-x-3">
                  <Link href={"/dashboard/users/adduser"}>
                    <UserPlus className="hover:cursor-pointer opacity-100 hover:opacity-50" />
                  </Link>
                  <Sheet>
                    <SheetTrigger>
                      <Edit className="hover:cursor-pointer opacity-100 hover:opacity-50" />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Admin Users</SheetTitle>
                        <ScrollArea className="w-full h-[90vh]">
                          {admin_users.map((user) => (
                            <div
                              key={user.username}
                              className="w-full h-[75px] bg-white border-[.1px] mb-3 rounded-md shadow-sm p-2"
                            >
                              <div className="w-full h-full flex justify-between items-center">
                                <div className="flex justify-start items-center">
                                  <Avatar className="h-9 w-9">
                                    <AvatarFallback>MJ</AvatarFallback>
                                  </Avatar>
                                  <h1 className="text-lg font-bold flex justify-center ml-1">
                                    {user.full_name}
                                  </h1>
                                </div>
                                <div className="hover:cursor-pointer">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Trash className="text-red-400" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you sure you want to delete this
                                          user?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone!
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel type="submit">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                          <h1 className="text-red-300">
                                            Delete
                                          </h1>
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <Separator />
              <div className="flex justify-start flex-wrap -ml-4">
                {admin_users.map((user) => (
                  <Drawer key={user.username}>
                    <DrawerTrigger>
                      <ContextMenu>
                        <ContextMenuTrigger>
                          <div className="ml-4 hover:cursor-pointer">
                            <div className="flex justify-center items-center w-[100px] h-[100px] mb-1 mt-5 rounded-full shadow-md bg-indigo-200">
                              <div className="hover:cursor-pointer flex justify-center w-[90px] h-[90px] rounded-full bg-red-300 overflow-hidden">
                                <Avatar className="w-full h-full">
                                  <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                            <h1 className="text-md flex justify-center">
                              {user.full_name}
                            </h1>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          <ContextMenuItem
                            className="flex justify-between"
                            inset
                          >
                            <h1 className="font-bold">Delete</h1>
                            <Trash className="text-red-400" />
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="">
                        <DrawerHeader>
                          <DrawerTitle className="flex justify-between">
                            <div className="w-[150px] h-[180px] mb-5">
                              <div className="flex justify-center items-center w-[100px] h-[100px] mb-1 mt-5 rounded-full shadow-md bg-indigo-200">
                                <div className="hover:cursor-pointer flex justify-center w-[90px] h-[90px] rounded-full bg-red-300 overflow-hidden">
                                  <Avatar className="w-full h-full">
                                    <AvatarFallback>MJ</AvatarFallback>
                                  </Avatar>
                                </div>
                              </div>
                              <h1 className="flex justify-center text-2xl font-bold">
                                {user.full_name}
                              </h1>
                            </div>
                            <DrawerClose asChild>
                              <Button variant="outline" className="rounded-lg">
                                <XCircle />
                              </Button>
                            </DrawerClose>
                          </DrawerTitle>
                        </DrawerHeader>
                      </div>
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mb-5">
          <Card>
            <CardContent>
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl mt-3">User</h1>
                <div className="flex justify-center items-center space-x-3">
                  <UserPlus className="hover:cursor-pointer opacity-100 hover:opacity-50" />
                  <Edit className="hover:cursor-pointer opacity-100 hover:opacity-50" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-start flex-wrap -ml-4">
                {regular_users.map((user) => (
                  <Link
                    href={`/dashboard/users/${user.username}`}
                    key={user.username}
                  >
                    <div className="ml-4">
                      <div className="flex justify-center items-center w-[100px] h-[100px] mb-1 mt-5 rounded-full shadow-md bg-indigo-200">
                        <div className="hover:cursor-pointer flex justify-center w-[90px] h-[90px] rounded-full bg-red-300 overflow-hidden">
                          <Avatar className="w-full h-full">
                            <AvatarFallback>U17</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <h1 className="text-md flex justify-center">
                        {user.full_name}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersPageContent;
