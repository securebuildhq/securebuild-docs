import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsP } from "@/components/docs/typography"

export default function AttestationsPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Attestations</span>
      </div>

      <DocsH1>Attestations</DocsH1>

      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        SecureBuild produces build attestations for the images it builds. Attestations are
        signed statements (DSSE envelopes) that bind a predicate—such as an SBOM—to the
        image, so you can verify what is in the image and who produced it.
      </p>

      <DocsH2 id="whats-in-an-attestation">What’s in an attestation</DocsH2>
      <DocsP>
        Each attestation is a <strong>DSSE (Dead Simple Signing Envelope)</strong> that
        contains a predicate. SecureBuild uses the SPDX SBOM as the predicate type (
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">https://spdx.dev/Document</code>
        ), so the attestation carries the Software Bill of Materials for the image in a
        signed, verifiable form.
      </DocsP>

      <DocsH2 id="storage">Storage</DocsH2>
      <DocsP>
        Attestations are stored as OCI artifacts alongside the image in your registry.
        They are exposed via the standard OCI referrers API, so any tool that supports
        OCI artifacts (including Cosign) can discover and fetch them using the image
        reference.
      </DocsP>

      <DocsH2 id="downloading">Downloading an attestation</DocsH2>
      <DocsP>
        Use Cosign to download the attestation and inspect the predicate (e.g. the SPDX
        SBOM):
      </DocsP>
      <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm font-mono">{`cosign download attestation \\
  --predicate-type=https://spdx.dev/Document \\
  <image-ref> | jq -r .payload | base64 -d | jq .predicate`}</code>
      </pre>
      <DocsP>
        Replace <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">&lt;image-ref&gt;</code> with the full
        image reference (e.g. <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">&lt;registry-host&gt;/&lt;repo&gt;:&lt;tag&gt;</code>).
        The example above decodes the payload and runs <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">jq .predicate</code> to
        print the SBOM JSON.
      </DocsP>

      <DocsH2 id="verifying">Verifying an attestation</DocsH2>
      <DocsP>
        To verify that an attestation was produced by SecureBuild and matches the image,
        use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">cosign verify-attestation</code> with the
        same predicate type. For keyless verification you must pass{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">--certificate-oidc-issuer</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">--certificate-identity</code>; for key-based
        verification use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">--key</code>. The exact
        values and commands for your environment are available in the SecureBuild
        dashboard for each image.
      </DocsP>
      <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm font-mono">{`cosign verify-attestation \\
  --type https://spdx.dev/Document \\
  --certificate-oidc-issuer=<issuer> \\
  --certificate-identity=<identity> \\
  <image-ref>`}</code>
      </pre>
      <DocsP>
        For image signing and verification (without attestations), see the{" "}
        <Link href="/docs/supply-chain#signing" className="text-primary hover:underline">Image Signing</Link> and{" "}
        <Link href="/docs/supply-chain#attestations" className="text-primary hover:underline">Attestations</Link> sections
        of Supply Chain Security.
      </DocsP>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/vulnerability-reporting"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Vulnerability Reporting
        </Link>
        <Link
          href="/docs/self-hosted"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Self-hosted Overview
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
