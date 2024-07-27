import { redirect, RedirectType } from "next/navigation";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";

interface OffersProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  };
  params: {
    projectId: string;
  }
}

const page = async ({searchParams, params}: OffersProps) => {
  const { type } = searchParams ?? { type: "" };
  const { projectId } = params;

  const projectIdNum = Number(projectId);
  if (isNaN(projectIdNum)) {
    throw "Invalid projectId";
  }

  const project = await GetProjectById(projectIdNum);
  if (!project) {
    throw "Project not found";
  }

  redirect("offers/alloffers", RedirectType.push);
};

export default page;
