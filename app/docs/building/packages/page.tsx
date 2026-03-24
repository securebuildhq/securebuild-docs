import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

function Pre({ children }: { children: string }) {
  return (
    <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-4 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

export default function BuildingPackagesPage() {
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
        <span className="text-foreground">Packages</span>
      </div>

      <DocsH1>Building packages (APK)</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        Package builds run Melange and produce Alpine APKs. Those artifacts are published to an APK repository your
        deployment serves; image builds and other consumers install from that repository using the configured URL and
        trust keys.
      </p>

      <DocsH2 id="repository">APK repository</DocsH2>
      <DocsP>
        Built packages and indexes are stored in object storage; the APK HTTP proxy serves them over HTTP and signs
        indexes with your RSA key. End users and build steps point <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_repository</code> (and the app&apos;s public APK URL) at that HTTP origin. See{" "}
        <Link href="/docs/self-hosted/infrastructure" className="text-primary hover:underline">
          Infrastructure
        </Link>{" "}
        for the APK proxy, buckets, and signing key material.
      </DocsP>

      <DocsH2 id="consumers">Who consumes packages</DocsH2>
      <DocsUL>
        <DocsLI>
          <strong>Image builds</strong> — Container definitions install packages from your APK repository so images ship
          the versions SecureBuild built and indexed.
        </DocsLI>
        <DocsLI>
          <strong>Other package builds</strong> — A Melange build can depend on APKs already published in your repository
          (for example under <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">environment.contents.packages</code>), so
          one package build consumes the outputs of another.
        </DocsLI>
      </DocsUL>

      <DocsH2 id="config">Configuration</DocsH2>
      <DocsP>
        YAML and environment variables for APK URLs, key names, and proxy behavior are listed in the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>
        . For OpenSSL steps to generate signing keys, see{" "}
        <Link href="/docs/self-hosted/infrastructure#openssl-generate" className="text-primary hover:underline">
          Infrastructure — Generate a key pair
        </Link>
        .
      </DocsP>

      <DocsH2 id="melange-example">Package (Melange)</DocsH2>
      <DocsP>
        Example recipe for <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">gosu</code>: the build
        environment pulls <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">busybox</code>,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">go</code>, and supporting packages from that
        repository, then checks out upstream source and runs <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">go/build</code>{" "}
        (see <Link href="/docs/building#cve0-apk-repo" className="text-primary hover:underline">Building overview</Link> for{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">repositories</code> /{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">keyring</code>):
      </DocsP>
      <Pre>{`package:
  name: gosu-1.19
  version: "1.19"
  epoch: 0
  description: Simple Go-based setuid+setgid+setgroups+exec
  dependencies:
    provides:
      - gosu=\${{package.full-version}}

environment:
  contents:
    repositories:
      - https://apk.cve0.io
    keyring:
      - https://apk.cve0.io/key/cve0-signing.rsa.pub
    packages:
      - busybox
      - ca-certificates-bundle
      - go
      - git
  environment:
    GOPROXY: 'https://proxy.golang.org,direct'
    GOSUMDB: 'sum.golang.org'

pipeline:
  - uses: git-checkout
    with:
      repository: https://github.com/tianon/gosu
      tag: \${{package.version}}
      expected-commit: 6456aaa0f3c854d199d0f037f068eb97515b7513

  - uses: go/build
    with:
      packages: .
      output: gosu

  - uses: strip`}</Pre>

      <DocsH2 id="images">Next: images</DocsH2>
      <DocsP>
        After packages are available in the repository, image builds pull them as needed. Read{" "}
        <Link href="/docs/building/images" className="text-primary hover:underline">
          Building container images
        </Link>{" "}
        for registry push and verification.
      </DocsP>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/building"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Building overview
        </Link>
        <Link
          href="/docs/building/images"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Images
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
