import Link from "next/link"
import { ArrowRight, BookOpen, Zap, Terminal, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function DocsPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <span>Docs</span>
        <span>/</span>
        <span className="text-foreground">Introduction</span>
      </div>

      <DocsH1>Introduction to SecureBuild</DocsH1>
      
      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        SecureBuild is an open-source tool that automatically builds, monitors, and delivers 
        zero-CVE container images. It solves the container security problem by continuously 
        tracking upstream patches and rebuilding images when vulnerabilities are fixed.
      </p>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        <Link
          href="/docs/quickstart"
          className="group flex items-start gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
              Quick Start
            </h3>
            <p className="text-sm text-muted-foreground">
              Coming soon
            </p>
          </div>
        </Link>
        
        <Link
          href="/docs/how-it-works"
          className="group flex items-start gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
              How It Works
            </h3>
            <p className="text-sm text-muted-foreground">
              Understand the architecture
            </p>
          </div>
        </Link>
      </div>

      {/* Content */}
      <DocsH2 id="what-is-securebuild">What is SecureBuild?</DocsH2>
      <DocsP>
        SecureBuild is a container security tool that eliminates CVE management overhead. 
        Instead of manually tracking vulnerabilities and rebuilding images, SecureBuild 
        automates the entire process:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>Continuous Monitoring</strong> - Track CVE disclosures across thousands 
          of open source projects in real-time
        </DocsLI>
        <DocsLI>
          <strong>Automatic Rebuilds</strong> - When upstream patches are available, 
          images are rebuilt automatically from verified source
        </DocsLI>
        <DocsLI>
          <strong>Supply Chain Security</strong> - Full build attestations, SBOMs, and 
          cryptographic provenance for compliance
        </DocsLI>
        <DocsLI>
          <strong>CI/CD Integration</strong> - Native webhooks and integrations for 
          GitHub Actions, GitLab CI, and more
        </DocsLI>
      </DocsUL>

      <DocsH2 id="why-securebuild">Why SecureBuild?</DocsH2>
      <DocsP>
        Most container images ship with known vulnerabilities. The average Docker Hub 
        image contains 70+ CVEs, and traditional approaches to container security 
        create constant overhead for engineering teams:
      </DocsP>
      <DocsUL>
        <DocsLI>Manual CVE tracking is time-consuming and error-prone</DocsLI>
        <DocsLI>Patching workflows are slow, often taking weeks</DocsLI>
        <DocsLI>Constant rebuilding creates engineering burnout</DocsLI>
        <DocsLI>Compliance requirements demand SBOMs and attestations</DocsLI>
      </DocsUL>
      <DocsP>
        SecureBuild solves these problems by automating the entire vulnerability 
        management lifecycle. Set it up once and get zero-CVE images delivered 
        automatically.
      </DocsP>

      <DocsH2 id="key-features">Key Features</DocsH2>
      
      <DocsH3>Zero-CVE Images</DocsH3>
      <DocsP>
        Every image built by SecureBuild is free of known vulnerabilities. We 
        continuously monitor upstream dependencies and rebuild when patches are 
        available, ensuring your infrastructure is always secure.
      </DocsP>

      <DocsH3>Built from Source</DocsH3>
      <DocsP>
        Images are compiled from verified source code on trusted hardware. This 
        ensures supply chain integrity and provides cryptographic provenance for 
        every build.
      </DocsP>

      <DocsH3>SBOM Generation</DocsH3>
      <DocsP>
        Automatic Software Bill of Materials generation in SPDX and CycloneDX 
        formats. Meet compliance requirements and track dependencies across your 
        entire infrastructure.
      </DocsP>

      <DocsH3>Webhook Integration</DocsH3>
      <DocsP>
        Get notified when images are updated and automatically trigger rebuilds 
        in your CI/CD pipeline. Works with GitHub Actions, GitLab CI, Jenkins, 
        and any webhook-capable platform.
      </DocsP>

      <DocsH2 id="open-source">Open Source</DocsH2>
      <DocsP>
        SecureBuild is fully open source under the Apache 2.0 license. We believe 
        container security should be accessible to everyone, and we welcome 
        contributions from the community.
      </DocsP>

      {/* GitHub CTA */}
      <div className="mt-16 p-6 rounded-lg border bg-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Github className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Contribute on GitHub</h3>
            <p className="text-sm text-muted-foreground">
              Star the repo, report issues, or submit pull requests. We love contributions!
            </p>
          </div>
          <Button asChild>
            <Link href="https://github.com/securebuildhq/securebuild" target="_blank">
              View on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Next Page */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <div />
        <Link
          href="/docs/quickstart"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Quick Start
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
