import { GetOfferById } from "@/components/actions/offers/OfferActions";
import OfferContent_Client from "./OfferContent_Client";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";

interface Props {
  params: {
    id: string;
    projectId: string;
  };
}

const OfferPage = async ({ params }: Props) => {
  const { id, projectId } = params;

  const id_num = Number(id);
  if (isNaN(id_num)) {
    // TODO this should throw maybe or just redirect?
    return <h1>id must be a number</h1>;
  }

  const projectId_num = Number(projectId);
  if (isNaN(projectId_num)) {
    return <h1>projectid must be a number</h1>;
  }

  return (
    <div className="">
      <OfferContent_Client
        offer={await GetOfferById(id_num)}
        project={await GetProjectById(projectId_num)}
      />
    </div>
  );
};

export default OfferPage;
