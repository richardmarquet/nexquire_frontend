"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Home,
  LineChart,
  LucideIcon,
  Milestone,
  Package,
  Package2,
  Send,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/components/types/DemoTypes";
import { usePathname } from "next/navigation";
import SidebarContainer from "../containers/SidebarContainer";
import { SidebarDashboardOption } from "@/components/types/nexquire_types";
import BasicSidebarOption from "./BasicSidebarOption";
import { Separator } from "@/components/ui/separator";

interface Props {
  project: Project;
}

const PostsClientDashboardSidebar = ({ project }: Props) => {
  const ALL_POSTS: SidebarDashboardOption = {
    label: "All Posts",
    href: "posts/allposts",
    icon: null,
    BadgeValue: "",
  };

  const MY_POSTS: SidebarDashboardOption = {
    label: "My Posts",
    href: "posts/myposts",
    icon: null,
    BadgeValue: "",
  };

  const CREATE_POST: SidebarDashboardOption = {
    label: "Create Post",
    href: "posts/createpost",
    icon: null,
    BadgeValue: "",
  }

  const POSTS_ANALYTICS: SidebarDashboardOption = {
    label: "Analytics",
    href: "posts/analytics",
    icon: null,
    BadgeValue: "",
  }

  return (
    <SidebarContainer>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">{project.title}</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <nav className="flex-1">
        <h1 className="text-sm font-bold tracking-widest opacity-50 px-5 py-1 lg:px-7">View</h1>
        <BasicSidebarOption option={ALL_POSTS} projectId={project.id} />
        <BasicSidebarOption option={MY_POSTS} projectId={project.id} />
        <BasicSidebarOption option={CREATE_POST} projectId={project.id} />
        <Separator orientation="horizontal" className="my-1"/>
        <h1 className="text-sm font-bold tracking-widest opacity-50 px-5 py-1 lg:px-7">Tools</h1>
        <BasicSidebarOption option={POSTS_ANALYTICS} projectId={project.id} />
      </nav>
      <div className="mt-auto p-4">
        <Card>
          <CardContent className="p-2 pt-0 md:p-4">
            <Link href={"/clientportal/projects"}>
              <Button size="sm" className="w-full hover:bg-red-600">
                Exit Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </SidebarContainer>
  );
};

export default PostsClientDashboardSidebar;
