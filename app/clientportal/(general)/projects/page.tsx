import React from "react";
import ProjectsInfo from "./_components/ProjectsInfo";
import ProjectsTable from "./_components/ProjectsTable";
import { GetAllProjectsForUser } from "@/components/actions/projects/ProjectActions";

const page = async () => {
  const projects = await GetAllProjectsForUser();
  if (!projects) {
    return <div>No projects</div>
  }
  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-bold mb-5 ml-1">My Projects</h1>
        <div className="mt-5 mb-5">
          <ProjectsInfo projects={projects} />
        </div>
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
};

export default page;
