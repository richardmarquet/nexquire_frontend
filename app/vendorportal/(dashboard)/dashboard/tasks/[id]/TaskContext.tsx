"use client";
import { Task } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Box, ChevronLeft, CircleOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
  task: Task | null;
}

const TaskContext = ({ task }: Props) => {
  // for some reason it wasn't always at the top so this is a small quick hack onload to ensure it does...
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // TODO make this a redirect...
  if (!task) return <h1>Should not happen...</h1>;

  const CreateBadge = () => {
    let classNameColor = "";
    let text = "";

    if (!task.completed_at) {
      classNameColor = "bg-green-500";
      text = "Active";
    } else {
      classNameColor = "bg-red-500";
      text = "Completed";
    }

    return (
      <Badge
        variant="outline"
        className={`ml-auto sm:ml-0 text-white ${classNameColor}`}
      >
        {text}
      </Badge>
    );
  };

  return (
    <div className="flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {task.title}
          </h1>
          {CreateBadge()}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <React.Fragment key={"fragment"}>
              {!task.completed_at ? (
                <div className="flex items-center space-x-2">
                  <Button variant={"destructive"}><Trash2 /></Button>
                  <Link
                    href={`/vendorportal/dashboard/offers/createoffer?taskId=${task.id}`}
                  >
                    <Button>Create Offer</Button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </React.Fragment>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
                <CardDescription>
                  Basic information about the task
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
                      defaultValue={`${task.title}`}
                      disabled
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={
                        task.description ? `${task.description}` : ``
                      }
                      disabled
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
                  The list of requests associated to this offer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150]">Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Primary Tag</TableHead>
                      <TableHead className="w-[100px]">Fulfilled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-semibold">
                          {request.item_name}
                        </TableCell>
                        <TableCell className="">
                          <Label
                            htmlFor={`budget-${request.item_name}`}
                            className="sr-only"
                          >
                            Quantity
                          </Label>
                          <Input
                            id={`quantity-${request.item_name}`}
                            defaultValue={`${request.quantity} ${request.unit_of_measure}`}
                            disabled
                          />
                        </TableCell>
                        <TableCell className="">
                          <Label
                            htmlFor={`primary_tag-${request.item_name}`}
                            className="sr-only"
                          >
                            Primary Tag
                          </Label>
                          <Input
                            id={`amount-${request.item_name}`}
                            disabled={true}
                            defaultValue={`${request.primary_tag}`}
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
                  <CircleOff className="h-3.5 w-3.5" />
                  No changes can be made
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Associated Notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="contracts">Notification</Label>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link
                          href={`/vendorportal/dashboard/notifications/${task.post_id}`}
                        >
                          <Button
                            aria-label="View Notification"
                            className="w-full"
                          >
                            View Notification
                          </Button>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="">
                        <div>
                          <div className="flex justify-between items-center">
                            <h1>{task.post_title}</h1>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  Complete by
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <Box className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{task.due_date}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  This tasks due date
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  Task Priority
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <AlertTriangle className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{task.priority}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  The urgency of this task
                </div>
              </CardContent>
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
    </div>
  );
};

export default TaskContext;
