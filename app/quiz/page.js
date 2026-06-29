import Quiz from "./quiz"

export const metadata = {
  title: "Is My Relationship Toxic? A Free Self-Reflection Quiz — toxicornot.ai",
  description:
    "A short, private self-reflection quiz to help you notice patterns in your relationship. Not a diagnosis — a starting point, with resources if you need them.",
  alternates: {
    canonical: "https://toxicornot.ai/quiz",
  },
}

export default function QuizPage() {
  return <Quiz />
}
