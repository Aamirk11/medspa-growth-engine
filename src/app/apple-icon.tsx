import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
          borderRadius: "40px",
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 32 32"
          fill="none"
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
      </div>
    ),
    { ...size }
  );
}
