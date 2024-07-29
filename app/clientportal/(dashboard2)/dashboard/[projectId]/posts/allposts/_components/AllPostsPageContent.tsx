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
      <PostsTable data={posts} projectId={project.id} />
    </div>
  );
};

export default AllPostsPageContent;
