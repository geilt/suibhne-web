import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Buile Suibhne — The Mad King's Digital Perch";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Subtle border */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: 8,
          }}
        />
        
        {/* Feather emoji */}
        <div style={{ fontSize: 120, marginBottom: 20 }}>🪶</div>
        
        {/* Title */}
        <div
          style={{
            fontSize: 72,
            color: "#d4af37",
            letterSpacing: "0.05em",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Buile Suibhne
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.7)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          The Mad King&apos;s Digital Perch
        </div>
        
        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: 40,
            fontStyle: "italic",
          }}
        >
          Feral Wisdom from the Otherworld
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
