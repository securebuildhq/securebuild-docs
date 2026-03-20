import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function SelfHostedOverviewPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span>/</span>
        <span className="text-foreground">Self-hosted</span>
      </div>

      <DocsH1>Self-hosted overview</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        Run SecureBuild on your own infrastructure: provision object storage, a container registry, and build capacity,
        then supply configuration to the Go worker and the Next.js app. No hosted secrets product is required—use a YAML
        file, environment variables, or your own secret store.
      </p>

      <DocsH2 id="guides">Guides</DocsH2>
      <DocsUL>
        <DocsLI>
          <Link href="/docs/self-hosted/infrastructure" className="text-primary font-medium hover:underline">
            Infrastructure
          </Link>
          — required pieces: S3-compatible storage, OCI registry, where builds run (local or static VMs), and the APK
          HTTP origin plus signing keys.
        </DocsLI>
        <DocsLI>
          <Link href="/docs/self-hosted/config-reference" className="text-primary font-medium hover:underline">
            Configuration reference
          </Link>
          — every <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Param</code> YAML key / env override
          for Go services, and environment variables used by the Next.js app.
        </DocsLI>
      </DocsUL>

      <DocsH2 id="config-loading">How configuration is loaded (Go services)</DocsH2>
      <DocsP>
        Set <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code> to a{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.yaml</code> path (values can be overridden by
        environment variables with the same names in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">UPPER_SNAKE_CASE</code>
        ) or to <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">env</code> to load only from the
        environment. For self-hosted deployments, set this explicitly; do not rely on the default.
      </DocsP>

      <DocsH2 id="example-file">Example YAML in the repository</DocsH2>
      <DocsP>
        The SecureBuild repo ships{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.example.yaml</code> as a
        starting point. Copy it to <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.yaml</code> (or another path) and point{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code> at it.
      </DocsP>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Introduction
        </Link>
        <Link
          href="/docs/self-hosted/infrastructure"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Infrastructure
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
