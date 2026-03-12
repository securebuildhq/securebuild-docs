import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function SupplyChainPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Supply Chain Security</span>
      </div>

      <DocsH1>Supply Chain Security</DocsH1>

      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        SecureBuild strengthens your container supply chain by building images from verified
        source, generating SBOMs, and signing images and attestations. This page explains how
        each piece fits together.
      </p>

      <DocsH2 id="source-verification">Source Verification</DocsH2>
      <DocsP>
        Every image is built from source code fetched from official repositories. SecureBuild
        verifies integrity before building:
      </DocsP>
      <DocsUL>
        <DocsLI>SHA256 checksum validation of source artifacts</DocsLI>
      </DocsUL>
      <DocsP>
        Builds run on isolated, ephemeral VMs with a minimal base environment, so there is
        no persistent state between builds.
      </DocsP>

      <DocsH2 id="sbom">Software Bill of Materials (SBOM)</DocsH2>
      <DocsP>
        Each image includes a Software Bill of Materials so you can see exactly what is inside.
        SecureBuild generates SBOMs in SPDX format, including:
      </DocsP>
      <DocsUL>
        <DocsLI>Packages and versions</DocsLI>
        <DocsLI>License information</DocsLI>
        <DocsLI>Dependency relationships</DocsLI>
        <DocsLI>Runtime dependencies</DocsLI>
      </DocsUL>
      <DocsP>
        SBOMs are stored as OCI artifacts and can be accessed via your registry (e.g. using
        the referrers API or the dashboard).
      </DocsP>

      <DocsH2 id="signing">Image Signing</DocsH2>
      <DocsP>
        Images are signed with Sigstore/Cosign. You can verify them with either key-based or
        keyless verification, depending on how your deployment is configured:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>Key-based:</strong> use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">cosign verify --key &lt;public-key&gt; &lt;image-ref&gt;</code> with
          the public key for your environment.
        </DocsLI>
        <DocsLI>
          <strong>Keyless:</strong> use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">cosign verify</code> with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">--certificate-oidc-issuer</code> and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">--certificate-identity</code>. The exact values are shown in the SecureBuild dashboard for your images.
        </DocsLI>
      </DocsUL>
      <DocsP>
        The image reference should be the full registry path (e.g. <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">&lt;registry-host&gt;/&lt;repo&gt;:&lt;tag&gt;</code>) that you use to pull the image.
      </DocsP>

      <DocsH2 id="attestations">Attestations</DocsH2>
      <DocsP>
        Build attestations are produced as DSSE envelopes and can include the SBOM as a
        predicate. They are stored as OCI artifacts alongside the image. You can download and
        verify them with:
      </DocsP>
      <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm font-mono">{`cosign download attestation --predicate-type=https://spdx.dev/Document <image-ref>
cosign verify-attestation --type https://spdx.dev/Document <options> <image-ref>`}</code>
      </pre>
      <DocsP>
        The same keyless or key-based options used for image verification apply to
        attestation verification. Check the dashboard for the exact commands for your
        registry and identity.
      </DocsP>

      <DocsH2 id="summary">Summary</DocsH2>
      <DocsP>
        Together, verified source, SBOMs, signing, and attestations give you a clear record
        of what was built, from what source, and how to verify it. For the full flow from
        patch detection to delivery, see <Link href="/docs/how-it-works" className="text-primary hover:underline">How It Works</Link>.
      </DocsP>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/how-it-works"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          How It Works
        </Link>
        <Link
          href="/docs/vulnerability-reporting"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Vulnerability Reporting
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
