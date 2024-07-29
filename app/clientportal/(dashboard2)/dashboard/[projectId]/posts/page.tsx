import React from "react";
import {
  GetAllPostsCreatedByClient,
  GetAllPostsInProject,
} from "@/components/actions/posts/PostActions";
import PostsPageContent from "./_components/PostsPageContent";
import { PriorityLevel } from "@/components/types/DemoTypes";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";
import { redirect, RedirectType } from "next/navigation";

interface Props {
  params: {
    projectId: string;
  };
}

const page = async ({ params }: Props) => {
  const { projectId } = params;

  const projectIdNum = Number(projectId);
  if (isNaN(projectIdNum)) {
    throw "Invalid Project Id";
  }

  const project = await GetProjectById(projectIdNum);
  if (!project) {
    throw "Project not found";
  }

  redirect("posts/allposts", RedirectType.push);
};

export default page;
