"use client";
import { RejectOffer } from "@/components/actions/offers/OfferActions";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  ChevronLeft,
  ClipboardList,
  FolderOpen,
  HelpingHand,
  PlusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CalculateBudgetOnOffer } from "../../ProjectHelperFunctions";
import AcceptOfferForm from "../_components/AcceptOfferForm";
import JSZip from "jszip";
import { createBrowserClient } from "@supabase/ssr";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
  offer: Offer | null;
  project: Project | null;
}

const OfferContent_Client = ({ offer, project }: Props) => {
  const router = useRouter();

  // for some reason it wasn't always at the top so this is a small quick hack onload to ensure it does...
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // TODO make this better
  if (!offer || !project) return <h1>Should Not Happen?</h1>;

  const RejectOfferRefresh = async () => {
    const res: boolean = await RejectOffer(offer.id);
    if (!res) {
      toast("Error...", {
        description: `Unable to reject offer...`,
        duration: 2000,
      });
      return;
    }

    toast("Offer Rejected", {
      description: `Offer has been rejected...`,
      duration: 2000,
    });

    setTimeout(() => {
      router.replace(`/clientportal/dashboard/${project.id}/posts`);
      router.refresh();
    }, 500);
  };

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

  const task = offer.task;

  return (
    <main className="flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {offer.title}
          </h1>
          {!offer.response ? (
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
            <React.Fragment key={"fragment"}>
              <AcceptOfferForm offer={offer} project={project} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-red-400/80"
                  >
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject?</DialogTitle>
                    <DialogDescription>
                      By Disapproving, you will let the creator of the offer
                      know that changes need to be made
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant={"destructive"}
                        onClick={() => RejectOfferRefresh()}
                      >
                        Reject
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                      <TableHead>Budget</TableHead>
                      <TableHead>Amount Paid</TableHead>
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
                            Budget
                          </Label>
                          <Input
                            id={`budget-${request.item_name}`}
                            type=""
                            defaultValue={"$"+`${request.budget}`}
                            disabled
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
                  Add Request to Offer
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
              <CardHeader className="pb-2">
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  Offer Budget
                  <Badge
                    variant={"outline"}
                    className="hover:cursor-pointer hover:bg-slate-100"
                  >
                    <HelpingHand className="" />
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  ${CalculateBudgetOnOffer(offer)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  This is calculated by adding the associated requests
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Amount Spent</CardDescription>
                <CardTitle className="text-2xl"></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Spending is within the limits
                </div>
              </CardContent>
              <CardFooter>
                <Progress aria-label="25% increase" />
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
    // <Card className="mt-2">
    //   <CardContent className="mt-5">
    //     <div className="flex items-center justify-between w-full h-full">
    //       <div className="text-xl">
    //         <span className="font-bold">
    //           {offer.title} ({offer.id.toString()})
    //         </span>
    //       </div>
    //       <div className="flex space-x-3">
    //         <Dialog>
    //           <DialogTrigger asChild>
    //             <Button variant={"outline"}>
    //               <FolderOpen />
    //             </Button>
    //           </DialogTrigger>
    //           <DialogContent>
    //             <DialogTitle>Files</DialogTitle>
    //             <DialogDescription></DialogDescription>
    //           </DialogContent>
    //         </Dialog>
    // <React.Fragment key={"fragment"}>
    //   <Button
    //     variant={"outline"}
    //     className="text-green-500"
    //     onClick={() => setDialogOpen(true)}
    //   >
    //     Accept
    //   </Button>
    //   <Dialog
    //     onOpenChange={() => onOpenChangeForDialog()}
    //     open={dialogOpen}
    //   >
    //     <DialogContent>
    //       <DialogTitle className="font-bold">
    //         Accept Offer
    //       </DialogTitle>
    //       <div className="w-full">
    //         <Form {...form}>
    //           <form onSubmit={handleSubmit(AcceptOfferRefresh)}>
    //             <FormField
    //               control={control}
    //               name={"email"}
    //               render={({ field }) => (
    //                 <FormItem className="mb-5">
    //                   <h1 className="text-lg font-bold">Email</h1>
    //                   <Input {...register("email")} />
    //                   {errors.email && (
    //                     <p className="text-red-500">
    //                       {errors.email.message}
    //                     </p>
    //                   )}
    //                 </FormItem>
    //               )}
    //             />
    //             <FormField
    //               control={control}
    //               name={"phoneNumber"}
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <h1 className="text-lg font-bold">
    //                     Phone Number
    //                   </h1>
    //                   <Input {...register("phoneNumber")} />
    //                   {errors.phoneNumber && (
    //                     <p className="text-red-500">
    //                       {errors.phoneNumber.message}
    //                     </p>
    //                   )}
    //                 </FormItem>
    //               )}
    //             />
    //             <div className="flex justify-between mt-5 space-x-5">
    //               <Button
    //                 type="submit"
    //                 variant={"outline"}
    //                 className="w-full text-green-500"
    //               >
    //                 Accept
    //               </Button>
    //               <Button
    //                 type="button"
    //                 variant={"destructive"}
    //                 className="w-full"
    //                 onClick={() => setDialogOpen(false)}
    //               >
    //                 Close
    //               </Button>
    //             </div>
    //           </form>
    //         </Form>
    //       </div>
    //     </DialogContent>
    //   </Dialog>
    //   <Dialog>
    //     <DialogTrigger asChild>
    //       <Button
    //         variant={"outline"}
    //         className="text-red-600 font-bold"
    //       >
    //         Reject
    //       </Button>
    //     </DialogTrigger>
    //     <DialogContent>
    //       <DialogHeader>
    //         <DialogTitle>Reject?</DialogTitle>
    //         <DialogDescription>
    //           By Disapproving, you will let the creator of the offer
    //           know that changes need to be made
    //         </DialogDescription>
    //       </DialogHeader>
    //       <DialogFooter>
    //         <DialogClose asChild>
    //           <Button variant={"outline"}>Cancel</Button>
    //         </DialogClose>
    //         <DialogClose asChild>
    //           <Button
    //             variant={"destructive"}
    //             onClick={() => RejectOfferRefresh()}
    //           >
    //             Reject
    //           </Button>
    //         </DialogClose>
    //       </DialogFooter>
    //     </DialogContent>
    //   </Dialog>
    // </React.Fragment>
    //       </div>
    //     </div>
    //     <div>
    //       <h1 className="font-bold text-xs">{offer.client_name}</h1>
    //     </div>
    //     <div className="mt-2">
    //       <h1 className="text-xl font-bold">Description</h1>
    //       <p className="mt-1 text-sm">{offer.offer_description}</p>
    //     </div>
    //     <div className="mt-2">
    //       <h1 className="text-xl font-bold">Associated Requets</h1>
    //       <div className="mt-2 w-full border shadow-sm rounded-lg bg-white">
    //         <Table className="rounded-lg">
    //           <TableHeader>
    //             <TableRow>
    //               <TableHead className="font-medium w-10">Item</TableHead>
    //               <TableHead>Quantity</TableHead>
    //               <TableHead>Primary Tag</TableHead>
    //               <TableHead>Secondary Tags</TableHead>
    //               <TableHead>Location</TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {offer.task.requests.map((request) => (
    //               <Collapsible key={request.id} asChild>
    //                 <React.Fragment key={"l"}>
    //                   <TableRow>
    //                     <TableCell className="">
    //                       <CollapsibleTrigger asChild>
    //                         <div>{request.item_name}</div>
    //                       </CollapsibleTrigger>
    //                     </TableCell>
    //                     <TableCell className="">
    //                       {request.quantity} {request.unit_of_measure}
    //                     </TableCell>
    //                     <TableCell className="">
    //                       {request.primary_tag}
    //                     </TableCell>
    //                     <TableCell className="">
    //                       {request.secondary_tags.toString()}
    //                     </TableCell>
    //                     <TableCell className="">
    //                       {request.city}, {request.state}
    //                     </TableCell>
    //                   </TableRow>
    //                   <CollapsibleContent asChild>
    //                     <TableRow>
    //                       <TableCell colSpan={5}>
    //                         <div>{request.description}</div>
    //                       </TableCell>
    //                     </TableRow>
    //                   </CollapsibleContent>
    //                 </React.Fragment>
    //               </Collapsible>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </div>
    //     </div>
    //     <div className="mt-4">
    //       <h1 className="font-bold text-xs opacity-30">
    //         Created by <span className="italic">{offer.creator_name}</span>
    //       </h1>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default OfferContent_Client;
