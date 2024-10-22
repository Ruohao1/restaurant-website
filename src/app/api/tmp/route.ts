import { Database } from "@/utils/supabase/database.types";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import createProductCatalog from "@/utils/stripe/product/createProductCatalog";

export async function GET() {
  try {
    // Run the script
    await createProductCatalog();

    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: menus } = await supabase.from("menu").select("*");

    // Log the fetched menus
    console.log(menus);

    // Return success response
    return NextResponse.json({
      message: "Product catalog created successfully!",
    });
  } catch (error) {
    console.error("Error creating product catalog:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
