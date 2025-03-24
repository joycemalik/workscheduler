import { Suspense } from "react"
import { CheckCircle, Filter, Plus, SortAsc } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import { Separator } from "@/components/ui/separator"

export default function TasksPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage your tasks and to-dos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input placeholder="Search tasks..." className="pl-8" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-muted-foreground"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="outline" size="icon">
            <SortAsc className="h-4 w-4" />
            <span className="sr-only">Sort</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<DashboardSkeleton />}>
                  <TaskList />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="today">
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Today's tasks will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Upcoming tasks will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Completed tasks will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI Suggestions</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Task Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Reschedule Team Meeting</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your calendar, you have a conflict with the team meeting at 2:00 PM. Would you like to
                        reschedule it to 3:30 PM?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="default">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Break Reminder</h3>
                      <p className="text-sm text-muted-foreground">
                        You've been working for 2 hours straight. Consider taking a 15-minute break to improve
                        productivity.
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="default">
                          Take Break Now
                        </Button>
                        <Button size="sm" variant="outline">
                          Remind Later
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

