"use server";

import { Post } from "@/components/types/DemoTypes";
import createSupabaseServerClient from "@/lib/supabase/server";
import { CreateTask } from "../tasks/TaskActions";

export async function GetAllNotifications(): Promise<Post[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllNotifications] " + userError);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log("[GetAllNotifications] Only vendor users can make this call");
    return null;
  }

  //
  // At the moment, notifications are just glorified requests that are filtered. This means:
  // 1. You can't 'delete' them
  // 2. They only go away if you turn them into a task (database logic)
  // 3. One Request per "notification"
  // 4. There is no "notification" type as previously stated
  //
  // Until this is changed this is what we will do:
  // 1. Query all the notifications using ""
  // 2. Group the notifications together by postId
  // 3. return the object
  //
  const { data, error } = await supabase.rpc(
    "create_json_object_for_notifications",
    {
      vendor: user?.user_metadata.group_id,
    }
  );

  if (error) {
    console.log("[GetAllNotifications] error - " + JSON.stringify(error));
    return null;
  } else if (!data) {
    console.log("[GetAllNotifications] data is null, no notifications");
    return null;
  }

  // create a new object to represent this data

  //console.log(JSON.stringify(data, null, 2));
  //console.log(JSON.stringify(data, null, 2));
  const posts: Post[] = data;
  return posts;
}

export async function GetNotificationByPostID(
  postID: number
): Promise<Post | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetNotificationByPostID] " + userError);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log(
      "[GetNotificationByPostID] Only vendor users can make this call"
    );
    return null;
  }

  const { data: active, error: activeError } = await supabase.rpc(
    "check_if_post_is_active",
    {
      post_id: postID,
    }
  );
  if (activeError) {
    console.log("[GetNotificationByPostID]", activeError.message);
    return null;
  }
  if (!active) {
    console.log("[GetNotificationByPostID] Post is inactive");
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_notification_by_post_id",
    {
      current_post_id: postID,
      vendor: user.user_metadata.group_id,
    }
  );
  if (error) {
    console.log("[GetNotificationByPostID]", error.message);
    return null;
  }
  return data;
}

export async function TurnNotificationIntoTask(data: {
  notification: Post;
  assigneeId: string;
  priority: string;
  title: string;
  description?: string;
  dueDate?: Date;
}): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const { error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.log("[TurnNotificationIntoTask] " + userError);
    return false;
  }

  return CreateTask(
    data.title,
    data.notification.requests.map((request) => request.id),
    data.priority,
    data.assigneeId,
    data.dueDate,
    data.description
  );
}

export async function AddPrimaryTagNotifications(data: {
  primaryTagNames: string[];
}): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[AddPrimaryTagNotification] " + userError);
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_notif",
    }
  );
  if (privError) {
    console.log("[AddPrimaryTagNotification] " + privError.message);
    return false;
  }
  if (priv == false) {
    console.log(
      "[AddPrimaryTagNotification] " +
        "User does not have privilege access to edit notifications"
    );
    return false;
  }

  const { error } = await supabase.rpc("create_notification_on_primary_tags", {
    vendor: user?.user_metadata.group_id,
    primary_tag_names: data.primaryTagNames,
  });
  if (error) {
    console.log("Error creating notification on primary tag:", error);
    return false;
  }

  return true;
}

export async function AddSecondaryTagNotifications(data: {
  secondaryTagNames: string[];
}): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[AddSecondaryTagNotification] " + userError);
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_notif",
    }
  );
  if (privError) {
    console.log("[AddSecondaryTagNotification] " + privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[AddSecondaryTagNotification] " +
        "User does not have privilege access to edit notifications"
    );
    return false;
  }

  const { error } = await supabase.rpc(
    "create_notification_on_secondary_tags",
    {
      vendor: user?.user_metadata.group_id,
      secondary_tag_names: data.secondaryTagNames,
    }
  );
  if (error) {
    console.log("Error creating notification on primary tag:", error);
    return false;
  }

  return true;
}

export async function RemoveTagNotification(data: {
  secondaryTagName: string;
}): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[RemoveTagNotification] " + userError);
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_notif",
    }
  );
  if (privError) {
    console.log("[RemoveTagNotification] " + privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[RemoveTagNotification] " +
        "User does not have privilege access to edit notifications"
    );
    return false;
  }

  const { error } = await supabase.rpc("delete_notification", {
    vendor: user?.user_metadata.group_id,
    notif: data.secondaryTagName,
  });
  if (error) {
    console.error("Error deleting notification:", error);
    return false;
  }
  return true;
}

export async function GetTagNotifications(): Promise<string[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetTagNotifications] " + userError);
    return null;
  }

  if (user?.user_metadata.vendor_or_client === "C") {
    console.log(
      "[GetTagNotifications] Cannot query tag notifications for a client"
    );
    return null;
  }

  const result = await supabase.rpc("get_all_notifications", {
    vendor: user?.user_metadata.group_id,
  });
  if (result.error) {
    console.log("[GetTagNotifications] " + result.error.message);
    return null;
  }

  return result.data;
}

export async function ClearNotificationOnPost(
  postID: number
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[ClearNotificationOnPost] " + userError);
    return false;
  }

  if (user?.user_metadata.vendor_or_client === "C") {
    console.log(
      "[ClearNotificationOnPost] Cannot clear notifications for a client"
    );
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_notif",
    }
  );
  if (privError) {
    console.log("[ClearNotificationOnPost]", privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[ClearNotificationOnPost] User does not have the privilege to modify notifications"
    );
    return false;
  }

  const { error } = await supabase.rpc("clear_notification_on_post", {
    vendor: user?.user_metadata.group_id,
    post: postID,
  });
  if (error) {
    console.log("[ClearNotificationOnPost]", error.message);
    return false;
  }
  return true;
}

export async function ClearNotificationOnRequest(
  requestID: number
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[ClearNotificationOnRequest] " + userError);
    return false;
  }

  if (user?.user_metadata.vendor_or_client === "C") {
    console.log(
      "[ClearNotificationOnRequest] Cannot clear notifications for a client"
    );
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "edit_notif",
    }
  );
  if (privError) {
    console.log("[ClearNotificationOnRequest]", privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[ClearNotificationOnRequest] User does not have the privilege to modify notifications"
    );
    return false;
  }

  const { error } = await supabase.rpc("clear_notification_on_request", {
    vendor: user?.user_metadata.group_id,
    request: requestID,
  });
  if (error) {
    console.log("[ClearNotificationOnRequest]", error.message);
    return false;
  }
  return true;
}
