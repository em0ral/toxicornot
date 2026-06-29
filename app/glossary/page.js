export const metadata = {
  title: "Glossary of Toxic & Manipulative Behavior Terms — toxicornot.ai",
  description:
    "Plain-English definitions of gaslighting, DARVO, breadcrumbing, grey rock, love bombing, and other terms for toxic and manipulative behavior.",
  alternates: {
    canonical: "https://toxicornot.ai/glossary",
  },
}

// term, definition, slug of the guide that covers it in depth
const terms = [
  ["Boundary", "A limit you set for yourself and are willing to enforce — about what you will do, not what someone else must do.", "setting-boundaries"],
  ["Breadcrumbing", "Dropping just enough attention — an occasional text, like, or compliment — to keep someone hooked without ever committing.", "breadcrumbing-future-faking"],
  ["BIFF", "A reply style for hostile messages: Brief, Informative, Friendly, Firm. Common in high-conflict co-parenting.", "co-parenting-toxic-ex"],
  ["Catfishing", "Using a fake identity online to start a relationship — often paired with a refusal to video chat or meet in person.", "online-dating-red-flags"],
  ["Contempt", "Sarcasm, mockery, name-calling, or eye-rolling that treats a partner as beneath you. The single strongest predictor that a relationship is in trouble.", "healthy-vs-toxic-communication"],
  ["DARVO", "Deny, Attack, and Reverse Victim and Offender — a tactic where someone confronted about harm flips the script to become the apparent victim.", "breadcrumbing-future-faking"],
  ["Devaluation", "The stage after idealization where affection turns to criticism, coldness, or contempt, leaving you trying to earn back the early warmth.", "love-bombing-signs"],
  ["Enmeshment", "A family dynamic with no healthy separation, where independence is treated as betrayal and guilt keeps everyone bound together.", "toxic-family-members"],
  ["Flooding", "Becoming so physiologically overwhelmed during conflict that you can't think clearly — a real reason to pause, distinct from punishing silence.", "stonewalling-silent-treatment"],
  ["Four Horsemen", "Criticism, contempt, defensiveness, and stonewalling — four communication patterns that reliably predict relationship breakdown.", "healthy-vs-toxic-communication"],
  ["Frenemy", "A friend who behaves like a rival — supportive to your face, competitive or cutting underneath.", "toxic-friendships"],
  ["Future faking", "Promising a shared future — commitment, change, plans — with no real intention of following through, used to keep you invested now.", "breadcrumbing-future-faking"],
  ["Gaslighting", "Manipulation that makes you doubt your own memory, perception, or sanity, until you stop trusting your version of events.", "what-is-gaslighting"],
  ["Golden child / scapegoat", "A family split where one child can do no wrong and another is blamed for everything — two roles that keep a toxic system running.", "toxic-family-members"],
  ["Grey rock", "Becoming deliberately boring and unreactive so a manipulative person loses interest, used when contact can't be avoided.", "going-no-contact"],
  ["Guilt-tripping", "Making you feel responsible for someone else's feelings or choices so you'll do what they want.", "recognizing-manipulation"],
  ["Hoovering", "Sucking someone back in after distance or a breakup — with sudden apologies, charm, or promises — named after the vacuum.", "going-no-contact"],
  ["Idealize–devalue–discard", "A three-stage cycle: intense early adoration, then growing criticism, then withdrawal or rejection — often repeating.", "love-bombing-signs"],
  ["Intermittent reinforcement", "Unpredictable rewards — warmth one day, coldness the next — which, like a slot machine, create a powerful pull to keep trying.", "breadcrumbing-future-faking"],
  ["JADE", "Justify, Argue, Defend, Explain — the over-explaining trap that gives a manipulator more to push against. The antidote is a short, calm answer.", "how-to-respond-to-toxic-messages"],
  ["Love bombing", "Overwhelming early affection, attention, and grand gestures used — knowingly or not — to gain influence fast.", "love-bombing-signs"],
  ["Manipulation", "Influencing someone through indirect, deceptive, or unfair tactics instead of honest, direct communication.", "recognizing-manipulation"],
  ["Negging", "A backhanded compliment or subtle put-down designed to lower your confidence so you seek the other person's approval.", "recognizing-manipulation"],
  ["No contact / low contact", "Ending communication entirely (no contact) or cutting it to the bare essentials (low contact) to protect yourself.", "going-no-contact"],
  ["Repair attempt", "Any gesture — an apology, a joke, reaching back out — that de-escalates conflict and reconnects. Healthy couples make and accept them.", "healthy-vs-toxic-communication"],
  ["Romance scam", "A fake online romance built to extract money, typically escalating from love bombing to an urgent financial ask.", "online-dating-red-flags"],
  ["Silent treatment", "Withdrawal and refusal to communicate used as punishment, to make you anxious and quick to apologize.", "stonewalling-silent-treatment"],
  ["Soft start-up", "Raising a hard topic gently — naming the situation, your feeling, and your need — instead of opening with blame.", "healthy-vs-toxic-communication"],
  ["Stonewalling", "Shutting down and refusing to engage during conflict — going silent or walking out.", "stonewalling-silent-treatment"],
  ["Triangulation", "Pulling a third person into a conflict to pressure, compare, or isolate you.", "recognizing-manipulation"],
  ["Yellow rock", "A warmer version of grey rock — polite and civil rather than blank — used when a court or children are watching the exchanges.", "co-parenting-toxic-ex"],
]

export default function Glossary() {
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
          <span style={{ fontSize: "44px" }}>📖</span>
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
            Glossary
          </h1>
          <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.7", maxWidth: "520px", margin: "0 auto" }}>
            Plain-English definitions of the terms for toxic and manipulative behavior — each one links
            to a full guide if you want to go deeper.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {terms.map(([term, def, slug]) => (
            <div
              key={term}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "20px 24px",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>
                {term}
              </h2>
              <p style={{ color: "#374151", fontSize: "14px", lineHeight: "1.7", marginBottom: "8px" }}>
                {def}
              </p>
              <a
                href={`/guides/${slug}`}
                style={{ color: "#7c3aed", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}
              >
                Read the guide →
              </a>
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
          <a href="/quiz" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            Quiz
          </a>
          {" · "}
          <a href="/faq" style={{ color: "#9ca3af", textDecoration: "underline" }}>
            FAQ
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
