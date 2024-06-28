"use server";

import { AccountType, Offer, Paid_Request } from "@/components/types/DemoTypes";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GetAllOffersByVendor() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllOffersByVendor] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log("[GetAllOffersByVendor] Only a vendor user can make this call");
    return null;
  }

  const vendor: string = user?.user_metadata.group_id;

  const { data, error } = await supabase.rpc(
    "create_json_object_for_all_offers_by_vendor",
    { current_vendor_id: vendor }
  );

  if (error) {
    console.log("[GetAllOffersByVendor] " + error.message);
    return null;
  }

  const offers: Offer[] = data;
  //console.log(JSON.stringify(data, null, 2));
  return offers;
}

export async function GetAllOffersForClient(): Promise<Offer[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllOffersForClient] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "C") {
    console.log(
      "[GetAllOffersForClient] Only a client user can make this call"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_offers_for_client",
    { client: user?.user_metadata.group_id }
  );
  if (error) {
    console.log("[GetAllOffersForClient] " + error.message);
    return null;
  }

  const offers: Offer[] = data;
  return offers;
}

export async function GetAllOffersForProject(
  projectID: number
): Promise<Offer[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllOffersForProject] " + userError.message);
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
    console.log("[GetAllOffersForProject]", belongsError.message);
    return null;
  }
  if (!belongs) {
    console.log(
      "[GetAllOffersForProject] User does not belong to the given project"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_offers_for_client_project",
    {
      proj: projectID,
    }
  );
  if (error) {
    console.log("[GetAllOffersForProject]", error.message);
    return null;
  }
  return data;
}

export async function GetAllPendingApprovalOffers(): Promise<Offer[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllPendingApprovalOffers] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client != "V") {
    console.log(
      "[GetAllPendingApprovalOffers] Only a vendor user can make this call"
    );
    return null;
  }

  const vendor: string = user?.user_metadata.group_id;

  const { data, error } = await supabase.rpc(
    "create_json_object_for_offers_pending_approval",
    { vendor }
  );

  if (error) {
    console.log("[GetAllPendingApprovalOffers] " + error.message);
    return null;
  }

  const offers: Offer[] = data;
  //console.log(JSON.stringify(data, null, 2));
  return offers;
}

export async function GetAllAcceptedOffersClient(): Promise<Offer[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllAcceptedOffersClient] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client == "V") {
    console.log(
      "[GetAllAcceptedOffersClient] A vendor user should not be making this call"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_offers_accepted_by_client",
    {
      client: user?.user_metadata.group_id,
    }
  );
  if (error) {
    console.log("[GetAllAcceptedOffersClient]", error.message);
    return null;
  }
  return data;
}

export async function GetAllAcceptedOffersInProject(
  projectID: number
): Promise<Offer | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllAcceptedOffersInProject] " + userError.message);
    return null;
  }

  if (user?.user_metadata.vendor_or_client == "V") {
    console.log(
      "[GetAllAcceptedOffersInProject] A vendor user should not be making this call"
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
    console.log("[GetAllAcceptedOffersInProject]", clientError.message);
    return null;
  }
  if (client != user?.user_metadata.group_id) {
    console.log(
      "[GetAllAcceptedOffersInProject] Users outside of the client that owns this project cannot query offers"
    );
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_accepted_offers_in_project",
    {
      proj: projectID,
    }
  );
  if (error) {
    console.log("[GetAllAcceptedOffersInProject]", error.message);
    return null;
  }
  return data;
}

export async function GetOffersCreatedByUser(): Promise<Offer[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[GetAllAcceptedOffersInProject] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc(
    "create_json_object_for_offers_sent_by_vendor_user",
    {
      user_id: user?.id,
    }
  );
  if (error) {
    console.log("[GetOffersCreatedByUser]", error.message);
    return null;
  }
  return data;
}

export async function GetOfferById(id: number): Promise<Offer | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetOfferById] " + userError.message);
    return null;
  }

  const offerId: number = Number(id);

  const { data, error } = await supabase.rpc(
    "create_json_object_for_offer_by_id",
    {
      offer_id: offerId,
      vendor_or_client: user?.user_metadata.vendor_or_client,
    }
  );
  if (error) {
    console.log("[GetOfferById] " + error.message);
    return null;
  }

  const offer: Offer = data;
  console.log(offer);
  return offer;
}

export async function CreateOffer(
  filePaths: string[],
  title: string,
  taskId: number,
  description?: string,
  phone?: string,
  email?: string
): Promise<boolean> {
  // Function order
  // 1. Upload the files and retrieve the links to these files
  // 2. Create the offer

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("[CreateOffer] " + userError.message);
    return false;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_task_vendor_id",
    {
      task_id: taskId,
    }
  );
  if (vendorError) {
    console.log("[CreateOffer]", vendorError.message);
    return false;
  }
  if (vendor != user?.user_metadata.group_id) {
    console.log("[CreateOffer] Task does not belong to user's vendor");
    return false;
  }

  if (!phone && !email) {
    console.log("[CreateOffer] Contact information must be provided");
    return false;
  }

  // Create Offer
  const { data, error } = await supabase.rpc("create_offer", {
    creator: user?.id,
    file_paths: filePaths,
    task_id: taskId,
    title: title,
    descr: description,
    phone: phone,
    email: email,
  });

  if (error) {
    console.log("[CreateOffer] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[CreateOffer] Something went wrong...");
  }

  return res;
}

export async function ApproveOffer(offerId: number): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[ApproveOffer] " + userError.message);
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "appr_offer",
    }
  );
  if (privError) {
    console.log("[ApproveOffer]", privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[ApproveOffer] User does not have the privilege to make this call"
    );
    return false;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_offer_vendor_id",
    {
      offer_id: offerId,
    }
  );
  if (vendorError) {
    console.log("[ApproveOffer]", vendorError.message);
    return false;
  }
  if (vendor != user?.user_metadata.group_id) {
    console.log("[ApproveOffer] Offer does not belong to user's vendor");
    return false;
  }

  const { data, error } = await supabase.rpc("approve_offer", {
    offer_id: offerId,
  });
  if (error) {
    console.log("[ApproveOffer] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[ApproveOffer] something went wrong...");
    return false;
  }

  return true;
}

export async function DisapproveOffer(
  offerId: number,
  reason?: string
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[DisapproveOffer] " + userError.message);
    return false;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "appr_offer",
    }
  );
  if (privError) {
    console.log("[DisapproveOffer]", privError.message);
    return false;
  }
  if (!priv) {
    console.log(
      "[DisapproveOffer] User does not have the privilege to make this call"
    );
    return false;
  }

  const { data: vendor, error: vendorError } = await supabase.rpc(
    "get_offer_vendor_id",
    {
      offer_id: offerId,
    }
  );
  if (vendorError) {
    console.log("[DisapproveOffer]", vendorError.message);
    return false;
  }
  if (vendor != user?.user_metadata.group_id) {
    console.log("[DisapproveOffer] Offer does not belong to user's vendor");
    return false;
  }

  const { data, error } = await supabase.rpc("disapprove_offer", {
    offer_id: offerId,
    comments: reason,
  });
  if (error) {
    console.log("[DisapproveOffer] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[DisapproveOffer] something went wrong...");
    return false;
  }

  return true;
}

// client function
export async function AcceptOffer(
  offerId: number,
  phoneNumber: string | null,
  email: string | null,
  paidRequests: Paid_Request[]
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[AcceptOffer] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client !== "C") {
    console.log("[AcceptOffer] A vendor should not be making this call...");
    return false;
  }

  const { data: belongs, error: belongsError } = await supabase.rpc(
    "check_user_in_same_project_as_offer",
    {
      profile_id: user.id,
      offer_id: offerId,
    }
  );
  if (belongsError) {
    console.log("[AcceptOffer]", belongsError.message);
    return false;
  }
  if (!belongs) {
    console.log("[AcceptOffer] User is not in the same project as offer");
    return false;
  }

  const { data, error } = await supabase.rpc("accept_offer", {
    offer_id: offerId,
    user_id: user?.id,
    phone: phoneNumber,
    email: email,
    paid_requests: paidRequests,
  });
  if (error) {
    console.log("[AcceptOffer] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[AcceptOffer] Something went wrong...");
  }

  return res;
}

// client function
export async function RejectOffer(offerId: number): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[RejectOffer] " + userError.message);
    return false;
  }

  if (user?.user_metadata.vendor_or_client !== "C") {
    console.log("[RejectOffer] A vendor should not be making this call...");
    return false;
  }

  const { data: belongs, error: belongsError } = await supabase.rpc(
    "check_user_in_same_project_as_offer",
    {
      profile_id: user.id,
      offer_id: offerId,
    }
  );
  if (belongsError) {
    console.log("[RejectOffer]", belongsError.message);
    return false;
  }
  if (!belongs) {
    console.log("[RejectOffer] User is not in the same project as offer");
    return false;
  }

  const { data, error } = await supabase.rpc("reject_offer", {
    offer_id: offerId,
  });
  if (error) {
    console.log("[RejectOffer] " + error.message);
    return false;
  }

  const res: boolean = data;
  if (!res) {
    console.log("[RejectOffer] Something went wrong...");
  }

  return res;
}

export async function DeactivateOfferAndMarkTaskIncomplete(
  offerID: number
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[DeactivateOfferAndMarkTaskIncomplete] " + userError.message);
    return false;
  }

  const { data: creator, error: creatorError } = await supabase.rpc(
    "get_offer_creator",
    {
      offer_id: offerID,
    }
  );
  if (creatorError) {
    console.log("[DeactivateOfferAndMarkTaskIncomplete]", creatorError.message);
    return false;
  }
  if (creator != user?.id) {
    const { data: priv, error: privError } = await supabase.rpc(
      "check_privilege_access",
      {
        profile_id: user?.id,
        priv: "edit_offer",
      }
    );
    if (privError) {
      console.log("[DeactivateOfferAndMarkTaskIncomplete]", privError.message);
      return false;
    }
    if (!priv) {
      console.log(
        "[DeactivateOfferAndMarkTaskIncomplete] User does not have the privilege to modify this offer"
      );
      return false;
    }
  }

  const { error } = await supabase.rpc("deactivate_offer_and_add_tasks_back", {
    old_offer_id: offerID,
  });
  if (error) {
    console.log("[DeactivateOfferAndMarkTaskIncomplete]", error.message);
    return false;
  }
  return true;
}

export async function DeactivateOffer(
  offerID: number
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[DeactivateOffer] " + userError.message);
    return false;
  }

  const { data: creator, error: creatorError } = await supabase.rpc(
    "get_offer_creator",
    {
      offer_id: offerID,
    }
  );
  if (creatorError) {
    console.log("[DeactivateOffer]", creatorError.message);
    return false;
  }
  if (creator != user?.id) {
    const { data: priv, error: privError } = await supabase.rpc(
      "check_privilege_access",
      {
        profile_id: user?.id,
        priv: "edit_offer",
      }
    );
    if (privError) {
      console.log("[DeactivateOffer]", privError.message);
      return false;
    }
    if (!priv) {
      console.log(
        "[DeactivateOffer] User does not have the privilege to modify this offer"
      );
      return false;
    }
  }

  const { error } = await supabase.rpc("deactivate_offer", {
    offer_id: offerID,
  });
  if (error) {
    console.log("[DeactivateOffer]", error.message);
    return false;
  }
  return true;
}

export async function ReplaceOffer(
  oldOffer: number,
  filePaths: string[],
  title: string,
  description?: string,
  phone?: string,
  email?: string
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[ReplaceOffer] " + userError.message);
    return false;
  }

  const { data: creator, error: creatorError } = await supabase.rpc(
    "get_offer_creator",
    {
      offer_id: oldOffer,
    }
  );
  if (creatorError) {
    console.log("[ReplaceOffer]", creatorError.message);
    return false;
  }
  if (creator != user?.id) {
    const { data: priv, error: privError } = await supabase.rpc(
      "check_privilege_access",
      {
        profile_id: user?.id,
        priv: "edit_offer",
      }
    );
    if (privError) {
      console.log("[ReplaceOffer]", privError.message);
      return false;
    }
    if (!priv) {
      console.log(
        "[ReplaceOffer] User does not have the privilege to modify this offer"
      );
      return false;
    }
  }

  if (!phone && !email) {
    console.log("[ReplaceOffer] Contact information is required");
    return false;
  }

  const { error } = await supabase.rpc("replace_offer", {
    old_offer_id: oldOffer,
    creator: user?.id,
    file_paths: filePaths,
    title: title,
    descr: description || null,
    phone: phone || null,
    email: email || null,
  });
  if (error) {
    console.log("[ReplaceOffer]", error.message);
    return false;
  }
  return true;
}
