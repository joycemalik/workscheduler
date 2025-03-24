"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

// Demo events for logged out users
const demoEvents = [
  { date: new Date(2025, 2, 24), type: "meeting" },
  { date: new Date(2025, 2, 25), type: "deadline" },
  { date: new Date(2025, 2, 26), type: "personal" },
  { date: new Date(2025, 2, 27), type: "meeting" },
]

// User-specific events for logged in users
const userEvents = [
  { date: new Date(2025, 2, 24), type: "meeting" },
  { date: new Date(2025, 2, 24), type: "personal" },
  { date: new Date(2025, 2, 25), type: "meeting" },
  { date: new Date(2025, 2, 26), type: "deadline" },
  { date: new Date(2025, 2, 28), type: "meeting" },
  { date: new Date(2025, 2, 29), type: "personal" },
]

export function DashboardCalendar() {
  const { data: session } = useSession()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<typeof demoEvents>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading events from an API
    const loadEvents = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate API delay

      // Use user-specific events if logged in, otherwise use demo events
      setEvents(session ? userEvents : demoEvents)
      setIsLoading(false)
    }

    loadEvents()
  }, [session])

  if (isLoading) {
    return <div className="h-[350px] animate-pulse rounded-md bg-muted"></div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          meeting: events.filter((event) => event.type === "meeting").map((event) => event.date),
          deadline: events.filter((event) => event.type === "deadline").map((event) => event.date),
          personal: events.filter((event) => event.type === "personal").map((event) => event.date),
        }}
        modifiersClassNames={{
          meeting: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
          deadline: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-50",
          personal: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-50",
        }}
        components={{
          DayContent: ({ date, displayMonth }) => {
            const matchingEvents = events.filter(
              (event) =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear(),
            )

            return (
              <div className="relative h-full w-full p-2">
                <span className={cn("absolute left-0 top-0 flex h-full w-full items-center justify-center")}>
                  {date.getDate()}
                </span>
                {matchingEvents.length > 0 && (
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
                    {matchingEvents.map((event, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className={cn(
                          "h-1 w-1 rounded-full",
                          event.type === "meeting" && "bg-blue-500",
                          event.type === "deadline" && "bg-red-500",
                          event.type === "personal" && "bg-green-500",
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          },
        }}
      />
    </motion.div>
  )
}

