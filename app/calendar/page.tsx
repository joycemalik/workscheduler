import { Suspense } from "react"
import { CalendarIcon, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardCalendar } from "@/components/dashboard-calendar"
import { UpcomingEvents } from "@/components/upcoming-events"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and events</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <Tabs defaultValue="month" className="space-y-4">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
          </TabsList>
          <TabsContent value="month" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <DashboardCalendar />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Upcoming Events</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <UpcomingEvents />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="week">
            <Card>
              <CardHeader>
                <CardTitle>Weekly View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Weekly calendar view will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="day">
            <Card>
              <CardHeader>
                <CardTitle>Daily View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Daily calendar view will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="agenda">
            <Card>
              <CardHeader>
                <CardTitle>Agenda View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Agenda view will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

