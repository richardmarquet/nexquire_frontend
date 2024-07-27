import { GetAllOffersForClient } from "@/components/actions/offers/OfferActions";
import React from "react";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";
import AllOffersPageContent from "./_components/AllOffersPageContent";

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

  const offers = await GetAllOffersForClient();
  if (!offers) {
    return <h1>No offers...</h1>;
  }

  return (
    <div>
      <AllOffersPageContent offers={offers} project={project} />
    </div>
  );
};

export default page;
