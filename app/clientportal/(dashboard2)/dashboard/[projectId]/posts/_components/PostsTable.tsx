"use client";

import { Post } from "@/components/types/DemoTypes";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface Props {
  posts: Post[] | null;
  projectId: number;
}

const PostsTable = ({ posts, projectId }: Props) => {
  const router = useRouter();
  
  // TODO something better...
  if (!posts) return <div>No posts to show...</div>;

  const GotoPost = (postId: number) => {
    router.push(`/clientportal/dashboard/${projectId}/posts/${postId}`);
  };

  return (
    <div className="mb-10 border shadow-lg rounded-lg bg-white z-10">
      <Table className="rounded-lg">
        <TableHeader className="">
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Id</TableHead>
            <TableHead className="">Total Requests</TableHead>
            <TableHead className="">Active</TableHead>
            <TableHead className="">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} onClick={() => GotoPost(post.id)}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.requests.length}</TableCell>
              <TableCell>{post.active ? "Yes" : "No"}</TableCell>
              <TableCell>{post.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
