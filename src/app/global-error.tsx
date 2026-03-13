"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#fafafa",
          color: "#171717",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            !
          </div>

          <h1
            style={{
              marginTop: 24,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.025em",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#737373",
              maxWidth: 400,
            }}
          >
            {error.message || "A critical error occurred. Please try again."}
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
            <button
              onClick={reset}
              style={{
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
                backgroundColor: "#0d9488",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 500,
                color: "#171717",
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: 6,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
