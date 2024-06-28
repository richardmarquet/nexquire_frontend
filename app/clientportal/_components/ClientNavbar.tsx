"use client";
import { LogoutUser } from "@/components/actions/users/UserActions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Boxes, DoorOpen, LucideIcon, Mail, User } from "lucide-react";
import React from "react";

interface ProfilePopoverDataInterface {
  label: string;
  icon: LucideIcon;
  action: () => void;
}

const profileAction = () => {};

const logoutAction = () => {
  LogoutUser();
};

const profilePopoverData: ProfilePopoverDataInterface[] = [
  {
    label: "Profile",
    icon: User,
    action: profileAction,
  },
  {
    label: "Logout",
    icon: DoorOpen,
    action: logoutAction,
  },
];

const ClientNavbar = () => {
  return (
    <div className="fixed w-full h-12 bg-gradient-to-b from-indigo-600 from-5% to-indigo-500">
      <div className="w-full h-full flex justify-between items-center">
        <div className="ml-3">
          <h1 className="text-white text-lg font-medium">Nexquire</h1>
        </div>
        <div className="w-[50%]">
          <Input placeholder="Search..." className="h-[60%]" />
        </div>
        <div className="mr-3">
          <div className="flex justify-center items-center space-x-3">
            <Mail className="text-white" />
            <Boxes className="text-white" />
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border hover:cursor-pointer">
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-full h-full p-0">
                <div className="">
                  {profilePopoverData.map((option) => (
                    <div
                      key={option.label}
                      className="p-1 flex justify-start items-center hover:bg-slate-100 hover:cursor-pointer"
                      onClick={() => option.action()}
                    >
                      <option.icon />
                      <h1 className="">{option.label}</h1>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientNavbar;
