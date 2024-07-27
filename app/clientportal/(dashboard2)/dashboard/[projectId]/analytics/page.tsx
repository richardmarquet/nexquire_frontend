import { redirect, RedirectType } from "next/navigation";

const page = () => {
  redirect("analytics/general", RedirectType.push);
};

export default page;
