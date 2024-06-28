"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerOverlay,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, UserPlus } from "lucide-react";
import Link from "next/link";
import { XCircle, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { User } from "./UserTypes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserTableProps {
  admin_users: User[];
  regular_users: User[];
}

const UsersTable = ({ admin_users, regular_users }: UserTableProps) => {
  return (
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
                                  <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <h1 className="text-lg font-bold flex justify-center ml-1">
                                  {user.name}
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
                                        <h1 className="text-red-300">Delete</h1>
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
                                <AvatarFallback>OM</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                          <h1 className="text-md flex justify-center">
                            {user.name}
                          </h1>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-64">
                        <ContextMenuItem className="flex justify-between" inset>
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
                                  <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                            <h1 className="flex justify-center text-2xl font-bold">
                              {user.name}
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
                          <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <h1 className="text-md flex justify-center">{user.name}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersTable;
