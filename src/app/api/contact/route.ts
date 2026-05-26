import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyATH1zRSwU8O0Bwkno0J7RqP_3vqo9XMjiWzjTbGHRshE1wuzOO1v8G2V9zBYBFhYI/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
