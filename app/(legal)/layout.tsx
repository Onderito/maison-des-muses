import Link from "next/link";

export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-[calc(100svh-76px)] px-4 py-12 sm:px-8 lg:px-12 lg:py-16 xl:min-h-[calc(100svh-104px)]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-seasons text-[16px] text-desc transition-colors hover:text-title"
        >
          <span aria-hidden="true">←</span>
          Retour à l’accueil
        </Link>

        {children}

        <nav
          aria-label="Navigation légale"
          className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/60 pt-6 font-seasons text-[15px] text-desc"
        >
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/politique-de-confidentialite">
            Politique de confidentialité
          </Link>
        </nav>
      </div>
    </main>
  );
}
