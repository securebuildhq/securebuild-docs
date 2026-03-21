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

export default function BuildingOverviewPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span>/</span>
        <span className="text-foreground">Building packages &amp; images</span>
      </div>

      <DocsH1>Building packages &amp; images</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        SecureBuild produces Alpine packages (APKs) and OCI container images from your source. Package builds feed an APK
        repository; image builds consume that repository and push to your registry. Use the guides below for each
        artifact type, and the self-hosted docs for where services run and how they are configured.
      </p>

      <DocsH2 id="cve0-apk-repo">Using the public CVE0 APK repository</DocsH2>
      <DocsP>
        CVE0 hosts a public APK repository at <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">https://apk.cve0.io</code>.
        Set <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_repository</code> /{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_APK_REPOSITORY</code> there when CVE0 is
        your default origin (see{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">Configuration reference</Link>
        ). In Melange and apko YAML, mirror that under <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">repositories</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">keyring</code>. Add another repository line plus the
        matching key URL when you also need packages from <strong>your</strong> private APK origin.
      </DocsP>
      <Pre>{`repositories:
  - https://apk.cve0.io
  - https://apk.example.com
keyring:
  - https://apk.cve0.io/key/cve0-signing.rsa.pub
  - https://apk.example.com/key/example-signing.rsa.pub`}</Pre>
      <DocsP>
        Worked Melange and apko examples are on the{" "}
        <Link href="/docs/building/packages" className="text-primary hover:underline">
          Packages
        </Link>{" "}
        and{" "}
        <Link href="/docs/building/images" className="text-primary hover:underline">
          Images
        </Link>{" "}
        pages.
      </DocsP>

      <DocsH2 id="isolated-apk-repo">Bootstrapping your own APK repository (isolated from CVE0)</DocsH2>
      <DocsP>
        You can instead use only your own APK origin (for example{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">https://apk.example.com</code>) and keys you
        generate. Proxy, object storage, and signing keys are covered in{" "}
        <Link href="/docs/self-hosted/infrastructure" className="text-primary hover:underline">
          Infrastructure
        </Link>{" "}
        and the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>
        . There is no single recipe here; first packages depend on what you build.
      </DocsP>
      <DocsUL>
        <DocsLI>
          Melange pipeline steps often use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">runs:</code>{" "}
          shell scripts—provide a POSIX shell and whatever tools those scripts need.
        </DocsLI>
        <DocsLI>
          BusyBox is a common minimal userspace (often <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">wget</code> and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">sh</code>); <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">bash</code> is not a BusyBox applet—add it as its own package if required.
        </DocsLI>
        <DocsLI>
          Building from source usually declares build dependencies in the recipe (for example a C toolchain when compiling C/C++).
        </DocsLI>
      </DocsUL>

      <DocsH2 id="guides">Guides</DocsH2>
      <DocsUL>
        <DocsLI>
          <Link href="/docs/building/packages" className="text-primary font-medium hover:underline">
            Packages
          </Link>
          — how APK packages are produced, published to your APK repository, and used by image builds.
        </DocsLI>
        <DocsLI>
          <Link href="/docs/building/images" className="text-primary font-medium hover:underline">
            Images
          </Link>
          — how container images are built, pushed to an OCI registry, and verified by consumers.
        </DocsLI>
      </DocsUL>

      <DocsH2 id="related">Related</DocsH2>
      <DocsUL>
        <DocsLI>
          <Link href="/docs/how-it-works" className="text-primary hover:underline">
            How It Works
          </Link>{" "}
          — detection, rebuild, and delivery at a high level.
        </DocsLI>
        <DocsLI>
          <Link href="/docs/self-hosted/infrastructure" className="text-primary hover:underline">
            Infrastructure
          </Link>{" "}
          — OCI registry, APK HTTP proxy, object storage, and build backends.
        </DocsLI>
        <DocsLI>
          <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
            Configuration reference
          </Link>{" "}
          — <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Param</code> and app environment variables.
        </DocsLI>
      </DocsUL>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/self-hosted/config-reference"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Configuration reference
        </Link>
        <Link
          href="/docs/building/packages"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Packages
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
