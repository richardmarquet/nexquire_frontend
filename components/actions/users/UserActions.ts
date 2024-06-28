"use server";

import { AccountType, User, UserType } from "@/components/types/DemoTypes";
import createSupabaseServerClient from "@/lib/supabase/server";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";

export async function GetUsers(): Promise<User[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetUsers]" + userError.message);
    return null;
  }

  const group_id: string = user?.user_metadata.group_id;

  // Get all users for this group from supabase
  const { data, error } = await supabase.rpc("get_all_users_info_for_group", {
    group_id: group_id,
    vendor_or_client: user?.user_metadata.vendor_or_client,
  });

  if (error) {
    console.log("[GetUsers] " + error.message);
    return null;
  }

  const users: User[] = data;
  //console.log(JSON.stringify(users, null, 2));
  return users;
}

// TODO change this function, maybe change the name of the user type in out DemoTypes as it conflicts with supabase/ssr
export async function GetCurrentUser(): Promise<SupabaseUser | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetCurrentUser]" + userError.message);
    return null;
  }

  const user: SupabaseUser = data.user;

  return user;
}

export async function LogoutUser(): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("[Layout] failed to log user out!");
  }

  redirect("/login");
}

export async function AddUser(data: {
  userType: UserType;
  email: string;
}): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log(userError);
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "add_acc",
    }
  );
  if (privError) {
    console.log("[AddUser] " + privError.message);
    return false;
  }
  if (priv == false) {
    console.log(
      "[AddUser] " + "User does not have privilege access to add an account"
    );
    return false;
  }

  const enumKeys = Object.keys(UserType);
  const lastKey = enumKeys[enumKeys.length - 1] as keyof typeof UserType;
  if (data.userType == UserType[lastKey]) {
    console.log("[AddUser] " + "Cannot add a Super Admin to the group");
    return false;
  }

  function generatePass() {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
    for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    return pass;
  }

  let tempPass = generatePass();
  try {
    const { error } = await supabase.auth.admin.createUser({
      email: data.email,
      password: tempPass,
      user_metadata: {
        vendor_or_client: user?.user_metadata.vendor_or_client,
        group_id: user?.user_metadata.group_id,
        role_type_id: data.userType,
        activated: false,
      },
    });
    if (error) {
      console.log("[AddUser] " + error.message);
      return false;
    }
  } catch (error) {
    console.log("[AddUser] " + error);
    return false;
  }

  // const { error } = await supabase.auth.resetPasswordForEmail(
  //   data.email,
  //   {
  //     // redirectTo: "http://link/to/activate/account",
  //   }
  // );
  // if (error) {
  //   console.log("[AddUser] " + error.message);
  // }

  return true;
}

export async function GetUserGroupType(): Promise<AccountType | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetUsers]" + userError.message);
    return null;
  }

  return user?.user_metadata.vendor_or_client;
}

export async function DeleteUser(): Promise<boolean | null | void> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[DeleteUser] " + userError.message);
    return null;
  }
  if (!user) {
    console.log("[DeleteUser] User not found");
    return null;
  }

  const numericValues = Object.values(UserType).filter(
    (value) => typeof value === "number"
  ) as number[];
  if (user.user_metadata.role_type_id === Math.max(...numericValues)) {
    console.log("[DeleteUser] Cannot delete Super Admin");
    return false;
  }

  const { data: isProjectAdmin, error: projectAdminError } = await supabase.rpc(
    "check_if_project_admin",
    {
      user_id: user?.id,
    }
  );
  if (projectAdminError) {
    console.log("[DeleteUser] " + projectAdminError.message);
    return false;
  } else if (isProjectAdmin == true) {
    console.log("[DeleteUser] Cannot delete Project Admin");
    return false;
  }

  const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
    user?.id
  );
  if (deleteUserError) {
    console.log("[DeleteUser] " + deleteUserError.message);
    return false;
  }

  return LogoutUser();
}

export async function DeleteGroup(): Promise<boolean | null | void> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[DeleteGroup] " + userError.message);
    return null;
  }
  if (!user) {
    console.log("[DeleteGroup] User not found");
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "delete_group",
    }
  );
  if (privError) {
    console.log("[DeleteGroup] " + privError.message);
    return false;
  }
  if (priv == false) {
    console.log(
      "[DeleteGroup] " +
        "User does not have privilege access to delete the group"
    );
    return false;
  }

  const { error } = await supabase.rpc("delete_group", {
    group_id: user?.user_metadata.group_id,
    v_or_c: user?.user_metadata.vendor_or_client,
  });
  if (error) {
    console.log("[DeleteGroup] ", error.message);
    return false;
  } else {
    return LogoutUser();
  }
}

export async function ChangeSuperAdmins(
  newAdminID: string
): Promise<boolean | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[ChangeSuperAdmins] " + userError.message);
    return null;
  }
  if (!user) {
    console.log("[ChangeSuperAdmins] User not found");
    return null;
  }

  const { data: priv, error: privError } = await supabase.rpc(
    "check_privilege_access",
    {
      profile_id: user?.id,
      priv: "change_super_admin",
    }
  );
  if (privError) {
    console.log("[ChangeSuperAdmins] " + privError.message);
    return false;
  }
  if (priv == false) {
    console.log(
      "[ChangeSuperAdmins] " +
        "User does not have privilege access to change Super Admins"
    );
    return false;
  }

  const { data: belongs, error: belongsError } = await supabase.rpc(
    "check_if_user_belongs_in_group",
    {
      user_id: newAdminID,
      group_id: user?.user_metadata.group_id,
      vendor_or_client: user?.user_metadata.vendor_or_client,
    }
  );
  if (belongsError) {
    console.log("[ChangeSuperAdmins] " + belongsError.message);
    return false;
  }
  if (!belongs) {
    console.log(
      "[ChangeSuperAdmins] New Super Admin does not currently belong to this group"
    );
    return false;
  }

  const { error: promotionError } = await supabase.rpc(
    "promote_user_to_super_admin",
    {
      user_id: newAdminID,
    }
  );
  if (promotionError) {
    console.log("[ChangeSuperAdmins] " + promotionError.message);
    return false;
  }

  // TODO: Refresh so that the user sees different things now that they are no longer Super Admin

  return true;
}

export async function SignUp(
  vendorOrClient: AccountType,
  groupName: string,
  adminEmail: string,
  adminPassword: string,
  adminUsername: string,
  adminName: string,
  plan?: number,
  singleUser?: boolean
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  if (vendorOrClient == "V" && !plan) {
    console.log("[SignUp] Plan must be given to create a vendor");
    return false;
  }
  if (vendorOrClient == "C" && singleUser == undefined) {
    console.log("[SignUp] Single user must be specified to create a client");
    return false;
  }

  let group_id;
  if (vendorOrClient == "V") {
    const { data, error } = await supabase.rpc("new_vendor", {
      name_of_vendor: groupName,
      plan: plan,
    });
    if (error) {
      console.log("[SignUp]", error.message);
      return false;
    }
    group_id = data;
  } else {
    const { data, error } = await supabase.rpc("new_client", {
      name_of_client: groupName,
      single_user: singleUser,
    });
    if (error) {
      console.log("[SignUp]", error.message);
      return false;
    }
    group_id = data;
  }

  const numericValues = Object.values(UserType).filter(
    (value) => typeof value === "number"
  ) as number[];

  const { error: signUpError } = await supabase.auth.signUp({
    email: adminEmail,
    password: adminPassword,
    options: {
      data: {
        username: adminUsername,
        full_name: adminName,
        vendor_or_client: vendorOrClient,
        group_id: group_id,
        role_type_id: Math.max(...numericValues),
        activated: true,
      },
    },
  });
  if (signUpError) {
    console.log("[SignUp]", signUpError.message);

    const { error: deleteGroupError } = await supabase.rpc("delete_group", {
      group_id: group_id,
      v_or_c: vendorOrClient,
    });
    if (deleteGroupError) {
      console.log("[SignUp]", deleteGroupError.message);
    }
    return false;
  }

  return true;
}
