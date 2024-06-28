"use server";

import { Project, User } from "@/components/types/DemoTypes";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GetAllProjectsForUser(): Promise<Project[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllProjectsForUser] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_projects_user_belongs_to",
    {
      current_user_id: user?.id,
    }
  );
  if (error) {
    console.log("[GetAllProjectsForUser] " + error.message);
    return null;
  }

  const projects: Project[] = data;
  return projects;
}

export async function GetProjectById(projectId: number): Promise<Project | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetProjectById] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_project_by_id",
    {
      proj: projectId,
    }
  );
  if (error) {
    console.log("[GetProjectById] " + error.message);
    return null;
  }

  return data as Project;
}

export async function GetAllProjectsUserDoesNotBelongTo(): Promise<
  Project[] | null
> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllProjectsUserDoesNotBelongTo] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_projects_user_does_not_belong_to",
    {
      current_user_id: user?.id,
    }
  );
  if (error) {
    console.error("[GetAllProjectsUserDoesNotBelongTo] ", error.message);
    return null;
  }
  return data as Project[];
}

export async function GetAllProjectsUserIsAdminOf(): Promise<Project[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllProjectsUserIsAdminOf] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_projects_user_is_admin_of",
    {
      user_id: user?.id,
    }
  );
  if (error) {
    console.log("[GetAllProjectsUserIsAdminOf]", error.message);
    return null;
  }
  return data as Project[];
}

export async function GetAllUsersInProject(
  projectID: number
): Promise<User[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetAllUsersInProject] " + userError.message);
    return null;
  }

  const { data: belongs, error: belongsError } = await supabase.rpc(
    "check_if_user_belongs_in_project",
    {
      current_user_id: user?.id,
      proj: projectID,
    }
  );
  if (belongsError) {
    console.log("[GetAllUsersInProject]", belongsError.message);
    return null;
  }
  if (!belongs) {
    console.log(
      "[GetAllUsersInProject] Cannot query information about projects user does not belong to"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_project_users",
    {
      project: projectID,
    }
  );
  if (error) {
    console.log("[GetAllUsersInProject]", error.message);
    return null;
  }
  return data as User[];
}

export async function GetUsersRequestingToJoinProject(
  projectID: number
): Promise<User[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetUsersRequestingToJoinProject] " + userError.message);
    return null;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[GetUsersRequestingToJoinProject]", adminError.message);
    return null;
  }
  if (admin != user?.id) {
    console.log(
      "[GetUsersRequestingToJoinProject] This call is reserved for project admins"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_users_requesting_project",
    {
      project: projectID,
    }
  );
  if (error) {
    console.log("[GetUsersRequestingToJoinProject]", error.message);
    return null;
  }
  return data as User[];
}

export async function CreateProject(
  title: string,
  description: string | null,
  budget: number | null
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[CreateProject] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client != "C") {
    console.log("[CreateProject] Only a client user can make this call");
    return false;
  }

  const { data, error } = await supabase.rpc("create_client_project", {
    admin_id: user?.id,
    title: title,
    description: description,
    budget: budget,
  });
  if (error) {
    console.log("[CreateProject] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[CreateProject] returned false");
    return false;
  }

  return res;
}

export async function RequestToJoinProject(
  projectID: number
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[RequestToJoinProject] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client != "C") {
    console.log("[RequestToJoinProject] Only a client user can make this call");
    return false;
  }

  const { data: client, error: clientError } = await supabase.rpc(
    "get_client_project_belongs_to",
    {
      project_id: projectID,
    }
  );
  if (clientError) {
    console.log("[RequestToJoinProject]", clientError.message);
    return false;
  }
  if (client != user?.user_metadata.group_id) {
    console.log(
      "[RequestToJoinProject] User does not belong to project's client"
    );
    return false;
  }

  const { error } = await supabase.rpc("request_to_join_project", {
    current_user_id: user?.id,
    proj: projectID,
  });
  if (error) {
    console.error("[RequestToJoinProject] ", error.message);
    return false;
  }
  return true;
}

export async function LeaveProject(projectID: number): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[LeaveProject] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[LeaveProject]", adminError.message);
    return false;
  }
  if (admin == user?.id) {
    console.log("[LeaveProject] Project admin cannot leave project");
    return false;
  }

  const { error } = await supabase.rpc("remove_user_from_project", {
    current_user_id: user?.id,
    current_project_id: projectID,
  });
  if (error) {
    console.log("[LeaveProject]", error.message);
    return false;
  }
  return true;
}

export async function AddUserToProject(
  projectID: number,
  newUser: string
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[AddUserToProject] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[AddUserToProject]", adminError.message);
    return false;
  }
  if (admin != user?.id) {
    console.log("[AddUserToProject] Only a project admin can make this call");
    return false;
  }

  const { error } = await supabase.rpc("add_user_to_project", {
    new_user: newUser,
    project: projectID,
  });
  if (error) {
    console.log("[AddUserToProject]", error.message);
    return false;
  }
  return true;
}

export async function RejectRequestToJoinProject(
  userID: string,
  projectID: number
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[RejectRequestToJoinProject] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[RejectRequestToJoinProject]", adminError.message);
    return false;
  }
  if (admin != user?.id) {
    console.log(
      "[RejectRequestToJoinProject] Only a project admin can make this call"
    );
    return false;
  }

  const { error } = await supabase.rpc("reject_request_to_join_project", {
    requesting_user: userID,
    project: projectID,
  });
  if (error) {
    console.log("[RejectRequestToJoinProject]", error.message);
    return false;
  }
  return true;
}

export async function RemoveUserFromProject(
  userID: string,
  projectID: number
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[RemoveUserFromProject] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[RemoveUserFromProject]", adminError.message);
    return false;
  }
  if (admin != user?.id) {
    console.log(
      "[RemoveUserFromProject] Only a project admin can make this call"
    );
    return false;
  }
  if (userID == user?.id) {
    console.log("[RemoveUserFromProject] Cannot remove project admin");
    return false;
  }

  const { data, error } = await supabase.rpc("remove_user_from_project", {
    current_user_id: userID,
    current_project_id: projectID,
  });
  if (error) {
    console.log("[RemoveUserFromProject]", error.message);
    return false;
  }
  return true;
}

export async function ChangeProjectAdmin(
  projectID: number,
  newAdmin: string
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[ChangeProjectAdmin] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[ChangeProjectAdmin]", adminError.message);
    return false;
  }
  if (admin != user?.id) {
    console.log("[ChangeProjectAdmin] Only a project admin can make this call");
    return false;
  }

  const { data: belongs, error: belongsError } = await supabase.rpc(
    "check_if_user_belongs_in_project",
    {
      current_user_id: newAdmin,
      proj: projectID,
    }
  );
  if (belongsError) {
    console.log("[ChangeProjectAdmin]", belongsError.message);
    return false;
  }
  if (!belongs) {
    console.log("[ChangeProjectAdmin] New admin is not currently in project");
    return false;
  }

  const { error } = await supabase.rpc("change_project_admin", {
    proj: projectID,
    new_admin: newAdmin,
  });
  if (error) {
    console.log("[ChangeProjectAdmin]", error.message);
    return false;
  }
  return true;
}

export async function DeactivateProject(
  projectID: number
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[DeactivateProject] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[DeactivateProject]", adminError.message);
    return false;
  }
  if (admin != user?.id) {
    console.log("[DeactivateProject] Only a project admin can make this call");
    return false;
  }

  const { error } = await supabase.rpc("deactivate_project", {
    proj: projectID,
  });
  if (error) {
    console.log("[DeactivateProject]", error.message);
    return false;
  }
  return true;
}

export async function ActivateProject(
  projectID: number
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[ActivateProject] " + userError.message);
    return false;
  }

  const { data: admin, error: adminError } = await supabase.rpc(
    "get_project_admin",
    {
      proj: projectID,
    }
  );
  if (adminError) {
    console.log("[ActivateProject]", adminError.message);
    return false;
  }
  if (admin != user?.id) {
    console.log("[ActivateProject] Only a project admin can make this call");
    return false;
  }

  const { error } = await supabase.rpc("activate_project", {
    proj: projectID,
  });
  if (error) {
    console.log("[ActivateProject]", error.message);
    return false;
  }
  return true;
}
