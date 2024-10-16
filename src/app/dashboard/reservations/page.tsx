import { columns } from "./reservationColumn";
import { DataTable } from "./reservationTable";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/middleware/dashboard";

async function getData(): Promise<Reservation[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(await isAdmin(user as User));

  const { data, error } = await supabase.from("reservation").select("*");

  if (error) {
    console.error("Error fetching reservations", error);
    return [];
  }
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
