"use client"

import { useState } from "react"

// Each "yes" leans toward a concerning pattern. Scored yes=2, sometimes=1, no=0.
const questions = [
  { id: "apologize", text: "After disagreements, do you often end up apologizing even when you didn't think you were wrong?" },
  { id: "confused", text: "Do you frequently feel confused about what actually happened during an argument?" },
  { id: "walk-on-eggshells", text: "Do you change your behavior to avoid the other person's anger or moods?" },
  { id: "put-downs", text: "Do they criticize, mock, or put you down — even \"as a joke\"?" },
  { id: "isolation", text: "Have you become more cut off from friends or family since the relationship began?" },
  { id: "justify", text: "Do you feel you have to justify, explain, or defend ordinary choices?" },
  { id: "withdrawal", text: "Is affection, warmth, or communication withdrawn as a way to punish you?" },
  { id: "smaller", text: "Do you feel more anxious, smaller, or less yourself than you did before?" },
  { id: "reversed", text: "When you raise a concern, does it somehow get turned back onto you?" },
  { id: "fear", text: "Do you ever feel afraid — of their reactions, or for your own safety?" },
]

const options = [
  { label: "No / rarely", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Yes / often", value: 2 },
]

const gradientText = {
  background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}

const card = {
  background: "white",
  borderRadius: "16px",
  padding: "28px",
  border: "1px solid rgba(168,85,247,0.2)",
}

function SafetyNote() {
  return (
    <div
      style={{
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        borderRadius: "12px",
        padding: "16px 20px",
        marginTop: "20px",
      }}
    >
      <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#9f1239", margin: 0 }}>
        If you are afraid or in danger, your safety comes first. In the US, the National Domestic
        Violence Hotline is available 24/7 at <strong>1-800-799-7233</strong>, or text{" "}
        <strong>START</strong> to <strong>88788</strong>. If you are in immediate danger, call your
        local emergency services. More options are on our{" "}
        <a href="/resources" style={{ color: "#9f1239", fontWeight: 600 }}>Help &amp; Resources</a> page.
      </p>
    </div>
  )
}

function bandFor(score, fearHigh) {
  // Fear for safety overrides the numeric band.
  if (fearHigh) {
    return {
      heading: "Your safety matters most",
      emoji: "💗",
      body: [
        "You indicated that you feel afraid or worried for your safety. That single answer matters more than any score. Fear is not a normal part of a healthy relationship, and you deserve support.",
        "Please consider reaching out to one of the confidential lines below. You don't have to label the relationship or decide anything today to talk to someone.",
      ],
      guides: ["how-to-respond-to-toxic-messages", "going-no-contact"],
      showSafety: true,
    }
  }
  if (score <= 3) {
    return {
      heading: "Mostly healthy signs",
      emoji: "🌱",
      body: [
        "Your answers don't point to a strong pattern of toxic dynamics. Every relationship has hard days, and disagreement on its own isn't toxicity.",
        "If a specific moment is nagging at you, you can paste the actual message into toxicornot.ai for a closer read, or browse the guides below.",
      ],
      guides: ["healthy-vs-toxic-communication", "toxic-or-rough-patch"],
      showSafety: false,
    }
  }
  if (score <= 9) {
    return {
      heading: "Some patterns worth watching",
      emoji: "🤔",
      body: [
        "A few of your answers point to patterns that can be worth paying attention to. This doesn't mean the relationship is toxic — it means there are some things it could be worth getting clearer on.",
        "The guides below can help you tell a rough patch from a genuine pattern, and how healthy and toxic communication actually differ.",
      ],
      guides: ["toxic-or-rough-patch", "healthy-vs-toxic-communication", "setting-boundaries"],
      showSafety: false,
    }
  }
  if (score <= 15) {
    return {
      heading: "Several concerning patterns",
      emoji: "🚩",
      body: [
        "Several of your answers describe dynamics — self-doubt, walking on eggshells, feeling smaller — that often show up in unhealthy relationships. That's worth taking seriously, though only you can judge your own situation.",
        "It may help to talk this through with someone you trust or a licensed professional. The guides below are a place to start.",
      ],
      guides: ["recognizing-manipulation", "setting-boundaries", "what-is-gaslighting"],
      showSafety: true,
    }
  }
  return {
    heading: "Many serious red flags",
    emoji: "🆘",
    body: [
      "Your answers describe a lot of the patterns associated with toxic and controlling relationships. This is a self-reflection tool, not a diagnosis — but a pattern this consistent is worth taking seriously, and you don't have to sort it out alone.",
      "Please consider reaching out to a trusted person or one of the confidential lines below. The guides can help you think through next steps at your own pace.",
    ],
    guides: ["going-no-contact", "setting-boundaries", "how-to-respond-to-toxic-messages"],
    showSafety: true,
  }
}

const guideLabels = {
  "healthy-vs-toxic-communication": "Healthy vs. Toxic Communication",
  "toxic-or-rough-patch": "Is It Toxic or Just a Rough Patch?",
  "setting-boundaries": "Setting Boundaries With a Toxic Person",
  "recognizing-manipulation": "Recognizing Manipulation",
  "what-is-gaslighting": "What Is Gaslighting?",
  "going-no-contact": "When to Walk Away: Going No-Contact",
  "how-to-respond-to-toxic-messages": "How to Respond to a Toxic Message",
}

export default function Quiz() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = questions.every((q) => answers[q.id] !== undefined)
  const score = Object.values(answers).reduce((a, b) => a + b, 0)
  const fearHigh = answers["fear"] === 2

  const result = submitted ? bandFor(score, fearHigh) : null

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

        <header style={{ textAlign: "center", marginBottom: "24px" }}>
          <span style={{ fontSize: "44px" }}>🪞</span>
          <h1 style={{ fontSize: "30px", fontWeight: "800", marginTop: "8px", marginBottom: "12px", ...gradientText }}>
            Is My Relationship Toxic?
          </h1>
          <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.7", maxWidth: "520px", margin: "0 auto" }}>
            A short, private self-reflection — ten questions, nothing saved or sent. It can&apos;t
            diagnose a relationship, but it can help you notice patterns. Answer honestly for you.
          </p>
        </header>

        {!submitted && (
          <>
            <div className="flex flex-col gap-4">
              {questions.map((q, i) => (
                <div key={q.id} style={card}>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a2e", lineHeight: "1.6", marginBottom: "14px" }}>
                    {i + 1}. {q.text}
                  </p>
                  <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                    {options.map((opt) => {
                      const active = answers[q.id] === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                          style={{
                            flex: "1 1 30%",
                            minWidth: "90px",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: active ? "1px solid #c026d3" : "1px solid rgba(168,85,247,0.25)",
                            background: active ? "linear-gradient(90deg,#fae8ff,#fce7f3)" : "#faf5ff",
                            color: active ? "#86198f" : "#6b7280",
                          }}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "16px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: 700,
                border: "none",
                cursor: allAnswered ? "pointer" : "not-allowed",
                color: "white",
                opacity: allAnswered ? 1 : 0.5,
                background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
              }}
            >
              {allAnswered ? "See what your answers suggest" : "Answer all ten to continue"}
            </button>
          </>
        )}

        {submitted && result && (
          <div style={card}>
            <div style={{ textAlign: "center", marginBottom: "8px", fontSize: "40px" }}>{result.emoji}</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, textAlign: "center", marginBottom: "16px", ...gradientText }}>
              {result.heading}
            </h2>
            {result.body.map((para, i) => (
              <p key={i} style={{ fontSize: "14px", lineHeight: "1.8", color: "#374151", marginBottom: "14px" }}>
                {para}
              </p>
            ))}

            {result.showSafety && <SafetyNote />}

            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>
                Guides that might help:
              </p>
              <div className="flex flex-col gap-2">
                {result.guides.map((slug) => (
                  <a
                    key={slug}
                    href={`/guides/${slug}`}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#7c3aed",
                      textDecoration: "none",
                      background: "#faf5ff",
                      border: "1px solid rgba(168,85,247,0.2)",
                    }}
                  >
                    {guideLabels[slug] || slug} →
                  </a>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(168,85,247,0.15)" }}>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>
                Have a specific message that's bothering you? Paste it into toxicornot.ai for a closer read.
              </p>
              <a
                href="/"
                style={{
                  display: "inline-block",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "white",
                  textDecoration: "none",
                  background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
                }}
              >
                Analyze a message →
              </a>
            </div>

            <button
              onClick={() => {
                setSubmitted(false)
                setAnswers({})
              }}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid rgba(168,85,247,0.25)",
                background: "white",
                color: "#7c3aed",
              }}
            >
              Start over
            </button>
          </div>
        )}

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "32px" }}>
          toxicornot.ai · powered by AI · not a substitute for professional advice
          {" · "}
          <a href="/guides" style={{ color: "#9ca3af", textDecoration: "underline" }}>Guides</a>
          {" · "}
          <a href="/resources" style={{ color: "#9ca3af", textDecoration: "underline" }}>Help &amp; Resources</a>
        </p>
      </div>
    </main>
  )
}
