import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("BODY:", body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxozUmz_vCgZXDltLsrpoXuntb1PRckA03BjL45lRJNcpLIzsmf1VPMT_3EQJWnilpvFw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    console.log("GOOGLE RESPONSE:", text);

    return NextResponse.json({
      success: true,
      text,
    });

  } catch (error: any) {

    console.log("ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
