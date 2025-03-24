"use client"

import { AIChat } from "@/components/ai-chat"

export default function ChatPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">AI Assistant</h1>
      <AIChat />
    </div>
  )
} 