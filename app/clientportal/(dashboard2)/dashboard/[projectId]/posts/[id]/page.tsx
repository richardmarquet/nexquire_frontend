import React from "react";
import PostContent from "./PostContent";
import { GetPostById } from "@/components/actions/posts/PostActions";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    // TODO this should throw maybe or just redirect?
    return <h1>id must be a number</h1>;
  }

  const post = await GetPostById(id);
  if (!post) {
    return <h1>Post not found...</h1>;
  }

  return (
    <div className="">
      <PostContent post={post} />
    </div>
  );
};

export default page;
