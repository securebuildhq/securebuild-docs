import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, Zap, Shield, FileCode } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function HowItWorksPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">How It Works</span>
      </div>

      <DocsH1>How SecureBuild Works</DocsH1>
      
      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        SecureBuild uses a unique approach to container security: continuous monitoring, 
        automatic rebuilding, and cryptographic verification. Here's how it all comes together.
      </p>

      {/* Process Diagram */}
      <div className="not-prose my-16">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: Eye, title: "Monitor", description: "Track CVE databases and upstream repos" },
            { icon: Zap, title: "Detect", description: "Identify when patches become available" },
            { icon: FileCode, title: "Rebuild", description: "Compile from verified source code" },
            { icon: Shield, title: "Deliver", description: "Push secure image with attestations" },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold mb-1">{step.title}</div>
                <div className="text-sm text-muted-foreground">{step.description}</div>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <DocsH2 id="monitoring">1. Continuous Monitoring</DocsH2>
      <DocsP>
        SecureBuild continuously monitors multiple data sources to track vulnerabilities 
        and patches:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>CVE Databases</strong> - NVD, GitHub Security Advisories, and 
          distribution-specific databases
        </DocsLI>
        <DocsLI>
          <strong>Upstream Repositories</strong> - Git commits, release tags, and 
          security announcements
        </DocsLI>
        <DocsLI>
          <strong>Package Registries</strong> - npm, PyPI, Maven, and OS package 
          repositories
        </DocsLI>
      </DocsUL>
      <DocsP>
        When a vulnerability is disclosed, SecureBuild correlates it with your 
        configured images and begins tracking for available patches.
      </DocsP>

      <DocsH2 id="detection">2. Patch Detection</DocsH2>
      <DocsP>
        When an upstream project releases a security patch, SecureBuild automatically 
        detects it through:
      </DocsP>
      <DocsUL>
        <DocsLI>Release tag monitoring on GitHub/GitLab</DocsLI>
        <DocsLI>Package version tracking in registries</DocsLI>
        <DocsLI>Security advisory correlations</DocsLI>
        <DocsLI>Commit message analysis for security fixes</DocsLI>
      </DocsUL>
      <DocsP>
        The system validates that the patch actually resolves the CVE before 
        triggering a rebuild, ensuring you don't get false positives.
      </DocsP>

      <DocsH2 id="rebuilding">3. Secure Rebuilding</DocsH2>
      <DocsP>
        This is where SecureBuild differs from traditional scanners. Instead of just 
        reporting vulnerabilities, we build new images:
      </DocsP>

      <DocsH3>Source Verification</DocsH3>
      <DocsP>
        All source code is fetched from official repositories with cryptographic 
        verification:
      </DocsP>
      <DocsUL>
        <DocsLI>GPG signature verification on releases</DocsLI>
        <DocsLI>SHA256 checksum validation</DocsLI>
        <DocsLI>Commit signature verification where available</DocsLI>
      </DocsUL>

      <DocsH3>Trusted Build Environment</DocsH3>
      <DocsP>
        Builds run on isolated, ephemeral infrastructure:
      </DocsP>
      <DocsUL>
        <DocsLI>Fresh VM for each build (no persistent state)</DocsLI>
        <DocsLI>Minimal base environment</DocsLI>
        <DocsLI>Network-restricted during compilation</DocsLI>
        <DocsLI>Full audit logging</DocsLI>
      </DocsUL>

      <DocsH3>SLSA Compliance</DocsH3>
      <DocsP>
        SecureBuild generates SLSA Level 3 compliant provenance:
      </DocsP>
      <DocsUL>
        <DocsLI>Cryptographically signed build attestations</DocsLI>
        <DocsLI>Complete build logs and environment details</DocsLI>
        <DocsLI>Source-to-artifact mapping</DocsLI>
      </DocsUL>

      <DocsH2 id="delivery">4. Secure Delivery</DocsH2>
      <DocsP>
        Once built, images are delivered with full supply chain metadata:
      </DocsP>

      <DocsH3>SBOM Generation</DocsH3>
      <DocsP>
        Every image includes a Software Bill of Materials in both SPDX and CycloneDX 
        formats, documenting:
      </DocsP>
      <DocsUL>
        <DocsLI>All packages and versions</DocsLI>
        <DocsLI>License information</DocsLI>
        <DocsLI>Dependency relationships</DocsLI>
        <DocsLI>Build-time vs runtime dependencies</DocsLI>
      </DocsUL>

      <DocsH3>Image Signing</DocsH3>
      <DocsP>
        Images are signed using Sigstore/Cosign, allowing you to verify authenticity:
      </DocsP>
      <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm font-mono">{`cosign verify --key securebuild.pub my-secure-postgres`}</code>
      </pre>

      <DocsH3>Webhook Notifications</DocsH3>
      <DocsP>
        When a new image is available, SecureBuild sends webhooks to your configured 
        endpoints, enabling automatic deployment:
      </DocsP>
      <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm font-mono">{`{
  "event": "image.updated",
  "image": "securebuild/postgres:16-secure",
  "digest": "sha256:abc123...",
  "cves_fixed": ["CVE-2024-1234", "CVE-2024-1235"],
  "sbom_url": "https://api.securebuild.dev/sbom/...",
  "attestation_url": "https://api.securebuild.dev/attestation/..."
}`}</code>
      </pre>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/installation"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Installation
        </Link>
        <Link
          href="/docs/supply-chain"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Supply Chain Security
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
