"use client";
import { Separator } from "@/components/ui/separator";
import { OptionBarOption, OptionBarGroup } from "./OptionBarTypes";
import { OptionBarMap, OptionBarMapClient, UserType } from "./OptionBarData";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { MobileDropDownMenu } from "./MobileDropDownMenu";
import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";

import { LogoutUser } from "../actions/users/UserActions";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const CreateOptionBarOption = (info: OptionBarOption, pathname: string, baseUrl: string) => {
  //const typeDependPath = info.userType;

  const OPTION_PATH = baseUrl;

  const optionPath = OPTION_PATH + info.name.toLowerCase();
  const isCurrentPage = pathname.includes(optionPath);
  const highlighted = isCurrentPage
    ? "bg-slate-100 opacity-20 shadow-lg"
    : "opacity-100";
  const opacity = isCurrentPage ? "opacity-100" : "opacity-80";

  const [open, setOpen] = useState(false);
  const hoverDelayTimer = useRef<number | null>(null);

  const handleMouseEnter = () => {
    hoverDelayTimer.current = window.setTimeout(() => {
      setOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverDelayTimer.current !== null) {
      clearTimeout(hoverDelayTimer.current);
      hoverDelayTimer.current = null;
    }
    setOpen(false);
  };

  return (
    <div
      key={info.name}
      className="relative sm:flex sm:justify-center sm:mt-1"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {info.popOverData && info.popOverData?.length > 0 ? (
        <Card
          className="absolute p-0 w-40 rounded-sm shadow-md translate-x-[7.25rem] z-50"
          hidden={!open}
        >
          {/* <CardTitle className="text-lg ml-3 mt-3">Offers</CardTitle> */}
          <CardContent className="p-1 w-full h-full text-[15px]">
            {info.popOverData?.map((data) => (
              <Link
                href={data.href}
                className="block w-full hover:bg-slate-50"
                key={data.href}
                replace={true}
              >
                <div className="flex p-1 space-x-2">
                  <data.icon className="w-5 h-5" />
                  <h1 className="">{data.name}</h1>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      ) : null}
      <div
        className={`absolute w-full h-12 lg:h-16 pt-3 ${opacity} hover:cursor-pointer hover:opacity-100 transition ease-in-out`}
      >
        <Link href={optionPath}>
          <div className="flex justify-center items-center w-full lg:pb-1">
            <info.icon color="white" className="w-6 h-6 lg:w-7 lg:h-7" />
          </div>
          <div className="hidden w-full lg:flex lg:justify-center lg:items-center">
            <h1 className="text-white text-[10px]">{info.name}</h1>
          </div>
        </Link>
      </div>
      <div
        className={`w-10/12 h-12 pt-3 rounded-lg lg:h-16 ${highlighted}`}
      ></div>
    </div>
  );
};

const LogOutButton = () => {
  return (
    <div className="relative sm:flex sm:justify-center sm:mt-1" onClick={() => LogoutUser()}>
      <div
        className={`absolute w-full h-12 lg:h-16 pt-3 opacity-80 hover:cursor-pointer hover:opacity-100 transition ease-in-out`}
      >
        <div>
          <div className="flex justify-center items-center w-full lg:pb-1">
            <LogOut color="white" className="w-6 h-6 lg:w-7 lg:h-7" />
          </div>
          <div className="hidden w-full lg:flex lg:justify-center lg:items-center">
            <h1 className="text-white text-[10px]">LogOut</h1>
          </div>
        </div>
      </div>
      <div
        className={`w-10/12 h-12 pt-3 rounded-lg lg:h-16`}
      ></div>
    </div>
  );
};

interface OptionBarProps {
  userType: UserType;
  groupType: string;
  baseUrl: string;
}

const OptionBar = ({ userType, groupType, baseUrl }: OptionBarProps) => {
  const pathname = usePathname();
  
  if (!OptionBarMap.has(userType)) return;

  // Determine if we should present client or vendor option bar
  let options: OptionBarGroup | undefined;
  if (groupType === "C") {
    options = OptionBarMapClient.get(userType);
  } else {
    options = OptionBarMap.get(userType);
  }

  if (options === undefined) return;

  const { data, data2 } = options;

  return (
    <div className="w-full h-full">
      <div className="hidden sm:block relative w-full h-full bg-gradient-to-b from-indigo-500 from-5% to-indigo-600">
        {/* <div className="flex justify-center items-center w-full h-16 bg-black">
          <h1 className="text-white font-bold text-4xl">N</h1>
        </div> */}
        <div className="">
          {data.map((link) => CreateOptionBarOption(link, pathname, baseUrl))}
          <div className="flex justify-center">
            <Separator
              className="mt-1 w-4/6 opacity-50"
              orientation="horizontal"
            />
          </div>
          {data2?.map((link) => CreateOptionBarOption(link, pathname, baseUrl))}
          <LogOutButton />
        </div>
      </div>
      <div className="block sm:hidden w-full h-10 bg-gradient-to-b from-indigo-500 from-5% to-indigo-600">
        <div className="flex justify-between w-full h-full">
          <div className="flex justify-center items-center h-full">
            <div className="flex justify-center h-full w-10 bg-black">
              <h1 className="text-white font-bold text-4xl">N</h1>
            </div>
            <div className="pl-2">
              <MobileDropDownMenu />
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionBar;
