"use client";
import { Project } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import ProjectDescriptionButton from "./ProjectDescriptionButton";
import CircularProgressBar from "@/components/ui/CircularProgressBar";

interface Props {
  project: Project | null;
}

const ProjectCell = ({ project }: Props) => {
  if (!project) {
    return <div>Something is wrong...</div>;
  }

  const percent = Math.floor((50 / project.budget) * 100);
  return (
    <div  className="mt-10">
      <div className="mb-5">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">{project.title}</div>
          <div className="space-x-2">
            <Link href={`/clientportal/dashboard/${project.id}/analytics`}>
              <Button variant={"outline"}>
                <PackageOpen />
              </Button>
            </Link>
            <ProjectDescriptionButton description={project.description} />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-5">
          <div className="grid gap-4 grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Project Budget
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${project.budget}</div>
                <p className="text-xs text-muted-foreground text-green-700">
                  The current global budget
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
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
                <div className="text-2xl font-bold">{project.num_users}</div>
                <p className="text-xs text-muted-foreground text-green-700">
                  Number of users
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts</CardTitle>
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
                  Active posts
                </p>
              </CardContent>
            </Card>
            <div className="col-span-2 flex justify-end items-center h-full">
              <div className="w-[200px]">
                <div className="">
                  <div className="flex justify-end items-center p-0">
                    <div className="w-[65%]">
                      <CircularProgressBar percent={Math.ceil(project.amount_spent / project.budget)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCell;
