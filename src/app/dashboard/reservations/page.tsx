import { cookies } from "next/headers";
import { columns } from "./reservationColumn";
import { DataTable } from "./reservationTable";
import { createClient } from "@/utils/supabase/server";

async function getData(): Promise<Reservation[]> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("Error fetching session", sessionError);
    return [];
  }

  if (!session) {
    console.error("User is not authenticated");
    return [];
  }

  const { user } = session;

  if (!user || !user.role?.includes("admin")) {
    console.error("Access denied: user does not have admin privileges");
    return [];
  }

  const { data, error } = await supabase.from("reservation").select("*");

  if (error) {
    console.error("Error fetching reservations", error);
    return [];
  }
  console.log(data);
  return data;
}

export default async function DemoPage() {
  const data = await getData();
  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
