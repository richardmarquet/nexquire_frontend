import {
  HomeIcon,
  UsersIcon,
  FlameIcon,
  SettingsIcon,
  UserIcon,
  ClipboardListIcon,
  GoalIcon,
  UploadIcon,
  BellIcon,
  Database,
  SendIcon,
  CircleDollarSign,
  List,
  Send,
  UserRoundPlus,
  ListFilter,
  Plus,
  WatchIcon,
  Milestone,
  Boxes
} from "lucide-react";
import {
  OptionBarOption,
  OptionBarGroup,
  OptionPopOverData,
} from "@/components/optionbar/OptionBarTypes";

const BASE_DIR = "/dashboard";

const HomePopoverData: OptionPopOverData[] = [];

const UsersPopoverData: OptionPopOverData[] = [
  {
    name: "All Users",
    href: `${BASE_DIR}/users`,
    icon: UserIcon,
  },
  {
    name: "Add User",
    href: `${BASE_DIR}/users/adduser`,
    icon: UserRoundPlus,
  },
];

const AnalyticsPopoverData: OptionPopOverData[] = [
  {
    name: "General",
    href: "analytics",
    icon: Database,
  },
  {
    name: "Sales",
    href: "sales",
    icon: CircleDollarSign,
  },
];

const TasksPopoverData: OptionPopOverData[] = [
  {
    name: "All Tasks",
    href: `${BASE_DIR}/tasks`,
    icon: List,
  },
  {
    name: "My Tasks",
    href: "mytasks",
    icon: ListFilter,
  },
];

const OffersPopoverData: OptionPopOverData[] = [
  {
    name: "All Offers",
    href: `${BASE_DIR}/offers`,
    icon: Send,
  },
  {
    name: "My Offers",
    href: "myoffers",
    icon: Send,
  },
  {
    name: "Pending",
    href: `${BASE_DIR}/offers?type=pending`,
    icon: WatchIcon
  },
  {
    name: "Create Offer",
    href: `${BASE_DIR}/offers/createoffer`,
    icon: Plus,
  }
];

const NotificationsPopoverData: OptionPopOverData[] = [];

const BudgetPopoverData: OptionPopOverData[] = [];

const SettingsPopoverData: OptionPopOverData[] = [];

const ProfilePopoverData: OptionPopOverData[] = [];

const PostPopoverData: OptionPopOverData[] = [
  {
    name: "All Posts",
    href: `${BASE_DIR}/posts`,
    icon: Milestone,
  },
  {
    name: "Active Posts",
    href: `${BASE_DIR}/posts?type`,
    icon: Milestone,
  },
  {
    name: "Create Post",
    href: `${BASE_DIR}/posts/createpost`,
    icon: Plus
  }
];

const ProjectPopoverData: OptionPopOverData[] = [
  {
    name: "My Projects",
    href: `${BASE_DIR}/projects`,
    icon: Boxes,
  },
  {
    name: "Create Project",
    href: `${BASE_DIR}/projects/createproject`,
    icon: Plus,
  }
];

type OptionPopoverDataOptions =
  | "Home"
  | "Budget"
  | "Analytics"
  | "Users"
  | "Tasks"
  | "Offers"
  | "Notifications"
  | "Settings"
  | "Profile"
  | "Posts"
  | "Projects"
  | "";

const OptionPopoverMap = new Map<OptionPopoverDataOptions, OptionPopOverData[]>(
  [
    ["Home", HomePopoverData],
    ["Budget", BudgetPopoverData],
    ["Users", UsersPopoverData],
    ["Analytics", AnalyticsPopoverData],
    ["Tasks", TasksPopoverData],
    ["Offers", OffersPopoverData],
    ["Notifications", NotificationsPopoverData],
    ["Settings", SettingsPopoverData],
    ["Profile", ProfilePopoverData],
    ["Posts", PostPopoverData],
    ["Projects", ProjectPopoverData],
  ]
);

//
// We divid the options into two sections, data1 and data2. They will be seperated by a seperator
// This is subject to change and may be removed (we could even add a data3)
//

// When we want to add more types we need to
// 1. Add their data1 and data2.
// 2. Create a OptionBarGroup.
// 3. Add the name to the UserType type.
// 4. Add the group to the OptionBarMap.

const superAdmin_data: OptionBarOption[] = [
  {
    userType: "SuperAdmin",
    name: "Home",
    icon: HomeIcon,
    popOverData: OptionPopoverMap.get("Home"),
  },
  {
    userType: "SuperAdmin",
    name: "Users",
    icon: UsersIcon,
    popOverData: OptionPopoverMap.get("Users"),
  },
  {
    userType: "SuperAdmin",
    name: "Analytics",
    icon: FlameIcon,
    popOverData: OptionPopoverMap.get("Analytics"),
  },
  {
    userType: "SuperAdmin",
    name: "Tasks",
    icon: ClipboardListIcon,
    popOverData: OptionPopoverMap.get("Tasks"),
  },
  {
    userType: "SuperAdmin",
    name: "Offers",
    icon: SendIcon,
    popOverData: OptionPopoverMap.get("Offers"),
  },
  {
    userType: "SuperAdmin",
    name: "Notifications",
    icon: BellIcon,
    popOverData: OptionPopoverMap.get("Notifications"),
  },
  {
    userType: "SuperAdmin",
    name: "Contracts",
    icon: GoalIcon,
    popOverData: OptionPopoverMap.get(""),
  },
];

const superAdmin_data2: OptionBarOption[] = [
  {
    userType: "SuperAdmin",
    name: "Profile",
    icon: UserIcon,
    popOverData: OptionPopoverMap.get(""),
  },
  {
    userType: "SuperAdmin",
    name: "Settings",
    icon: SettingsIcon,
    popOverData: OptionPopoverMap.get(""),
  },
];

const SuperAdminOptionBarOptions: OptionBarGroup = {
  data: superAdmin_data,
  data2: superAdmin_data2,
};

const admin_data: OptionBarOption[] = [
  {
    userType: "Admin",
    name: "Home",
    icon: HomeIcon,
    popOverData: OptionPopoverMap.get("Home"),
  },
  {
    userType: "Admin",
    name: "Analytics",
    icon: FlameIcon,
    popOverData: OptionPopoverMap.get("Analytics"),
  },
  {
    userType: "Admin",
    name: "Tasks",
    icon: ClipboardListIcon,
    popOverData: OptionPopoverMap.get("Tasks"),
  },
  {
    userType: "Admin",
    name: "Offers",
    icon: SendIcon,
    popOverData: OptionPopoverMap.get("Offers"),
  },
  {
    userType: "Admin",
    name: "Notifications",
    icon: BellIcon,
    popOverData: OptionPopoverMap.get("Notifications"),
  },
  {
    userType: "Admin",
    name: "Contracts",
    icon: GoalIcon,
    popOverData: OptionPopoverMap.get(""),
  },
];

const admin_data2: OptionBarOption[] = [
  {
    userType: "Admin",
    name: "Profile",
    icon: UserIcon,
    popOverData: OptionPopoverMap.get("Profile"),
  },
  {
    userType: "Admin",
    name: "Settings",
    icon: SettingsIcon,
    popOverData: OptionPopoverMap.get("Settings"),
  },
];

const AdminOptionBarOptions: OptionBarGroup = {
  data: admin_data,
  data2: admin_data2,
};

const user_data: OptionBarOption[] = [
  {
    userType: "User",
    name: "Home",
    icon: HomeIcon,
    popOverData: OptionPopoverMap.get("Home"),
  },
  {
    userType: "User",
    name: "Notifications",
    icon: BellIcon,
    popOverData: OptionPopoverMap.get("Users"),
  },
  {
    userType: "User",
    name: "Posts",
    icon: Database,
    popOverData: OptionPopoverMap.get("Users"),
  },
];

const user_data2: OptionBarOption[] = [];

const UserOptionBarOptions: OptionBarGroup = {
  data: user_data,
  data2: user_data2,
};

type UserType = "SuperAdmin" | "Admin" | "User";

const OptionBarMap = new Map<UserType, OptionBarGroup>([
  ["SuperAdmin", SuperAdminOptionBarOptions],
  ["Admin", AdminOptionBarOptions],
  ["User", UserOptionBarOptions],
]);

// for now just generic and only one as I am lazy :D
const client_data: OptionBarOption[] = [
  {
    userType: "SuperAdmin",
    name: "Home",
    icon: HomeIcon,
    popOverData: OptionPopoverMap.get("Home"),
  },
  {
    userType: "SuperAdmin",
    name: "Users",
    icon: UsersIcon,
    popOverData: OptionPopoverMap.get("Users"),
  },
  {
    userType: "SuperAdmin",
    name: "Budget",
    icon: FlameIcon,
    popOverData: OptionPopoverMap.get("Budget"),
  },
  {
    userType: "SuperAdmin",
    name: "Projects",
    icon: Boxes,
    popOverData: OptionPopoverMap.get("Projects"),
  },
  {
    userType: "SuperAdmin",
    name: "Posts",
    icon: Milestone,
    popOverData: OptionPopoverMap.get("Posts"),
  },
  {
    userType: "SuperAdmin",
    name: "Offers",
    icon: SendIcon,
    popOverData: OptionPopoverMap.get("Offers"),
  },
];

const client_data2: OptionBarOption[] = [
  {
    userType: "SuperAdmin",
    name: "Profile",
    icon: UserIcon,
    popOverData: OptionPopoverMap.get(""),
  },
  {
    userType: "SuperAdmin",
    name: "Settings",
    icon: SettingsIcon,
    popOverData: OptionPopoverMap.get(""),
  },
];

const ClientOptionBarGroup: OptionBarGroup = {
  data: client_data,
  data2: client_data2,
};

const OptionBarMapClient = new Map<UserType, OptionBarGroup>([
  ["SuperAdmin", ClientOptionBarGroup],
  ["Admin", ClientOptionBarGroup],
  ["User", ClientOptionBarGroup],
]);

export {
  SuperAdminOptionBarOptions,
  AdminOptionBarOptions,
  UserOptionBarOptions,
  type UserType,
  OptionBarMap,
  OptionBarMapClient,
};
