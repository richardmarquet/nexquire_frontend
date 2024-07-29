import { redirect, RedirectType } from 'next/navigation'

const page = () => {
  redirect("settings/general", RedirectType.push);
}

export default page