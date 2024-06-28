"use server";
import { Task } from "@/components/types/DemoTypes";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GetAllTasks(): Promise<Task[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log(userError);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log("[GetAllTasks] Only a vendor user can make this call");
    return null;
  }

  const vendor: number = user?.user_metadata.group_id;

  const { data, error } = await supabase.rpc(
    "create_json_object_for_all_tasks",
    { vendor }
  );

  if (error) {
    console.log("[GetAllTasks]", error.message);
    return null;
  }

  const tasks: Task[] = data;
  console.log(JSON.stringify(data, null, 2));
  return tasks;
}

export async function GetTaskById(id: number): Promise<Task | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetTaskById] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log("[GetTaskById] Only a vendor user can make this call");
    return null;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_task_vendor_id",
    {
      task_id: id,
    }
  );
  if (vendorError) {
    console.log("[GetTaskById]", vendorError.message);
    return null;
  }
  if (vendor != user.user_metadata.group_id) {
    console.log("[GetTaskById] User does not belong to same vendor as task");
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_task_by_task_id",
    {
      task_id: id,
    }
  );

  if (error) {
    console.log("[GetTaskById] " + error.message);
    return null;
  }

  const task: Task = data;
  console.log(JSON.stringify(task, null, 2));
  return task;
}

export async function GetCurrentUsersTasks(): Promise<Task[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetCurrentUsersTasks] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_assigned_tasks",
    { user_id: user?.id }
  );

  if (error) {
    console.error("[GetCurrentUsersTasks] " + error.message);
    return null;
  }

  const tasks: Task[] = data;
  //console.log(JSON.stringify(data, null, 2));
  return tasks;
}

export async function GetAllUnassignedTasks(): Promise<Task[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllUnassignedTasks] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log(
      "[GetAllUnassignedTasks] Only a vendor user can make this call"
    );
    return null;
  }

  const vendor: number = user?.user_metadata.group_id;

  const { data, error } = await supabase.rpc(
    "create_json_object_for_unassigned_tasks",
    { vendor }
  );

  if (error) {
    console.error("[GetAllUnassignedTasks] " + error.message);
    return null;
  }

  const tasks: Task[] = data;
  console.log(JSON.stringify(data, null, 2));
  return tasks;
}

export async function AssignTask(
  task_id: number,
  assignee: string
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[AssignTask] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client == "C") {
    console.log("[ClaimTask] A client user should not be making this call");
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_task",
    }
  );
  if (privError) {
    console.log("[AssignTask]", privError.message);
    return false;
  }
  if (!priv) {
    console.log("[AssignTask] User does not have the privilege to edit tasks");
    return false;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_task_vendor_id",
    {
      task_id: task_id,
    }
  );
  if (vendorError) {
    console.log("[ClaimTask]", vendorError);
    return false;
  }
  if (vendor != user?.user_metadata.group_id) {
    console.log("[ClaimTask] User does not belong to the same vendor as task");
    return false;
  }

  const { data, error } = await supabase.rpc("change_task_assignment", {
    task_id: task_id,
    assign_to: assignee,
  });

  if (error) {
    console.log("[AssignTask] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[AssignTask] Something went wrong...");
    return false;
  }

  return true;
}

export async function ClaimTask(id: number): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[ClaimTask] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client == "C") {
    console.log("[ClaimTask] A client user should not be making this call");
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "claim_task",
    }
  );
  if (privError) {
    console.log("[ClaimTask]", privError.message);
    return false;
  }
  if (!priv) {
    console.log("[ClaimTask] User does not have the privilege to claim tasks");
    return false;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_task_vendor_id",
    {
      task_id: id,
    }
  );
  if (vendorError) {
    console.log("[ClaimTask]", vendorError.message);
    return false;
  }
  if (vendor != user?.user_metadata.group_id) {
    console.log("[ClaimTask] User does not belong to the same vendor as task");
    return false;
  }

  const { data: assigned, error: assignedError } = await supabase.rpc(
    "check_if_task_is_assigned",
    {
      task_id: id,
    }
  );
  if (assignedError) {
    console.log("[ClaimTask]", assignedError.message);
    return false;
  }
  if (assigned) {
    console.log("[ClaimTask] Cannot claim a task that is already assigned");
    return false;
  }

  const { data, error } = await supabase.rpc("change_task_assignment", {
    task_id: id,
    assign_to: user?.id,
  });

  if (error) {
    console.log("[ClaimTask] " + error.message);
    return false;
  }

  return true;
}

export async function CreateTask(
  title: string,
  requestIds: number[],
  priority: string,
  userId?: string,
  dueDate?: Date,
  description?: string
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[CreateTask] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log("[CreateTask] Only a vendor user can make this call");
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user.id,
      priv: "create_task",
    }
  );
  if (privError) {
    console.log("[CreateTask]", privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[CreateTask] User does not have the privilege to make this call"
    );
    return false;
  }

  if (userId) {
    const { data: belongs, error: belongsError } = await supabase.rpc(
      "check_if_user_belongs_in_group",
      {
        user_id: userId,
        group_id: user.user_metadata.group_id,
        vendor_or_client: "V",
      }
    );
    if (belongsError) {
      console.log("[CreateTask]", belongsError.message);
      return false;
    }
    if (!belongs) {
      console.log(
        "[CreateTask] User does not belong to the same vendor as assignee"
      );
      return false;
    }
  }

  // do better maybe?
  const formattedPriority = FormatPriority(priority);

  const { data, error } = await supabase.rpc("create_task", {
    vendor: user?.user_metadata.group_id,
    requests: requestIds,
    task_title: title,
    task_priority: formattedPriority,
    task_description: description,
    task_due_date: dueDate,
    approval_req: true,
    assign_to: userId,
  });

  if (error) {
    console.log("[CreateTask] " + error.message);
    return false;
  }

  //console.log("Task created!");
  //console.log(JSON.stringify(data));

  return true;
}

export async function DeleteTask(id: number): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[DeleteTask] " + userError.message);
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_task",
    }
  );
  if (privError) {
    console.log("[DeleteTask]", privError.message);
    return false;
  }
  if (priv == false) {
    console.log(
      "[DeleteTask] User does not have the privilege to modify tasks"
    );
    return false;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_task_vendor_id",
    {
      task_id: id,
    }
  );
  if (vendorError) {
    console.log("[DeleteTask]", vendorError.message);
    return false;
  }
  if (vendor != user?.user_metadata.group_id) {
    console.log("[DeleteTask] User cannot modify task of another vendor");
    return false;
  }

  const { error } = await supabase.rpc("delete_task", {
    task_id: id,
  });
  if (error) {
    console.log("[DeleteTask]", error.message);
    return false;
  }
  return true;
}

export async function CompleteTask(id: number): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[CompleteTask] " + userError.message);
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_task",
    }
  );
  if (privError) {
    console.log("[CompleteTask]", privError.message);
    return false;
  }
  if (priv == false) {
    const { data: assignee, error: assigneeError } = await supabase.rpc(
      "get_task_assignment",
      {
        task_id: id,
      }
    );
    if (assigneeError) {
      console.log("[CompleteTask]", assigneeError.message);
      return false;
    }
    if (assignee != user?.id) {
      console.log(
        "[CompleteTask] User does not have the privilege to modify tasks"
      );
      return false;
    }
  } else {
    const { data: vendor, error: vendorError } = await supabase.rpc(
      "get_task_vendor_id",
      {
        task_id: id,
      }
    );
    if (vendorError) {
      console.log("[CompleteTask]", vendorError.message);
      return false;
    }
    if (vendor != user?.user_metadata.group_id) {
      console.log("[CompleteTask] User cannot modify task of another vendor");
      return false;
    }
  }

  const { error } = await supabase.rpc("set_task_completed", {
    task_id: id,
  });
  if (error) {
    console.log("[CompleteTask]", error.message);
    return false;
  }
  return true;
}

const FormatPriority = (priority: string) => {
  if (priority.toLowerCase() === "low") {
    return "Low";
  } else if (priority.toLowerCase() === "medium") {
    return "Medium";
  } else if (priority.toLowerCase() === "high") {
    return "High";
  } else if (priority.toLowerCase() === "very high") {
    return "Very High";
  } else if (priority.toLowerCase() === "immediate action") {
    return "Immediate Action";
  }
}