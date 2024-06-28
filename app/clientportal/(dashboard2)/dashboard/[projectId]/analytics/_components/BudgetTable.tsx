"use client";
import { Offer } from "@/components/types/DemoTypes";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  offers: Offer[] | null;
}

const BudgetTable = ({ offers }: Props) => {
  const router = useRouter();
  
  // TODO something better...
  if (!offers) return <div>No offers to show...</div>;

  const GotoPost = (postId: number) => {
    router.push("/dashboard/offers/" + postId);
  };

  //const rand = Math.floor(((Math.random()*10000)))

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10 border shadow-lg rounded-lg bg-white">
          <Table className="rounded-lg">
            <TableHeader className="">
              <TableRow>
                <TableHead className="">Post</TableHead>
                <TableHead className="">Id</TableHead>
                <TableHead className="">Total Requests</TableHead>
                <TableHead className="">Purchase Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.title}</TableCell>
                  <TableCell>{offer.id}</TableCell>
                  <TableCell>{offer.task.requests.length}</TableCell>
                  <TableCell>${1034}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetTable;
