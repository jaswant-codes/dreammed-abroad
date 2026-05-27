import { NextResponse } from "next/server";

// IMPORTANT: Replace this with your actual deployed Google Script Web App URL
// You can also use process.env.GOOGLE_SCRIPT_URL
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "YOUR_ACTUAL_GOOGLE_SCRIPT_URL_HERE";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate the URL is actually set
    if (!SCRIPT_URL || SCRIPT_URL === "YOUR_ACTUAL_GOOGLE_SCRIPT_URL_HERE" || SCRIPT_URL === "GOOGLE_SCRIPT_URL") {
      console.error("Configuration Error: Missing Google Script URL");
      return NextResponse.json(
        { success: false, error: "Server Configuration Error: Missing Script URL" }, 
        { status: 500 }
      );
    }

    console.log("Sending to Google Script:", body);

    // 2. Perform fetch request with proper headers and cache busting
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store", // Crucial for Next.js to prevent caching POST requests
      redirect: "follow", // Ensure 302 redirects from Google Script are followed
    });

    const text = await response.text();
    console.log("Google Script Response:", text);

    // 3. Check for HTTP errors (e.g. 404, 500)
    if (!response.ok) {
      console.error("Google Script error status:", response.status);
      throw new Error(`Google Script returned status ${response.status}`);
    }

    // 4. Safely parse the JSON response
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Google Script response as JSON. Received:", text);
      throw new Error("Invalid response format from Google Script. Check if the Web App is returning HTML.");
    }

    // 5. Check if the Google Script itself reported an error in the JSON
    if (!jsonResponse.success) {
      console.error("Google Script reported failure:", jsonResponse.error);
      throw new Error(jsonResponse.error || "Google Script failed to process the request");
    }

    // 6. Return successful response
    return NextResponse.json({ success: true, data: jsonResponse });

  } catch (error: any) {
    console.error("API Route Error:", error);
    
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
