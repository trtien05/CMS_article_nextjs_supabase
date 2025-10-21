import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all news
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// POST create new news
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    const { data, error } = await supabase
      .from("news")
      .insert([{ title, content, author }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
