"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarClock, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

type Event = {
  id: string
  title: string
  startTime: Date
  endTime: Date
  location: string
  type: "meeting" | "deadline" | "personal"
  participants?: string[]
}

// Demo events for logged out users
const demoEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    startTime: new Date(2025, 2, 24, 14, 0),
    endTime: new Date(2025, 2, 24, 15, 0),
    location: "Zoom",
    type: "meeting",
    participants: ["Alex", "Jamie", "Taylor"],
  },
  {
    id: "2",
    title: "Project Deadline",
    startTime: new Date(2025, 2, 25, 17, 0),
    endTime: new Date(2025, 2, 25, 17, 0),
    location: "N/A",
    type: "deadline",
  },
  {
    id: "3",
    title: "Gym Session",
    startTime: new Date(2025, 2, 24, 18, 30),
    endTime: new Date(2025, 2, 24, 19, 30),
    location: "Fitness Center",
    type: "personal",
  },
]

// User-specific events for logged in users
const userEvents: Event[] = [
  {
    id: "u1",
    title: "Weekly Standup",
    startTime: new Date(2025, 2, 24, 10, 0),
    endTime: new Date(2025, 2, 24, 10, 30),
    location: "Conference Room A",
    type: "meeting",
    participants: ["John", "Sarah", "Michael", "Emma"],
  },
  {
    id: "u2",
    title: "Client Presentation",
    startTime: new Date(2025, 2, 25, 14, 0),
    endTime: new Date(2025, 2, 25, 15, 30),
    location: "Virtual Meeting",
    type: "meeting",
    participants: ["Client Team", "Sales Director"],
  },
  {
    id: "u3",
    title: "Quarterly Review",
    startTime: new Date(2025, 2, 26, 11, 0),
    endTime: new Date(2025, 2, 26, 12, 0),
    location: "Executive Suite",
    type: "meeting",
    participants: ["Department Heads", "CEO"],
  },
]

export function UpcomingEvents() {
  const { data: session } = useSession()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading events from an API
    const loadEvents = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay

      // Use user-specific events if logged in, otherwise use demo events
      setEvents(session ? userEvents : demoEvents)
      setIsLoading(false)
    }

    loadEvents()
  }, [session])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getEventIcon = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return <Video className="h-4 w-4" />
      case "deadline":
        return <CalendarClock className="h-4 w-4" />
      case "personal":
        return <Users className="h-4 w-4" />
    }
  }

  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
      case "deadline":
        return "text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-100"
      case "personal":
        return "text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-100"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
              <div className="h-3 w-1/2 animate-pulse rounded-md bg-muted"></div>
              <div className="h-3 w-1/3 animate-pulse rounded-md bg-muted"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className={cn("flex h-10 w-10 items-center justify-center rounded-full", getEventColor(event.type))}
              >
                {getEventIcon(event.type)}
              </motion.div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <span className="text-xs text-muted-foreground">{formatDate(event.startTime)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{event.location}</span>
                </div>
                {event.participants && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-muted-foreground">With:</span>
                    <span>{event.participants.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
            {index < events.length - 1 && <Separator className="my-4" />}
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" className="w-full">
        View All Events
      </Button>
    </div>
  )
}

