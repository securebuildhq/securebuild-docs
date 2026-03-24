import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

function CommandBlock({ children }: { children: string }) {
  return (
    <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

function HelpBlock({ children }: { children: string }) {
  return (
    <pre className="not-prose bg-muted rounded-lg p-4 overflow-x-auto my-4 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

export default function DevelopmentPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span>/</span>
        <span className="text-foreground">Development environment</span>
      </div>

      <DocsH1>Development environment</DocsH1>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        Work from the{" "}
        <Link
          href="https://github.com/securebuildhq/securebuild"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          SecureBuild repository
        </Link>{" "}
        root. For service configuration (YAML, registry, storage), see the{" "}
        <Link href="/docs/self-hosted" className="text-primary hover:underline">
          Self-hosted
        </Link>{" "}
        docs and the{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          configuration reference
        </Link>
        .
      </p>

      <DocsH2 id="before-you-start">Before you start</DocsH2>
      <DocsUL>
        <DocsLI>
          <strong>Docker Swarm</strong> — enabled once per machine (
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">docker swarm init</code>
          ) if your setup does not already use Swarm.
        </DocsLI>
        <DocsLI>
          <strong>Tooling</strong> — the repo ships a Nix flake; run{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">nix develop</code> (or direnv) so{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make</code>, Go, Node, and related CLIs match
          CI.
        </DocsLI>
        <DocsLI>
          <strong>Linux — Bubblewrap</strong> — when you run the worker on the host (e.g. after{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-worker</code>
          ) with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend: local</code>, melange
          needs the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">bwrap</code> binary on{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">PATH</code>. Install the OS package: Debian/Ubuntu{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">sudo apt-get install bubblewrap</code>, Fedora{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">dnf install bubblewrap</code>, Arch{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">pacman -S bubblewrap</code>.
        </DocsLI>
      </DocsUL>

      <DocsP>
        Create <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.yaml</code> at the
        repo root for the Go services (worker, apk-proxy, oci-proxy) and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-app/.env.local</code> for the Next.js
        app before <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-stack-up</code>. The stack
        also mounts these paths;         the worker and app mount{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">dev-pipelines/</code> at{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">/var/run/securebuild/pipelines</code> (the
        directory is gitignored; <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-stack-up</code>{" "}
        creates it before <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">docker stack deploy</code>).{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make build-dev-images</code> reads{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.env.local</code> for{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code> build arguments.
      </DocsP>
      <DocsP>
        The examples below are for <strong>local development</strong> and are intended to work out of the box. They are
        not a secure production configuration: simple passwords and placeholder secrets are acceptable here. The only
        values that may require real credentials are <strong>container registry</strong> login details and{" "}
        <strong>S3-compatible storage</strong> (R2) keys—when those point at real services you care about.
      </DocsP>

      <DocsH3 id="example-securebuild-config">Example: securebuild-config.yaml</DocsH3>
      <HelpBlock>{`# Repo root: securebuild-config.yaml (Go services — dev defaults; see note above)
# Full template: securebuild-config.example.yaml in the SecureBuild repository.
# DB_URI is set in docker-compose.yml for the Swarm stack (omit here unless you need an override).

registry_image_prefix: ghcr.io/your-org/securebuild
registry_username: your-registry-user
registry_password: your-registry-token-or-password

apk_repository: http://apk-proxy:8880  # apk-proxy (available on 8880 in docker-compose)

apk_public_key_name: dev-signing.rsa.pub
apk_public_key_data: "<base64 data>"  # replace: base64-encoded public key PEM
apk_signing_key_data: "<base64 data>"  # replace: base64-encoded private key PEM
apk_signing_key_name: dev-signing.rsa.key

r2_endpoint: https://s3.example.com
r2_access_key: replace-me  # replace with your R2 or S3 access key
r2_secret_key: replace-me  # replace with your R2 or S3 secret key
r2_region: us-east-1 # leave blank for Cloudflare R2
r2_bucket_name: securebuild
r2_use_path_style: true

build_backend: local

# Pipeline files: in Swarm, compose mounts repo dev-pipelines/ here — keep this path.
pipeline_dir: /var/run/securebuild/pipelines

auth_method: password
admin_user_email: admin@example.com      # only if SMTP is not configured in the app
admin_user_password: clear-text-password  # only if SMTP is not configured in the app

log_level: info`}</HelpBlock>
      <DocsP>
        Add optional <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">static_vms</code> and other fields
        from the example file as needed. Field meanings:{" "}
        <Link href="/docs/self-hosted/config-reference" className="text-primary hover:underline">
          Configuration reference
        </Link>
        .
      </DocsP>

      <DocsH3 id="example-env-local">Example: securebuild-app/.env.local</DocsH3>
      <HelpBlock>{`# securebuild-app/.env.local (web app — password auth; dev defaults)
# DB_URI and PIPELINE_DIR are set in docker-compose.yml for the Swarm app container.
# For npm run dev on the host, set PIPELINE_DIR to an absolute path to repo dev-pipelines/.

HMAC_SECRET=dev-only-secret

REGISTRY_IMAGE_PREFIX=ghcr.io/your-org/securebuild

AUTH_METHOD=password

PIPELINE_DIR=/absolute/path/to/securebuild/dev-pipelines

NEXT_PUBLIC_APK_REPOSITORY=http://apk-proxy:8880  # apk-proxy on host
`}</HelpBlock>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">docker-compose.yml</code> sets{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">PIPELINE_DIR</code> for the app, and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code> for the worker, in the Swarm stack;
        you do not need those in these files for <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-stack-up</code>. Use{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">admin_user_email</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">admin_user_password</code> in the YAML when
        the app does not have SMTP configured or if you just want to use a single pre-defined user—otherwise omit them and use email-based setup flows.
      </DocsP>

      <DocsH3>Start dev environment</DocsH3>
      <CommandBlock>{`make dev-stack-up`}</CommandBlock>
      <DocsP>
        Open <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">localhost:3000</code> in your browser to
        view the site.
      </DocsP>

      <DocsH3>Enter dev shell for a service</DocsH3>
      <DocsP>
        Pick the component you want to run from source. Exiting the shell restores the stack.
      </DocsP>
      <CommandBlock>{`make dev-worker`}</CommandBlock>
      <CommandBlock>{`make dev-app`}</CommandBlock>
      <CommandBlock>{`make dev-apk-proxy`}</CommandBlock>
      <CommandBlock>{`make dev-oci-proxy`}</CommandBlock>
      <DocsP>
        In that shell, run the service. For example,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make run-worker</code> for the worker, or{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">npm run dev</code> from{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-app/</code> for the app.
      </DocsP>

      <DocsH3>Open a shell for database migrations</DocsH3>
      <CommandBlock>{`make dev-migrate`}</CommandBlock>
      <DocsP>
        Then run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make migrate</code> in the same
        shell.
      </DocsP>

      <DocsH3>Stop the dev environment</DocsH3>
      <CommandBlock>{`make dev-stack-down`}</CommandBlock>

      <DocsH2 id="make-help">What each target does</DocsH2>
      <DocsP>
        The canonical list of targets and descriptions is printed by:
      </DocsP>
      <CommandBlock>{`make help`}</CommandBlock>
      <DocsP>Relevant sections for day-to-day development:</DocsP>

      <DocsH3 id="help-development">Development</DocsH3>
      <HelpBlock>{`Development:
  build-worker        - Build worker with embedded builder binaries
  build-worker-release - Build worker for linux/amd64 and linux/arm64 (release)
  build-builder  - Build builder binaries for Linux x86_64 and aarch64
  run-worker     - Run the worker service
  run-oci-proxy  - Run the OCI proxy service
  run-apk-proxy  - Run the APK proxy service`}</HelpBlock>

      <DocsH3 id="help-dev-stack">Local Dev Stack (Docker Swarm)</DocsH3>
      <HelpBlock>{`Local Dev Stack (Docker Swarm):
  dev-stack-up   - Build images and start the full dev stack in Docker Swarm
  dev-stack-down - Stop and remove the dev stack
  dev-worker     - Scale down worker, open shell with DB_URI set; restores on exit
  dev-app        - Scale down app, open shell in securebuild-app/ with DB_URI set; restores on exit
  dev-apk-proxy  - Scale down apk-proxy, open shell with DB_URI set; restores on exit
  dev-oci-proxy  - Scale down oci-proxy, open shell with DB_URI set; restores on exit
  dev-migrate    - Open shell with DB_URI set; run 'make migrate' inside`}</HelpBlock>

      <DocsH3 id="help-database">Database</DocsH3>
      <HelpBlock>{`Database:
  migrate        - Run database migrations using schemahero`}</HelpBlock>

      <DocsH3 id="help-testing">Testing</DocsH3>
      <HelpBlock>{`Testing:
  test-unit                   - Run all unit tests (Go + securebuild-app)
  test-unit-go                - Run Go unit tests only
  test-integration-oci-proxy  - Run OCI proxy integration tests
  test-integration-apk-proxy       - Run APK proxy integration tests
  test-integration-worker          - Run worker integration tests`}</HelpBlock>
      <DocsP>
        Example: <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make test-unit</code>. CI runs these on
        pull requests—use the integration target that matches your change when needed.
      </DocsP>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Introduction
        </Link>
        <Link
          href="/docs/how-it-works"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          How It Works
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
