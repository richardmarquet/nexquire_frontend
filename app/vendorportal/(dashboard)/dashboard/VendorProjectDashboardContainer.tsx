import VendorProjectDashboardSidebar from "./VendorProjectDashboardSidebar";
import VendorProjectDashboardNavbar from "./VendorProjectDashboardNavbar";
import { GetAllNotifications } from "@/components/actions/notifications/NotificationActions";

interface VendorProjectDashboardContainerProps {
  children: React.ReactNode;
}

const VendorProjectDashboardContainer: React.FC<
  VendorProjectDashboardContainerProps
> = async ({ children }) => {

  const notifications = await GetAllNotifications();
  const notificationCount = notifications?.length ?? 0;

  return (
    <div className="min-h-screen min-w-full">
      <VendorProjectDashboardSidebar notificationCount={notificationCount}/>
      <div className="md:ml-[17.5rem] flex flex-col">
        <VendorProjectDashboardNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 md:mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VendorProjectDashboardContainer;
