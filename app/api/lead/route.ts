import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Simple email storage — saves to a local JSON file.
// For production, swap to Cloudflare KV, Supabase, or any DB.

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

interface Lead {
    email: string;
    timestamp: string;
    source: string;
}

async function ensureFile() {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, "[]", "utf-8");
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const email = body.email?.trim();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        await ensureFile();

        const raw = await fs.readFile(DATA_FILE, "utf-8");
        const leads: Lead[] = JSON.parse(raw);

        // Dedupe
        if (leads.some((l) => l.email === email)) {
            return NextResponse.json({ ok: true, message: "Already saved" });
        }

        leads.push({
            email,
            timestamp: new Date().toISOString(),
            source: body.source || "website",
        });

        await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");

        return NextResponse.json({ ok: true, message: "Saved" });
    } catch (err) {
        console.error("Lead save error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await ensureFile();
        const raw = await fs.readFile(DATA_FILE, "utf-8");
        const leads = JSON.parse(raw);
        return NextResponse.json({ count: leads.length, leads });
    } catch {
        return NextResponse.json({ count: 0, leads: [] });
    }
}
