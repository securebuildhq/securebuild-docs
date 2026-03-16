"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Search, Menu, Sparkles, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  onSearchOpen?: () => void
  onAiOpen?: () => void
  showSearch?: boolean
  showAi?: boolean
}

export function SiteHeader({ onSearchOpen, onAiOpen, showSearch = false, showAi = false }: SiteHeaderProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  
  const navigation = [
    { name: "Docs", href: "/docs" },
    { name: "GitHub", href: "https://github.com/securebuildhq/securebuild", external: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-14 items-center px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <img
            src="/securebuild-logo.jpg"
            alt="SecureBuild"
            className="h-8 w-8 rounded-lg"
          />
          <span className="font-semibold text-foreground hidden sm:inline-block">
            SecureBuild
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith(item.href)
                  ? "text-foreground font-medium"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search Button */}
          {showSearch && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 text-muted-foreground px-3 h-9 w-64 justify-start"
                onClick={onSearchOpen}
              >
                <Search className="h-4 w-4" />
                <span className="text-sm">Search docs...</span>
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onSearchOpen}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </>
          )}

          {/* AI Chat Button */}
          {showAi && (
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 h-9"
              onClick={onAiOpen}
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask AI</span>
            </Button>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* GitHub Link */}
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link
              href="https://github.com/securebuildhq/securebuild"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    className="text-lg font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {showAi && (
                  <Button
                    variant="outline"
                    className="mt-4 justify-start gap-2"
                    onClick={onAiOpen}
                  >
                    <Sparkles className="h-4 w-4" />
                    Ask AI
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
