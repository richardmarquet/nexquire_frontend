"use client";
import { AcceptOffer } from "@/components/actions/offers/OfferActions";
import { Offer, Paid_Request, Project } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { setTimeout } from "timers";
import { z } from "zod";

interface Props {
  offer: Offer;
  project: Project;
}

const AcceptOfferForm = ({ offer, project }: Props) => {
  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Valid email is required"),
    phoneNumber: z
      .string()
      .regex(/^[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/, "Invalid phone number"),
    amountPaidForEachRequest: z
      .array(z.string().regex(/^\d+$/, "Must contain only positive numbers"))
      .length(offer.task.requests.length),
  });

  type FormData = z.infer<typeof schema>;
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const onOpenChangeForDialog = () => {
    setDialogOpen(false);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const AcceptOfferRefresh: SubmitHandler<FormData> = async ({
    email,
    phoneNumber,
    amountPaidForEachRequest,
  }) => {
    const requests = offer.task.requests;
    const amountPaid: Paid_Request[] = amountPaidForEachRequest.map((amount, index): Paid_Request => ({
        id: requests[index].id,
        paid: Number(amount)
    }));

    //console.log(email, phoneNumber, amountPaid);

    const res: boolean = await AcceptOffer(
      offer.id,
      phoneNumber,
      email,
      amountPaid
    );
    if (!res) {
      toast("Error...", {
        description: `Unable to accept offer...`,
        duration: 2000,
      });
      return;
    }

    toast("Offer Accepted!", {
      description: `Offer has been accepted...`,
      duration: 2000,
    });

    setTimeout(() => {
      router.push(`/clientportal/dashboard/${project.id}/offers`);
      router.refresh();
    }, 500);
  };

  return (
    <>
      <Button
        variant={"outline"}
        size="sm"
        className="hover:bg-green-600"
        onClick={() => setDialogOpen(true)}
      >
        Accept
      </Button>
      <Dialog onOpenChange={() => onOpenChangeForDialog()} open={dialogOpen}>
        <DialogContent>
          <DialogTitle className="font-bold">Accept Offer</DialogTitle>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(AcceptOfferRefresh)}>
                <FormField
                  control={control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <h1 className="text-lg font-bold">Email</h1>
                      <Input {...register("email")} />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"phoneNumber"}
                  render={({ field }) => (
                    <FormItem>
                      <h1 className="text-lg font-bold">Phone Number</h1>
                      <Input {...register("phoneNumber")} />
                      {errors.phoneNumber && (
                        <p className="text-red-500">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"amountPaidForEachRequest"}
                  render={({ field }) => (
                    <FormItem>
                      <h1 className="Requests"></h1>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Request</TableHead>
                            <TableHead>Amount Paid</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {offer.task.requests.map((request, index) => (
                            <TableRow key={request.id}>
                              <TableCell>{request.item_name}</TableCell>
                              <TableCell>
                                <Input
                                  {...register(
                                    `amountPaidForEachRequest.${index}`
                                  )}
                                  type="number"
                                />
                                {errors.amountPaidForEachRequest?.[index] && <p>{errors.amountPaidForEachRequest?.[index]?.message}</p>}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </FormItem>
                  )}
                />
                <div className="flex justify-between mt-5 space-x-5">
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="w-full text-green-500"
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="w-full"
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcceptOfferForm;
