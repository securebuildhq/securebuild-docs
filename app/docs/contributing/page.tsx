import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function ContributingPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Contribution Guide</span>
      </div>

      <DocsH1>Contribution Guide</DocsH1>

      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        We welcome contributions to SecureBuild. Below are the main ways you can help, and
        how to get your development environment set up for code and documentation changes.
      </p>

      <DocsH2 id="ways-to-contribute">Ways to contribute</DocsH2>
      <DocsUL>
        <DocsLI>
          <strong>Bug reports and feature requests</strong> — Open an{" "}
          <Link href="https://github.com/securebuildhq/securebuild/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">issue</Link>.
        </DocsLI>
        <DocsLI>
          <strong>Code and documentation</strong> — Open a pull request. See{" "}
          <Link href="/docs/development" className="text-primary hover:underline">Development Setup</Link> for
          getting the repo running locally, then submit your PR; CI runs tests on pull requests.
        </DocsLI>
      </DocsUL>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/attestations"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Attestations
        </Link>
        <Link
          href="/docs/development"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Development Setup
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
