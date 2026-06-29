import { guides } from "./guides-data"

export const metadata = {
  title: "Guides — Understanding Toxic & Manipulative Communication | toxicornot.ai",
  description:
    "Free, plain-English guides on gaslighting, love bombing, manipulation tactics, and healthy vs. toxic communication — and how to respond.",
  alternates: {
    canonical: "https://toxicornot.ai/guides",
  },
}

export default function GuidesIndex() {
  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #ede9fe 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <a
            href="/"
            style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
          >
            ← Back to toxicornot.ai
          </a>
        </div>

        <header className="text-center mb-10">
          <span style={{ fontSize: "44px" }}>📚</span>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "800",
              marginTop: "8px",
              marginBottom: "12px",
              background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Guides
          </h1>
          <p style={{ color: "#374151", fontSize: "16px", lineHeight: "1.7", maxWidth: "560px", margin: "0 auto" }}>
            Plain-English guides to the patterns toxicornot.ai helps you spot — what they are,
            why they work, and how to respond. Free to read, no signup required.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {guides.map((g) => (
            <a
              key={g.slug}
              href={`/guides/${g.slug}`}
              style={{
                display: "block",
                background: "white",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(168,85,247,0.2)",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <span style={{ fontSize: "28px", lineHeight: "1" }}>{g.emoji}</span>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>
                    {g.title}
                  </h2>
                  <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>
                    {g.description}
                  </p>
                  <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600" }}>
                    {g.readingTime} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#9ca3af" }}>
          toxicornot.ai · powered by AI · not a substitute for professional advice
          {" · "}
          <a href="/resources" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Help & Resources
          </a>
          {" · "}
          <a href="/privacy" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  )
}
