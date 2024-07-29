import { GetUsers } from "@/components/actions/users/UserActions";
import UsersPageContent from "./components/UsersPageContent";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";
import AddUserDialog from "./components/AddUserDialog";

interface Props {
  params: {
    projectId: string
  }
}

const UsersPage = async ({ params }: Props) => {
  const { projectId } = params;

  if (isNaN(Number(projectId))) {
    throw "project id is invalid";
  }

  // TODO 
  // Get all users but then filter out users already in this project
  const users = await GetUsers();
  const project = await GetProjectById(Number(projectId));

  if (!project || !users) {
     throw "Data passed is null";
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium pb-5">Users In Project</h1>
        <AddUserDialog users={users} />
      </div>
      <UsersPageContent project={project} users={users} />
    </div>
  );
};

export default UsersPage;
