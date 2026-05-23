"use client"

import { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"

const EXAMPLES = [
  { label: "Gaslighting", text: "You're so sensitive. I never said that. You always twist my words and make everything about you." },
  { label: "Love bombing", text: "I've never felt this way about anyone. You're my soulmate. I want to spend every second with you forever." },
  { label: "Healthy", text: "Hey, I've been feeling a bit overwhelmed lately. Can we talk about how we divide chores at home?" },
]

const RELATIONSHIP_TYPES = [
  { key: "romantic", label: "💕 Romantic" },
  { key: "friend", label: "👥 Friend" },
  { key: "work", label: "💼 Work" },
  { key: "family", label: "👨‍👩‍👧 Family" },
  { key: "dm", label: "💬 DM" },
  { key: "email", label: "📧 Email" },
]

const EMOJI_REACTIONS = ["😱", "🤢", "😤", "💀", "🙄"]

const LOADING_STEPS = [
  "Reading message...",
  "Detecting patterns...",
  "Analyzing behavior...",
  "Generating report...",
]

function Confetti({ active }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const items = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#a855f7", "#ec4899", "#34d399", "#facc15", "#60a5fa"][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
      duration: Math.random() * 1.5 + 1,
      delay: Math.random() * 0.5,
    }))
    setParticles(items)
    setTimeout(() => setParticles([]), 3000)
  }, [active])

  if (!particles.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: "-10px",
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          animation: `fall ${p.duration}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function ToxicityGauge({ score, animate, darkMode }) {
  const half = Math.PI * 72
  const offset = half - (score / 100) * half
  const color = score >= 70 ? "#f472b6" : score >= 40 ? "#d97706" : "#059669"
  const label = score >= 70 ? "High Risk" : score >= 40 ? "Moderate" : "Low Risk"
  const textColor = darkMode ? "white" : "#1a1a2e"

  return (
    <div className="flex flex-col items-center my-4">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"} strokeWidth="10" strokeLinecap="round" />
        <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${half} ${half}`}
          strokeDashoffset={animate ? offset : half}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1), stroke 0.5s" }}
        />
        <text x="100" y="95" textAnchor="middle" fill={textColor} fontSize="32" fontWeight="bold" fontFamily="inherit">
          {animate ? score : 0}
        </text>
        <text x="100" y="112" textAnchor="middle" fill={color} fontSize="11" fontFamily="inherit">{label}</text>
      </svg>
    </div>
  )
}

function ConfidenceBadge({ confidence, darkMode }) {
  const color = confidence >= 80 ? "#059669" : confidence >= 60 ? "#d97706" : "#e11d48"
  const label = confidence >= 80 ? "High confidence" : confidence >= 60 ? "Moderate confidence" : "Low confidence"
  const textColor = darkMode ? "rgba(255,255,255,0.6)" : "#4b5563"
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-xs" style={{ color: textColor }}>{label} · {confidence}%</span>
    </div>
  )
}

function ShareModal({ result, onClose }) {
  const cardRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  const scoreColor = result.score >= 70 ? "#e11d48" : result.score >= 40 ? "#d97706" : "#059669"
  const flags = result.flags?.map(f => typeof f === "string" ? f : f.label) || []

  async function download() {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement("a")
      link.download = "toxicornot-result.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (err) {
      console.error("Download error:", err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}>
      <div className="w-full max-w-sm flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <div ref={cardRef} style={{
          width: "100%",
          background: "linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #1e1235 100%)",
          borderRadius: "20px",
          padding: "32px",
          fontFamily: "system-ui, sans-serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontSize: "24px" }}>🚩</span>
            <span style={{ fontSize: "18px", fontWeight: "700", background: "linear-gradient(90deg, #e879f9, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              toxicornot.ai
            </span>
          </div>
          <div style={{ fontSize: "36px", fontWeight: "800", color: result.verdict === "TOXIC" ? "#f472b6" : "#34d399", marginBottom: "8px" }}>
            {result.verdict === "TOXIC" ? "🚩 TOXIC" : "✅ NOT TOXIC"}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "rgba(216,180,254,0.6)" }}>Toxicity score</span>
              <span style={{ fontSize: "12px", color: "rgba(216,180,254,0.6)" }}>{result.score}/100</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "99px", height: "8px" }}>
              <div style={{ background: scoreColor, borderRadius: "99px", height: "8px", width: `${result.score}%` }} />
            </div>
          </div>
          {flags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
              {flags.slice(0, 4).map((flag, i) => (
                <span key={i} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "99px", background: "rgba(236,72,153,0.2)", border: "1px solid rgba(236,72,153,0.4)", color: "#f9a8d4" }}>
                  🚩 {flag}
                </span>
              ))}
            </div>
          )}
          <p style={{ fontSize: "13px", color: "rgba(216,180,254,0.85)", lineHeight: "1.6", marginBottom: "24px" }}>
            {result.summary}
          </p>
          <div style={{ borderTop: "1px solid rgba(168,85,247,0.2)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "rgba(168,85,247,0.5)" }}>toxicornot.ai</span>
            <span style={{ fontSize: "11px", color: "rgba(168,85,247,0.5)" }}>powered by AI</span>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button onClick={download} disabled={downloading}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
            style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)", color: "white" }}>
            {downloading ? "Saving..." : "⬇️ Download Image"}
          </button>
          <button onClick={onClose}
            className="py-3 px-4 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
            Close
          </button>
        </div>
        <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
          Tap outside to close · Screenshot or download to share
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [message, setMessage] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState("analyze")
  const [relationshipType, setRelationshipType] = useState("romantic")
  const [roastMode, setRoastMode] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [reaction, setReaction] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [messageB, setMessageB] = useState("")
  const [resultB, setResultB] = useState(null)
  const [responses, setResponses] = useState(null)
  const [loadingResponses, setLoadingResponses] = useState(false)
  const [copiedResponse, setCopiedResponse] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const inputCardRef = useRef(null)
  const [inputHeight, setInputHeight] = useState(null)

  useEffect(() => {
    if (inputCardRef.current) {
      setInputHeight(inputCardRef.current.offsetHeight)
    }
  }, [message, messageB, compareMode, roastMode])

  async function analyzeMessage(msg) {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, relationshipType, roastMode }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data
  }

  async function analyze() {
    if (!message.trim()) return
    setLoading(true)
    setResult(null)
    setResultB(null)
    setRevealed(false)
    setReaction(null)
    setError(null)
    setShowConfetti(false)
    setResponses(null)
    setShowShareModal(false)
    setLoadingStep(0)

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => prev < LOADING_STEPS.length - 1 ? prev + 1 : prev)
    }, 700)

    try {
      if (compareMode && messageB.trim()) {
        const [dataA, dataB] = await Promise.all([
          analyzeMessage(message),
          analyzeMessage(messageB),
        ])
        setResult(dataA)
        setResultB(dataB)
      } else {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, relationshipType, roastMode }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        data.originalMessage = message
        setResult(data)
        if (data.verdict === "NOT TOXIC") setShowConfetti(true)
        setHistory(prev => [{
          message: message.slice(0, 60) + (message.length > 60 ? "..." : ""),
          result: data,
          type: relationshipType,
          time: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 10))
      }
      setTimeout(() => setRevealed(true), 100)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      clearInterval(stepInterval)
      setLoading(false)
    }
  }

  function copyResult() {
    if (!result) return
    const flags = result.flags?.map(f => typeof f === "string" ? f : f.label).join(", ") || "none"
    const text = `toxicornot.ai result\n\nVerdict: ${result.verdict}\nScore: ${result.score}/100\nFlags: ${flags}\n\n${result.summary}\n\ntoxicornot.ai`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function fetchResponses() {
    if (!result) return
    setLoadingResponses(true)
    setResponses(null)

    try {
      const flags = result.flags?.map(f => typeof f === "string" ? f : f.label) || []
      const res = await fetch("/api/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, relationshipType, flags }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResponses(data)
    } catch (err) {
      console.error("Response fetch error:", err)
    } finally {
      setLoadingResponses(false)
    }
  }

  function copyResponse(text, index) {
    navigator.clipboard.writeText(text)
    setCopiedResponse(index)
    setTimeout(() => setCopiedResponse(null), 2000)
  }

  function reset() {
    setResult(null)
    setResultB(null)
    setMessage("")
    setMessageB("")
    setResponses(null)
    setReaction(null)
    setGlossaryOpen(false)
    setShowShareModal(false)
  }

  const bg = darkMode
    ? "linear-gradient(135deg, #1a0533 0%, #2d1b4e 30%, #1e1235 60%, #2a0d3e 100%)"
    : "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #ede9fe 100%)"

  const cardStyle = darkMode
    ? { background: "#1e1040", border: "1px solid rgba(168,85,247,0.25)" }
    : { background: "#ffffff", border: "1px solid rgba(168,85,247,0.25)" }

  const textPrimary = darkMode ? "#f0e6ff" : "#1a1a2e"
  const textBody   = darkMode ? "#d4bfff" : "#374151"
  const textMuted  = darkMode ? "#a78bcc" : "#6b7280"
  const textFaint  = darkMode ? "#7c5fa8" : "#9ca3af"

  const gradientText = {
    background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
  const gradientBorder = { background: "linear-gradient(135deg, #a855f7, #ec4899)" }

  function ResultCard({ data, label }) {
    if (!data) return null
    const severityColor = { high: "#e11d48", medium: "#d97706", low: "#059669" }

    return (
      <div style={{ ...gradientBorder, borderRadius: "16px", padding: "1px" }}>
        <div style={{ ...cardStyle, borderRadius: "15px", padding: "24px" }}>
          {label && (
            <p className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: textFaint }}>{label}</p>
          )}
          <div className={`text-3xl font-bold mb-1 ${data.verdict === "TOXIC" ? "text-pink-500" : "text-emerald-600"}`}
            style={{ opacity: revealed ? 1 : 0, transform: revealed ? "scale(1)" : "scale(0.8)", transition: "opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s" }}>
            {data.verdict === "TOXIC" ? "🚩 TOXIC" : "✅ NOT TOXIC"}
          </div>
          {data.confidence !== undefined && <ConfidenceBadge confidence={data.confidence} darkMode={darkMode} />}
          <ToxicityGauge score={data.score} animate={revealed} darkMode={darkMode} />

          {data.flags && data.flags.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: textFaint }}>🚩 Red flags</p>
              <div className="flex flex-col gap-2">
                {data.flags.map((flag, i) => {
                  const flagLabel = typeof flag === "string" ? flag : flag.label
                  const severity = typeof flag === "object" ? flag.severity : "medium"
                  const explanation = typeof flag === "object" ? flag.explanation : null
                  return (
                    <div key={i} className="rounded-lg p-3"
                      style={{ background: darkMode ? "rgba(225,29,72,0.12)" : "#fff1f2", border: "1px solid rgba(225,29,72,0.2)" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: severityColor[severity] || "#e11d48" }} />
                        <span className="text-xs font-semibold" style={{ color: darkMode ? "#fda4af" : "#9f1239" }}>🚩 {flagLabel}</span>
                        <span className="text-xs ml-auto capitalize font-medium" style={{ color: severityColor[severity] || "#e11d48" }}>{severity}</span>
                      </div>
                      {explanation && <p className="text-xs pl-4" style={{ color: textBody }}>{explanation}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {data.greenFlags && data.greenFlags.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: textFaint }}>✅ Green flags</p>
              <div className="flex flex-col gap-2">
                {data.greenFlags.map((flag, i) => {
                  const flagLabel = typeof flag === "string" ? flag : flag.label
                  const explanation = typeof flag === "object" ? flag.explanation : null
                  return (
                    <div key={i} className="rounded-lg p-3"
                      style={{ background: darkMode ? "rgba(5,150,105,0.12)" : "#f0fdf4", border: "1px solid rgba(5,150,105,0.25)" }}>
                      <span className="text-xs font-semibold" style={{ color: darkMode ? "#6ee7b7" : "#065f46" }}>✅ {flagLabel}</span>
                      {explanation && <p className="text-xs mt-1" style={{ color: textBody }}>{explanation}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {data.highlights && data.highlights.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: textFaint }}>🔍 Problematic phrases</p>
              <div className="flex flex-col gap-2">
                {data.highlights.map((h, i) => (
                  <div key={i} className="rounded-lg p-3"
                    style={{ background: darkMode ? "rgba(124,58,237,0.12)" : "#faf5ff", border: "1px solid rgba(124,58,237,0.2)" }}>
                    <p className="text-xs font-mono mb-1 font-semibold" style={{ color: darkMode ? "#e879f9" : "#7e22ce" }}>"{h.quote}"</p>
                    <p className="text-xs" style={{ color: textBody }}>{h.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm leading-relaxed py-4"
            style={{ color: textBody, borderTop: "1px solid rgba(168,85,247,0.15)" }}>
            {data.summary}
          </p>

          {roastMode && data.roast && (
            <div className="rounded-xl p-4 mb-4"
              style={{ background: darkMode ? "rgba(219,39,119,0.12)" : "#fdf2f8", border: "1px solid rgba(219,39,119,0.25)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: darkMode ? "#f9a8d4" : "#9d174d" }}>🔥 Roast</p>
              <p className="text-sm" style={{ color: textBody }}>{data.roast}</p>
            </div>
          )}

          {data.tips && data.tips.length > 0 && (
            <div className="rounded-xl p-4 mb-4"
              style={{ background: darkMode ? "rgba(124,58,237,0.1)" : "#faf5ff", border: "1px solid rgba(124,58,237,0.2)" }}>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: textFaint }}>💡 What to do</p>
              {data.tips.map((tip, i) => (
                <p key={i} className="text-sm mb-2 last:mb-0" style={{ color: textBody }}>{i + 1}. {tip}</p>
              ))}
            </div>
          )}

          {data.glossary && Object.keys(data.glossary).length > 0 && (
            <div className="mb-4">
              <button onClick={() => setGlossaryOpen(!glossaryOpen)}
                className="text-xs flex items-center gap-1 mb-2 font-medium" style={{ color: textMuted }}>
                📖 {glossaryOpen ? "Hide" : "Show"} flag glossary
              </button>
              {glossaryOpen && (
                <div className="rounded-xl p-4"
                  style={{ background: darkMode ? "rgba(124,58,237,0.08)" : "#f5f3ff", border: "1px solid rgba(124,58,237,0.15)" }}>
                  {Object.entries(data.glossary).map(([term, def]) => (
                    <div key={term} className="mb-3 last:mb-0">
                      <p className="text-xs font-semibold capitalize mb-0.5" style={{ color: darkMode ? "#c084fc" : "#6d28d9" }}>{term}</p>
                      <p className="text-xs" style={{ color: textBody }}>{def}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!compareMode && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium" style={{ color: textMuted }}>React:</span>
              {EMOJI_REACTIONS.map((emoji) => (
                <button key={emoji} onClick={() => setReaction(emoji)}
                  className="text-lg transition-all"
                  style={{ transform: reaction === emoji ? "scale(1.4)" : "scale(1)", opacity: reaction && reaction !== emoji ? 0.35 : 1 }}>
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4" style={{ background: bg }}>
      <Confetti active={showConfetti} />
      {showShareModal && result && <ShareModal result={result} onClose={() => setShowShareModal(false)} />}

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #c084fc 0%, #f472b6 100%)" }} />

      {/* SEO Landing Section */}
      <section className="w-full max-w-4xl relative z-10 pt-12 pb-8 text-center">
        <div className="flex justify-end mb-4">
          <button onClick={() => setDarkMode(!darkMode)}
            className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
            style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", color: textMuted }}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
        <span className="text-5xl">🚩</span>
        <h1 className="text-5xl font-bold mt-3 mb-3" style={gradientText}>toxicornot.ai</h1>
        <p className="text-xl font-medium mb-3" style={{ color: textPrimary }}>
          AI-Powered Toxic Message Detector
        </p>
        <p className="text-base mb-6 max-w-2xl mx-auto" style={{ color: textBody }}>
          Paste any text, DM, email, or message and our AI instantly detects toxic behavior — gaslighting, manipulation, love bombing, emotional abuse, and more. Free to use, no signup required.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            "🧠 Gaslighting Detection",
            "💔 Love Bombing",
            "😤 Manipulation",
            "🛑 Emotional Abuse",
            "👥 Any Relationship Type",
            "⚡ Instant Results",
          ].map((pill) => (
            <span key={pill} className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: darkMode ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", color: darkMode ? "#d4bfff" : "#6d28d9" }}>
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* App */}
      <div className="w-full max-w-4xl relative z-10 pb-12">

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1 mb-4 w-full max-w-sm"
          style={{ background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(168,85,247,0.08)" }}>
          {[
            ["analyze", "Analyze"],
            ["history", `History${history.length > 0 ? ` (${history.length})` : ""}`],
            ["about", "About"]
          ].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === key ? "linear-gradient(90deg, #a855f7, #ec4899)" : "transparent",
                color: tab === key ? "white" : textMuted
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* ANALYZE TAB */}
        {tab === "analyze" && (
          <div className="flex flex-col gap-4">

            {/* Examples above both columns */}
            <div className="flex gap-2 flex-wrap">
              {EXAMPLES.map((ex) => (
                <button key={ex.label}
                  onClick={() => { setMessage(ex.text); setResult(null); setResponses(null) }}
                  className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                  style={{ background: darkMode ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: darkMode ? "#d4bfff" : "#6d28d9" }}>
                  Try: {ex.label}
                </button>
              ))}
            </div>

            {/* Two column layout on desktop */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">

              {/* Left column — input */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <div ref={inputCardRef} style={{ ...gradientBorder, borderRadius: "16px", padding: "1px", flex: 1 }}>
                  <div style={{ ...cardStyle, borderRadius: "15px", padding: "24px", height: "100%" }}>

                    <div className="flex items-center justify-between mb-4 pb-4"
                      style={{ borderBottom: "1px solid rgba(168,85,247,0.12)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: textPrimary }}>⚖️ Compare Mode</p>
                        <p className="text-xs mt-0.5" style={{ color: textMuted }}>Compare two messages side by side</p>
                      </div>
                      <button onClick={() => setCompareMode(!compareMode)}
                        className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
                        style={{ background: compareMode ? "linear-gradient(90deg, #a855f7, #ec4899)" : (darkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb") }}>
                        <span className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow"
                          style={{ left: compareMode ? "28px" : "4px" }} />
                      </button>
                    </div>

                    <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: textFaint }}>Message type</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {RELATIONSHIP_TYPES.map((r) => (
                        <button key={r.key} onClick={() => setRelationshipType(r.key)}
                          className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                          style={{
                            background: relationshipType === r.key ? "linear-gradient(90deg, #a855f7, #ec4899)" : (darkMode ? "rgba(168,85,247,0.1)" : "#f5f3ff"),
                            border: relationshipType === r.key ? "none" : "1px solid rgba(168,85,247,0.2)",
                            color: relationshipType === r.key ? "white" : (darkMode ? "#d4bfff" : "#6d28d9")
                          }}>
                          {r.label}
                        </button>
                      ))}
                    </div>

                    <textarea
                      className="w-full rounded-xl p-4 resize-none focus:outline-none transition-colors"
                      style={{
                        background: darkMode ? "rgba(255,255,255,0.04)" : "#faf5ff",
                        border: "1px solid rgba(168,85,247,0.25)",
                        color: textPrimary,
                        lineHeight: "1.6",
                        fontSize: "16px",
                        WebkitAppearance: "none",
                      }}
                      rows={compareMode ? 4 : 8}
                      placeholder={compareMode ? "Paste message A here..." : "Paste a text, DM, email, or message here..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onInput={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex justify-end mt-1 mb-3">
                      <span className="text-xs" style={{ color: textFaint }}>{message.length} characters</span>
                    </div>

                    {compareMode && (
                      <>
                        <textarea
                          className="w-full rounded-xl p-4 resize-none focus:outline-none transition-colors mt-2"
                          style={{
                            background: darkMode ? "rgba(255,255,255,0.04)" : "#faf5ff",
                            border: "1px solid rgba(168,85,247,0.25)",
                            color: textPrimary,
                            lineHeight: "1.6",
                            fontSize: "16px",
                            WebkitAppearance: "none",
                          }}
                          rows={4}
                          placeholder="Paste message B here..."
                          value={messageB}
                          onChange={(e) => setMessageB(e.target.value)}
                          onInput={(e) => setMessageB(e.target.value)}
                        />
                        <div className="flex justify-end mt-1 mb-3">
                          <span className="text-xs" style={{ color: textFaint }}>{messageB.length} characters</span>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between mb-4 pt-2"
                      style={{ borderTop: "1px solid rgba(168,85,247,0.12)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: textPrimary }}>🔥 Roast Mode</p>
                        <p className="text-xs mt-0.5" style={{ color: textMuted }}>Snarky, funny commentary</p>
                      </div>
                      <button onClick={() => setRoastMode(!roastMode)}
                        className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
                        style={{ background: roastMode ? "linear-gradient(90deg, #a855f7, #ec4899)" : (darkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb") }}>
                        <span className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow"
                          style={{ left: roastMode ? "28px" : "4px" }} />
                      </button>
                    </div>

                    <button onClick={analyze} disabled={loading || !message.trim()}
                      className="w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)", color: "white", fontSize: "15px" }}>
                      {loading ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                          {LOADING_STEPS[loadingStep]}
                        </>
                      ) : compareMode ? "Compare →" : "Analyze →"}
                    </button>

                    {error && <p className="mt-4 text-red-500 text-sm text-center font-medium">{error}</p>}

                    <p className="mt-3 text-xs text-center" style={{ color: textFaint }}>
                      Results are AI-generated and may not be accurate. Use your own judgment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column — results */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">

                {/* Placeholder / Loading — matches input card height */}
                {!result && (
                  <div className="hidden lg:flex flex-col items-center justify-center rounded-2xl"
                    style={{
                      ...cardStyle,
                      borderRadius: "16px",
                      minHeight: inputHeight ? `${inputHeight}px` : "500px",
                      border: "1px solid rgba(168,85,247,0.25)",
                    }}>
                    {loading ? (
                      <>
                        <span className="animate-spin h-10 w-10 border-4 border-purple-400 border-t-transparent rounded-full mb-4 inline-block" />
                        <p className="text-base font-medium mb-2" style={{ color: textPrimary }}>{LOADING_STEPS[loadingStep]}</p>
                        <p className="text-sm" style={{ color: textMuted }}>Hang tight...</p>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl mb-4">🔍</span>
                        <p className="text-base font-medium mb-2" style={{ color: textPrimary }}>Your results will appear here</p>
                        <p className="text-sm" style={{ color: textMuted }}>Paste a message on the left and click Analyze</p>
                      </>
                    )}
                  </div>
                )}

                {result && !compareMode && (
                  <div style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
                    <ResultCard data={result} />

                    <div className="flex gap-2 mt-3">
                      <button onClick={copyResult}
                        className="flex-1 font-semibold rounded-xl transition-all"
                        style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)", color: "white", padding: "10px 12px", fontSize: "13px" }}>
                        {copied ? "✓ Copied!" : "Copy Result"}
                      </button>
                      <button onClick={() => setShowShareModal(true)}
                        className="rounded-xl transition-all font-medium"
                        style={{ background: darkMode ? "rgba(168,85,247,0.2)" : "#f5f3ff", border: "1px solid rgba(168,85,247,0.3)", color: darkMode ? "#d4bfff" : "#6d28d9", padding: "10px 12px", fontSize: "12px" }}>
                        📸 Share
                      </button>
                      <button onClick={reset}
                        className="rounded-xl transition-all font-medium"
                        style={{ border: "1px solid rgba(168,85,247,0.3)", color: textMuted, background: "transparent", padding: "10px 12px", fontSize: "12px" }}>
                        🔄 Reset
                      </button>
                    </div>

                    {result?.verdict === "TOXIC" && (
                      <div className="mt-3">
                        {!responses && (
                          <button onClick={fetchResponses} disabled={loadingResponses}
                            className="w-full text-sm py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                            style={{ background: darkMode ? "rgba(168,85,247,0.15)" : "#faf5ff", border: "1px solid rgba(168,85,247,0.3)", color: darkMode ? "#d4bfff" : "#6d28d9" }}>
                            {loadingResponses ? (
                              <>
                                <span className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full inline-block" />
                                Generating responses...
                              </>
                            ) : "🤖 How should I respond?"}
                          </button>
                        )}

                        {responses && (
                          <div style={{ ...gradientBorder, borderRadius: "16px", padding: "1px" }}>
                            <div style={{ ...cardStyle, borderRadius: "15px", padding: "24px" }}>
                              <p className="text-sm font-semibold mb-1" style={{ color: textPrimary }}>🤖 Suggested Responses</p>
                              {responses.advice && (
                                <p className="text-xs mb-4 pb-3" style={{ color: textBody, borderBottom: "1px solid rgba(168,85,247,0.15)" }}>
                                  💡 {responses.advice}
                                </p>
                              )}
                              <div className="flex flex-col gap-3">
                                {responses.responses?.map((r, i) => (
                                  <div key={i} className="rounded-xl p-4"
                                    style={{ background: darkMode ? "rgba(168,85,247,0.08)" : "#faf5ff", border: "1px solid rgba(168,85,247,0.2)" }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-semibold" style={{ color: darkMode ? "#c084fc" : "#6d28d9" }}>
                                        {r.emoji} {r.label}
                                      </span>
                                      <button onClick={() => copyResponse(r.text, i)}
                                        className="text-xs px-2 py-1 rounded-lg transition-all font-medium"
                                        style={{ background: "rgba(168,85,247,0.15)", color: textMuted }}>
                                        {copiedResponse === i ? "✓ Copied!" : "Copy"}
                                      </button>
                                    </div>
                                    <p className="text-sm" style={{ color: textBody }}>{r.text}</p>
                                  </div>
                                ))}
                              </div>
                              <button onClick={() => setResponses(null)}
                                className="mt-4 w-full text-xs py-2 rounded-xl transition-all font-medium"
                                style={{ border: "1px solid rgba(168,85,247,0.2)", color: textMuted, background: "transparent" }}>
                                Hide responses
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {compareMode && result && resultB && (
                  <div style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.5s ease" }}>
                    <div className="flex flex-col gap-3">
                      <ResultCard data={result} label="Message A" />
                      <ResultCard data={resultB} label="Message B" />
                    </div>
                    <div className="mt-3 rounded-2xl p-4" style={cardStyle}>
                      <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: textFaint }}>⚖️ Verdict</p>
                      <p className="text-sm font-medium" style={{ color: textBody }}>
                        {result.score > resultB.score
                          ? `Message A is more toxic by ${result.score - resultB.score} points.`
                          : result.score < resultB.score
                          ? `Message B is more toxic by ${resultB.score - result.score} points.`
                          : "Both messages scored equally."}
                      </p>
                    </div>
                    <button onClick={reset}
                      className="mt-3 w-full text-sm py-2.5 rounded-xl transition-all font-medium"
                      style={{ border: "1px solid rgba(168,85,247,0.3)", color: textMuted, background: "transparent" }}>
                      🔄 Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === "history" && (
          <div className="flex flex-col gap-3">
            {history.length === 0 ? (
              <div className="text-center py-16" style={{ color: textMuted }}>
                <p className="text-4xl mb-3">🕐</p>
                <p className="text-sm">No analyses yet this session.</p>
              </div>
            ) : history.map((item, i) => (
              <div key={i} className="rounded-2xl p-4" style={cardStyle}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${item.result.verdict === "TOXIC" ? "text-pink-500" : "text-emerald-600"}`}>
                    {item.result.verdict === "TOXIC" ? "🚩 TOXIC" : "✅ NOT TOXIC"} · {item.result.score}/100
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: darkMode ? "rgba(168,85,247,0.15)" : "#f5f3ff", color: darkMode ? "#d4bfff" : "#6d28d9" }}>
                      {item.type}
                    </span>
                    <span className="text-xs" style={{ color: textFaint }}>{item.time}</span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: textBody }}>{item.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === "about" && (
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h2 className="text-xl font-bold mb-4" style={gradientText}>What is toxicornot.ai?</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: textBody }}>
              toxicornot.ai uses AI to analyze messages, texts, DMs, and emails for toxic, manipulative, or unhealthy behavior patterns — across romantic, work, family, and friend relationships.
            </p>
            <h3 className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: textFaint }}>What we detect</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Gaslighting", "Manipulation", "Guilt tripping", "Love bombing", "Passive aggression", "Narcissistic behavior", "Emotional abuse", "Coercive control"].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: darkMode ? "rgba(168,85,247,0.15)" : "#f5f3ff", border: "1px solid rgba(168,85,247,0.25)", color: darkMode ? "#d4bfff" : "#6d28d9" }}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs leading-relaxed pt-4" style={{ color: textMuted, borderTop: "1px solid rgba(168,85,247,0.15)" }}>
              ⚠️ toxicornot.ai is not a substitute for professional mental health advice. Results are AI-generated and may not be accurate. If you are in an abusive situation, please reach out to a qualified professional or helpline.
            </p>
          </div>
        )}

        {/* SEO Footer Content */}
        <section className="rounded-2xl p-6 mt-6" style={cardStyle}>
          <h2 className="text-base font-bold mb-3" style={gradientText}>How does the toxic message detector work?</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: textBody }}>
            toxicornot.ai uses advanced AI to analyze the language patterns, tone, and intent behind any message. Simply paste the text and our AI scans for over 20 known toxic behavior patterns including gaslighting, manipulation, love bombing, guilt tripping, passive aggression, coercive control, and emotional abuse.
          </p>
          <h2 className="text-base font-bold mb-3" style={gradientText}>Who is this for?</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: textBody }}>
            Anyone who has received a message that felt off but couldn't explain why. Whether it's a text from a romantic partner, a DM from a friend, an email from a coworker, or a message from a family member — toxicornot.ai helps you see the patterns clearly.
          </p>
          <h2 className="text-base font-bold mb-3" style={gradientText}>Is it free?</h2>
          <p className="text-sm leading-relaxed" style={{ color: textBody }}>
            Yes — toxicornot.ai is completely free to use with no account required. Just paste your message and get instant AI-powered analysis.
          </p>
        </section>

        <p className="mt-6 text-xs text-center" style={{ color: textFaint }}>
          toxicornot.ai · powered by AI · not a substitute for professional advice
          {" · "}
          <a href="/privacy" style={{ color: textFaint, textDecoration: "underline" }}>Privacy Policy</a>
        </p>
      </div>
    </main>
  )
}