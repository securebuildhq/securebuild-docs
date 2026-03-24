import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsP } from "@/components/docs/typography"

function Pre({ children }: { children: string }) {
  return (
    <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-4 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

export default function BuildingImagesPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span>/</span>
        <Link href="/docs/building" className="hover:text-foreground">
          Building
        </Link>
        <span>/</span>
        <span className="text-foreground">Images</span>
      </div>

      <DocsH1>Building container images</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        Image builds produce OCI artifacts and push them to the registry you configure. Clients pull those images—or
        through an optional read-only OCI proxy—and verify signatures and attestations according to your policy.
      </p>

      <DocsH2 id="registry">Registry and addressing</DocsH2>
      <DocsP>
        The worker pushes to an external OCI registry using <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_image_prefix</code>{" "}
        plus registry credentials. You choose the registry (cloud or self-hosted); SecureBuild does not embed a registry
        server. For vanity URLs and stable pull hostnames, you can deploy the oci-proxy in front of the same registry;
        see{" "}
        <Link href="/docs/self-hosted/infrastructure#oci-registry" className="text-primary hover:underline">
          Infrastructure
        </Link>{" "}
        and the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>
        .
      </DocsP>

      <DocsH2 id="packages">Dependency on packages</DocsH2>
      <DocsP>
        Images often install software from your APK repository (packages built by SecureBuild). Configure the APK
        repository URL and signing key for the UI and workers so installs resolve correctly; see{" "}
        <Link href="/docs/building/packages" className="text-primary hover:underline">
          Packages
        </Link>{" "}
        and{" "}
        <Link href="/docs/how-it-works" className="text-primary hover:underline">
          How It Works
        </Link>{" "}
        for the relationship between Melange (packages) and image definitions.
      </DocsP>

      <DocsH2 id="apko-example">Image (apko)</DocsH2>
      <DocsP>
        Example <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">contents</code> block for a
        development-oriented image that installs the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">go</code> toolchain and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">busybox</code> (and related tools) from the same APK
        origin (see <Link href="/docs/building#cve0-apk-repo" className="text-primary hover:underline">Building overview</Link> for{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">repositories</code> /{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">keyring</code>):
      </DocsP>
      <Pre>{`contents:
  repositories:
    - https://apk.cve0.io
  keyring:
    - https://apk.cve0.io/key/cve0-signing.rsa.pub
  packages:
    - go~1.25.8
    - build-base
    - make
    - pkgconf
    - bash
    - git
    - curl
    - ca-certificates-bundle
    - securebuild-baselayout
    - busybox

environment:
  PATH: /go/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  GOLANG_VERSION: "1.25.8"
  GOTOOLCHAIN: local
  GOPATH: /go

paths:
  - path: /go
    type: directory
    permissions: 0o1777
  - path: /go/src
    type: directory
    permissions: 0o1777
  - path: /go/bin
    type: directory
    permissions: 0o1777
  - path: /usr/local/go
    type: symlink
    source: /usr/lib/go
    permissions: 0o755

cmd: /bin/bash

work-dir: /go
`}</Pre>
      <DocsP>
        The <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">go~1.25.8</code> line pins the{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">go</code> APK to a specific version published in
        the repository (the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">~</code> constraint matches
        that package version in the index). That keeps the image on a known toolchain for reproducible builds, which also
        lets you tag the image with something like <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">1.25.8</code> so
        the OCI tag matches the Go version and consumers get a fixed, known toolchain.
      </DocsP>

      <DocsH2 id="verification">Verification</DocsH2>
      <DocsP>
        Supply chain verification—image signing, SBOMs, and attestations—is covered in{" "}
        <Link href="/docs/supply-chain" className="text-primary hover:underline">
          Supply Chain Security
        </Link>{" "}
        and{" "}
        <Link href="/docs/attestations" className="text-primary hover:underline">
          Attestations
        </Link>
        .
      </DocsP>

      <DocsH2 id="operations">Where builds run</DocsH2>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend</code> and related settings
        control whether image builds run on the worker host or on remote builders. See{" "}
        <Link href="/docs/self-hosted/infrastructure#builder-vms" className="text-primary hover:underline">
          Where builds run
        </Link>{" "}
        under Infrastructure.
      </DocsP>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/building/packages"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Packages
        </Link>
        <Link
          href="/docs/contributing"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Contribution Guide
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
