"use client"

export function DocsH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 mt-0">
      {children}
    </h1>
  )
}

export function DocsH2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-3xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t first:border-t-0 first:mt-0 first:pt-0"
    >
      {children}
    </h2>
  )
}

export function DocsH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl font-semibold tracking-tight mb-3 mt-6">
      {children}
    </h3>
  )
}

export function DocsP({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-7 text-foreground mb-4">{children}</p>
}

export function DocsUL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 mb-6 ml-4">
      {children}
    </ul>
  )
}

export function DocsLI({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-base leading-7 text-foreground list-disc">
      {children}
    </li>
  )
}
