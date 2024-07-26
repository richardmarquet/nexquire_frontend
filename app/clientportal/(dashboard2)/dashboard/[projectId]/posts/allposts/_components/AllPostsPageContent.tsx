"use client";
import { Post, Project } from "@/components/types/DemoTypes";
import React from "react";
import PostsTable from "../../_components/PostsTable";

interface Props {
  project: Project;
  posts: Post[];
}

const AllPostsPageContent = ({ project, posts }: Props) => {
  return (
    <div>
      <h1 className="text-xl font-medium pb-5">All Posts</h1>
      <PostsTable data={posts} projectId={project.id} />
    </div>
  );
};

export default AllPostsPageContent;
