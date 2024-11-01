import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const testPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Attempt to get the user session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>User: {JSON.stringify(user)}</div>;
};

export default testPage;
