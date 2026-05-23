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
  "confidence": number from 0 to 100,
  "flags": [
    {
      "label": "short flag name",
      "severity": "low", "medium", or "high",
      "explanation": "one sentence explaining why this applies"
    }
  ],
  "greenFlags": [
    {
      "label": "short positive label",
      "explanation": "one sentence explaining why this is healthy"
    }
  ],
  "highlights": [
    {
      "quote": "exact short phrase from message (max 6 words)",
      "reason": "one sentence why this is a red flag"
    }
  ],
  "summary": "1-2 sentence plain English explanation",
  "roast": "${roastMode ? "1-2 sentence snarky roast" : ""}",
  "tips": ["3 short actionable tips"],
  "glossary": {
    "flagName": "plain English definition"
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