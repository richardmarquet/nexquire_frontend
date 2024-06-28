import React from "react";
import {
  GetAllPostsCreatedByClient,
  GetAllPostsInProject,
} from "@/components/actions/posts/PostActions";
import PostsPageContent from "./_components/PostsPageContent";
import { PriorityLevel } from "@/components/types/DemoTypes";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";

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

  const posts = await GetAllPostsInProject(projectIdNum);
  if (!posts) {
    return <div>No posts in this project</div>;
  }

  return (
    <div className="">
      <PostsPageContent project={project} posts={posts} />
    </div>
  );
};

export default page;
