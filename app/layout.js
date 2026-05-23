import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata = {
  title: "toxicornot.ai — AI Toxic Message Detector",
  description: "Paste any message, text, DM, or email and our AI will detect toxic behavior, gaslighting, manipulation, love bombing and more. Free red flag detector.",
  keywords: "toxic message detector, gaslighting checker, red flag detector, is my partner toxic, toxic relationship, manipulation detector",
  metadataBase: new URL("https://toxicornot.ai"),
  openGraph: {
    title: "toxicornot.ai — AI Toxic Message Detector",
    description: "Paste any message and AI will tell you if it's toxic. Detects gaslighting, manipulation, love bombing and more.",
    url: "https://toxicornot.ai",
    siteName: "toxicornot.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "toxicornot.ai — AI Toxic Message Detector",
    description: "Paste any message and AI will tell you if it's toxic. Free red flag detector.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://toxicornot.ai",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚩</text></svg>" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9386292756596352"
          crossOrigin="anonymous"
        />
      </head>
      <body className={geist.className} style={{ overscrollBehavior: "none" }}>{children}</body>
    </html>
  )
}