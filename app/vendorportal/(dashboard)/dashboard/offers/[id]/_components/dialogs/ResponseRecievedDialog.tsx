"use client";
import { Offer } from "@/components/types/DemoTypes";
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
  offer: Offer;
}

// TODO
// Add an input for a reason string
const ResponseRecievedDialog = ({ offer }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Response Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Response Info</DialogTitle>
          <DialogDescription>
            {offer.response === "Accept" ? "Congrats on getting accepted!" : "This offer has been rejected...but you can make another!"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"default"}
              onClick={() => console.log()}
            >
              {offer.response === "Accept" ? "Okay" : "Create New Offer"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseRecievedDialog;
