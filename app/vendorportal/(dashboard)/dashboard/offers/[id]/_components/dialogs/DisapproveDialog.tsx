"use client"
import { DisapproveOffer } from "@/components/actions/offers/OfferActions";
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
const DisapproveDialog = ({ offerId }: Props) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        size="sm"
      >
        Disapprove
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Disapprove?</DialogTitle>
        <DialogDescription>
          By Disapproving, you will let the creator of the offer
          know that changes need to be made
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant={"destructive"}
            onClick={() => DisapproveOffer(offerId, "Admin disapproval")}
          >
            Disapprove
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DisapproveDialog