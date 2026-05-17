import { NextResponse } from "next/server";
import { parseAISearch } from "@/lib/ai-search";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const params = await parseAISearch(query);
    return NextResponse.json(params);
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse query" }, { status: 500 });
  }
}
