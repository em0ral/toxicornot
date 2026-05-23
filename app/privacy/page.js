export const metadata = {
  title: "Privacy Policy — toxicornot.ai",
  description: "Privacy policy for toxicornot.ai",
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen px-4 py-12" style={{
      background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #ede9fe 100%)"
    }}>
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <a href="/" style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
            ← Back to toxicornot.ai
          </a>
        </div>

        <div style={{ background: "white", borderRadius: "16px", padding: "40px", border: "1px solid rgba(168,85,247,0.2)" }}>

          <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px", background: "linear-gradient(90deg, #c026d3, #db2777, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "32px" }}>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div style={{ color: "#374151", fontSize: "14px", lineHeight: "1.8" }}>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Overview</h2>
            <p style={{ marginBottom: "16px" }}>
              toxicornot.ai ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our website at toxicornot.ai.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Information We Do Not Collect</h2>
            <p style={{ marginBottom: "16px" }}>
              We do not require you to create an account. We do not collect your name, email address, or any other personally identifiable information to use toxicornot.ai.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Messages You Submit</h2>
            <p style={{ marginBottom: "16px" }}>
              When you paste a message into toxicornot.ai for analysis, that message is sent to our AI service for processing. We do not permanently store the content of messages you submit. Messages are processed in real time and are not retained after analysis is complete.
            </p>
            <p style={{ marginBottom: "16px" }}>
              Please do not submit messages containing sensitive personal information such as passwords, financial details, or government ID numbers.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Automatically Collected Information</h2>
            <p style={{ marginBottom: "16px" }}>
              Like most websites, our servers may automatically collect certain technical information when you visit, including your IP address, browser type, operating system, referring URLs, and pages visited. This information is used solely for operating and improving the service.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Cookies and Advertising</h2>
            <p style={{ marginBottom: "16px" }}>
              toxicornot.ai displays advertisements served by Google AdSense. Google may use cookies to serve ads based on your prior visits to our site or other sites on the internet. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" style={{ color: "#7c3aed" }}>Google's Ads Settings</a>.
            </p>
            <p style={{ marginBottom: "16px" }}>
              We also use essential cookies to maintain basic site functionality. We do not use cookies to track you across other websites.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Third Party Services</h2>
            <p style={{ marginBottom: "16px" }}>
              We use the following third party services to operate toxicornot.ai:
            </p>
            <ul style={{ marginBottom: "16px", paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Anthropic</strong> — AI processing of submitted messages. Subject to Anthropic's privacy policy.</li>
              <li style={{ marginBottom: "8px" }}><strong>Vercel</strong> — Website hosting and infrastructure. Subject to Vercel's privacy policy.</li>
              <li style={{ marginBottom: "8px" }}><strong>Google AdSense</strong> — Advertising. Subject to Google's privacy policy.</li>
            </ul>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Children's Privacy</h2>
            <p style={{ marginBottom: "16px" }}>
              toxicornot.ai is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Changes to This Policy</h2>
            <p style={{ marginBottom: "16px" }}>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of toxicornot.ai after changes constitutes acceptance of the updated policy.
            </p>

            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", marginTop: "28px" }}>Contact</h2>
            <p style={{ marginBottom: "16px" }}>
              If you have questions about this Privacy Policy, you can reach us at: <strong>privacy@toxicornot.ai</strong>
            </p>

            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(168,85,247,0.15)", color: "#9ca3af", fontSize: "12px" }}>
              toxicornot.ai · powered by AI · not a substitute for professional advice
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}