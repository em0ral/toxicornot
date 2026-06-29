export const metadata = {
  title: "Help & Crisis Resources — toxicornot.ai",
  description:
    "Hotlines and support resources for abuse, crisis, and mental health — in the US and internationally — plus how to find a therapist.",
  alternates: {
    canonical: "https://toxicornot.ai/resources",
  },
}

const cardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "32px",
  border: "1px solid rgba(168,85,247,0.2)",
  marginBottom: "20px",
}

const h2Style = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a1a2e",
  marginBottom: "16px",
}

const p = { color: "#374151", fontSize: "14px", lineHeight: "1.8", marginBottom: "16px" }

function Resource({ name, contact, note }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e" }}>{name}</div>
      <div style={{ fontSize: "14px", color: "#7c3aed", fontWeight: "600" }}>{contact}</div>
      {note ? <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.6" }}>{note}</div> : null}
    </div>
  )
}

export default function Resources() {
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
          <span style={{ fontSize: "44px" }}>🆘</span>
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
            Help & Crisis Resources
          </h1>
          <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.7", maxWidth: "520px", margin: "0 auto" }}>
            toxicornot.ai can help you read a message, but it is not emergency help. If you are in
            danger or struggling, the people and lines below are trained to help — most are free,
            confidential, and available around the clock.
          </p>
        </header>

        <div
          style={{
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "20px",
          }}
        >
          <p style={{ ...p, marginBottom: "0", color: "#9f1239", fontWeight: "600" }}>
            If you are in immediate danger, call your local emergency number now — 911 in the US.
          </p>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>United States</h2>
          <Resource
            name="National Domestic Violence Hotline"
            contact="Call 1-800-799-7233 · Text START to 88788"
            note="24/7, confidential support for anyone affected by abuse — including emotional and verbal abuse. Online chat at thehotline.org."
          />
          <Resource
            name="988 Suicide & Crisis Lifeline"
            contact="Call or text 988"
            note="24/7 support for emotional distress, suicidal thoughts, or any mental health crisis. Chat at 988lifeline.org."
          />
          <Resource
            name="Crisis Text Line"
            contact="Text HOME to 741741"
            note="Free, 24/7 crisis support by text with a trained counselor."
          />
          <Resource
            name="love is respect"
            contact="Call 1-866-331-9474 · Text LOVEIS to 22522"
            note="For young people and anyone with questions about a dating relationship — healthy, unhealthy, or abusive."
          />
          <Resource
            name="RAINN — National Sexual Assault Hotline"
            contact="Call 1-800-656-4673"
            note="24/7 confidential support for survivors of sexual assault. Online chat at rainn.org."
          />
          <Resource
            name="Childhelp National Child Abuse Hotline"
            contact="Call or text 1-800-422-4453"
            note="24/7 support for children and adults concerned about a child's safety."
          />
          <Resource
            name="SAMHSA National Helpline"
            contact="Call 1-800-662-4357"
            note="24/7, free, confidential referrals for mental health and substance use, in English and Spanish."
          />
          <Resource
            name="The Trevor Project"
            contact="Call 1-866-488-7386 · Text START to 678678"
            note="24/7 crisis support for LGBTQ+ young people."
          />
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>International</h2>
          <Resource
            name="United Kingdom — National Domestic Abuse Helpline"
            contact="0808 2000 247"
            note="Run by Refuge, 24/7. For mental health crisis, call Samaritans on 116 123."
          />
          <Resource
            name="Canada — Talk Suicide Canada"
            contact="1-833-456-4566 (call) · Text 45645"
            note="For young people, Kids Help Phone: text CONNECT to 686868."
          />
          <Resource
            name="Australia — 1800RESPECT"
            contact="1800 737 732"
            note="National domestic, family, and sexual violence support. For mental health crisis, Lifeline: 13 11 14."
          />
          <Resource
            name="Anywhere else — Find a Helpline"
            contact="findahelpline.com"
            note="A free directory of vetted crisis and support lines in over 130 countries. Befrienders Worldwide (befrienders.org) also lists international centers."
          />
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>Finding a therapist or counselor</h2>
          <p style={p}>
            A licensed therapist can help you make sense of a confusing relationship, rebuild
            confidence in your own judgment, and decide what you want to do next. You do not need to
            be in crisis to reach out — many people start therapy simply to think more clearly.
          </p>
          <Resource
            name="Psychology Today directory"
            contact="psychologytoday.com/us/therapists"
            note="Search by location, insurance, specialty (e.g. trauma, relationships), and approach."
          />
          <Resource
            name="Open Path Collective"
            contact="openpathcollective.org"
            note="A network of therapists offering reduced-cost sessions for people without adequate insurance."
          />
          <p style={{ ...p, marginBottom: "0" }}>
            Your primary care doctor can also refer you, and many employers offer free confidential
            sessions through an Employee Assistance Program (EAP). Outside the US, search for your
            country's psychological association or ask a GP for a referral.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
          toxicornot.ai · powered by AI · not a substitute for professional advice
          {" · "}
          <a href="/guides" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Guides
          </a>
          {" · "}
          <a href="/glossary" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Glossary
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
