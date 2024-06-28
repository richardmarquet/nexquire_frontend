"use client"
import React, { useEffect } from "react";
import CurrentTagsTable from "./CurrentTagsTable";
import TagSideInfo from "./TagSideInfo";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import TagSubscriptionDialog from "./TagSubscriptionDialog";

interface Props {
  currentTags: string[];
  tagMap: Map<string, string>; // secondary to primary
}

const TagPageContent = ({ currentTags, tagMap }: Props) => {
  // for some reason it wasn't always at the top so this is a small quick hack onload to ensure it does...
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Tag Menu
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <React.Fragment key={"fragment"}>
            <TagSubscriptionDialog currentTags={currentTags} tagMap={tagMap} />
          </React.Fragment>
        </div>
      </div>
      <div className="grid grid-cols-5 space-x-5">
        <div className="col-span-3">
          <CurrentTagsTable currentTags={currentTags} tagMap={tagMap} />
        </div>
        <div className="col-span-2">
          <TagSideInfo currentTags={currentTags} />
        </div>
      </div>
    </div>
  );
};

export default TagPageContent;
