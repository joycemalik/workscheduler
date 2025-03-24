import { NextResponse } from "next/server"
import { resolveScheduleConflict } from "@/lib/nimbus-ai"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { conflict, userPreferences } = await request.json()

    if (!conflict || !conflict.event1 || !conflict.event2) {
      return NextResponse.json({ error: "Valid conflict information is required" }, { status: 400 })
    }

    const result = await resolveScheduleConflict(conflict, userPreferences)

    return NextResponse.json({ result: result.resolution })
  } catch (error) {
    console.error("Error in conflict resolution API:", error)
    return NextResponse.json({ error: "Failed to resolve conflict" }, { status: 500 })
  }
}

