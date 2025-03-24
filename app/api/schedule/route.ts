import { NextResponse } from "next/server"
import { generateScheduleSuggestion, type SchedulingRequest } from "@/lib/nimbus-ai"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const data = await request.json()
    const { prompt, userContext } = data as SchedulingRequest

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const result = await generateScheduleSuggestion({
      prompt,
      userContext,
    })

    return NextResponse.json({ result: result.suggestion })
  } catch (error) {
    console.error("Error in schedule API:", error)
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 })
  }
}

