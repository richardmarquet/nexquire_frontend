"use client";
import { Post } from "@/components/types/DemoTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, HelpingHand, PlusCircle, Upload } from "lucide-react";
import React, { useEffect } from "react";
import {
  CalculateBudgetSpentOnPost,
  CalculateTotalSpentOnPost,
  CaluclateTotalBudgetOnPost,
} from "../../ProjectHelperFunctions";
import "react-circular-progressbar/dist/styles.css";
import { Progress } from "@/components/ui/progress";

interface Props {
  post: Post;
}

const PostContent = ({ post }: Props) => {
  // for some reason it wasn't always at the top so this is a small quick hack onload to ensure it does...
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <main className="grid flex-1 items-start gap-4  sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 ">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {post.title}
          </h1>
          {post.active ? (
            <Badge
              variant="outline"
              className="ml-auto sm:ml-0 bg-green-500 text-white"
            >
              Active
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="ml-auto sm:ml-0 bg-red-500 text-white"
            >
              Closed
            </Badge>
          )}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" className="hover:bg-red-400/80">
              Discard
            </Button>
            <Button size="sm" className="hover:bg-green-600">
              Save Changes
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>
                  Basic information about the post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={`${post.title}`}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={
                        post.description ? `${post.description}` : ``
                      }
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Requests</CardTitle>
                <CardDescription>
                  The list of requests associated to this post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150]">Item</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead className="w-[100px]">Fulfilled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {post.requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-semibold">
                          {request.item_name}
                        </TableCell>
                        <TableCell className="">
                          <Label
                            htmlFor={`budget-${request.item_name}`}
                            className="sr-only"
                          >
                            Budget
                          </Label>
                          <Input
                            id={`budget-${request.item_name}`}
                            type="number"
                            defaultValue={`${request.budget}`}
                          />
                        </TableCell>
                        <TableCell className="">
                          <Label
                            htmlFor={`amount-${request.item_name}`}
                            className="sr-only"
                          >
                            Amount Paid
                          </Label>
                          <Input
                            id={`amount-${request.item_name}`}
                            type="number"
                            disabled={true}
                            defaultValue={`${request.amount_paid}`}
                          />
                        </TableCell>
                        <TableCell className="">
                          <Badge
                            className={
                              request.fulfilled ? `bg-green-500` : `bg-red-500`
                            }
                          >
                            {request.fulfilled ? <>Yes</> : <>No</>}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Request
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Set Post Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  Post Budget
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <HelpingHand className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  ${CaluclateTotalBudgetOnPost(post)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  You can request to increase this
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Amount Spent</CardDescription>
                <CardTitle className="text-2xl">
                  ${CalculateTotalSpentOnPost(post)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Spending is within the limits
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={CalculateBudgetSpentOnPost(post)}
                  aria-label="25% increase"
                />
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
};

export default PostContent;
