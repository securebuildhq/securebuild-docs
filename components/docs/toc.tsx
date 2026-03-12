"use client"

import { cn } from "@/lib/utils"

interface TocItem {
  title: string
  href: string
  level: number
}

interface DocsTableOfContentsProps {
  items: TocItem[]
}

export function DocsTableOfContents({ items }: DocsTableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 py-6 pl-4">
        <h4 className="font-semibold text-sm mb-4 text-foreground">
          On this page
        </h4>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "block text-sm py-1 text-muted-foreground hover:text-foreground transition-colors",
                item.level === 3 && "pl-4"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
