import { Settings, User } from "lucide-react";
import { MobileDropDownMenu } from "./MobileDropDownMenu";

export function MobileMenu() {
  return (
    <div className="flex justify-center">
      <div className="pr-2">
        <User color="white" className="" />
      </div>
      <div className="">
        <Settings color="white" />
      </div>
      <div className="pr-2">{/* <MobileDropDownMenu /> */}</div>
    </div>
  );
}
