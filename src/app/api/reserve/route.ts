import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const { data } = await req.json(); // Expecting data directly from the body

    // Log the received data for debugging
    console.log("Received data:", data);

    // Insert data into the Supabase table
    const { error } = await supabase
      .from("reservation") // Replace 'your_table_name' with your actual table name
      .insert([
        {
          guest_name: data.name,
          date: data.date,
          time: data.time,
          guests: data.guests,
          guest_email: data.email,
          guest_phone: data.phone,
          message: data.message,
        },
      ]); // Adjust this according to your schema

    // Check for errors and respond accordingly
    if (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Data inserted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
