"use client";
import { Post, User, Request } from "@/components/types/DemoTypes";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Box, ChevronLeft, CircleOff, Trash, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import NotificationTaskCreationDialog from "./NotificationTaskCreationDialog";

interface Props {
  notification: Post;
  users: User[];
}

const NotificationPageContent = ({ notification, users }: Props) => {
  const CreateBadge = () => {
    return <Badge>Active</Badge>;
  };

  // for some reason it wasn't always at the top so this is a small quick hack onload to ensure it does...
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <main className="flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {notification.title}
          </h1>
          {CreateBadge()}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <React.Fragment key={"fragment"}>
              <Button className="" variant={"destructive"}>
                <Trash2 />
              </Button>
              <NotificationTaskCreationDialog
                post={notification}
                users={users}
              />
            </React.Fragment>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Offer Details</CardTitle>
                <CardDescription>
                  Basic information about the offer
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
                      defaultValue={`${notification.title}`}
                      disabled
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={
                        notification.description
                          ? `${notification.description}`
                          : ``
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
                    {notification.requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-semibold">
                          {request.item_name}
                        </TableCell>
                        <TableCell className="">
                          <Label
                            htmlFor={`quantity-${request.item_name}`}
                            className="sr-only"
                          >
                            quantity
                          </Label>
                          <Input
                            id={`quantity-${request.item_name}`}
                            type="text"
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
                            id={`primary_tag-${request.item_name}`}
                            type="text"
                            defaultValue={`${request.primary_tag}`}
                            disabled
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
            {/* <Card>
              <CardHeader>
                <CardTitle>Associated Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="contracts">Task</Label>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link
                          href={`/vendorportal/dashboard/tasks/${offer.task.id}`}
                        >
                          <Button aria-label="View Task" className="w-full">
                            View Task
                          </Button>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="">
                        <div>
                          <div className="flex justify-between items-center">
                            <h1>{offer.task.title}</h1>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  For client
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <Box className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  {notification.client_name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Associated client for this notification
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  Associated Tags
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <Box className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  {PrettyPrintPrimaryTags(notification.requests)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Associated client for this notification
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
    </main>
  );
};

const PrettyPrintPrimaryTags = (requests: Request[]): string => {
  const primaryTags = new Set(requests.map((req): string => req.primary_tag));
  let str = "";
  for (const tag of primaryTags) {
    str += `${tag},`;
  }
  return str.substring(0, str.length-1);
}

export default NotificationPageContent;
