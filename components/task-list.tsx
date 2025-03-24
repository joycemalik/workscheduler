"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, Clock, Edit, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

type Task = {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: "high" | "medium" | "low"
  category: "work" | "personal" | "study"
  completed: boolean
}

// Demo tasks for logged out users
const demoTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the draft and send for review",
    dueDate: new Date(2025, 2, 25, 17, 0),
    priority: "high",
    category: "work",
    completed: false,
  },
  {
    id: "2",
    title: "Weekly team meeting",
    description: "Discuss project progress and roadblocks",
    dueDate: new Date(2025, 2, 24, 14, 0),
    priority: "medium",
    category: "work",
    completed: false,
  },
  {
    id: "3",
    title: "Gym session",
    description: "Cardio and strength training",
    dueDate: new Date(2025, 2, 24, 18, 30),
    priority: "low",
    category: "personal",
    completed: true,
  },
  {
    id: "4",
    title: "Study for certification",
    description: "Review chapters 5-7",
    dueDate: new Date(2025, 2, 26, 20, 0),
    priority: "medium",
    category: "study",
    completed: false,
  },
]

// User-specific tasks for logged in users
const userTasks: Task[] = [
  {
    id: "u1",
    title: "Prepare quarterly report",
    description: "Compile data and create presentation",
    dueDate: new Date(2025, 2, 26, 15, 0),
    priority: "high",
    category: "work",
    completed: false,
  },
  {
    id: "u2",
    title: "Client call with Acme Corp",
    description: "Discuss new project requirements",
    dueDate: new Date(2025, 2, 25, 11, 0),
    priority: "high",
    category: "work",
    completed: false,
  },
  {
    id: "u3",
    title: "Dentist appointment",
    description: "Regular checkup",
    dueDate: new Date(2025, 2, 27, 9, 0),
    priority: "medium",
    category: "personal",
    completed: false,
  },
]

export function TaskList() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPrioritizing, setIsPrioritizing] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: "work"
  })

  const loadTasks = async () => {
    try {
      const response = await fetch("/api/tasks")
      if (!response.ok) throw new Error("Failed to load tasks")
      const data = await response.json()
      setTasks(data.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate)
      })))
    } catch (error) {
      console.error("Error loading tasks:", error)
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      loadTasks()
    } else {
      setIsLoading(false)
    }
  }, [session])

  const addTask = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add tasks.",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      })

      if (!response.ok) throw new Error("Failed to add task")

      const addedTask = await response.json()
      setTasks(prev => [...prev, { ...addedTask, dueDate: new Date(addedTask.dueDate) }])
      setIsAddingTask(false)
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        category: "work"
      })

      toast({
        title: "Task added",
        description: "Your new task has been added successfully."
      })
    } catch (error) {
      console.error("Error adding task:", error)
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive"
      })
    }
  }

  const toggleTaskCompletion = async (taskId: string) => {
    if (!session) return

    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          completed: !task.completed
        })
      })

      if (!response.ok) throw new Error("Failed to update task")

      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ))
    } catch (error) {
      console.error("Error updating task:", error)
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      })
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!session) return

    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete task")

      setTasks(tasks.filter(t => t.id !== taskId))
      toast({
        title: "Task deleted",
        description: "The task has been removed from your list."
      })
    } catch (error) {
      console.error("Error deleting task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive"
      })
    }
  }

  const prioritizeTasks = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use AI task prioritization.",
        variant: "destructive"
      })
      return
    }

    setIsPrioritizing(true)
    setAiSuggestion(null)

    try {
      const incompleteTasks = tasks.filter(task => !task.completed)
      const response = await fetch("/api/tasks/prioritize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: incompleteTasks,
          context: "I need to prioritize these tasks based on urgency, importance, and deadline."
        })
      })

      if (!response.ok) throw new Error("Failed to prioritize tasks")

      const data = await response.json()
      setAiSuggestion(data.result)
    } catch (error) {
      console.error("Error prioritizing tasks:", error)
      toast({
        title: "Error",
        description: "Failed to prioritize tasks. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsPrioritizing(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(date)
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-100"
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
      case "low":
        return "text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-100"
    }
  }

  const getCategoryColor = (category: Task["category"]) => {
    switch (category) {
      case "work":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
      case "personal":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900 dark:text-purple-100"
      case "study":
        return "text-teal-500 bg-teal-100 dark:bg-teal-900 dark:text-teal-100"
    }
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-[250px]">
            <div className="h-4 w-40 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-2 h-2 w-full animate-pulse rounded-md bg-muted"></div>
          </div>
          <div className="h-9 w-32 animate-pulse rounded-md bg-muted"></div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 animate-pulse rounded-md bg-muted"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {completedTasks} of {totalTasks} tasks completed
          </p>
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }}>
            <Progress value={progressPercentage} className="h-2 w-[250px]" />
          </motion.div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prioritizeTasks}
            disabled={isPrioritizing || tasks.filter(t => !t.completed).length === 0}
          >
            {isPrioritizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Prioritizing...
              </>
            ) : (
              "AI Prioritize"
            )}
          </Button>
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task with title, description, due date, and priority.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newTask.title}
                    onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Task title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={newTask.description}
                    onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Task description"
                  />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="datetime-local"
                    value={newTask.dueDate}
                    onChange={e => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={value => setNewTask(prev => ({ ...prev, priority: value as Task["priority"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={value => setNewTask(prev => ({ ...prev, category: value as Task["category"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
                <Button onClick={addTask} disabled={!newTask.title || !newTask.dueDate}>
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {aiSuggestion && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">AI Suggestion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{aiSuggestion}</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      <span
                        className={cn(
                          "inline-flex cursor-pointer items-center",
                          task.completed && "line-through opacity-50"
                        )}
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="mr-2 h-4 w-4" />
                        )}
                        {task.title}
                      </span>
                    </CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary" className={getCategoryColor(task.category)}>
                      {task.category}
                    </Badge>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

