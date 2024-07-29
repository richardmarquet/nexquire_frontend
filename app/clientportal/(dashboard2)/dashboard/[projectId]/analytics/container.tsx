import { Project } from "@/components/types/DemoTypes";
import DefaultClientDashboardNavbar from "../_components/navbars/DefaultClientDashboardNavbar";
import { navbar_type } from "@/components/types/nexquire_types";
import AnalyticsClientDashboardSidebar from "../_components/sidebars/AnalyticsClientDashboardSideBar";

interface Props {
  children: React.ReactNode;
  project: Project;
}

const Container: React.FC<Props> = ({ children, project }) => {
  return (
    <div className="min-h-screen min-w-full">
      <AnalyticsClientDashboardSidebar project={project} />
      <DefaultClientDashboardNavbar title="Analytics" navbarType={navbar_type.NAVBAR_SIDEBAR}/>
      <div className="md:ml-[17.5rem] flex flex-col px-16 py-5">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 md:mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Container;
