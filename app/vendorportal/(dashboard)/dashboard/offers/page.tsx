import {
  GetAllOffersByVendor,
} from "@/components/actions/offers/OfferActions";
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
}

const page = async ({searchParams}: OffersProps) => {
  const { type } = searchParams ?? { type: "" };


  const offers = await GetAllOffersByVendor();

  //console.log(offers);

  return (
    <div>
      <OffersPageContent offers={offers} />
    </div>
  );
};

export default page;
