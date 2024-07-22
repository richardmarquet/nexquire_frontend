import ClientProjectDashboardSidebar from "./ClientProjectDashboardSidebar";
import ClientProjectDashboardNavbar from "./ClientProjectDashboardNavbar";
import { Project } from "@/components/types/DemoTypes";
import ClientProjectSideBar from "./ClientProjectSideBar";

interface ClientProjectDashboardContainerProps {
  children: React.ReactNode;
  project: Project;
}

const ClientProjectDashboardContainer: React.FC<
  ClientProjectDashboardContainerProps
> = ({ children, project }) => {
  return (
    <div className="min-h-screen min-w-full">
      <ClientProjectSideBar project={project} />
      {children}
    </div>
  );
};

export default ClientProjectDashboardContainer;
