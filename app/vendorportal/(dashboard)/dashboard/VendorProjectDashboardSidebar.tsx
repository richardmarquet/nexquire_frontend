"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ClipboardList,
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

interface SidebarDashboardOption {
  label: string;
  href: string;
  icon: LucideIcon;
  BadgeValue: string;
}

interface Props {
  notificationCount: number
}

const VendorProjectDashboardSidebar = ({ notificationCount }: Props) => {
  const BASE_DIR = `/vendorportal/dashboard/`;

  const SidebarDashboardOptionData: SidebarDashboardOption[] = [
    {
      label: "Home",
      href: "home",
      icon: Home,
      BadgeValue: "",
    },
    {
      label: "Analytics",
      href: "analytics",
      icon: LineChart,
      BadgeValue: "",
    },
    {
      label: "Users",
      href: "users",
      icon: User,
      BadgeValue: "",
    },
    {
      label: "Tasks",
      href: "tasks",
      icon: ClipboardList,
      BadgeValue: ""
    },
    {
      label: "Offers",
      href: "offers",
      icon: Send,
      BadgeValue: "",
    },
    {
      label: "Notifications",
      href: "notifications",
      icon: Bell,
      BadgeValue: `${notificationCount}`,
    },
    {
      label: "Settings",
      href: "settings",
      icon: Settings,
      BadgeValue: "",
    },
  ];

  return (
    <div className="hidden border-r md:border-none bg-muted/40 md:block">
      <div className="md:fixed md:overflow-hidden md:top-0 md:left-0 md:w-[17.5rem] md:bg-neutral-50 md:border-r flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Nexquire</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {SidebarDashboardOptionData.map((link) => (
              CreateSidebarOption(link)
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardContent className="p-2 pt-0 md:p-4">
              <Link href={"/vendorportal/projects"}>
                <Button size="sm" className="w-full hover:bg-red-600">
                  Exit Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CreateSidebarOption = (
  link: SidebarDashboardOption
) => {
  const path = usePathname();
  const isActive = path.includes(link.href);
  const linkStyle = isActive
    ? "flex items-center gap-3 rounded-lg bg-neutral-200/70 px-3 py-2 text-primary transition-all hover:text-primary"
    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  return (
    <Link
      href={`/vendorportal/dashboard/${link.href}`}
      className={linkStyle}
      key={link.href}
    >
      <link.icon className="h-4 w-4" />
      <h1 className="text-[14px]">{link.label}</h1>
      {link.BadgeValue !== "" ? (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {link.BadgeValue}
        </Badge>
      ) : (
        <></>
      )}
    </Link>
  );
};

export default VendorProjectDashboardSidebar;
