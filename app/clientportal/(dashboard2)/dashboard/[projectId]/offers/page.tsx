import { Offer } from "@/components/types/DemoTypes";
import {
  GetAllOffersForClient,
  GetAllPendingApprovalOffers,
} from "@/components/actions/offers/OfferActions";
import { GetUserGroupType } from "@/components/actions/users/UserActions";
import OffersTable_Client from "./_components/OffersTable_Client";
import OffersPageContent from "./_components/OffersPageContent";

// Make a file for this

const priorityMap = {
  Low: 1,
  Medium: 2,
  High: 3,
  "Very High": 4,
  "Immediate Action": 5,
};

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

  const offers = await GetAllOffersForClient();

  console.log(offers);

  return (
    <div>
      <OffersPageContent offers={offers} projectId={projectIdNum} />
    </div>
  );
};

export default page;
