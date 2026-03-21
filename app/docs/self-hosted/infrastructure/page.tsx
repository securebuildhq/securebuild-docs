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
        A self-hosted SecureBuild deployment needs a database (PostgreSQL), a <strong>worker</strong> process that runs
        the platform, the <strong>securebuild-app</strong> web UI (Next.js on Node.js), object storage for artifacts and
        feeds, an OCI registry for images, build capacity, and a public HTTP origin for Alpine packages (APK) plus
        signing keys. Exact field names live in the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>
        .
      </p>

      <DocsH2 id="database">Database</DocsH2>
      <DocsP>
        SecureBuild expects a PostgreSQL database. Configure the connection using <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">db_uri</code> (YAML) or{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code> (environment variable):
      </DocsP>
      <Pre>{`db_uri: postgres://postgres:password@localhost:5432/securebuild?sslmode=disable`}</Pre>
      <DocsP>
        Run SchemaHero migrations before starting services. SecureBuild uses{" "}
        <Link href="https://schemahero.io" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
          SchemaHero
        </Link>{" "}
        for declarative schema management. Example migration commands:
      </DocsP>
      <Pre>{`schemahero plan \\
  --driver postgres \\
  --spec-file db/schema/tables \\
  --out ./db/plan/plan.yaml \\
  --uri postgres://postgres:password@localhost:5432/securebuild \\
  --seed-data

schemahero apply \\
  --driver postgres \\
  --ddl ./db/plan/plan.yaml \\
  --uri postgres://postgres:password@localhost:5432/securebuild`}</Pre>

      <DocsH2 id="worker">Worker</DocsH2>
      <DocsP>
        The <strong>worker</strong> is SecureBuild’s long-running Go backend. It loads settings from{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code> (see{" "}
        <Link href="/docs/self-hosted" className="text-primary hover:underline">
          Self-hosted overview
        </Link>
        ), connects to PostgreSQL, and processes the build queue: package and image builds, vulnerability scans, security
        feeds, and the rest of the pipeline listeners.
      </DocsP>
      <Pre>{`SECUREBUILD_CONFIG_SOURCE=/etc/securebuild/securebuild-config.yaml \\
      worker run`}</Pre>

      <DocsH2 id="securebuild-app">securebuild-app (web UI)</DocsH2>
      <DocsP>
        <strong>securebuild-app</strong> is the SecureBuild dashboard. It lives under{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-app/</code> in the repository, runs
        on Node.js, and uses the same PostgreSQL database as the worker.
      </DocsP>
      <DocsP>
        <strong>Build-time</strong> variables are the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code> names: set them when you build the Docker image or run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm run build</code>.{" "}
        <strong>Run-time</strong> variables (for example <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code>,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">HMAC_SECRET</code>, OAuth secrets) are supplied when you start the container or <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">node</code> process—rebuild the image if you change <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code>.
      </DocsP>

      <DocsH3 id="securebuild-app-docker">Production image (Docker)</DocsH3>
      <DocsP>
        The repo ships <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-app/Dockerfile.repldev</code>. It installs dependencies, runs <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm run build</code> with your <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code> build args, then packages a slim runtime that starts with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">node server.js</code> on port <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">3000</code> (override with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">PORT</code>).
      </DocsP>
      <Pre>{`docker build -f securebuild-app/Dockerfile.repldev \\
  --build-arg NEXT_PUBLIC_GITHUB_CLIENT_ID=your_oauth_app_id \\
  --build-arg NEXT_PUBLIC_GITHUB_REDIRECT_URI=https://app.example.com/auth/github \\
  --build-arg NEXT_PUBLIC_GITHUB_OAUTH_STATE=your_random_state \\
  --build-arg NEXT_PUBLIC_APK_REPOSITORY=https://apk.example.com \\
  -t securebuild-app:local \\
  securebuild-app`}</Pre>
      <DocsP>
        Run the image and pass server-side configuration as environment variables (adjust names and values to match your deployment; see the configuration reference for the full set):
      </DocsP>
      <Pre>{`docker run -d --name securebuild-app \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e PORT=3000 \\
  -e DB_URI=postgres://postgres:password@db:5432/securebuild \\
  -e HMAC_SECRET=your_hmac_secret \\
  -e GITHUB_CLIENT_SECRET=your_oauth_app_secret \\
  -e PIPELINE_DIR=/path/to/save/pipelines \\
  -e APP_ORIGIN=https://app.example.com \\
  securebuild-app:local`}</Pre>

      <DocsH3 id="securebuild-app-source">Run from a source tree (no Docker)</DocsH3>
      <DocsP>
        Use Node.js 24+ (same major as the Dockerfile). From <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-app/</code>:
      </DocsP>
      <DocsUL>
        <DocsLI>
          Export every <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code> value your deployment needs, then <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm install</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm run build</code>.
        </DocsLI>
        <DocsLI>
          Lay out the standalone output like the Dockerfile: copy <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">public</code> into <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.next/standalone/public</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.next/static</code> into <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.next/standalone/.next/static</code>.
        </DocsLI>
        <DocsLI>
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">cd .next/standalone</code>, set run-time env vars (<code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">HMAC_SECRET</code>, etc.), then run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">node server.js</code>.
        </DocsLI>
      </DocsUL>
      <DocsP>
        For day-to-day development only, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm run dev</code> is enough; see the{" "}
        <Link href="/docs/development" className="text-primary hover:underline">
          Development environment
        </Link>{" "}
        page.
      </DocsP>

      <DocsH2 id="object-storage">Object storage (S3-compatible)</DocsH2>
      <DocsP>
        SecureBuild uses object storage to publish Alpine vulnerability feeds (secdb) and store build artifacts. The worker publishes compressed, versioned feed files that clients consume to check for known vulnerabilities in Alpine packages. Configure an S3-compatible service (Cloudflare R2, Amazon S3, MinIO, etc.) with endpoint, credentials, and bucket names.
      </DocsP>

      <DocsH2 id="apk-origin">APK repository</DocsH2>
      <DocsP>
        SecureBuild builds Alpine packages (APKs) and publishes them into your <strong>object storage</strong> (the same
        S3-compatible buckets you configure with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_*</code>).
        The <strong>APK HTTP proxy</strong> serves those packages from object storage: repository index, package blobs, and related paths. During image builds, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apko</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">melange</code> tools use the public base URL{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_repository</code>.
        The proxy also exposes the signing public key at{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">GET /key/&lt;apk_public_key_name&gt;</code>.
      </DocsP>
      <DocsP>
        Run the APK HTTP proxy as its own long-running process (same <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">worker</code> binary, separate from <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">worker run</code>):
      </DocsP>
      <Pre>{`SECUREBUILD_CONFIG_SOURCE=/etc/securebuild/securebuild-config.yaml \\
      worker apk-proxy`}</Pre>

      <DocsH3 id="apk-keys">APK signing keys</DocsH3>
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
        <strong>3.</strong> Base64-encode each PEM file and place in config:
      </DocsP>
      <Pre>{`base64 < apk-signing.pub.pem > apk-signing.pub.pem.b64
base64 < apk-signing.pem > apk-signing.pem.b64`}</Pre>
      <DocsP>
        Copy the contents of <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk-signing.pub.pem.b64</code> to <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_data</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk-signing.pem.b64</code> to <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_signing_key_data</code>. After decoding <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_data</code>, the bytes served at{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">/key/&lt;apk_public_key_name&gt;</code> must match the public PEM file exactly.
      </DocsP>

      <DocsH2 id="oci-registry">OCI registry</DocsH2>
      <DocsP>
        The OCI registry is an <strong>external</strong> service you run or subscribe to separately—SecureBuild does not ship a registry. After builds, the worker pushes images and related artifacts to that registry using credentials you supply.
      </DocsP>
      <DocsP>
        Images are addressed with a single prefix string, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_image_prefix</code> (host only or host with path segments). Authenticate with{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_username</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_password</code> (token or password,
        depending on the registry). Use a dedicated registry credential, not unrelated API tokens.
      </DocsP>
      <DocsP>
        SecureBuild also includes an <strong>oci-proxy</strong> service you can deploy in front of your registry. It is read-only for clients: operators and end users can <strong>pull</strong> through a stable vanity hostname (your branded URL) while pushes still go to the configured registry. See the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>{" "}
        for <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">oci_image_prefix</code> and oci-proxy settings.
      </DocsP>
      <DocsP>
        Run the OCI proxy as its own long-running process (same <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">worker</code> binary, separate from <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">worker run</code>):
      </DocsP>
      <Pre>{`SECUREBUILD_CONFIG_SOURCE=/etc/securebuild/securebuild-config.yaml \\
      worker oci-proxy`}</Pre>

      <DocsH2 id="builder-vms">Where builds run</DocsH2>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend</code> selects how package and image builds execute:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>local</strong> — Builds run on the same machine as the worker (dev use only). If{" "}
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
