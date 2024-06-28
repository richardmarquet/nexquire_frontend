"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Offer } from "@/components/types/DemoTypes";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChoosePriorityColor,
  StringToPriorityLevel,
} from "@/components/actions/helper/Generic";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings, Settings2, SlidersHorizontal, UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PriorityLevels, StatusLevels } from "./TaskTypes";
import Link from "next/link";

interface Props {
  offers: Offer[] | null;
}

const OffersTable = ({ offers }: Props) => {
  const router = useRouter();
  
  // TODO make something better
  if (!offers) return <h1>Nothing to show</h1>;

  const GotoOffer = (offerId: number) => {
    router.push("/vendorportal/dashboard/offers/" + offerId);
  };

  return (
    <>
      <div className="w-full h-full flex justify-between items-center mb-5">
        <div>
          <h1 className="font-medium text-xl">Recent Offers</h1>
        </div>
        <div>
          <Link href={`/vendorportal/dashboard/offers/createoffer`}>
            <Button variant={"outline"}>Create Offer</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between mb-5 z-10">
        <div className="w-full">
          <Card className="">
            <CardContent>
              <div className="flex space-x-2 mt-6">
                <Input type="search" placeholder="Title..." />
                <Input
                  className="w-6/12"
                  type="search"
                  placeholder="Client..."
                />
                <Input
                  className="w-6/12"
                  type="search"
                  placeholder="Creator..."
                />
                <Input className="w-6/12" type="search" placeholder="Id..." />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className="bg-white text-black border ml-5 hover:bg-gray-100"
                    >
                      <SlidersHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="">
                      <div className="">
                        <div>
                          <h1 className="font-bold text-lg">General</h1>
                          <Separator />
                          <div className="mt-2 flex justify-between">
                            <h1 className="text-md">Require Owner</h1>
                            <Switch />
                          </div>
                        </div>
                        <div className="mt-4">
                          <h1 className="font-bold text-lg">Priorities</h1>
                          <Separator />
                          {PriorityLevels.map((level) => (
                            <div
                              className="mt-2 flex justify-between"
                              key={level}
                            >
                              <h1 className="text-md">{level}</h1>
                              <Switch />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <h1 className="font-bold text-lg">Status</h1>
                          <Separator />
                          {StatusLevels.map((level) => (
                            <div
                              className="mt-2 flex justify-between"
                              key={level}
                            >
                              <h1 className="text-md">{level}</h1>
                              <Switch />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-10 border shadow-lg rounded-lg bg-white z-10">
        <Table className="rounded-lg">
          <TableHeader className="">
            <TableRow>
              <TableHead className="">Priority</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead className="">Id</TableHead>
              <TableHead className="">Client</TableHead>
              <TableHead className="">Creator</TableHead>
              {/* <TableHead className="">Description</TableHead> */}
              <TableHead className="text-right w-10">Response</TableHead>
              <TableHead className="text-right w-10">Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} onClick={() => GotoOffer(offer.id)}>
                <TableCell
                  className={`font-bold ${ChoosePriorityColor(
                    StringToPriorityLevel(offer.task.priority!) // TODO this is why enums are bad
                  )}`}
                >
                  {offer.task.priority}
                </TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.id.toString()}</TableCell>
                <TableCell>{offer.client_name}</TableCell>
                <TableCell>{offer.creator_name}</TableCell>
                <TableCell className="">
                  {offer.response ? offer.response + "ed" : "pending"}
                </TableCell>
                <TableCell className="">
                  {offer.approved ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default OffersTable;
