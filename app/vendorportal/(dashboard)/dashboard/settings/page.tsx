import { BuildSecondaryTagPrimaryToTagMap, GetTagsForVendor } from "@/components/actions/tags/TagActions";
import React from "react";
import TagPageContent from "./_components/TagPageContent";

const page = async () => {
  const tags = await GetTagsForVendor();
  const map = await BuildSecondaryTagPrimaryToTagMap();
  if (!map || !tags) {
    return <div>strange...</div>;
  }

  return (
    <main>
      <TagPageContent currentTags={tags} tagMap={map} />
    </main>
  );
};

export default page;
