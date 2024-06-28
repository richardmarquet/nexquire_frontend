"use client";
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
import { AlignVerticalDistributeCenter, CircleEllipsis, CircleOff, PlusCircle, Rocket, ShieldEllipsis, Star, Trash2 } from "lucide-react";
import React from "react";
import TagUnsubscribeDialog from "./TagUnsubscribeDialog";

interface Props {
  currentTags: string[];
  tagMap: Map<string, string>; // secondary to primary
}

const CurrentTagsTable = ({ currentTags, tagMap }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Current Tags</CardTitle>
          <CardDescription>A list of the current tags</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Secondary Tag</TableHead>
                <TableHead>Primary Tag</TableHead>
                <TableHead>
                  <span className="sr-only">Delete Tag</span>
                </TableHead>
                <TableHead>
                  <span className="sr-only">Tag Settings</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTags?.map((tag) => (
                <TableRow key={tag}>
                  <TableCell>{tag}</TableCell>
                  <TableCell>{tagMap.get(tag)}</TableCell>
                  <TableCell className="hover:cursor-pointer">
                    <TagUnsubscribeDialog primaryTag={tagMap.get(tag)!} secondaryTag={tag} />
                  </TableCell>
                  <TableCell>
                    <span className="font-bold  hover:cursor-pointer">...</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <Button size="sm" variant="ghost" className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Tag
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CurrentTagsTable;
