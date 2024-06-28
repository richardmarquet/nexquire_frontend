import { LucideIcon } from "lucide-react";

interface OptionPopOverData {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface OptionBarOption {
  userType: string;
  name: string;
  icon: LucideIcon;
  popOverData: OptionPopOverData[] | undefined;
}

interface OptionBarGroup {
  data: OptionBarOption[];
  data2?: OptionBarOption[];
}

export { type OptionPopOverData, type OptionBarOption, type OptionBarGroup };
