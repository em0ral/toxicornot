import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request) {
  try {
    const { message, relationshipType, flags } = await request.json()

    if (!message || message.trim().length === 0) {
      return Response.json({ error: "No message provided" }, { status: 400 })
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an expert communication coach. Someone received this toxic ${relationshipType || "personal"} message and needs help responding.

Detected red flags: ${flags?.join(", ") || "toxic behavior"}

The message they received:
"${message}"

Return ONLY a valid JSON object with no markdown:
{
  "responses": [
    {
      "type": "boundary",
      "label": "Set a boundary",
      "emoji": "🛑",
      "text": "a firm but calm response that sets a clear boundary"
    },
    {
      "type": "deescalate",
      "label": "De-escalate",
      "emoji": "🕊️",
      "text": "a calm response that reduces tension without accepting bad behavior"
    },
    {
      "type": "exit",
      "label": "Exit the conversation",
      "emoji": "🚪",
      "text": "a short response that ends the conversation respectfully"
    }
  ],
  "advice": "one sentence of coaching advice for handling this situation"
}`,
        },
      ],
    })

    const raw = response.content[0].text
    const cleaned = raw.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    return Response.json(parsed)

  } catch (error) {
    console.error("Respond API error:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}