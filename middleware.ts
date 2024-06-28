"use server";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // TODO
  // This will be used to auth the user using supabase/ssr

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // please ensure this will be hit by the matcher set at the bottom
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/clientportal") ||
    request.nextUrl.pathname.startsWith("/vendorportal")
  ) {
    // ensure the user is logged in for the dashboard pages
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const groupType = user?.user_metadata.vendor_or_client;
    if (
      request.nextUrl.pathname.startsWith("/clientportal") &&
      groupType !== "C"
    ) {
      return NextResponse.redirect(
        new URL("/vendorportal/dashboard/home", request.url)
      );
    } else if (
      request.nextUrl.pathname.startsWith("/vendorportal") &&
      groupType !== "V"
    ) {
      return NextResponse.redirect(
        new URL("/clientportal/projects", request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/clientportal/:path*",
    "/vendorportal/:path*",
  ],
};
