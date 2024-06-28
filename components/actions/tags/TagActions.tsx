"use server";

import { Option } from "@/components/ui/MultipleSelector";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GetAllPrimaryTags(): Promise<string[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetAllPrimaryTags] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc("get_primary_tag_names");
  if (error) {
    console.log("[GetAllPrimaryTags] " + error.message);
    return null;
  }

  return data as string[];
}

export async function GetSecondaryTagsFromPrimaryTag(
  primaryTag: string
): Promise<string[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetAllSecondaryTags] " + userError.message);
    return null;
  }

  const { data, error } = await supabase.rpc("get_secondary_tag_names", {
    primary_tag: primaryTag,
  });
  if (error) {
    console.log("[GetAllSecondaryTags] " + error.message);
    return null;
  }

  return data as string[];
}

export async function BuildPrimaryTagToSecondaryTagMap(): Promise<Map<
  string,
  Option[]
> | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[BuildPrimaryTagToSecondaryTagMap] " + userError.message);
    return null;
  }

  const { data: tags, error: tagError } = await supabase.rpc(
    "create_json_object_for_all_tag_options"
  );
  if (tagError) {
    console.log("[BuildPrimaryTagToSecondaryTagMap] " + tagError.message);
    return null;
  }

  const m = new Map<string, Option[]>();

  for (const tag of tags) {
    if (tag.secondary_tags) {
      const formatted = tag.secondary_tags.map(
        (sTag: string): Option => ({
          value: sTag,
          label: sTag,
        })
      );

      m.set(tag.primary_tag, formatted);
    }
  }

  return m;
}

export async function BuildSecondaryTagPrimaryToTagMap(): Promise<Map<
  string,
  string
> | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[BuildSecondaryTagPrimaryToTagMap] " + userError.message);
    return null;
  }

  const { data: tags, error: tagError } = await supabase.rpc(
    "create_json_object_for_all_tag_options"
  );
  if (tagError) {
    console.log("[BuildSecondaryTagPrimaryToTagMap] " + tagError.message);
    return null;
  }

  const m = new Map<string, string>();

  for (const tag of tags) {
    if (tag.secondary_tags) {
      tag.secondary_tags.forEach((secondaryTag: string) => {
        m.set(secondaryTag, tag.primary_tag);
      });
    }
  }

  return m;
}

export async function GetTagsForVendor(): Promise<string[] | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("[GetTagsForVendor] " + userError.message);
    return null;
  }

  const { data, error: tagError } = await supabase.rpc("get_all_notifications", {
    vendor: user?.user_metadata.group_id
  });
  if (tagError) {
    console.log("[GetTagsForVendor] " + tagError.message);
    return null;
  }
  
  return data;
}