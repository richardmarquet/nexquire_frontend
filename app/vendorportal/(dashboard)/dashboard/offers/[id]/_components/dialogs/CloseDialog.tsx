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
const CloseDialog = ({ offerId }: Props) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="destructive"
        size="sm"
      >
        Close Offer
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Close?</DialogTitle>
        <DialogDescription>
          By Closing, you will terminate this offer...
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant={"default"}
            onClick={() => console.log("")}
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CloseDialog;