import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MedSpa Growth Engine - AI-Powered Revenue Acceleration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #115E59 100%)",
          padding: "60px",
        }}
      >
        {/* Trend arrow graphic */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: "30px" }}
        >
          <path
            d="M8 22L16 10L24 22"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18L16 12L20 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          MedSpa Growth Engine
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "rgba(255, 255, 255, 0.85)",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          AI-Powered Revenue Acceleration for Medical Spas
        </div>

        {/* Decorative line */}
        <div
          style={{
            display: "flex",
            width: "120px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "2px",
            marginTop: "40px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
