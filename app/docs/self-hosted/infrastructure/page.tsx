import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

function Pre({ children }: { children: string }) {
  return (
    <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-4 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

export default function SelfHostedInfrastructurePage() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span>/</span>
        <Link href="/docs/self-hosted" className="hover:text-foreground">
          Self-hosted
        </Link>
        <span>/</span>
        <span className="text-foreground">Infrastructure</span>
      </div>

      <DocsH1>Infrastructure</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        A self-hosted SecureBuild deployment needs a database (PostgreSQL), object storage for artifacts and feeds, an
        OCI registry for images, build machines, and a public HTTP origin for Alpine packages (APK) plus signing keys.
        Exact field names live in the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>
        .
      </p>

      <DocsH2 id="database">Database</DocsH2>
      <DocsP>
        SecureBuild expects a PostgreSQL database. Point <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">db_uri</code> /{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code> at it (see configuration reference).
        Run SchemaHero migrations from the repository before starting services.
      </DocsP>

      <DocsH2 id="object-storage">Object storage (S3-compatible)</DocsH2>
      <DocsP>
        The worker uses an AWS SDK–compatible client (R2, Amazon S3, MinIO, etc.). Configure{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_endpoint</code>, access key, secret key,
        bucket names, and <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_use_path_style</code> for
        endpoints that require path-style URLs (typical for MinIO).
      </DocsP>

      <DocsH2 id="oci-registry">OCI registry</DocsH2>
      <DocsP>
        Images are referenced with a single prefix string, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_image_prefix</code> (host only or host with path segments—no scheme, no tag). Authenticate with{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_username</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_password</code> (token or password,
        depending on the registry). Use a dedicated registry credential, not unrelated API tokens.
      </DocsP>

      <DocsH2 id="builder-vms">Where builds run</DocsH2>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend</code> selects how package and image builds execute:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>local</strong> — Builds run on the same machine as the worker (good for small or dev setups). If{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend</code> is unset and remote VM
          API settings are empty, the worker defaults here.
        </DocsLI>
        <DocsLI>
          <strong>static</strong> — Builds run over SSH on hosts listed in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">static_vms</code> (host, user, port, SSH private key path or inline key).
        </DocsLI>
      </DocsUL>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">max_parallel_builds</code> limits concurrent builds per machine (default 1).
      </DocsP>

      <DocsH2 id="apk-origin">APK repository (HTTP)</DocsH2>
      <DocsP>
        The Alpine package index and packages are served over HTTPS (or HTTP in tightly controlled dev setups) at a
        single base URL, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_repository</code>. The
        web app exposes the same origin to the browser via{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_APK_REPOSITORY</code> at build
        time. The APK proxy serves the public key at <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">GET /key/&lt;apk_public_key_name&gt;</code>.
      </DocsP>

      <DocsH2 id="apk-keys">APK signing keys (generate with OpenSSL)</DocsH2>
      <DocsP>
        The worker signs package indexes with an RSA key. Store the <strong>private</strong> key in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_signing_key_data</code> and the{" "}
        <strong>public</strong> key in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_data</code>, each as <strong>base64 of the full PEM file</strong> (including headers). Set{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_name</code> to the filename
        segment clients use in the key URL (for example <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">cve0-signing.rsa.pub</code>). Prefer PKCS#8 for the private key (<code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">openssl genpkey</code>).
      </DocsP>

      <DocsH3 id="openssl-generate">Generate a key pair</DocsH3>
      <DocsP>
        <strong>1.</strong> Create a 4096-bit RSA private key (PKCS#8 PEM). Keep this file secret and out of version control.
      </DocsP>
      <Pre>{`openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out apk-signing.pem`}</Pre>

      <DocsP>
        <strong>2.</strong> Export the public key as PEM.
      </DocsP>
      <Pre>{`openssl pkey -in apk-signing.pem -pubout -out apk-signing.pub.pem`}</Pre>

      <DocsP>
        <strong>3.</strong> Base64-encode each PEM file in full and place the results in config: public →{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_data</code>, private →{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_signing_key_data</code>. After decoding{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_data</code>, the bytes served at{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">/key/&lt;apk_public_key_name&gt;</code> must match the public PEM file exactly.
      </DocsP>

      <p className="text-sm text-muted-foreground mb-4 leading-7">
        This matches the design in the SecureBuild repository proposal{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">configurable-apk-repository.md</code> (Appendix
        A: Generating the APK signing key pair).
      </p>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/self-hosted"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Self-hosted overview
        </Link>
        <Link
          href="/docs/self-hosted/config-reference"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Configuration reference
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
