"use client";
import { Offer, Project, Task } from "@/components/types/DemoTypes";
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
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Box,
  ChevronLeft,
  CircleOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import { createBrowserClient } from "@supabase/ssr";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import DisapproveDialog from "./_components/dialogs/DisapproveDialog";
import ApproveDialog from "./_components/dialogs/ApproveDialog";
import CloseDialog from "./_components/dialogs/CloseDialog";
import ResponseRecievedDialog from "./_components/dialogs/ResponseRecievedDialog";
import Link from "next/link";

interface Props {
  offer: Offer | null;
}

const OfferContent_Vendor = ({ offer }: Props) => {
  const router = useRouter();

  // for some reason it wasn't always at the top so this is a small quick hack onload to ensure it does...
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  // TODO make this better
  if (!offer) return <h1>Should Not Happen?</h1>;

  const DownloadContracts = async () => {
    const filePaths = offer.contract_file_paths;
    const zip = new JSZip();

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
    );

    // Loop through each filePath and add it to the zip file
    for (const filePath of filePaths) {
      const { data, error } = await supabase.storage
        .from("contracts")
        .download(filePath);

      if (error) {
        console.error("Error downloading file:", error);
        console.log("filePath:", filePath);
      } else {
        // Add the file to the zip with a unique name
        zip.file(filePath.split("/")[1] + ".pdf", data);
      }
    }

    // Generate a blob containing the zip file
    const blob = await zip.generateAsync({ type: "blob" });

    // Create a download link for the zip file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "downloaded_files.zip";

    // Append the link to the body (required in some browsers)
    document.body.appendChild(downloadLink);

    // Trigger a click event to start the download
    downloadLink.click();

    // Remove the link from the DOM
    document.body.removeChild(downloadLink);
  };

  type OfferStatusCode =
    | "APPROVED"
    | "DISAPPROVED"
    | "PENDINGAPPROVAL"
    | "REJECTED"
    | "ACCEPTED"
    | "PENDINGACCEPTANCE";
  const GetOfferStatus = (): OfferStatusCode => {
    if (!offer.approved || offer.approved === "pending") {
      return "PENDINGAPPROVAL";
    } else {
      if (offer.approved === "approved") {
        if (offer.response) {
          if (offer.response === "Accept") {
            return "ACCEPTED";
          } else {
            return "REJECTED";
          }
        } else {
          return "PENDINGACCEPTANCE";
        }
      } else {
        return "DISAPPROVED";
      }
    }
  };

  const CreateBadge = () => {
    let classNameColor = "";
    let text = "";
    const offerStatus = GetOfferStatus();
    switch (offerStatus) {
      // won't happen
      case "APPROVED":
        classNameColor = "bg-green-500";
        text = "Approved";
        break;
      case "DISAPPROVED":
        classNameColor = "bg-red-500";
        text = "Disapproved";
        break;
      case "PENDINGAPPROVAL":
        classNameColor = "bg-orange-500";
        text = "Pending Admin Approval...";
        break;
      case "REJECTED":
        classNameColor = "bg-red-500";
        text = "Rejected";
        break;
      case "ACCEPTED":
        classNameColor = "bg-green-500";
        text = "Accepted";
        break;
      case "PENDINGACCEPTANCE":
        classNameColor = "bg-orange-500";
        text = "Pending Acceptance...";
        break;
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

  const task = offer.task;

  return (
    <div className="flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {offer.title}
          </h1>
          {CreateBadge()}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <React.Fragment key={"fragment"}>
              {!offer.approved || offer.approved === "pending" ? (
                <>
                  <DisapproveDialog offerId={offer.id} />
                  <ApproveDialog offerId={offer.id} />
                </>
              ) : !offer.response ? (
                <>
                  <CloseDialog offerId={offer.id} />
                </>
              ) : (
                <>
                  <ResponseRecievedDialog offer={offer} />{" "}
                </>
              )}
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
                      defaultValue={`${offer.title}`}
                      disabled
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={
                        offer.offer_description
                          ? `${offer.offer_description}`
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
                    {task.requests.map((request) => (
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
            <Card>
              <CardHeader>
                <CardTitle>View Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="contracts">Contracts</Label>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          aria-label="Download Contracts"
                          onClick={() => DownloadContracts()}
                        >
                          Download
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-20">
                        <div>
                          <div className="flex justify-between items-center">
                            <h1>File(s)</h1>
                            <h1>{offer.contract_file_paths.length}</h1>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
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
            </Card>
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
                <CardTitle className="text-2xl">{offer.client_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Associated client for this offers
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  Offer Priority
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <AlertTriangle className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  {offer.task.priority}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  This is based on the associated task for this offer
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

export default OfferContent_Vendor;
