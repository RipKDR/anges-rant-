import { ImageResponse } from "next/og";

export const alt = "Ange's Rant — Funk, Soul & Disco from Melbourne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Social share card rendered at build time — shows up when the site is
   shared on socials, in messages, etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0414",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(139,92,246,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,46,166,0.3), transparent 50%)",
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 800,
            letterSpacing: 4,
            backgroundImage:
              "linear-gradient(100deg, #ffd166, #ff7a18, #ff2ea6, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ANGE&apos;S RANT
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: 10,
          }}
        >
          FUNK ★ SOUL ★ DISCO
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 4,
          }}
        >
          MELBOURNE, AUSTRALIA
        </div>
      </div>
    ),
    size
  );
}
