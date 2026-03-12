import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1 } from "@/components/docs/typography"

export default function QuickstartPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Quick Start</span>
      </div>

      <DocsH1>Quick Start</DocsH1>
      
      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        Coming soon.
      </p>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Introduction
        </Link>
        <Link
          href="/docs/how-it-works"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          How It Works
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
