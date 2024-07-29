import React from "react";
import PostAnalyticsPageContent from "./_components/PostAnalyticsPageContent";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";
import { GetAllPostsInProject } from "@/components/actions/posts/PostActions";

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
    <div>
      <PostAnalyticsPageContent posts={posts} project={project} />
    </div>
  );
};

export default page;
