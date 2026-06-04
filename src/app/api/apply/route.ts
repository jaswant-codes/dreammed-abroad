import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.APPLY_SCRIPT_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.legalConsent) {
      return NextResponse.json(
        {
          success: false,
          error: "Privacy Policy and Terms consent is required",
        },
        { status: 400 }
      );
    }

    if (!SCRIPT_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "Server Configuration Error: Missing Script URL",
        },
        { status: 500 }
      );
    }

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await response.text();

    let jsonResponse;

    try {
      jsonResponse = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid response from Google Script",
        },
        { status: 500 }
      );
    }

    if (!response.ok || !jsonResponse.success) {
      return NextResponse.json(
        {
          success: false,
          error: jsonResponse.error || "Google Script Error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: jsonResponse,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
