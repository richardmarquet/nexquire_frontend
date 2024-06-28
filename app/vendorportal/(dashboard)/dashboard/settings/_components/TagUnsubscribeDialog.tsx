"use client";
import { RemoveTagNotification } from "@/components/actions/notifications/NotificationActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  primaryTag: string;
  secondaryTag: string;
}

const TagUnsubscribeDialog = ({ primaryTag, secondaryTag }: Props) => {
  const router = useRouter();

  const Unsubscribe = () => {
    const res = RemoveTagNotification({ secondaryTagName: secondaryTag });
    if (!res) {
      toast("Error...", {
        description: `Unable to unsubscribe from tag...`,
        duration: 2000,
      });
      return;
    }

    toast("Successfully Unsubscribed from tag!", {
      description: `You will no longer be notified on ${secondaryTag}`,
      duration: 2000,
    });

    setTimeout(() => {
      router.refresh();
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="text-red-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unsubscribe From Tag?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want unsubscribe from{" "}
          <span className="font-bold italic">{secondaryTag}</span> (primary
          group: <span className="font-bold italic">{primaryTag}</span>)
        </DialogDescription>
        <div className="flex justify-between items-center space-x-5">
          <DialogClose className="w-full" asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            className="w-full"
            onClick={() => Unsubscribe()}
          >
            Unsubscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagUnsubscribeDialog;
