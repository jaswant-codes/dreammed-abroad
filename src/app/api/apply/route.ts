import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.APPLY_SCRIPT_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    } catch (e) {
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

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
