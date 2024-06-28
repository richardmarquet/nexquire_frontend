"use client";
import React from "react";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./Overview";
import { RecentAcceptedOffers } from "./RecentSales";
import GeneralTab from "./GeneralTab";
import OffersTab from "./OffersTab";
import { Offer } from "@/components/types/DemoTypes";

interface Props {
  offers: Offer[];
}

const HomeContent = ({ offers }: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div>
          <CalendarDateRangePicker />
        </div>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="offers" className="space-y-4">
          <OffersTab offers={offers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeContent;
