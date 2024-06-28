"use server";

import { Post } from "@/components/types/DemoTypes";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function CreatePost(
  title: string,
  description: string | null,
  projectID: number,
  requests: {
    primaryTag: string;
    item: string;
    city: string;
    state: string;
    description: string | null;
    budget: number | null;
    quantity: number | null;
    unit: string | null;
    secondaryTags: string[];
  }[]
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[CreatePost] " + userError);
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "create_post",
    }
  );
  if (privError) {
    console.log("[CreatePost] " + privError.message);
    return false;
  }
  if (priv == false) {
    console.log(
      "[CreatePost] " + "User does not have privilege access to create a post"
    );
    return false;
  }

  // Create post
  const { data: postID, error: postError } = await supabase.rpc("create_post", {
    user_id: user?.id,
    project: projectID,
    post_title: title,
    post_description: description || null,
  });
  if (postError) {
    console.log("[CreatePost] " + postError.message);
    return false;
  }
  for (const request of requests) {
    // Add requests to post
    const { data, error } = await supabase.rpc("add_request_to_post", {
      post_id: postID,
      tag: request.primaryTag,
      item: request.item,
      request_city: request.city,
      request_state: request.state,
      request_description: request.description || null,
      request_budget: request.budget || null,
      request_quantity: request.quantity || null,
      unit: request.unit || null,
    });
    if (error) {
      console.log("[CreatePost] " + error.message);
      return false;
    }
    // Add tags to post
    const { error: tagError } = await supabase.rpc("add_tag_to_request", {
      request: data,
      tag_names: request.secondaryTags,
    });
    if (tagError) {
      console.log("[CreatePost] " + tagError.message);
      return false;
    }
  }
  return true;
}

export async function GetAllPostsCreatedByClient(): Promise<Post[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllPostsCreatedByClient] " + userError);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "C") {
    console.log(
      "[GetAllPostsCreatedByClient] Only a client user can make this call"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_post_requests_by_client",
    {
      client: user?.user_metadata.group_id,
    }
  );

  if (error) {
    console.log("[GetAllPostsCreatedByClient] " + error.message);
    return null;
  }

  const posts: Post[] = data;
  return data;
}

export async function GetAllPostsInProject(
  projectID: number
): Promise<Post[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllPostsInProject] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client == "V") {
    console.log(
      "[GetAllPostsInProject] A vendor user should not be making this call"
    );
    return null;
  }

  const { data: client, error: clientError } = await supabase.rpc(
    "get_client_project_belongs_to",
    {
      project_id: projectID,
    }
  );
  if (clientError) {
    console.log("[GetAllPostsInProject] " + clientError.message);
    return null;
  }
  if (client != user?.user_metadata.group_id) {
    console.log(
      "[GetAllPostsInProject] Project does not belong to current user's client group"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_post_requests_in_project",
    {
      proj: projectID,
    }
  );
  if (error) {
    console.log("[GetAllPostsInProject] " + error.message);
    return null;
  }
  return data;
}

export async function GetPostById(postId: number): Promise<Post | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetPostById] " + userError);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_post_by_post_id",
    {
      current_post_id: postId,
      vendor_or_client: user?.user_metadata.vendor_or_client,
    }
  );

  if (error) {
    console.log("[GetPostById] " + error.message);
    return null;
  }

  const post: Post = data;
  return post;
}

export async function DeactivatePost(postID: number): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[DeactivatePost] " + userError);
    return null;
  }

  const { data: access, error: accessError } = await supabase.rpc(
    "check_user_in_same_project_as_post",
    {
      current_user_id: user?.id,
      post_id: postID,
    }
  );
  if (accessError) {
    console.log("[DeactivatePost]", accessError.message);
    return false;
  }
  if (access == false) {
    console.log(
      "[DeactivatePost] Users outside of the project cannot modify post"
    );
    return false;
  }

  const { error } = await supabase.rpc("deactivate_post", {
    post_id: postID,
  });
  if (error) {
    console.log("[DeactivatePost]", error.message);
    return null;
  }
  return true;
}

export async function ActivatePost(postID: number): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[ActivatePost] " + userError);
    return null;
  }

  const { data: access, error: accessError } = await supabase.rpc(
    "check_user_in_same_project_as_post",
    {
      current_user_id: user?.id,
      post_id: postID,
    }
  );
  if (accessError) {
    console.log("[ActivatePost]", accessError.message);
    return false;
  }
  if (access == false) {
    console.log(
      "[ActivatePost] Users outside of the project cannot modify post"
    );
    return false;
  }

  const { error } = await supabase.rpc("activate_post", {
    post_id: postID,
  });
  if (error) {
    console.log("[ActivatePost]", error.message);
    return null;
  }
  return true;
}

export async function FulfillRequest(requestID: number): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[FulfillRequest] " + userError);
    return false;
  }

  const { data: access, error: accessError } = await supabase.rpc(
    "check_user_in_same_project_as_request",
    {
      current_user_id: user?.id,
      request_id: requestID,
    }
  );
  if (accessError) {
    console.log("[FulfillRequest]", accessError.message);
    return false;
  }
  if (access == false) {
    console.log("[FulfillRequest] User is not in the request's project");
    return false;
  }

  const { error } = await supabase.rpc("set_fulfilled", {
    request_id: requestID,
  });
  if (error) {
    console.log("[FulfillRequest]", error.message);
    return false;
  }
  return true;
}

export async function ChangePostProject(
  postID: number,
  newProjectID: number
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[ChangePostProject] " + userError);
    return false;
  }

  const { data: access, error: accessError } = await supabase.rpc(
    "check_user_in_same_project_as_post",
    {
      current_user_id: user?.id,
      post_id: postID,
    }
  );
  if (accessError) {
    console.log("[ChangePostProject]", accessError.message);
    return false;
  }
  if (access == false) {
    console.log(
      "[ChangePostProject] Users outside of the project cannot modify post"
    );
    return false;
  }

  const { data: belongs, error: belongsError } = await supabase.rpc(
    "check_if_user_belongs_in_project",
    {
      current_user_id: user?.id,
      proj: newProjectID,
    }
  );
  if (belongsError) {
    console.log("[ChangePostProject]", belongsError.message);
    return false;
  }
  if (belongs == false) {
    console.log("[ChangePostProject] User must be part of the new project");
    return false;
  }

  const { error } = await supabase.rpc("change_post_project", {
    post_id: postID,
    new_project: newProjectID,
  });
  if (error) {
    console.log("[ChangePostProject]", error.message);
    return false;
  }
  return true;
}
