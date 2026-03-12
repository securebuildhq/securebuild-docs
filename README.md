# SecureBuild Docs

Documentation site for [SecureBuild](https://github.com/securebuildhq/securebuild)—open-source container security for the modern software supply chain. Built with Next.js and deployed for [docs.securebuild.dev](https://docs.securebuild.dev) (or your configured host).

## Prerequisites

- **Node.js** 20+
- **npm**, **pnpm**, or **yarn**

The project enforces Node 20+ via `package.json` `engines` and includes an `.nvmrc` for nvm/fnm.

## Getting started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page and docs will hot-reload as you edit.

## Scripts

| Command      | Description                    |
|-------------|--------------------------------|
| `npm run dev`   | Start Next.js dev server (port 3000) |
| `npm run build` | Production build              |
| `npm run start` | Run production server (after `build`) |


## Links

- **SecureBuild** — [github.com/securebuildhq/securebuild](https://github.com/securebuildhq/securebuild)

## Contributing

Contributions to the docs are welcome. Open an issue or PR in the [main SecureBuild repo](https://github.com/securebuildhq/securebuild-docs).
