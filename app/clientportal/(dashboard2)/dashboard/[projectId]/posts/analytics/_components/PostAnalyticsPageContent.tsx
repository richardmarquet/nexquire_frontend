import {
  GetNumberOfRequestsCompleted,
  GetNumberOfRequestsNotConpleted,
} from "@/components/helpers/ProjectHelperFunctions";
import { Post, Project } from "@/components/types/DemoTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import CircularProgressBar from "@/components/ui/CircularProgressBar";
import PostsOvertime from "./PostsOvertime";

interface Props {
  project: Project;
  posts: Post[];
}

const PostAnalyticsPageContent = ({ project, posts }: Props) => {
  const percent = 40;

  return (
    <div className="space-y-4 mb-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.num_posts}</div>
            <p className="text-xs text-muted-foreground text-green-700">
              All active posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Posts
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground text-green-700">
              All posts that have been completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {GetNumberOfRequestsNotConpleted(posts)}
            </div>
            <p className="text-xs text-muted-foreground text-green-700">
              Requests that have not been completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Requests
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {GetNumberOfRequestsCompleted(posts)}
            </div>
            <p className="text-xs text-muted-foreground text-green-700">
              Requests that have been completed
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Post Completion Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center text">
              <div className="w-[60%]">
                <CircularProgressBar percent={percent} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Request Completion Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="w-[60%]">
                <CircularProgressBar percent={percent} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Completed Posts Overtime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PostsOvertime project={project} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostAnalyticsPageContent;
