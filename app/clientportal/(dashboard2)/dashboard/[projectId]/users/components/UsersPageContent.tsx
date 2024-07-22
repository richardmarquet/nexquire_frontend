import { User, Project } from "@/components/types/DemoTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface Props {
  project: Project;
  users: User[];
}

// relocate
const NumToRole = (roleTypeNum: number): string => {
  switch (roleTypeNum) {
    case 0:
    case 1:
    case 2:
      return "User";
    case 3:
    case 4:
      return "Admin";
    case 5:
    case 6:
      return "Owner";
  }
  throw "bad roleTypeNum";
};

// relocate
const GetColorForRole = (roleTypeNum: number): string => {
  switch (roleTypeNum) {
    case 0:
    case 1:
    case 2:
      return "bg-green-400";
    case 3:
    case 4:
      return "bg-yellow-400";
    case 5:
    case 6:
      return "bg-red-400";
  }
  throw "bad roleTypeNum";
};

const UsersPageContent = ({ project, users }: Props) => {
  return (
    <div>
      <div className="mb-3 grid grid-cols-12">
        <Input className="col-span-2" placeholder="Filter..." />
        <Button className="col-start-12">Invite</Button>
      </div>
      <div className="mb-10 border shadow-sm rounded-lg bg-white z-10">
        <Table className="rounded-lg">
          <TableHeader>
            <TableRow className="">
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">User Settings</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>
                  <Badge className={`${GetColorForRole(user.role)}`}>{NumToRole(user.role)}</Badge>
                </TableCell>
                <TableCell className="">
                  <span className="font-bold hover:cursor-pointer">...</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="">
              <TableCell colSpan={4}>
                <span className="opacity-20 italic">{users.length} Users</span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default UsersPageContent;
