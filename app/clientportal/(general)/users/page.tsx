import { Button } from "@/components/ui/button";
import React from "react";
import UserInfo from "./_components/UserInfo";
import { GetAllUsers } from "./_components/UserFakeTypesDeleteLater";
import UserDataTable from "./_components/UserDataTable";

const page = async () => {
  const users = GetAllUsers();

  if (!users) {
    return <div>Unable to get users</div>;
  }

  return (
    <div className="">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-5 ml-1">Users</h1>
          <Button variant={"outline"}>Add User</Button>
        </div>
        <div>
          <UserInfo users={users} />
        </div>
        <div className="mt-5 mb-5">
          <UserDataTable users={users}/>
        </div>
      </div>
    </div>
  );
};

export default page;
