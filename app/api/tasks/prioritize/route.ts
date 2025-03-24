import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NIMBUS_API_KEY || "",
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { tasks, context } = await req.json()

    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that helps prioritize tasks. Analyze the tasks and provide a clear, concise prioritization with brief explanations.",
        },
        {
          role: "user",
          content: `Please help me prioritize these tasks: ${JSON.stringify(tasks)}. ${context}`,
        },
      ],
      temperature: 0.4,
    })

    return NextResponse.json({
      result: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("Task prioritization error:", error)
    return NextResponse.json(
      { error: "Failed to prioritize tasks" },
      { status: 500 }
    )
  }
}

