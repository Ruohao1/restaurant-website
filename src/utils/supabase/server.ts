import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./supabase";

export function createClient(cookie?: ReturnType<typeof cookies>) {
  const cookieStore = cookie || cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      auth: {
        // Automatically refresh the token
        autoRefreshToken: true,
        persistSession: false, // Since we're using this on the server
      },
    }
  );
}
