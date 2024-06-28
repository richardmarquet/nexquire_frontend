"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clipboard } from "lucide-react";

interface Props {
  description: string;
}

const ProjectDescriptionButton = ({ description }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Clipboard />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Description</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-[300px]">
          <p>{description}</p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDescriptionButton;
