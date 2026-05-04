import { ImageResponse } from "next/og";

export const alt = "ExperienceKit.ai — AI-powered learning kits";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 42%, #0f172a 100%)",
          color: "#fafaf9",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fcd34d",
          }}
        >
          ExperienceKit.ai
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 58,
            fontWeight: 650,
            lineHeight: 1.08,
            maxWidth: 980,
            letterSpacing: "-0.02em",
          }}
        >
          AI-powered kits that turn learning into hands-on experience.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.35,
            maxWidth: 900,
            color: "#cbd5e1",
            fontWeight: 500,
          }}
        >
          Learn by doing. Build by exploring. Earn by applying.
        </div>
      </div>
    ),
    { ...size },
  );
}
