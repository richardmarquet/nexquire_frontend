"use client";
import { Project } from "@/components/types/DemoTypes";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DoorOpen,
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
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarDashboardOption {
  label: string;
  href: string;
  icon: LucideIcon;
  BadgeValue: string;
}

interface Props {
  project: Project;
}

const HOME_OPTION: SidebarDashboardOption = {
  label: "Home",
  href: "home",
  icon: Home,
  BadgeValue: "",
};

const ANALYTICS_OPTION: SidebarDashboardOption = {
  label: "Analytics",
  href: "analytics",
  icon: LineChart,
  BadgeValue: "",
};

const USERS_OPTION: SidebarDashboardOption = {
  label: "Users",
  href: "users",
  icon: User,
  BadgeValue: "",
};

const POSTS_OPTION: SidebarDashboardOption = {
  label: "Posts",
  href: "posts",
  icon: Milestone,
  BadgeValue: "",
};

const OFFERS_OPTION: SidebarDashboardOption = {
  label: "Offers",
  href: "offers",
  icon: Send,
  BadgeValue: "",
};

const SETTINGS__OPTION: SidebarDashboardOption = {
  label: "Settings",
  href: "settings",
  icon: Settings,
  BadgeValue: "",
};

const ClientProjectSideBar = ({ project }: Props) => {
  return (
    <aside className="group fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex hover:w-48 transition-all">
      <nav className="flex flex-col items-center justify-between gap-1 px-2 sm:pt-6 sm:pb-1 w-full">
        <div className="w-full flex items-center px-1">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all" />
            <span className="sr-only">Nexquire</span>
          </Link>
        </div>
      </nav>
      {CreateSidebarOption(HOME_OPTION, project.id)}
      <Separator orientation="horizontal" />
      {CreateSidebarOption(ANALYTICS_OPTION, project.id)}
      {CreateSidebarOption(USERS_OPTION, project.id)}
      {CreateSidebarOption(POSTS_OPTION, project.id)}
      {CreateSidebarOption(OFFERS_OPTION, project.id)}
      <Separator orientation="horizontal" />
      {CreateSidebarOption(SETTINGS__OPTION, project.id)}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <DoorOpen className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

const CreateSidebarOption = (
  link: SidebarDashboardOption,
  projectId: number
) => {
  const path = usePathname();
  const isActive = path.includes(link.href);

  const linkStyle = isActive
    ? "w-full h-10 flex items-center px-1 rounded-lg bg-accent text-accent-foreground transition-all"
    : "w-full h-10 flex items-center px-1 hover:bg-accent hover:rounded-lg";

  return (
    <nav className="flex flex-col items-center justify-between gap-1 px-2 sm:py-1 w-full">
      <Link
        href={`/clientportal/dashboard/${projectId}/${link.href}`}
        key={link.href}
        className={linkStyle}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg hover:text-foreground md:h-8 md:w-8">
                <link.icon className="h-5 w-5" />
                <span className="absolute left-12 opacity-0 group-hover:opacity-100 text-sm transition-all">
                  {link.label}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{link.label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </nav>
  );
};

export default ClientProjectSideBar;
