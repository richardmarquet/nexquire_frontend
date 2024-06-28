import React from "react";
import CreatePostsForm from "./CreatePostsForm";
import {
  BuildPrimaryTagToSecondaryTagMap,
  GetAllPrimaryTags,
} from "@/components/actions/tags/TagActions";
import { GetAllProjectsForUser, GetProjectById } from "@/components/actions/projects/ProjectActions";

interface Props {
  params: {
    projectId: string;
  }
}
const CreatePostsPage = async ({ params }: Props) => {
  const { projectId } = params;
  
  const projectId_num = Number(projectId);
  if (isNaN(projectId_num)) {
    throw "ProjectID must be a number";
  }

  const project = await GetProjectById(projectId_num);
  if (!project) {
    throw "ProjectID is invalid";
  }

  const primaryTags = await GetAllPrimaryTags();
  if (!primaryTags) {
    throw "unable to acquire primary tags";
  }

  return (
    <div className="">
      <CreatePostsForm
        primaryTags={primaryTags}
        primaryToSecondaryTagMap={await BuildPrimaryTagToSecondaryTagMap()}
        project={project}
      />
    </div>
  );
};

export default CreatePostsPage;
