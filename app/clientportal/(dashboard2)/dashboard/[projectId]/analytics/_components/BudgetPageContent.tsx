"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalculateTotalBudget,
  CalculateTotalSpentBudget,
} from "@/components/helpers/ProjectHelperFunctions";
import { Offer, Post, Project, Task, User } from "@/components/types/DemoTypes";
import BudgetOverview from "./BudgetOverview";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BudgetDistribution from "./BudgetDistribution";
import BudgetSpentOverTime from "./BudgetSpentOverTime";
import { motion } from "framer-motion";
import BudgetTable from "./BudgetTable";

interface Props {
  data: {
    project: Project;
    posts: Post[];
    users: User[];
    offers: Offer[];
  };
}

const BudgetPageContent = ({ data }: Props) => {
  const { project, posts, users, offers } = data;

  const percent = 55;
  const percent2 = 45;

  return (
    <motion.div
    // initial={{ opacity: 0, scale: 0.95 }}
    // animate={{ opacity: 1, scale: 1 }}
    // transition={{ duration: 0.5 }}
    >
      <div className="space-y-4 mb-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <CardTitle className="text-sm font-medium">
                Total Allocated Budget
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
              <div className="text-2xl font-bold">
                ${CalculateTotalBudget(posts)}
              </div>
              <p className="text-xs text-muted-foreground text-green-700">
                Combined budget based on current posts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Budget Spent
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
                ${project.amount_spent ?? 0} 
              </div>
              <p className="text-xs text-muted-foreground text-green-700">
                Total amount spent
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Total Budget Spent
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="w-[60%]">
                <CircularProgressbar
                  value={percent}
                  text={`${percent}%`}
                  styles={{
                    path: {
                      stroke: `rgba(1, 163, 28, 1)`,
                    },
                    trail: {
                      stroke: `#d6d6d6`,
                    },
                    text: {
                      fill: `rgba(1, 163, 28, 1)`,
                      fontSize: "16px",
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Budget Spent Each Month</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetSpentOverTime project={project} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 space-y-4">
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Monthly Limit
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
                <div className="text-2xl font-bold">$10,000</div>
                <p className="text-xs text-muted-foreground text-green-700">
                  Month to month cap
                </p>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Requested Budget Increase
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
                <div className="text-2xl font-bold">+ $30,000</div>
                <p className="text-xs text-muted-foreground text-green-700">
                  Current request still pending approval...
                </p>
              </CardContent>
            </Card>
          </div>
          {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Total Budget Spent
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="w-[60%]">
              <CircularProgressbar
                value={percent2}
                text={`${percent2}%`}
                styles={{
                  path: {
                    stroke: `rgba(1, 163, 28, 1)`,
                  },
                  trail: {
                    stroke: `#d6d6d6`,
                  },
                  text: {
                    fill: `rgba(1, 163, 28, 1)`,
                    fontSize: "16px",
                  },
                }}
              />
            </div>
          </CardContent>
        </Card> */}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetOverview project={project} />
            </CardContent>
          </Card>
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetDistribution />
              </CardContent>
            </Card>
            {/* <div className="w-full h-[225px] flex justify-between space-x-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Total Budget Spent</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center w-full">
                <div className="w-[60%]">
                  <CircularProgressbar value={percent} text={`${percent}%`} styles={{
                    path: {
                      stroke: `rgba(1, 163, 28, 1)`
                    },
                    trail: {
                      stroke: `#d6d6d6`
                    },
                    text: {
                      fill: `rgba(1, 163, 28, 1)`,
                      fontSize: '16px',
                    },
                  }}/>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="">
                <CardTitle>Total Budget Spent</CardTitle>
              </CardHeader>
              <CardContent className="">
                
              </CardContent>
            </Card>
          </div>
          <div>

          </div> */}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-10 mb-5">Recent Purchases</h1>
          <BudgetTable offers={offers} />
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetPageContent;
