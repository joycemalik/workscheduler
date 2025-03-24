"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

type Goal = {
  id: string
  title: string
  description: string
  deadline: Date
  progress: number
  tasks: {
    id: string
    title: string
    completed: boolean
  }[]
}

// Demo goals for logged out users
const demoGoals: Goal[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Finish the draft and get approval from stakeholders",
    deadline: new Date(2025, 2, 28),
    progress: 68,
    tasks: [
      {
        id: "t1",
        title: "Research market trends",
        completed: true,
      },
      {
        id: "t2",
        title: "Create outline",
        completed: true,
      },
      {
        id: "t3",
        title: "Write first draft",
        completed: true,
      },
      {
        id: "t4",
        title: "Review with team",
        completed: false,
      },
      {
        id: "t5",
        title: "Submit for approval",
        completed: false,
      },
    ],
  },
  {
    id: "2",
    title: "Learn New Framework",
    description: "Complete online course and build a sample project",
    deadline: new Date(2025, 3, 15),
    progress: 35,
    tasks: [
      {
        id: "t6",
        title: "Complete introduction modules",
        completed: true,
      },
      {
        id: "t7",
        title: "Practice basic concepts",
        completed: true,
      },
      {
        id: "t8",
        title: "Build sample application",
        completed: false,
      },
      {
        id: "t9",
        title: "Deploy to production",
        completed: false,
      },
    ],
  },
]

// User-specific goals for logged in users
const userGoals: Goal[] = [
  {
    id: "u1",
    title: "Launch Marketing Campaign",
    description: "Prepare and execute Q2 marketing campaign",
    deadline: new Date(2025, 3, 10),
    progress: 45,
    tasks: [
      {
        id: "ut1",
        title: "Define target audience",
        completed: true,
      },
      {
        id: "ut2",
        title: "Create content calendar",
        completed: true,
      },
      {
        id: "ut3",
        title: "Design promotional materials",
        completed: false,
      },
      {
        id: "ut4",
        title: "Set up analytics tracking",
        completed: false,
      },
      {
        id: "ut5",
        title: "Launch campaign",
        completed: false,
      },
    ],
  },
  {
    id: "u2",
    title: "Improve Team Productivity",
    description: "Implement new processes to boost team efficiency",
    deadline: new Date(2025, 4, 1),
    progress: 25,
    tasks: [
      {
        id: "ut6",
        title: "Conduct team assessment",
        completed: true,
      },
      {
        id: "ut7",
        title: "Research productivity tools",
        completed: true,
      },
      {
        id: "ut8",
        title: "Create implementation plan",
        completed: false,
      },
      {
        id: "ut9",
        title: "Train team on new processes",
        completed: false,
      },
      {
        id: "ut10",
        title: "Measure results",
        completed: false,
      },
    ],
  },
]

export function GoalProgress() {
  const { data: session } = useSession()
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading goals from an API
    const loadGoals = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1200)) // Simulate API delay

      // Use user-specific goals if logged in, otherwise use demo goals
      setGoals(session ? userGoals : demoGoals)
      setIsLoading(false)
    }

    loadGoals()
  }, [session])

  const toggleTaskCompletion = (goalId: string, taskId: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTasks = goal.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          )

          // Recalculate progress
          const completedTasks = updatedTasks.filter((task) => task.completed).length
          const totalTasks = updatedTasks.length
          const newProgress = Math.round((completedTasks / totalTasks) * 100)

          return {
            ...goal,
            tasks: updatedTasks,
            progress: newProgress,
          }
        }
        return goal
      }),
    )
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="space-y-2">
              <div className="h-6 w-1/2 animate-pulse rounded-md bg-muted"></div>
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
              <div className="h-2 w-full animate-pulse rounded-md bg-muted"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-5 w-full animate-pulse rounded-md bg-muted"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{goal.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground">Due {formatDate(goal.deadline)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className="flex-1"
                >
                  <Progress value={goal.progress} className="h-2" />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                  className="text-sm font-medium"
                >
                  {goal.progress}%
                </motion.span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tasks</h4>
              <ul className="space-y-2">
                <AnimatePresence>
                  {goal.tasks.map((task, taskIndex) => (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: taskIndex * 0.05 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => toggleTaskCompletion(goal.id, task.id)}
                      >
                        <CheckCircle2
                          className={cn(
                            "h-5 w-5",
                            task.completed ? "text-primary fill-primary" : "text-muted-foreground",
                          )}
                        />
                        <span className="sr-only">{task.completed ? "Mark as incomplete" : "Mark as complete"}</span>
                      </Button>
                      <span className={cn("text-sm", task.completed && "line-through text-muted-foreground")}>
                        {task.title}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
            <Separator />
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" className="w-full">
        <Target className="mr-2 h-4 w-4" />
        Add New Goal
      </Button>
    </div>
  )
}

