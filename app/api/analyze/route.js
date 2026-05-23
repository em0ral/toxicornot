import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request) {
  try {
    const { message, relationshipType, roastMode } = await request.json()

    if (!message || message.trim().length === 0) {
      return Response.json({ error: "No message provided" }, { status: 400 })
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a red flag detector analyzing a ${relationshipType || "personal"} message.

${roastMode ? `You are in ROAST MODE. Be snarky, witty, and darkly funny in your summary and roast fields.` : "Be direct and empathetic."}

Return ONLY a valid JSON object with this exact structure, no markdown, no extra text:
{
  "verdict": "TOXIC" or "NOT TOXIC",
  "score": number from 0 to 100,
  "confidence": number from 0 to 100 representing how confident you are in this verdict,
  "flags": [
    {
      "label": "short flag name e.g. gaslighting",
      "severity": "low", "medium", or "high",
      "explanation": "one sentence explaining what this flag means and why it applies here"
    }
  ],
  "greenFlags": [
    {
      "label": "short positive label e.g. clear communication",
      "explanation": "one sentence explaining why this is healthy"
    }
  ],
  "highlights": [
    {
      "quote": "exact short phrase from the message that is problematic (max 6 words)",
      "reason": "one sentence why this is a red flag"
    }
  ],
  "summary": "1-2 sentence plain English explanation",
  "roast": "${roastMode ? "1-2 sentence snarky roast" : ""}",
  "tips": ["3 short actionable tips for how to respond or protect yourself"],
  "glossary": {
    "flagName": "plain English definition of what this behavior pattern means"
  }
}

Message to analyze:
"${message}"`,
        },
      ],
    })

    const raw = response.content[0].text
    const cleaned = raw.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    return Response.json(parsed)

  } catch (error) {
    console.error("API error:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}