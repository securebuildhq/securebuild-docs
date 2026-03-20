"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const navigation = [
  {
    title: "Getting Started",
    items: [{ title: "Introduction", href: "/docs" }],
  },
  {
    title: "Self-hosted",
    items: [
      { title: "Overview", href: "/docs/self-hosted" },
      { title: "Infrastructure", href: "/docs/self-hosted/infrastructure" },
      { title: "Configuration reference", href: "/docs/self-hosted/config-reference" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "How It Works", href: "/docs/how-it-works" },
      { title: "Supply Chain Security", href: "/docs/supply-chain" },
      { title: "Vulnerability Reporting", href: "/docs/vulnerability-reporting" },
      { title: "Attestations", href: "/docs/attestations" },
    ],
  },
  {
    title: "Contributing",
    items: [
      { title: "Contribution Guide", href: "/docs/contributing" },
      { title: "Development environment", href: "/docs/development" },
      { title: "Code of Conduct", href: "/docs/code-of-conduct" },
    ],
  },
]

const allNavItems = navigation.flatMap((s) => s.items)

function navLinkMatches(pathname: string, href: string): boolean {
  if (pathname === href) return true
  // Avoid treating every /docs/* page as "Introduction"
  if (href === "/docs") return false
  return pathname.startsWith(`${href}/`)
}

function activeNavHref(pathname: string): string | null {
  let best: string | null = null
  for (const { href } of allNavItems) {
    if (navLinkMatches(pathname, href)) {
      if (!best || href.length > best.length) {
        best = href
      }
    }
  }
  return best
}

export function DocsSidebar() {
  const pathname = usePathname()
  const activeHref = activeNavHref(pathname)

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-6 pr-4">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-2 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeHref === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block text-sm py-1.5 px-3 rounded-md transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function DocsMobileNav() {
  const pathname = usePathname()
  const activeHref = activeNavHref(pathname)
  const foundItem = allNavItems.find((item) => item.href === activeHref)
  const currentPage = foundItem?.title ?? "Documentation"

  return (
    <div className="lg:hidden border-b sticky top-14 z-40 bg-background/80 backdrop-blur-xl">
      <div className="container px-4">
        <div className="flex items-center gap-2 py-3 text-sm">
          <Link href="/docs" className="text-muted-foreground hover:text-foreground">
            Docs
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{currentPage}</span>
        </div>
      </div>
    </div>
  )
}
