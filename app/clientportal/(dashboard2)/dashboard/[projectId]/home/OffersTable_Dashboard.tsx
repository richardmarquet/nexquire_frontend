"use client";
import {
  ChoosePriorityColor,
  StringToPriorityLevel,
} from "@/components/actions/helper/Generic";
import { Offer } from "@/components/types/DemoTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface Props {
  offers: Offer[] | null;
}

const OffersTable_Dashboard = ({ offers }: Props) => {
  const router = useRouter();
  
  if (!offers) return <h1>No offers...</h1>;

  const GotoOffer = (offerId: number) => {
    router.push("/dashboard/offers/" + offerId);
  };

  return (
      <ScrollArea className="h-[350px]">
        <Table className="rounded-lg">
          <TableHeader className="">
            <TableRow>
              <TableHead className="">Priority</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead className="">Id</TableHead>
              <TableHead className="">Client</TableHead>
              <TableHead className="">Creator</TableHead>
              {/* <TableHead className="">Description</TableHead> */}
              <TableHead className="text-right w-10">Response</TableHead>
              <TableHead className="text-right w-10">Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} onClick={() => GotoOffer(offer.id)}>
                <TableCell
                  className={`font-bold ${ChoosePriorityColor(
                    StringToPriorityLevel(offer.task.priority!) // TODO this is why enums are bad
                  )}`}
                >
                  {offer.task.priority}
                </TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.id.toString()}</TableCell>
                <TableCell>{offer.client_name}</TableCell>
                <TableCell>{offer.creator_name}</TableCell>
                <TableCell className="">
                  {offer.response ? offer.response : "pending"}
                </TableCell>
                <TableCell className="">
                  {offer.approved ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
  );
};

export default OffersTable_Dashboard;
