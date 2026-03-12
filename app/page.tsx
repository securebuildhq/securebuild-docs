"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SearchModal } from "@/components/search-modal"
import { AiChat } from "@/components/ai-chat"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader showSearch={false} showAi={false} />
      
      <main className="flex-1">
        <Hero />
        <Problem />
        <Solution />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
