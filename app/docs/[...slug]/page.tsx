import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

// This catch-all route handles all other docs pages that haven't been created yet
export default async function DocsSlugPage(
  props: {
    params: Promise<{ slug: string[] }>
  }
) {
  const params = await props.params
  const slug = params.slug
  const title = slug[slug.length - 1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        {slug.map((part, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>/</span>
            <span className={i === slug.length - 1 ? "text-foreground" : ""}>
              {part.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </span>
          </span>
        ))}
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {title}
      </h1>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
          <Construction className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          This documentation page is currently being written. Check back soon or 
          contribute to our docs on GitHub!
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/docs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Docs
            </Link>
          </Button>
          <Button asChild>
            <Link href="https://github.com/securebuild/securebuild" target="_blank">
              Contribute
            </Link>
          </Button>
        </div>
      </div>

      {/* Example content structure */}
      <div className="mt-12 p-6 rounded-lg border bg-muted/30">
        <h3 className="font-semibold mb-4">Planned Content</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>This page will cover:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Overview and key concepts</li>
            <li>Configuration options</li>
            <li>Code examples and usage</li>
            <li>Best practices</li>
            <li>Troubleshooting guide</li>
          </ul>
        </div>
      </div>
    </article>
  )
}

export function generateStaticParams() {
  // Generate some placeholder paths for the docs
  const paths = [
    ["supply-chain"],
    ["sbom"],
    ["attestations"],
    ["config"],
    ["ci-cd"],
    ["webhooks"],
    ["env-vars"],
    ["cli", "init"],
    ["cli", "build"],
    ["cli", "scan"],
    ["cli", "push"],
    ["contributing"],
    ["development"],
    ["code-of-conduct"],
    ["api"],
    ["examples"],
  ]

  return paths.map((slug) => ({ slug }))
}
