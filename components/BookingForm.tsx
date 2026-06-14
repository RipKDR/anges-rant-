"use client";

import { useState } from "react";
import { CheckIcon, ChevronDownIcon, CalendarIcon } from "@/components/Icons";

const EVENT_TYPES = [
  "Venue / club gig",
  "Festival",
  "Private party",
  "Corporate event",
  "Wedding",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-groove-pink focus:outline-none focus:ring-1 focus:ring-groove-pink/40";
const labelBase =
  "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/45";

export default function BookingForm({ contactEmail }: { contactEmail?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [unconfigured, setUnconfigured] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setUnconfigured(false);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      setUnconfigured(Boolean(json.unconfigured));
      setError(json.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Network hiccup — please try again in a moment.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-groove-pink/20 bg-night-soft/60 px-8 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-groove-pink/15">
          <CheckIcon className="h-8 w-8 text-groove-pink" />
        </div>
        <h3 className="font-display mt-6 text-3xl text-white">
          We&apos;ve got it.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Thanks for reaching out — your enquiry just landed in our inbox.
          We&apos;ll get back to you within a couple of days. In the meantime,
          give the music a spin.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-groove-pink underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from humans */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Your name *
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldBase} placeholder="Jane Promoter" />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldBase} placeholder="you@venue.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventType" className={labelBase}>
            Type of event
          </label>
          <div className="relative">
            <select
              id="eventType"
              name="eventType"
              defaultValue=""
              className={`${fieldBase} appearance-none pr-10`}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-night">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          </div>
        </div>
        <div>
          <label htmlFor="date" className={labelBase}>
            Preferred date
          </label>
          <div className="relative">
            <input
              id="date"
              name="date"
              type="date"
              className={`${fieldBase} pr-10 [color-scheme:dark]`}
            />
            <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className={labelBase}>
            Location
          </label>
          <input id="location" name="location" className={fieldBase} placeholder="Melbourne, VIC" />
        </div>
        <div>
          <label htmlFor="budget" className={labelBase}>
            Budget <span className="text-white/25">(optional)</span>
          </label>
          <input id="budget" name="budget" className={fieldBase} placeholder="e.g. $1,500" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Tell us about it *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldBase} resize-y`}
          placeholder="Date, venue, set length, vibe you're after — anything that helps us say yes."
        />
      </div>

      {error && (
        <div className="rounded-xl border border-groove-orange/30 bg-groove-orange/10 px-4 py-3 text-sm text-groove-orange">
          {error}
          {unconfigured && contactEmail && (
            <>
              {" "}
              You can email us directly at{" "}
              <a className="font-semibold underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-groove glow-pink inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-night transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,46,166,0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-night/40 border-t-night" />
            Sending…
          </>
        ) : (
          "Send booking enquiry"
        )}
      </button>
      <p className="text-xs text-white/35">
        We&apos;ll only use your details to reply to this enquiry. No lists, no spam.
      </p>
    </form>
  );
}
