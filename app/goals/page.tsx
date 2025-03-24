import { Suspense } from "react"
import { Plus, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalProgress } from "@/components/goal-progress"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function GoalsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
            <p className="text-muted-foreground">Track your progress and achievements</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<DashboardSkeleton />}>
                  <GoalProgress />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Completed goals will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">All goals will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Goal Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Weekly Progress</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're making great progress on your goals this week! You've completed 5 tasks toward your "Complete
                    Project Proposal" goal.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Suggested Next Steps</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    To stay on track with your "Learn New Framework" goal, consider allocating 1 hour tomorrow to
                    complete the next module.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <Target className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">New Goal Suggestion</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your recent activities, you might want to create a goal for "Improve Presentation
                        Skills" with weekly practice sessions.
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="default">
                          Create Goal
                        </Button>
                        <Button size="sm" variant="outline">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <Target className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Goal Adjustment</h3>
                      <p className="text-sm text-muted-foreground">
                        Your "Complete Project Proposal" goal is progressing well. Consider adding a stretch target to
                        challenge yourself further.
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="default">
                          Adjust Goal
                        </Button>
                        <Button size="sm" variant="outline">
                          Keep As Is
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

