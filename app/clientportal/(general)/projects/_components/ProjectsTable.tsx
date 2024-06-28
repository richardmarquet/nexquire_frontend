import { Project } from "@/components/types/DemoTypes";
import ProjectCell from "./ProjectCell";
import { Separator } from "@/components/ui/separator";

interface Props {
  projects: Project[] | null;
}

const ProjectsTable = ({ projects }: Props) => {
  if (!projects) return <div>Nothing to show...</div>;

  return (
    <div className="">
      {projects.map((project) => (
        <div
          key={project.id}
          className="mb-5"
        >
          <ProjectCell project={project} />
          <Separator orientation="horizontal"/>
        </div>
      ))}
    </div>
  );
};

export default ProjectsTable;
