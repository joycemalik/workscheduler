"use client"

import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, LogIn } from "lucide-react"
import Link from "next/link"

export function UserWelcome() {
  const { data: session, status } = useSession()
  const [greeting, setGreeting] = useState("Good day")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  if (status === "loading") {
    return (
      <div className="flex h-20 items-center">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to AI Scheduler</h1>
          <p className="text-muted-foreground">Sign in to get started with your personalized scheduling assistant</p>
        </div>
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {session.user?.name?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-muted-foreground">Here's your schedule for today</p>
      </div>
      <Button>
        <Calendar className="mr-2 h-4 w-4" />
        Add New Event
      </Button>
    </motion.div>
  )
}

