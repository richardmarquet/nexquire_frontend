import { LucideIcon } from "lucide-react";

export enum navbar_type {
    NAVBAR_ONLY = "NAVBAR_ONLY",
    NAVBAR_SIDEBAR = "NAVBAR_SIDEBAR",
};

export interface SidebarDashboardOption {
    label: string;
    href: string;
    icon: LucideIcon | null;
    BadgeValue: string;
}