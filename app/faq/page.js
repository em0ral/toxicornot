export const metadata = {
  title: "FAQ — toxicornot.ai",
  description:
    "Answers to common questions about toxicornot.ai: is it free, is it private, how accurate is it, and is it a substitute for professional help?",
  alternates: {
    canonical: "https://toxicornot.ai/faq",
  },
}

const faqs = [
  {
    q: "Is toxicornot.ai free?",
    a: [
      "Yes. toxicornot.ai is completely free to use, with no account or signup required. Paste a message and you get an instant read.",
    ],
  },
  {
    q: "Is it private? Do you store my messages?",
    a: [
      "When you paste a message for analysis, it is sent to our AI provider (Anthropic) to be processed in real time. We do not permanently store the content of the messages you submit — they are not retained after the analysis is complete.",
      "As a precaution, please don't paste messages that contain passwords, financial details, or government ID numbers. You can read the full details on our Privacy Policy page.",
    ],
  },
  {
    q: "How does it work?",
    a: [
      "You paste a message — a text, DM, email, or any snippet of a conversation — and the AI reads it for patterns associated with toxic or manipulative communication, such as gaslighting, guilt-tripping, love bombing, and stonewalling. It then explains what it noticed in plain language.",
      "The analysis is powered by Anthropic's AI. It reads the words you give it; it has no other context about the people or the relationship beyond what you paste.",
    ],
  },
  {
    q: "Can the AI be wrong?",
    a: [
      "Yes. The tool is meant to give you perspective, not a verdict. Tone, sarcasm, inside jokes, and missing context can all be misread — by an AI or by a person. Treat the result as one informed second opinion, not proof.",
      "A single message rarely tells the whole story. Real toxicity shows up as a pattern over time, so use the read as a starting point for your own judgment rather than the final word.",
    ],
  },
  {
    q: "Is this therapy or professional advice?",
    a: [
      "No. toxicornot.ai is an informational tool and is not a substitute for advice from a licensed therapist, counselor, doctor, or lawyer. It cannot diagnose anyone or tell you what to do.",
      "If you're dealing with something serious — abuse, fear for your safety, or a real impact on your wellbeing — please reach out to a professional or one of the lines on our Help & Resources page.",
    ],
  },
  {
    q: "What kinds of messages can I analyze?",
    a: [
      "Anything text-based: a single text or DM, an email, a group-chat exchange, or a back-and-forth you've copied out. The more complete the exchange, the more context the AI has to work with.",
    ],
  },
  {
    q: "Does one toxic result mean my relationship is toxic?",
    a: [
      "Not on its own. One sharp message can come from a good person having a bad day, and one calm message doesn't clear a long pattern. What matters is whether the behavior repeats and how conflict is handled overall.",
      "Our Guides go deeper on telling a rough patch from a genuine pattern, and on what healthy versus toxic communication actually looks like.",
    ],
  },
  {
    q: "What if I'm in danger or in crisis?",
    a: [
      "toxicornot.ai is not emergency help. If you are in immediate danger, contact your local emergency services (911 in the US). For confidential support, the National Domestic Violence Hotline is available at 1-800-799-7233, or text START to 88788.",
      "More hotlines — including international ones — and guidance on finding a therapist are on our Help & Resources page.",
    ],
  },
  {
    q: "Who is toxicornot.ai for?",
    a: [
      "Anyone who has read a message and thought \"wait, is it me, or was that not okay?\" It's for the moment of doubt — when you want a calm, outside read before you decide how to respond.",
    ],
  },
]

export default function FAQ() {
  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #ede9fe 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/" style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
            ← Back to toxicornot.ai
          </a>
        </div>

        <header style={{ textAlign: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "44px" }}>❓</span>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginTop: "8px",
              marginBottom: "12px",
              background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.7", maxWidth: "520px", margin: "0 auto" }}>
            What toxicornot.ai does, what it doesn't, and how to get the most out of it.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "24px 28px",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px" }}>
                {item.q}
              </h2>
              {item.a.map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "#374151",
                    fontSize: "14px",
                    lineHeight: "1.8",
                    marginBottom: i === item.a.length - 1 ? "0" : "12px",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "32px" }}>
          toxicornot.ai · powered by AI · not a substitute for professional advice
          {" · "}
          <a href="/guides" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Guides
          </a>
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
