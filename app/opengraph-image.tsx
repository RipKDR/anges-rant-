import { ImageResponse } from "next/og";

export const alt = "Ange's Rant — Funk, Soul & Disco from Melbourne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0414",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Violet blob left */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.3)",
            filter: "blur(80px)",
          }}
        />
        {/* Pink blob right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,46,166,0.25)",
            filter: "blur(80px)",
          }}
        />
        {/* Gold blob center */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "40%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,122,24,0.15)",
            filter: "blur(60px)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 8,
            color: "rgba(255,209,102,0.9)",
            textTransform: "uppercase",
          }}
        >
          MELBOURNE, AUSTRALIA
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 0.88,
              backgroundImage:
                "linear-gradient(100deg, #ffd166 0%, #ff7a18 35%, #ff2ea6 70%, #8b5cf6 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {"ANGE'S"}
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 0.88,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            RANT
          </div>

          <div
            style={{
              marginTop: 36,
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 6,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span>FUNK</span>
            <span style={{ color: "#ff2ea6", fontSize: 10 }}>{"  |  "}</span>
            <span>SOUL</span>
            <span style={{ color: "#ff2ea6", fontSize: 10 }}>{"  |  "}</span>
            <span>DISCO</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            height: 6,
            background:
              "linear-gradient(90deg, #ff7a18, #ff2ea6, #8b5cf6)",
          }}
        />
      </div>
    ),
    size
  );
}
