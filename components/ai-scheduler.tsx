"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

export function AIScheduler() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { data: session } = useSession()
  const { toast } = useToast()

  // Get user context for more personalized AI responses
  const getUserContext = () => {
    // This would typically come from your database or state management
    // For now, we'll use demo data
    return {
      preferences: {
        workingHours: { start: "09:00", end: "17:00" },
        focusTime: { start: "10:00", end: "12:00" },
        breakDuration: 15,
      },
      calendar: [
        {
          title: "Team Meeting",
          startTime: "2025-03-24T14:00:00",
          endTime: "2025-03-24T15:00:00",
          type: "meeting",
        },
        {
          title: "Project Deadline",
          startTime: "2025-03-25T17:00:00",
          endTime: "2025-03-25T17:00:00",
          type: "deadline",
        },
      ],
      tasks: [
        {
          title: "Complete project proposal",
          priority: "high",
          dueDate: "2025-03-25T17:00:00",
          completed: false,
        },
        {
          title: "Weekly team meeting",
          priority: "medium",
          dueDate: "2025-03-24T14:00:00",
          completed: false,
        },
      ],
    }
  }

  const generateSchedule = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setResult(null)

    try {
      const userContext = getUserContext()

      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          userContext: session ? userContext : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate schedule")
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Error generating schedule:", error)
      toast({
        title: "Error",
        description: "Failed to generate schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Scheduling Assistant
            </CardTitle>
            <CardDescription>Describe your scheduling needs, conflicts, or questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="E.g., I need to schedule a team meeting, work on my project, and find time for a gym session tomorrow."
              className="min-h-[100px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={generateSchedule} disabled={isGenerating || !prompt.trim()} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Generate Schedule
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>AI Suggestion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-sm">{result}</div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Apply to Schedule
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setResult(null)}>
                  Dismiss
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() =>
                  setPrompt(
                    "I have a conflict between a team meeting and a doctor's appointment tomorrow at 2 PM. What should I prioritize?",
                  )
                }
              >
                <Clock className="mr-2 h-4 w-4" />
                Resolve scheduling conflict
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() =>
                  setPrompt(
                    "I need to find 3 hours this week to work on my project proposal. Here's my current schedule: [Monday: Team meeting 10-12, Client call 2-3], [Tuesday: All-day workshop], [Wednesday: Free], [Thursday: Dentist 9-10, Review 3-4], [Friday: Team lunch 12-2]",
                  )
                }
              >
                <Calendar className="mr-2 h-4 w-4" />
                Find time for a project
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() =>
                  setPrompt(
                    "I feel overwhelmed with too many tasks today. Help me prioritize: finish presentation (due tomorrow), respond to 5 urgent emails, prepare for client meeting (in 2 days), review team's work, and fix a bug in the application.",
                  )
                }
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Prioritize my tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

