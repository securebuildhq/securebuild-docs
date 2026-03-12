"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, User, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface AiChatProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const suggestedQuestions = [
  "How do I get started with SecureBuild?",
  "What's the difference between SecureBuild and other tools?",
  "How do I integrate with GitHub Actions?",
  "What is a Software Bill of Materials?",
]

const mockResponses: Record<string, string> = {
  "how do i get started": `Getting started with SecureBuild is simple:

1. **Install the CLI**: \`npm install -g @securebuild/cli\`
2. **Initialize your project**: \`securebuild init\`
3. **Build your first secure image**: \`securebuild build\`

Check out [How It Works](/docs/how-it-works) for more details.`,
  "github actions": `To integrate SecureBuild with GitHub Actions, add this to your workflow:

\`\`\`yaml
- name: Build Secure Image
  uses: securebuild/action@v1
  with:
    image: your-app
    dockerfile: ./Dockerfile
\`\`\`

This will automatically build and scan your images for vulnerabilities.`,
  "sbom": `A Software Bill of Materials (SBOM) is a comprehensive inventory of all components in your software.

SecureBuild automatically generates SBOMs in:
- SPDX format
- CycloneDX format

This helps with:
- Compliance requirements
- Vulnerability tracking
- License management`,
  "default": `I can help you with SecureBuild documentation and usage. Try asking about:

- Getting started
- CI/CD integration
- Supply chain security
- SBOM generation
- Configuration options`
}

export function AiChat({ open, onOpenChange }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerText = text.toLowerCase()
    let response = mockResponses["default"]
    
    if (lowerText.includes("started") || lowerText.includes("install")) {
      response = mockResponses["how do i get started"]
    } else if (lowerText.includes("github") || lowerText.includes("actions")) {
      response = mockResponses["github actions"]
    } else if (lowerText.includes("sbom") || lowerText.includes("bill of materials")) {
      response = mockResponses["sbom"]
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <SheetTitle>Ask AI</SheetTitle>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Ask questions about SecureBuild documentation
          </p>
        </SheetHeader>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center py-4">
                Start a conversation or try one of these:
              </p>
              <div className="grid gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="text-left text-sm p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert">
                    {message.content}
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are mocked for demonstration
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
