"use client"

import { AlertTriangle, RefreshCw, Shield, Clock } from "lucide-react"

const problems = [
  {
    icon: AlertTriangle,
    title: "CVE Whack-a-Mole",
    description:
      "New vulnerabilities are discovered daily. Manual patching is time-consuming and error-prone, leaving your infrastructure exposed.",
  },
  {
    icon: Clock,
    title: "Slow Response Times",
    description:
      "Traditional patching workflows can take weeks. Critical vulnerabilities need immediate attention, not bureaucratic delays.",
  },
  {
    icon: RefreshCw,
    title: "Rebuild Fatigue",
    description:
      "Constantly rebuilding images for every CVE is exhausting. Your team should focus on features, not security busywork.",
  },
]

export function Problem() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-1.5 text-sm text-destructive mb-6">
            <AlertTriangle className="h-4 w-4" />
            The Problem
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Container security is broken
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Most container images ship with known vulnerabilities. The average Docker Hub image 
            contains 70+ CVEs. Current solutions are manual, slow, and create constant overhead for engineering teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-2xl border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 mb-4">
                  <problem.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "70+", label: "Avg CVEs per image" },
            { value: "15K+", label: "New CVEs in 2024" },
            { value: "42%", label: "Critical/High severity" },
            { value: "21 days", label: "Avg patch time" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-destructive mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
