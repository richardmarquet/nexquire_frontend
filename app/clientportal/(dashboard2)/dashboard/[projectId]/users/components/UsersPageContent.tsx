import { User, Project } from "@/components/types/DemoTypes";
import React from "react";
import UsersTable from "./UsersTable";

interface Props {
  project: Project;
  users: User[];
}

const UsersPageContent = ({ project, users }: Props) => {
  return (
    <div>
      <UsersTable data={users} projectId={project.id} />
    </div>
  );
};

export default UsersPageContent;
