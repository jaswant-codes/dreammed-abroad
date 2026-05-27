import { NextResponse } from "next/server";

// IMPORTANT: Replace this with your actual deployed Google Script Web App URL
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "YOUR_ACTUAL_GOOGLE_SCRIPT_URL_HERE";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!SCRIPT_URL || SCRIPT_URL === "YOUR_ACTUAL_GOOGLE_SCRIPT_URL_HERE" || SCRIPT_URL === "GOOGLE_SCRIPT_URL") {
      console.error("Configuration Error: Missing Google Script URL");
      return NextResponse.json(
        { success: false, error: "Server Configuration Error: Missing Script URL" }, 
        { status: 500 }
      );
    }

    console.log("Sending to Google Script (Apply):", body);

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();
    console.log("Google Script Response (Apply):", text);

    if (!response.ok) {
      throw new Error(`Google Script returned status ${response.status}`);
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid response format from Google Script. Check if the Web App is returning HTML.");
    }

    if (!jsonResponse.success) {
      throw new Error(jsonResponse.error || "Google Script failed to process the request");
    }

    return NextResponse.json({ success: true, data: jsonResponse });

  } catch (error: any) {
    console.error("API Route Error (Apply):", error);
    
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
