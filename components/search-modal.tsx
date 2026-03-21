"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Hash, ArrowRight } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const searchResults = [
  {
    category: "Getting Started",
    items: [{ title: "Introduction", href: "/docs", description: "What is SecureBuild?" }],
  },
  {
    category: "Core Concepts",
    items: [
      { title: "How It Works", href: "/docs/how-it-works", description: "Understanding the build process" },
      { title: "Supply Chain Security", href: "/docs/supply-chain", description: "Secure your software supply chain" },
      { title: "Vulnerability Reporting", href: "/docs/vulnerability-reporting", description: "CVE scanning and scan results" },
    ],
  },
  {
    category: "Self-hosted",
    items: [
      {
        title: "Self-hosted overview",
        href: "/docs/self-hosted",
        description: "Deploy on your own stack, config loading",
      },
      {
        title: "Infrastructure",
        href: "/docs/self-hosted/infrastructure",
        description: "Worker, securebuild-app, S3, OCI registry, builders, APK keys",
      },
      {
        title: "Configuration reference",
        href: "/docs/self-hosted/config-reference",
        description: "Go Param YAML/env and Next.js environment",
      },
    ],
  },
  {
    category: "Building",
    items: [
      {
        title: "Overview",
        href: "/docs/building",
        description: "Packages, images, and how they connect",
      },
      {
        title: "Packages",
        href: "/docs/building/packages",
        description: "APK repository, Melange, signing",
      },
      {
        title: "Images",
        href: "/docs/building/images",
        description: "OCI registry, pulls, verification",
      },
    ],
  },
  {
    category: "Contributing",
    items: [
      { title: "Contribution Guide", href: "/docs/contributing", description: "PRs, issues, and how to help" },
      {
        title: "Development environment",
        href: "/docs/development",
        description: "Nix flake, Docker Swarm dev stack, make targets",
      },
      { title: "Code of Conduct", href: "/docs/code-of-conduct", description: "Community standards" },
    ],
  },
  {
    category: "Configuration",
    items: [
      { title: "Configuration File", href: "/docs/config", description: "securebuild.yaml reference" },
      { title: "CI/CD Integration", href: "/docs/ci-cd", description: "GitHub Actions, GitLab CI, and more" },
      { title: "Webhooks", href: "/docs/webhooks", description: "Real-time notifications" },
    ],
  },
]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const filteredResults = searchResults
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0)

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search documentation..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-6">
            <p className="text-muted-foreground">No results found.</p>
            <p className="text-sm text-muted-foreground/60">
              Try searching for something else
            </p>
          </div>
        </CommandEmpty>
        {filteredResults.map((group) => (
          <CommandGroup key={group.category} heading={group.category}>
            {group.items.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => {
                  runCommand(() => router.push(item.href))
                }}
                className="flex items-center gap-3 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
