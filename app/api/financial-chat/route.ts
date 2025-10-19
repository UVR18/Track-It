import { generateText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `You are TrackIt AI, a friendly financial assistant. You provide personalized financial advice based on the user's spending patterns and financial goals. Be concise, helpful, and encouraging. Focus on practical tips for saving money, budgeting, and achieving financial goals. Always be supportive and non-judgmental about spending habits.

Current user financial data:
- Total Balance: JMD 45,230.50
- Monthly Expenses: JMD 18,450
- Budget Remaining: JMD 6,550
- Savings Goal: JMD 12,340
- Top spending categories: Food & Dining (JMD 6,950), Utilities (JMD 8,900), Transportation (JMD 3,200)

Provide advice that is specific to their situation when possible.`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("Error in financial chat:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
