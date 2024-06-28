import React from "react";
import { GetOfferById } from "@/components/actions/offers/OfferActions";
import OfferContent_Vendor from "./OfferContent_Vendor";

interface Props {
  params: {
    id: string;
  };
}

const OfferPage = async ({ params }: Props) => {
  const { id } = params;

  const id_num = Number(id);
  if (isNaN(id_num)) {
    // TODO this should throw maybe or just redirect?
    return <h1>id must be a number</h1>;
  }

  return (
    <div className="">
      <OfferContent_Vendor
        offer={await GetOfferById(id_num)}
      />
    </div>
  );
};

export default OfferPage;
