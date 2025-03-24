import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// In-memory storage for tasks (replace with a database in production)
let tasks = new Map()

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userTasks = tasks.get(session.user.email) || []
  return NextResponse.json(userTasks)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { title, description, dueDate, priority, category } = body

  if (!title || !dueDate || !priority || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const newTask = {
    id: Math.random().toString(36).substring(7),
    title,
    description,
    dueDate: new Date(dueDate),
    priority,
    category,
    completed: false,
    createdAt: new Date(),
    userId: session.user.email,
  }

  const userTasks = tasks.get(session.user.email) || []
  tasks.set(session.user.email, [...userTasks, newTask])

  return NextResponse.json(newTask)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id, ...updates } = body

  const userTasks = tasks.get(session.user.email) || []
  const taskIndex = userTasks.findIndex((task: any) => task.id === id)

  if (taskIndex === -1) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    )
  }

  userTasks[taskIndex] = { ...userTasks[taskIndex], ...updates }
  tasks.set(session.user.email, userTasks)

  return NextResponse.json(userTasks[taskIndex])
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json(
      { error: "Task ID is required" },
      { status: 400 }
    )
  }

  const userTasks = tasks.get(session.user.email) || []
  const filteredTasks = userTasks.filter((task: any) => task.id !== id)
  tasks.set(session.user.email, filteredTasks)

  return NextResponse.json({ success: true })
} 