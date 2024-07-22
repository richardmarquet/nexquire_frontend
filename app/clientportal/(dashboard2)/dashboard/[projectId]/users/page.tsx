import { GetUsers } from "@/components/actions/users/UserActions";
import { admin_users, regular_users } from "./UserDemoData";
import { User } from "./UserTypes";
import UsersTable from "./UsersTable";
//import UsersPageContent from "./UsersPageContent";
import UsersPageContent from "./components/UsersPageContent";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";

interface Props {
  params: {
    projectId: string
  }
}

const UsersPage = async ({ params }: Props) => {
  // const GetUsersFake = (): User[][] => {
  //   return [admin_users, regular_users];
  // };

  //const users = GetUsersFake();

  const { projectId } = params;

  if (isNaN(Number(projectId))) {
    throw "project id is invalid";
  }

  const users = await GetUsers();
  const project = await GetProjectById(Number(projectId));

  if (!project || !users) {
     throw "Data passed is null";
  }

  return (
    <div className="">
      {/* <UsersTable admin_users={users[0]} regular_users={users[1]} /> */}
      {/* <UsersPageContent project={project} users={users}/> */}
      <UsersPageContent project={project} users={users} />
    </div>
  );
};

export default UsersPage;
