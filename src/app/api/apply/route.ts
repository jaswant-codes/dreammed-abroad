import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

async function ensureFile() {
  const dir = path.dirname(LEADS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, neetScore, preferredCountry, budget, message, source } = body;

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { error: "Full name, phone, and email are required." },
        { status: 400 }
      );
    }

    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      fullName,
      phone,
      email,
      neetScore: neetScore || "",
      preferredCountry: preferredCountry || "",
      budget: budget || "",
      message: message || "",
      source: source || "apply-page",
      createdAt: new Date().toISOString(),
    };

    await ensureFile();
    const data = JSON.parse(await fs.readFile(LEADS_FILE, "utf-8"));
    data.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
