import {
  Flame,
  Home,
  LineChart,
  LucideIcon,
  Milestone,
  Send,
  Settings,
  User,
} from "lucide-react";

export interface SidebarDashboardOption {
  label: string;
  icon: LucideIcon;
  BadgeValue: string;
}

export const SidebarDashboardOptionData: SidebarDashboardOption[] = [
  {
    label: "home",
    icon: Home,
    BadgeValue: "",
  },
  {
    label: "Analytics",
    icon: LineChart,
    BadgeValue: "",
  },
  {
    label: "Users",
    icon: User,
    BadgeValue: "",
  },
  {
    label: "Posts",
    icon: Milestone,
    BadgeValue: "",
  },
  {
    label: "Offers",
    icon: Send,
    BadgeValue: "",
  },
  {
    label: "Settings",
    icon: Settings,
    BadgeValue: "",
  }
];
