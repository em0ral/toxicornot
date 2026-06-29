import { notFound } from "next/navigation"
import { guides, getGuide } from "../guides-data"

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} | toxicornot.ai`,
    description: guide.description,
    alternates: {
      canonical: `https://toxicornot.ai/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://toxicornot.ai/guides/${guide.slug}`,
      type: "article",
    },
  }
}

export default async function GuidePage({ params }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const related = (guide.related || []).map(getGuide).filter(Boolean)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: { "@type": "Organization", name: "toxicornot.ai" },
    publisher: { "@type": "Organization", name: "toxicornot.ai" },
    mainEntityOfPage: `https://toxicornot.ai/guides/${guide.slug}`,
  }

  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #ede9fe 100%)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a
            href="/guides"
            style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
          >
            ← All guides
          </a>
        </div>

        <article
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "40px",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <span style={{ fontSize: "36px" }}>{guide.emoji}</span>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              marginTop: "8px",
              marginBottom: "8px",
              lineHeight: "1.25",
              background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {guide.title}
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "28px" }}>{guide.readingTime}</p>

          <div style={{ color: "#374151", fontSize: "15px", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "24px", fontSize: "16px", color: "#1f2937" }}>{guide.intro}</p>

            {guide.sections.map((section, i) => (
              <section key={i}>
                <h2
                  style={{
                    fontSize: "19px",
                    fontWeight: "700",
                    color: "#1a1a2e",
                    marginTop: "32px",
                    marginBottom: "12px",
                  }}
                >
                  {section.heading}
                </h2>
                {section.body?.map((p, j) => (
                  <p key={j} style={{ marginBottom: "16px" }}>
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul style={{ marginBottom: "16px", paddingLeft: "20px" }}>
                    {section.list.map((item, j) => (
                      <li key={j} style={{ marginBottom: "10px" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div
            style={{
              marginTop: "36px",
              padding: "24px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
              border: "1px solid rgba(168,85,247,0.2)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginBottom: "12px" }}>
              Got a message you're unsure about?
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #a855f7, #ec4899)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                padding: "12px 24px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              🚩 Analyze it free on toxicornot.ai →
            </a>
          </div>

          <p
            style={{
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(168,85,247,0.15)",
              fontSize: "12px",
              color: "#9ca3af",
              lineHeight: "1.7",
            }}
          >
            ⚠️ This guide is for general educational purposes and is not a substitute for professional
            mental health advice. If you are in an abusive situation, please reach out to a qualified
            professional or a confidential helpline.
          </p>
        </article>

        {related.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#6b7280", marginBottom: "12px" }}>
              Keep reading
            </h2>
            <div className="flex flex-col gap-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/guides/${r.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "white",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(168,85,247,0.2)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{r.emoji}</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a2e" }}>{r.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <p style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#9ca3af" }}>
          toxicornot.ai · powered by AI · not a substitute for professional advice
          {" · "}
          <a href="/privacy" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  )
}
