import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwIw5RCccoHUfcNhpjOeiwF5xKQC0KHBoa22XOKuwrQqV-zuTUhej8weyZ_2Jo8ATwC/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Sending contact form data:", body);

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await response.text();

    console.log("Google Script Response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Invalid response from Google Script");
    }

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to save contact form");
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
