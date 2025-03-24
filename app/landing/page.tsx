"use client"

import Link from "next/link"
import { Calendar, CheckCircle, Clock, LogIn, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">AI Scheduler</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Adaptive AI Scheduling Assistant
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A personalized time management solution that understands your unique preferences and
                    responsibilities.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Get Started
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px]">
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Smart Scheduling Made Simple
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered assistant adapts to your behavior, learns from your feedback, and continually optimizes
                  your schedule.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary" />
                  <CardTitle>Smart Scheduling</CardTitle>
                  <CardDescription>
                    Integrates with your calendars to create an initial schedule based on priorities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI analyzes your existing events, prioritizes tasks, and suggests a personalized schedule that
                    maximizes your productivity.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-primary" />
                  <CardTitle>Adaptive Learning</CardTitle>
                  <CardDescription>
                    Continuously refines recommendations based on feedback and historical data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    The more you use the assistant, the better it gets at understanding your preferences and optimizing
                    your schedule.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-primary" />
                  <CardTitle>Conflict Resolution</CardTitle>
                  <CardDescription>
                    Suggests the best course of action when events overlap or conflicts arise.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    When scheduling conflicts occur, the AI evaluates importance and provides optimal resolutions to
                    keep you on track.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary" />
                  <CardTitle>Real-Time Assistance</CardTitle>
                  <CardDescription>
                    Provides notifications and real-time suggestions for schedule adjustments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive timely reminders and dynamic rescheduling suggestions to adapt to changing circumstances.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-primary" />
                  <CardTitle>Goal Tracking</CardTitle>
                  <CardDescription>Tracks progress toward short-term and long-term goals.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Visualize your progress with intuitive dashboards and receive personalized tips to enhance
                    productivity.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary" />
                  <CardTitle>Cross-Platform</CardTitle>
                  <CardDescription>Syncs across multiple devices and applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Access your schedule from anywhere with seamless integration across your favorite calendar and
                    productivity apps.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Scheduling?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have improved their productivity with our AI Scheduling Assistant.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">© 2025 AI Scheduler. All rights reserved.</p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs text-muted-foreground underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-muted-foreground underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

