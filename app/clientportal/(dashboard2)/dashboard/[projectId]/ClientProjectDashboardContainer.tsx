import ClientProjectDashboardSidebar from "./ClientProjectDashboardSidebar";
import ClientProjectDashboardNavbar from "./ClientProjectDashboardNavbar";
import { Project } from "@/components/types/DemoTypes";

interface ClientProjectDashboardContainerProps {
  children: React.ReactNode;
  project: Project;
}

const ClientProjectDashboardContainer: React.FC<
  ClientProjectDashboardContainerProps
> = ({ children, project }) => {
  return (
    <div className="min-h-screen min-w-full">
      <ClientProjectDashboardSidebar project={project} />
      <div className="md:ml-[17.5rem] flex flex-col">
        <ClientProjectDashboardNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 md:mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientProjectDashboardContainer;
