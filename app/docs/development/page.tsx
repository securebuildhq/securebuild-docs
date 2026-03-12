import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function DevelopmentPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Development</span>
      </div>

      <DocsH1>Development</DocsH1>

      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        This page lists what you need to run and develop SecureBuild locally. The project
        provides a Nix flake (<code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">flake.nix</code>) that pins
        versions; the requirements below are consistent with that setup.
      </p>

      <DocsH2 id="container-runtime">Container runtime</DocsH2>
      <DocsP>
        You need a container runtime for building and running images. Use either:
      </DocsP>
      <DocsUL>
        <DocsLI><strong>Docker</strong> — or a Docker-compatible daemon (e.g. Docker Desktop, or Colima/Lima on macOS as used in the Nix shell).</DocsLI>
        <DocsLI><strong>OrbStack</strong> — a lightweight Docker-compatible runtime, especially common on macOS.</DocsLI>
      </DocsUL>
      <DocsP>
        The Nix dev shell checks that <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">docker</code> is available; with OrbStack or another
        Docker-compatible CLI, the same commands apply.
      </DocsP>

      <DocsH2 id="requirements">Requirements</DocsH2>
      <DocsP>
        The following are required for a full development environment, matching the
        SecureBuild <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">flake.nix</code>:
      </DocsP>
      <DocsUL>
        <DocsLI><strong>Go</strong> — used to build the worker, builder, and other Go components.</DocsLI>
        <DocsLI><strong>Node.js</strong> — for the SecureBuild app (Next.js).</DocsLI>
        <DocsLI><strong>Docker or OrbStack</strong> — container runtime (see above).</DocsLI>
        <DocsLI><strong>Git</strong> — for version control and repo operations.</DocsLI>
        <DocsLI><strong>PostgreSQL</strong> — local DB for development (the flake provides <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">pg_isready</code>).</DocsLI>
        <DocsLI><strong>pipx</strong> — for installing Python CLI tools (e.g. vunnel).</DocsLI>
        <DocsLI><strong>Grype</strong> — vulnerability scanning (used in pipelines and scan jobs).</DocsLI>
        <DocsLI><strong>Apko</strong> — Chainguard apko for building APK-based images.</DocsLI>
        <DocsLI><strong>Melange</strong> — Chainguard melange for building packages.</DocsLI>
        <DocsLI><strong>Syft</strong> — SBOM generation.</DocsLI>
        <DocsLI><strong>Dagger</strong> — for CI/pipeline automation.</DocsLI>
        <DocsLI><strong>SchemaHero</strong> — DB schema management.</DocsLI>
        <DocsLI><strong>vunnel</strong> — installed via pipx (vulnerability data pipeline).</DocsLI>
        <DocsLI><strong>grype-db</strong> — installed via <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">go install</code> (Grype database tooling).</DocsLI>
      </DocsUL>
      <DocsP>
        On macOS, the Nix shell also includes <strong>Colima</strong>, <strong>Lima</strong>, and <strong>QEMU</strong> for
        running a local container runtime when not using Docker Desktop or OrbStack.
      </DocsP>

      <DocsH2 id="nix">Using the Nix flake</DocsH2>
      <DocsP>
        The project uses a Nix flake for the development environment. From the SecureBuild
        repo root:
      </DocsP>
      <DocsUL>
        <DocsLI>
          Run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">nix develop</code> to enter a shell with the
          above tools, or use <Link href="https://direnv.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">direnv</Link> with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">use flake</code> in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.envrc</code> so the
          environment loads automatically.
        </DocsLI>
        <DocsLI>
          The shell hook will install vunnel and grype-db if missing and print the status of
          each tool. For pinned versions and details, see{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">flake.nix</code> in the{" "}
          <Link href="https://github.com/securebuildhq/securebuild" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SecureBuild repository</Link>.
        </DocsLI>
      </DocsUL>

      <DocsH2 id="make-targets">Make targets</DocsH2>
      <DocsP>
        Run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make help</code> to see available targets.
      </DocsP>

      <DocsH3>Go (worker, builder, proxies)</DocsH3>
      <DocsUL>
        <DocsLI><strong>Build worker:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make build-worker</code> — builds the worker with embedded builder binaries.</DocsLI>
        <DocsLI><strong>Run services:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make run-worker</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make run-oci-proxy</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make run-apk-proxy</code> — each builds first if needed.</DocsLI>
      </DocsUL>

      <DocsH3>TypeScript (app)</DocsH3>
      <DocsUL>
        <DocsLI><strong>Install:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">cd securebuild-app &amp;&amp; npm install</code> (and similarly for other app directories in the repo).</DocsLI>
        <DocsLI><strong>Dev server:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm run dev</code> (app runs on port 3000).</DocsLI>
      </DocsUL>

      <DocsH3>Database</DocsH3>
      <DocsP>
        <strong>Migrations:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make migrate</code> — runs SchemaHero-based migrations.
      </DocsP>

      <DocsH2 id="testing">Testing</DocsH2>
      <DocsUL>
        <DocsLI><strong>Unit tests (all):</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make test-unit</code> — runs Go unit tests plus app tests.</DocsLI>
        <DocsLI><strong>Go unit tests only:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make test-unit-go</code>.</DocsLI>
        <DocsLI>
          <strong>Integration tests:</strong> <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make test-integration-oci-proxy</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make test-integration-apk-proxy</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make test-integration-worker</code>.
        </DocsLI>
      </DocsUL>
      <DocsP>
        CI runs tests on pull requests; run the relevant targets locally before submitting.
      </DocsP>

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
