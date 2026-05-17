import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand)]">
          404 · bug not found
        </div>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          This page slipped through QA.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The link doesn't match any of our routes. Let's get you back.
        </p>
        <Link
          href="/"
          className="glow-ring mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-cream"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
