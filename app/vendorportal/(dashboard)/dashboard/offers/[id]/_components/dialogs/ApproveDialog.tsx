"use client"
import { ApproveOffer, DisapproveOffer } from "@/components/actions/offers/OfferActions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
    offerId: number;
}

// TODO
// Add an input for a reason string
const ApproveDialog = ({ offerId }: Props) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="default"
        size="sm"
      >
        Approve
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Approve?</DialogTitle>
        <DialogDescription>
          By Approving, you will be sending this offer to the client.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant={"default"}
            onClick={() => ApproveOffer(offerId)}
          >
            Approve
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ApproveDialog;