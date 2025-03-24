import OpenAI from "openai"

// Initialize the Nimbus AI client
const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NIMBUS_API_KEY || "",
})

export type SchedulingRequest = {
  prompt: string
  userContext?: {
    preferences?: Record<string, any>
    calendar?: Array<{
      title: string
      startTime: string
      endTime: string
      type: string
    }>
    tasks?: Array<{
      title: string
      priority: string
      dueDate: string
      completed: boolean
    }>
  }
}

export async function generateScheduleSuggestion(request: SchedulingRequest) {
  try {
    // Create a system prompt that includes user context if available
    let systemPrompt = "You are an adaptive AI scheduling assistant that helps users manage their time effectively."

    if (request.userContext) {
      systemPrompt += " Here is some context about the user:"

      if (request.userContext.preferences) {
        systemPrompt += `\nPreferences: ${JSON.stringify(request.userContext.preferences)}`
      }

      if (request.userContext.calendar && request.userContext.calendar.length > 0) {
        systemPrompt += `\nCalendar Events: ${JSON.stringify(request.userContext.calendar)}`
      }

      if (request.userContext.tasks && request.userContext.tasks.length > 0) {
        systemPrompt += `\nTasks: ${JSON.stringify(request.userContext.tasks)}`
      }
    }

    const completion = await client.chat.completions.create({
      temperature: 0.6,
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: request.prompt,
        },
      ],
    })

    return {
      suggestion: completion.choices[0].message.content,
      usage: completion.usage,
    }
  } catch (error) {
    console.error("Error calling Nimbus AI:", error)
    throw new Error("Failed to generate scheduling suggestion")
  }
}

export async function generateTaskPriorities(tasks: any[], context = "") {
  try {
    const completion = await client.chat.completions.create({
      temperature: 0.4,
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps prioritize tasks. Analyze the tasks and provide a prioritized list with reasoning.",
        },
        {
          role: "user",
          content: `Please prioritize these tasks: ${JSON.stringify(tasks)}. ${context}`,
        },
      ],
    })

    return {
      prioritizedTasks: completion.choices[0].message.content,
      usage: completion.usage,
    }
  } catch (error) {
    console.error("Error calling Nimbus AI for task prioritization:", error)
    throw new Error("Failed to prioritize tasks")
  }
}

export async function resolveScheduleConflict(
  conflict: {
    event1: { title: string; time: string; importance?: string }
    event2: { title: string; time: string; importance?: string }
  },
  userPreferences?: Record<string, any>,
) {
  try {
    let prompt = `I have a scheduling conflict between two events:
1. ${conflict.event1.title} at ${conflict.event1.time}${conflict.event1.importance ? ` (Importance: ${conflict.event1.importance})` : ""}
2. ${conflict.event2.title} at ${conflict.event2.time}${conflict.event2.importance ? ` (Importance: ${conflict.event2.importance})` : ""}

What's the best way to resolve this conflict?`

    if (userPreferences) {
      prompt += `\n\nMy preferences: ${JSON.stringify(userPreferences)}`
    }

    const completion = await client.chat.completions.create({
      temperature: 0.5,
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps resolve scheduling conflicts. Provide a thoughtful analysis and recommendation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    return {
      resolution: completion.choices[0].message.content,
      usage: completion.usage,
    }
  } catch (error) {
    console.error("Error calling Nimbus AI for conflict resolution:", error)
    throw new Error("Failed to resolve scheduling conflict")
  }
}

