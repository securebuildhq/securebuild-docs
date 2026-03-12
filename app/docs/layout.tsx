"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SearchModal } from "@/components/search-modal"
import { AiChat } from "@/components/ai-chat"
import { DocsSidebar, DocsMobileNav } from "@/components/docs/sidebar"
import { Footer } from "@/components/footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader onSearchOpen={() => setSearchOpen(true)} onAiOpen={() => setAiOpen(true)} showSearch={true} showAi={true} />
      <DocsMobileNav />
      
      <div className="flex-1 container px-4 md:px-8">
        <div className="flex gap-8">
          <DocsSidebar />
          <main className="flex-1 min-w-0 py-8">{children}</main>
        </div>
      </div>

      <Footer />

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <AiChat open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  )
}
