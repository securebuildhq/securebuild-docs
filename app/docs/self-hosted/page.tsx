import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function SelfHostedPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span>/</span>
        <span className="text-foreground">Self-hosted configuration</span>
      </div>

      <DocsH1>Self-hosted configuration</DocsH1>

      <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
        SecureBuild loads service configuration from a YAML file, from process environment
        variables, or from a hosted secrets integration used by the core team. For your own
        environment, use a YAML file on disk or plain environment variables—no proprietary
        secret manager is required.
      </p>

      <DocsH2 id="config-source">How configuration is loaded</DocsH2>
      <DocsP>
        The entry point is the environment variable{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code>.
        Set it as follows:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>YAML file</strong> — Set it to the absolute or relative path of a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.yaml</code> or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.yml</code> file.
          Values are read from the file, then any set environment variables override the same
          keys (using UPPER_SNAKE_CASE names that match the YAML keys).
        </DocsLI>
        <DocsLI>
          <strong>Environment only</strong> — Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE=env</code>.
          Only environment variables are used (same UPPER_SNAKE_CASE naming as YAML keys).
        </DocsLI>
      </DocsUL>
      <DocsP>
        If you run the worker or proxies without setting{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code>,
        the process defaults to the core team&apos;s hosted config path. For self-hosted
        deployments you should always set it explicitly to a YAML path or to{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">env</code>.
      </DocsP>

      <DocsH2 id="canonical-keys">Registry and storage (canonical keys)</DocsH2>
      <DocsP>
        Container images are addressed with a single prefix string (no separate
        &quot;organization&quot; field). Registry authentication uses a normal username and
        password or token (never reuse unrelated API tokens for registry login).
      </DocsP>
      <DocsUL>
        <DocsLI>
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_image_prefix</code> /{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">REGISTRY_IMAGE_PREFIX</code> — Host
          only (e.g. <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">ghcr.io</code>) or host
          with path segments (e.g.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry.example.com/acme/securebuild</code>
          ). No scheme and no image tag.
        </DocsLI>
        <DocsLI>
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_username</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">registry_password</code> — Registry
          credentials for OCI operations.
        </DocsLI>
      </DocsUL>
      <DocsP>
        Object storage uses the existing{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_*</code> fields (AWS SDK–compatible
        S3 client):{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_endpoint</code>,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_access_key</code>,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_secret_key</code>, bucket names, and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_use_path_style</code> for MinIO and similar
        endpoints.
      </DocsP>

      <DocsH2 id="apk-repository">APK repository URL</DocsH2>
      <DocsP>
        The public Alpine package repository base URL is configured with{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_repository</code> /{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">APK_REPOSITORY</code> (HTTPS, no trailing
        slash). The web app inlines{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_APK_REPOSITORY</code> at build
        time for client-side copy. Signing keys use{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_public_key_*</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_signing_key_data</code> as documented in
        the SecureBuild repository.
      </DocsP>

      <DocsH2 id="build-backend">Where builds run</DocsH2>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend</code> selects how package and
        image builds execute:
      </DocsP>
      <DocsUL>
        <DocsLI>
          <strong>local</strong> — Builds run on the same machine as the worker process (suitable for development and
          small deployments). If <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">build_backend</code> is
          left empty and remote VM API settings are not configured, the worker defaults to this mode.
        </DocsLI>
        <DocsLI>
          <strong>static</strong> — Builds run over SSH on hosts listed in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">static_vms</code> (host, user, port, SSH key
          path or inline key material). Use this when you provide your own build machines.
        </DocsLI>
      </DocsUL>
      <DocsP>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">max_parallel_builds</code> caps concurrent
        builds per machine (default 1 when unset or non-positive).
      </DocsP>

      <DocsH2 id="example-file">Example file in the repository</DocsH2>
      <DocsP>
        The SecureBuild git repository includes{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.example.yaml</code> with
        commented placeholders. Copy it to{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.yaml</code> at the repo
        root when using the Docker Swarm dev stack (see below), or place it elsewhere and point{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SECUREBUILD_CONFIG_SOURCE</code> at that path.
      </DocsP>

      <DocsH2 id="optional-api-fields">Optional VM API fields</DocsH2>
      <DocsP>
        The configuration struct still includes parameters for HTTP APIs that provision remote
        builder machines. If you only use <strong>local</strong> or <strong>static</strong> backends, leave those
        fields empty. They are irrelevant to registry and storage configuration described above.
      </DocsP>

      <DocsH2 id="dev-environment">Development environment (full stack)</DocsH2>
      <DocsP>
        For day-to-day work on SecureBuild itself, use the Nix flake, Docker Swarm, and make
        targets defined in the main repository. A condensed workflow:
      </DocsP>
      <DocsUL>
        <DocsLI>
          Install a Docker-compatible runtime and enable Swarm once (
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">docker swarm init</code>).
        </DocsLI>
        <DocsLI>
          From the repo root, copy{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.example.yaml</code> to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-config.yaml</code> and fill in
          values for your environment.
        </DocsLI>
        <DocsLI>
          Create <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">securebuild-app/.env.local</code> with
          at least database, session, and OAuth-related variables expected by the Next.js app (
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">HMAC_SECRET</code>, GitHub OAuth client
          settings, <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_*</code> values, and
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">NEXT_PUBLIC_APK_REPOSITORY</code> matching
          your <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">apk_repository</code>).
        </DocsLI>
        <DocsLI>
          Run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-stack-up</code> to build images
          and deploy the stack (Postgres, migrations, worker, app, apk-proxy, oci-proxy).
        </DocsLI>
        <DocsLI>
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-worker</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-app</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-apk-proxy</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-oci-proxy</code>, or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-migrate</code> to scale a service
          down, open a shell with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">DB_URI</code> (and
          config path for Go services) preset, and restore the stack when you exit the shell.
        </DocsLI>
        <DocsLI>
          Run <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make dev-stack-down</code> to remove the
          stack.
        </DocsLI>
      </DocsUL>
      <DocsP>
        Postgres is published on <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">localhost:15432</code>{" "}
        for host-side tools. The bundled compose file does not yet include MinIO or a local OCI registry; you can add
        S3-compatible storage and a registry alongside the stack and point{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">r2_*</code> and registry fields at those
        endpoints (use path-style addressing for MinIO).
      </DocsP>
      <DocsP>
        More detail on tools, Nix, tests, and individual{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">make</code> targets:{" "}
        <Link href="/docs/development" className="text-primary hover:underline">
          Development environment
        </Link>
        .
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
          href="/docs/development"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Development environment
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
