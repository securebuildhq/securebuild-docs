"use client"

import { Check, Shield, Zap, Eye, FileCode, Lock, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description:
      "Real-time CVE monitoring across all upstream dependencies. Know the moment a vulnerability affects your images.",
  },
  {
    icon: Zap,
    title: "Automatic Rebuilds",
    description:
      "When a CVE is patched upstream, SecureBuild automatically rebuilds affected images with the latest fixes.",
  },
  {
    icon: FileCode,
    title: "Built from Source",
    description:
      "Every image is compiled from verified source code on trusted hardware with full build attestations.",
  },
  {
    icon: Lock,
    title: "SBOM Generation",
    description:
      "Automatic Software Bill of Materials in SPDX and CycloneDX formats for compliance and auditing.",
  },
  {
    icon: RefreshCw,
    title: "CI/CD Integration",
    description:
      "Native integrations with GitHub Actions, GitLab CI, Jenkins, and any webhook-capable platform.",
  },
  {
    icon: Shield,
    title: "Supply Chain Security",
    description:
      "SLSA Level 3 compliant builds with cryptographic provenance and signature verification.",
  },
]

export function Solution() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
            <Shield className="h-4 w-4" />
            The Solution
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Zero-CVE images, automatically
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            SecureBuild continuously monitors, rebuilds, and delivers vulnerability-free container images. 
            Set it up once and forget about CVE management forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl border bg-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">How it works</h3>
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border hidden md:block" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Monitor",
                  description: "SecureBuild tracks CVE disclosures and upstream patches for all your dependencies.",
                },
                {
                  step: "2",
                  title: "Rebuild",
                  description: "When vulnerabilities are fixed, images are automatically rebuilt from verified source.",
                },
                {
                  step: "3",
                  title: "Deploy",
                  description: "Get notified via webhook and automatically deploy secure images to your infrastructure.",
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-xl font-bold text-primary mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
