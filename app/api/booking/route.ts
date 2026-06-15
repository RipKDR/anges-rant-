import { NextResponse } from "next/server";

const TO_EMAIL = process.env.BOOKING_TO_EMAIL ?? "angesrant@outlook.com";
const FROM_EMAIL = process.env.BOOKING_FROM_EMAIL ?? "Ange's Rant <onboarding@resend.dev>";

type BookingPayload = {
  name?: string;
  email?: string;
  eventType?: string;
  date?: string;
  location?: string;
  budget?: string;
  message?: string;
  /** Honeypot — real users never fill this. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: BookingPayload;
  try {
    body = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Silently accept bot submissions so they get no useful signal.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please add your name, email and a message." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look right — mind checking it?" },
      { status: 422 }
    );
  }

  const fields: [string, string | undefined][] = [
    ["Event type", body.eventType],
    ["Preferred date", body.date],
    ["Location", body.location],
    ["Budget", body.budget],
  ];
  const detailRows = fields
    .filter(([, v]) => v && v.trim())
    .map(
      ([label, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#888;font-size:13px">${label}</td><td style="padding:4px 0;font-weight:600">${escapeHtml(
          v!.trim()
        )}</td></tr>`
    )
    .join("");

  const subject = `Booking enquiry — ${name}${body.eventType ? ` (${body.eventType})` : ""}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="margin:0 0 4px">New booking enquiry</h2>
      <p style="margin:0 0 20px;color:#666">via angesrant.com</p>
      <table style="border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:4px 16px 4px 0;color:#888;font-size:13px">From</td><td style="padding:4px 0;font-weight:600">${escapeHtml(
          name
        )}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888;font-size:13px">Email</td><td style="padding:4px 0;font-weight:600"><a href="mailto:${escapeHtml(
          email
        )}">${escapeHtml(email)}</a></td></tr>
        ${detailRows}
      </table>
      <div style="padding:16px;background:#f6f6f6;border-radius:8px;white-space:pre-wrap;line-height:1.5">${escapeHtml(
        message
      )}</div>
    </div>`;
  const text = `New booking enquiry via angesrant.com\n\nFrom: ${name}\nEmail: ${email}\n${fields
    .filter(([, v]) => v && v.trim())
    .map(([label, v]) => `${label}: ${v!.trim()}`)
    .join("\n")}\n\n${message}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        error:
          "Booking delivery isn't switched on yet. Set RESEND_API_KEY in the environment — see .env.example.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "We couldn't send that just now. Please try again or email us directly." , detail: detail.slice(0, 300) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Network hiccup sending your enquiry. Please try again." },
      { status: 502 }
    );
  }
}
