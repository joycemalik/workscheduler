import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NIMBUS_API_KEY || "",
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that can help with tasks, scheduling, and general questions. Be concise and friendly in your responses.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    })

    return NextResponse.json({
      response: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    )
  }
} 