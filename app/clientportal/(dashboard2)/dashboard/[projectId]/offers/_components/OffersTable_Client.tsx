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
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import moment from 'moment';

interface Props {
  offers: Offer[] | null;
  projectId: number;
}

const OffersTable_Client = ({ offers, projectId }: Props) => {
  const router = useRouter();
  
  // TODO make something better
  if (!offers) return <h1>Nothing to show</h1>;

  const GotoOffer = (offerId: number) => {
    router.push(`/clientportal/dashboard/${projectId}/offers/${offerId}`);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-5">
          <div className="w-3/6">
            <Card className="">
              <CardContent>
                <div className="flex mt-6">
                  <Input type="search" placeholder="search..." />
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
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10 border shadow-lg rounded-lg bg-white">
          <Table className="rounded-lg">
            <TableHeader className="">
              <TableRow>
                <TableHead className="">Title</TableHead>
                <TableHead>Associated Post</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Total Files</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id} onClick={() => GotoOffer(offer.id)}>
                  <TableCell>{offer.title}</TableCell>
                  <TableCell>{offer.task.post_title}</TableCell>
                  <TableCell>{offer.vendor_name}</TableCell>
                  <TableCell>{offer.contract_file_paths.length}</TableCell>
                  <TableCell>{moment(offer.created_at).toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
};

export default OffersTable_Client;
