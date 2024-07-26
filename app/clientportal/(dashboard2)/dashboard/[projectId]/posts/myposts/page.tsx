import React from "react";
import MyPostsPageContent from "./_components/MyPostsPageContent";
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

  const names = ["Kamie Sullivan"];

  posts.map((post) => {
    post.owner = names[0];
  });

  return (
    <div>
      <MyPostsPageContent posts={posts} project={project} />
    </div>
  );
};

export default page;
