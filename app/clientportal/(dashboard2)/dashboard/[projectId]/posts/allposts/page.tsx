import { GetAllPostsInProject } from "@/components/actions/posts/PostActions";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";
import React from "react";
import AllPostsPageContent from "./_components/AllPostsPageContent";

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

  const names = ["Kamie Sullivan", "Harry Nagi", "Jason Scott"];

  posts.map((post, i) => {
    post.owner = names[i % 3];
  });

  return (
    <div className="">
      <AllPostsPageContent project={project} posts={posts} />
    </div>
  );
};

export default page;
