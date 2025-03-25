import { Metadata } from "next"
import { Calendar } from "@/components/calendar/calendar"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Calendar",
  description: "View and manage your schedule",
}

export default async function CalendarPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your schedule
          </p>
        </div>
      </div>
      <Calendar />
    </div>
  )
}

