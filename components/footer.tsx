"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github } from "lucide-react"

const navigation = {
  project: [
    { name: "Documentation", href: "/docs" },
  ],
  community: [
    { name: "GitHub", href: "https://github.com/securebuildhq/securebuild" },
    { name: "Contributing", href: "/docs/contributing" },
  ],
  resources: [
    { name: "Roadmap", href: "https://github.com/securebuildhq/securebuild/blob/main/ROADMAP.md" },
    { name: "Security", href: "https://github.com/securebuildhq/securebuild/blob/main/SECURITY.md" },
  ],
  legal: [
    { name: "License", href: "https://github.com/securebuildhq/securebuild/blob/main/LICENSE" },
  ],
}

const linkClass = "text-sm text-muted-foreground hover:text-foreground transition-colors"

function NavItem({
  item,
  pathname,
}: {
  item: { name: string; href: string }
  pathname: string
}) {
  const isInternal = !item.href.startsWith("http")
  const isCurrent = isInternal && pathname === item.href
  if (isCurrent) {
    return (
      <span className="text-sm text-muted-foreground/60 cursor-default">
        {item.name}
      </span>
    )
  }
  return (
    <Link
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={linkClass}
    >
      {item.name}
    </Link>
  )
}

export function Footer() {
  const pathname = usePathname()
  return (
    <footer className="border-t bg-muted/30">
      <div className="w-full px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            {pathname === "/" ? (
              <div className="flex items-center gap-2 mb-4 cursor-default">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-primary-foreground"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                    <path d="M12 22V12" />
                    <path d="M12 12L4 7" />
                    <path d="M12 12l8-5" />
                  </svg>
                </div>
                <span className="font-semibold">SecureBuild</span>
              </div>
            ) : (
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-primary-foreground"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                    <path d="M12 22V12" />
                    <path d="M12 12L4 7" />
                    <path d="M12 12l8-5" />
                  </svg>
                </div>
                <span className="font-semibold">SecureBuild</span>
              </Link>
            )}
            <p className="text-sm text-muted-foreground mb-4">
              Open source container security for the modern software supply chain.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/securebuildhq/securebuild"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Project</h3>
            <ul className="space-y-2">
              {navigation.project.map((item) => (
                <li key={item.name}>
                  <NavItem item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Community</h3>
            <ul className="space-y-2">
              {navigation.community.map((item) => (
                <li key={item.name}>
                  <NavItem item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Resources</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <NavItem item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <NavItem item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Apache 2.0 License.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with care by folks @{" "}
            <Link
              href="https://replicated.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              replicated.com
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
