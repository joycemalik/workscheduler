import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Session } from "next-auth"

export async function getSession(): Promise<Session | null> {
  try {
    return await getServerSession(authOptions)
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

export async function getCurrentUser() {
  try {
    const session = await getSession()
    return session?.user ?? null
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

