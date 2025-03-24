"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Conflict = {
  event1: {
    title: string
    time: string
    importance?: string
  }
  event2: {
    title: string
    time: string
    importance?: string
  }
}

export function ConflictResolver() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isResolving, setIsResolving] = useState(false)
  const [resolution, setResolution] = useState<string | null>(null)
  const [conflict, setConflict] = useState<Conflict>({
    event1: {
      title: "Team Meeting",
      time: "March 25, 2025 at 2:00 PM",
      importance: "Medium",
    },
    event2: {
      title: "Doctor's Appointment",
      time: "March 25, 2025 at 2:00 PM",
      importance: "High",
    },
  })

  const resolveConflict = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use AI conflict resolution.",
        variant: "destructive",
      })
      return
    }

    setIsResolving(true)
    setResolution(null)

    try {
      const userPreferences = {
        prioritizeHealth: true,
        workHours: "9:00 AM - 5:00 PM",
        preferredMeetingTimes: "Mornings",
      }

      const response = await fetch("/api/conflicts/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conflict,
          userPreferences,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to resolve conflict")
      }

      const data = await response.json()
      setResolution(data.result)
    } catch (error) {
      console.error("Error resolving conflict:", error)
      toast({
        title: "Error",
        description: "Failed to resolve conflict. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResolving(false)
    }
  }

  const updateConflictEvent = (
    eventKey: "event1" | "event2",
    field: "title" | "time" | "importance",
    value: string,
  ) => {
    setConflict((prev) => ({
      ...prev,
      [eventKey]: {
        ...prev[eventKey],
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Schedule Conflict Resolver
            </CardTitle>
            <CardDescription>Resolve scheduling conflicts with AI assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Event 1</h3>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="event1-title">Title</Label>
                      <Select
                        value={conflict.event1.title}
                        onValueChange={(value) => updateConflictEvent("event1", "title", value)}
                      >
                        <SelectTrigger id="event1-title">
                          <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Team Meeting">Team Meeting</SelectItem>
                          <SelectItem value="Client Presentation">Client Presentation</SelectItem>
                          <SelectItem value="Project Deadline">Project Deadline</SelectItem>
                          <SelectItem value="Performance Review">Performance Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="event1-importance">Importance</Label>
                      <Select
                        value={conflict.event1.importance}
                        onValueChange={(value) => updateConflictEvent("event1", "importance", value)}
                      >
                        <SelectTrigger id="event1-importance">
                          <SelectValue placeholder="Select importance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="event1-time">Time</Label>
                    <Select
                      value={conflict.event1.time}
                      onValueChange={(value) => updateConflictEvent("event1", "time", value)}
                    >
                      <SelectTrigger id="event1-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="March 25, 2025 at 2:00 PM">March 25, 2025 at 2:00 PM</SelectItem>
                        <SelectItem value="March 25, 2025 at 3:00 PM">March 25, 2025 at 3:00 PM</SelectItem>
                        <SelectItem value="March 26, 2025 at 10:00 AM">March 26, 2025 at 10:00 AM</SelectItem>
                        <SelectItem value="March 26, 2025 at 2:00 PM">March 26, 2025 at 2:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Event 2</h3>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="event2-title">Title</Label>
                      <Select
                        value={conflict.event2.title}
                        onValueChange={(value) => updateConflictEvent("event2", "title", value)}
                      >
                        <SelectTrigger id="event2-title">
                          <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Doctor's Appointment">Doctor's Appointment</SelectItem>
                          <SelectItem value="Gym Session">Gym Session</SelectItem>
                          <SelectItem value="Family Dinner">Family Dinner</SelectItem>
                          <SelectItem value="Personal Errand">Personal Errand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="event2-importance">Importance</Label>
                      <Select
                        value={conflict.event2.importance}
                        onValueChange={(value) => updateConflictEvent("event2", "importance", value)}
                      >
                        <SelectTrigger id="event2-importance">
                          <SelectValue placeholder="Select importance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="event2-time">Time</Label>
                    <Select
                      value={conflict.event2.time}
                      onValueChange={(value) => updateConflictEvent("event2", "time", value)}
                    >
                      <SelectTrigger id="event2-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="March 25, 2025 at 2:00 PM">March 25, 2025 at 2:00 PM</SelectItem>
                        <SelectItem value="March 25, 2025 at 3:00 PM">March 25, 2025 at 3:00 PM</SelectItem>
                        <SelectItem value="March 26, 2025 at 10:00 AM">March 26, 2025 at 10:00 AM</SelectItem>
                        <SelectItem value="March 26, 2025 at 2:00 PM">March 26, 2025 at 2:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={resolveConflict} disabled={isResolving} className="w-full">
              {isResolving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resolving Conflict...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Resolve Conflict
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <AnimatePresence>
        {resolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>AI Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-sm">{resolution}</div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Apply Resolution
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setResolution(null)}>
                  Dismiss
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

