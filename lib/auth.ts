import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { Session } from "next-auth"

export type AuthUser = {
  id: string
  email: string
  name: string
  image?: string
}

export async function getSession(): Promise<Session | null> {
  try {
    return await getServerSession(authOptions)
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await getSession()
    return session?.user as AuthUser ?? null
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

