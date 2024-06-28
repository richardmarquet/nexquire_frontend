"use server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
}) {}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const res = supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return res;
}

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}
