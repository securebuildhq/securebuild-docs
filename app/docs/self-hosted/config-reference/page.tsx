import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

function ParamTable({ rows }: { rows: { yaml: string; env: string; desc: string }[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[32rem] text-sm text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-3 py-2 font-semibold">YAML key</th>
            <th className="px-3 py-2 font-semibold">Environment</th>
            <th className="px-3 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.yaml}-${r.env}`} className="border-b border-border/80 last:border-0">
              <td className="px-3 py-2 font-mono text-xs align-top whitespace-nowrap">{r.yaml}</td>
              <td className="px-3 py-2 font-mono text-xs align-top whitespace-nowrap">{r.env}</td>
              <td className="px-3 py-2 align-top text-muted-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EnvTable({ rows }: { rows: { name: string; desc: string }[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[28rem] text-sm text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-3 py-2 font-semibold">Variable</th>
            <th className="px-3 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/80 last:border-0">
              <td className="px-3 py-2 font-mono text-xs align-top whitespace-nowrap">{r.name}</td>
              <td className="px-3 py-2 align-top text-muted-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SelfHostedConfigReferencePage() {
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
        <span className="text-foreground">Configuration reference</span>
      </div>

      <DocsH1>Configuration reference</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        Go services read the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Param</code> struct from
        YAML and/or environment (see <Link href="/docs/self-hosted" className="text-primary hover:underline">Self-hosted overview</Link>
        ). The Next.js app uses process environment variables at build time and runtime. Env names mirror YAML keys: same
        name in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">UPPER_SNAKE_CASE</code>.
      </p>

      <DocsH2 id="go-loading">Go services: loading</DocsH2>
      <DocsUL>
        <DocsLI>
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code> — Path to a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.yaml</code> / <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.yml</code> file, or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">env</code> for environment-only. Unset defaults to the core team&apos;s hosted config path—set explicitly for self-hosted.
        </DocsLI>
        <DocsLI>
          When using a YAML file, any set environment variable with a matching name overrides that key.
        </DocsLI>
      </DocsUL>

      <DocsH2 id="go-param">Go services: Param fields</DocsH2>
      <DocsP>All keys below are defined on <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Param</code> in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">pkg/param/param.go</code>.</DocsP>

      <DocsH3 id="go-core">Database &amp; APK</DocsH3>
      <ParamTable
        rows={[
          { yaml: "db_uri", env: "DB_URI", desc: "PostgreSQL connection URI." },
          { yaml: "apk_repository", env: "APK_REPOSITORY", desc: "HTTPS base URL for the public APK origin (no trailing slash)." },
          {
            yaml: "apk_public_key_name",
            env: "APK_PUBLIC_KEY_NAME",
            desc: "Filename segment for GET /key/<name> on the APK proxy.",
          },
          {
            yaml: "apk_public_key_data",
            env: "APK_PUBLIC_KEY_DATA",
            desc: "Base64-encoded public key PEM (full file including headers).",
          },
          {
            yaml: "apk_signing_key_data",
            env: "APK_SIGNING_KEY_DATA",
            desc: "Base64-encoded private key PEM for signing APKINDEX (full file including headers).",
          },
        ]}
      />

      <DocsH3 id="go-registry">Registry</DocsH3>
      <ParamTable
        rows={[
          {
            yaml: "registry_image_prefix",
            env: "REGISTRY_IMAGE_PREFIX",
            desc: "Image reference prefix (host or host/path; no scheme or tag).",
          },
          {
            yaml: "oci_image_prefix",
            env: "OCI_IMAGE_PREFIX",
            desc: "Optional alternate prefix for proxy/local flows; empty uses registry_image_prefix everywhere.",
          },
          { yaml: "registry_username", env: "REGISTRY_USERNAME", desc: "Registry login name." },
          { yaml: "registry_password", env: "REGISTRY_PASSWORD", desc: "Registry password or token." },
        ]}
      />

      <DocsH3 id="go-llm">LLM providers</DocsH3>
      <ParamTable
        rows={[
          { yaml: "anthropic_api_key", env: "ANTHROPIC_API_KEY", desc: "Anthropic API key." },
          { yaml: "openai_api_key", env: "OPENAI_API_KEY", desc: "OpenAI API key." },
        ]}
      />

      <DocsH3 id="go-pool">Pool</DocsH3>
      <ParamTable rows={[{ yaml: "pool_size", env: "POOL_SIZE", desc: "VM pool sizing (see codebase for semantics)." }]} />

      <DocsH3 id="go-cosign">Cosign &amp; keyless</DocsH3>
      <ParamTable
        rows={[
          { yaml: "cosign_key", env: "COSIGN_KEY", desc: "Cosign signing key material." },
          { yaml: "cosign_pub", env: "COSIGN_PUB", desc: "Cosign public key." },
          { yaml: "cosign_password", env: "COSIGN_PASSWORD", desc: "Password for encrypted cosign key." },
          { yaml: "oidc_gcp_project_id", env: "OIDC_GCP_PROJECT_ID", desc: "GCP project for OIDC keyless signing." },
          { yaml: "oidc_gcp_attestor_account", env: "OIDC_GCP_ATTESTOR_ACCOUNT", desc: "GCP attestor account." },
          { yaml: "oidc_gcp_attestor_key_json", env: "OIDC_GCP_ATTESTOR_KEY_JSON", desc: "GCP service account JSON for attestor." },
        ]}
      />

      <DocsH3 id="go-r2">Object storage (r2_* / S3-compatible)</DocsH3>
      <ParamTable
        rows={[
          { yaml: "r2_bucket_name", env: "R2_BUCKET_NAME", desc: "Primary bucket." },
          { yaml: "r2_access_key", env: "R2_ACCESS_KEY", desc: "Access key ID." },
          { yaml: "r2_secret_key", env: "R2_SECRET_KEY", desc: "Secret access key." },
          { yaml: "r2_endpoint", env: "R2_ENDPOINT", desc: "S3 API endpoint URL." },
          {
            yaml: "r2_region",
            env: "R2_REGION",
            desc: "SigV4 signing region. Set to your AWS bucket region (e.g. us-east-1) when using Amazon S3. Omit for Cloudflare R2 (defaults to auto).",
          },
          { yaml: "r2_use_dynamic_folder", env: "R2_USE_DYNAMIC_FOLDER", desc: "Dynamic folder layout flag." },
          { yaml: "r2_use_path_style", env: "R2_USE_PATH_STYLE", desc: "Use path-style addressing (e.g. MinIO)." },
        ]}
      />

      <DocsH3 id="go-cloudflare">Cloudflare</DocsH3>
      <ParamTable
        rows={[
          { yaml: "cloudflare_account_id", env: "CLOUDFLARE_ACCOUNT_ID", desc: "Account ID." },
          { yaml: "cloudflare_queue_name", env: "CLOUDFLARE_QUEUE_NAME", desc: "Queue name." },
          { yaml: "cloudflare_api_key", env: "CLOUDFLARE_API_KEY", desc: "API token or key." },
          { yaml: "cloudflare_zone_id", env: "CLOUDFLARE_ZONE_ID", desc: "DNS zone ID." },
          { yaml: "cloudflare_cache_purge_token", env: "CLOUDFLARE_CACHE_PURGE_TOKEN", desc: "Cache purge token." },
        ]}
      />

      <DocsH3 id="go-misc">Integrations and secrets</DocsH3>
      <ParamTable
        rows={[
          { yaml: "updater_github_api_token", env: "UPDATER_GITHUB_API_TOKEN", desc: "GitHub token for updater." },
          { yaml: "release_monitor_api_token", env: "RELEASE_MONITOR_API_TOKEN", desc: "Release Monitor API token." },
          {
            yaml: "external_registry_encryption_secret",
            env: "EXTERNAL_REGISTRY_ENCRYPTION_SECRET",
            desc: "Secret for encrypting external registry data in the app.",
          },
          { yaml: "oci_proxy_jwt_secret", env: "OCI_PROXY_JWT_SECRET", desc: "JWT signing secret for OCI proxy tokens." },
          { yaml: "oci_proxy_skip_tls_verify", env: "OCI_PROXY_SKIP_TLS_VERIFY", desc: "Skip TLS verify for OCI proxy upstream (dev only)." },
        ]}
      />

      <DocsH3 id="go-vm-api">Remote VM API (optional)</DocsH3>
      <ParamTable
        rows={[
          {
            yaml: "replicated_api_origin",
            env: "REPLICATED_API_ORIGIN",
            desc: "Base URL for remote VM provisioning HTTP API (omit if using local/static backends only).",
          },
          {
            yaml: "replicated_api_token",
            env: "REPLICATED_API_TOKEN",
            desc: "Bearer token for that API (not for registry login).",
          },
          { yaml: "instance_type_x86", env: "INSTANCE_TYPE_X86", desc: "Instance type name for x86 VMs (API-specific)." },
          { yaml: "instance_type_arm64", env: "INSTANCE_TYPE_ARM64", desc: "Instance type name for arm64 VMs." },
        ]}
      />

      <DocsH3 id="go-specsync">Spec sync &amp; pipelines</DocsH3>
      <ParamTable
        rows={[
          { yaml: "specsync_enabled", env: "SPECSYNC_ENABLED", desc: "Enable spec sync." },
          { yaml: "specsync_github_token", env: "SPECSYNC_GITHUB_TOKEN", desc: "GitHub token for spec sync." },
          { yaml: "specsync_github_branch", env: "SPECSYNC_GITHUB_BRANCH", desc: "Branch for spec sync." },
          {
            yaml: "pipeline_dir",
            env: "PIPELINE_DIR",
            desc: "Pipeline workspace root on the worker. Docker Swarm dev stack: use /var/run/securebuild/pipelines (bind-mounted from dev-pipelines/ at repo root). Worker running on the host: use an absolute host path to the same directory.",
          },
        ]}
      />

      <DocsH3 id="go-ops">Logging, DB tooling, pprof</DocsH3>
      <ParamTable
        rows={[
          { yaml: "log_level", env: "LOG_LEVEL", desc: "Log level string." },
          { yaml: "grype_database_root", env: "GRYPE_DATABASE_ROOT", desc: "Grype DB path." },
          { yaml: "vunnel_image", env: "VUNNEL_IMAGE", desc: "Container image ref for vunnel." },
          { yaml: "pprof_enabled", env: "PPROF_ENABLED", desc: "Enable Go pprof HTTP server." },
          { yaml: "remove_commit_sha_pins", env: "REMOVE_COMMIT_SHA_PINS", desc: "Melange YAML: strip commit SHA pins." },
        ]}
      />

      <DocsH3 id="go-build">Build backends &amp; auth</DocsH3>
      <ParamTable
        rows={[
          {
            yaml: "build_backend",
            env: "BUILD_BACKEND",
            desc: "Where builds run: local worker, static SSH hosts, or remote VM API (see pkg/buildbackend).",
          },
          { yaml: "max_parallel_builds", env: "MAX_PARALLEL_BUILDS", desc: "Concurrent builds per machine (default 1)." },
          {
            yaml: "static_vms",
            env: "STATIC_VMS",
            desc: "YAML list of {host, user, port, ssh_key_path | ssh_key} for static backend.",
          },
          { yaml: "auth_method", env: "AUTH_METHOD", desc: "App auth alignment; password | github." },
          {
            yaml: "admin_user_email",
            env: "ADMIN_USER_EMAIL",
            desc: "Bootstrap admin email when using password auth without SMTP (see worker behavior).",
          },
          {
            yaml: "admin_user_password",
            env: "ADMIN_USER_PASSWORD",
            desc: "Bootstrap admin password (plaintext in config—protect accordingly).",
          },
        ]}
      />

      <DocsH2 id="next-app">Next.js app: environment variables</DocsH2>
      <DocsP>
        The app reads configuration at runtime from <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">process.env</code>.{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code> variables are inlined at build time and are visible in the browser bundle.
      </DocsP>

      <DocsH3 id="next-param-ts">Values used via getParam (lib/data/param.ts)</DocsH3>
      <DocsP>
        Set <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">PIPELINE_DIR</code> on the app to the same
        filesystem path the worker uses (for example Doppler or your orchestrator env), and use a shared volume or mount so
        both processes see the same pipeline files—omitting it on the app produces a runtime error when server code reads
        pipelines.
      </DocsP>
      <EnvTable
        rows={[
          { name: "DB_URI or SECUREBUILD_PG_URI", desc: "PostgreSQL URI for server-side data access." },
          { name: "REPLICATED_API_ORIGIN", desc: "Same meaning as Go Param when app needs API context." },
          { name: "REPLICATED_API_TOKEN", desc: "Same as Go Param." },
          { name: "REGISTRY_IMAGE_PREFIX", desc: "Registry prefix for server-side image URLs." },
          { name: "OCI_IMAGE_PREFIX", desc: "Optional alternate prefix (default empty)." },
          {
            name: "PIPELINE_DIR",
            desc: "Required on the app and worker. Same path and shared storage on both (Swarm dev: /var/run/securebuild/pipelines; host: absolute repo dev-pipelines/).",
          },
          { name: "AUTH_METHOD", desc: "password | github." },
          { name: "ADMIN_GITHUB_ORG", desc: "GitHub org for membership checks when using GitHub auth." },
          { name: "APP_ORIGIN or NEXT_PUBLIC_APP_ORIGIN", desc: "Public origin URL for links and callbacks." },
          { name: "SMTP_HOST", desc: "SMTP server for password-auth email flows." },
          { name: "SMTP_PORT", desc: "SMTP port (default 587)." },
          { name: "SMTP_USER", desc: "SMTP username." },
          { name: "SMTP_PASSWORD", desc: "SMTP password." },
          { name: "SMTP_FROM", desc: "From address for outbound mail." },
        ]}
      />

      <DocsH3 id="next-auth-session">Auth &amp; sessions</DocsH3>
      <EnvTable
        rows={[
          { name: "HMAC_SECRET", desc: "Secret for signing session JWT cookies (required in production)." },
          { name: "GITHUB_CLIENT_SECRET", desc: "GitHub OAuth app client secret (GitHub auth)." },
          { name: "NEXT_PUBLIC_GITHUB_CLIENT_ID", desc: "GitHub OAuth client ID (build-time)." },
          { name: "NEXT_PUBLIC_GITHUB_REDIRECT_URI", desc: "OAuth redirect URI (build-time)." },
          { name: "NEXT_PUBLIC_GITHUB_OAUTH_STATE", desc: "OAuth state parameter (build-time)." },
        ]}
      />

      <DocsH3 id="next-public">Public build-time (NEXT_PUBLIC_*)</DocsH3>
      <EnvTable
        rows={[
          { name: "NEXT_PUBLIC_APK_REPOSITORY", desc: "APK repository base URL shown in the UI (must match deployment)." },
          { name: "NEXT_PUBLIC_CENTRIFUGO_ADDRESS", desc: "Realtime/WebSocket service URL if used." },
          { name: "NEXT_PUBLIC_VERSION", desc: "Optional version string (e.g. for Datadog)." },
          { name: "NEXT_PUBLIC_GODMODE_REDIRECT", desc: "Internal/debug redirect base if enabled in build." },
        ]}
      />

      <DocsH3 id="next-other">Other</DocsH3>
      <EnvTable
        rows={[
          { name: "EXTERNAL_REGISTRY_ENCRYPTION_SECRET", desc: "Encrypts sensitive external registry fields in the app." },
          { name: "STRIPE_SECRET_KEY", desc: "Stripe secret for billing features." },
          { name: "E2E_TEST_MODE", desc: "Enables test login paths when set." },
          { name: "DD_ENABLED, DD_SERVICE, DD_ENV, …", desc: "Datadog tracing/metrics (see datadog/tracer.ts)." },
        ]}
      />

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/self-hosted/infrastructure"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Infrastructure
        </Link>
        <Link
          href="/docs/building"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Building overview
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
