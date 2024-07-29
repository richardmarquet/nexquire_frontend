"use client";
import { SidebarDashboardOption } from "@/components/types/nexquire_types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  option: SidebarDashboardOption;
  projectId: number;
}

const BasicSidebarOption = ({ option, projectId }: Props) => {
  const path = usePathname();
  const isActive = path.includes(option.href);
  const extraCss = isActive ? "rounded-lg bg-neutral-200/50" : "";

  return (
    <div className={`grid items-start px-5 py-1 text-sm font-medium lg:px-7 mx-2 ` + extraCss}>
      <Link
        href={`/clientportal/dashboard/${projectId}/${option.href}`}
        className={`flex items-center gap-3 rounded-lg transition-all hover:text-primary`}
        key={option.href}
      >
        {option.icon ? <option.icon className="h-4 w-4" /> : <></>}
        <h1 className="text-[14px]">{option.label}</h1>
        {option.BadgeValue !== "" ? (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {option.BadgeValue}
          </Badge>
        ) : (
          <></>
        )}
      </Link>
    </div>
  );
};

export default BasicSidebarOption;
