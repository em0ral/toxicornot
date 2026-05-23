import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata = {
  title: "toxicornot.ai",
  description: "Paste a message. We'll tell you if it's toxic.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  )
}