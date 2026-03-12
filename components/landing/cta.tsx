"use client"

import Link from "next/link"
import { ArrowRight, Github, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(34,197,94,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(34,197,94,0.08),rgba(0,0,0,0))]" />
      </div>

      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Ready to secure your containers?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 text-pretty">
            Join thousands of developers who trust SecureBuild for zero-CVE container images. 
            Open source, community-driven, and built for modern software supply chains.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <Link href="/docs">
                Read the Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 text-base"
            >
              <Link
                href="https://github.com/securebuild/securebuild"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="mr-2 h-4 w-4" />
                Star on GitHub
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div>Apache 2.0 License</div>
          </div>
        </div>
      </div>
    </section>
  )
}
