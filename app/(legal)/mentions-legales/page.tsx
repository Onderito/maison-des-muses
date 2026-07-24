import type { Metadata } from "next";
import Link from "next/link";

import { legalInformation } from "@/app/legal-information";

export const metadata: Metadata = {
  title: "Mentions légales | Maison des Muses",
  description:
    "Mentions légales du site Maison des Muses, institut de beauté à Saint-Martin-sur-Nohain.",
};

function MissingInformation({ children }: Readonly<{ children: string }>) {
  return (
    <span className="font-medium text-accent">
      {children}
    </span>
  );
}

export default function LegalNoticesPage() {
  return (
    <article className="mt-10 rounded-[36px] border border-white/70 bg-white/55 px-6 py-10 shadow-sm backdrop-blur-md sm:px-10 lg:px-14 lg:py-14">
      <header>
        <p className="font-seasons text-[14px] uppercase tracking-[0.12em] text-accent">
          Informations légales
        </p>
        <h1 className="mt-4 font-ahsing text-[48px] leading-[0.9] tracking-[-0.03em] text-title sm:text-[64px] lg:text-[76px]">
          Mentions légales
        </h1>
        <p className="mt-6 font-seasons text-[16px] leading-relaxed text-desc">
          Dernière mise à jour : {legalInformation.lastUpdated}
        </p>
      </header>

      <div className="mt-12 space-y-10 font-seasons text-[16px] leading-relaxed text-desc">
        <section aria-labelledby="editor">
          <h2 id="editor" className="font-ahsing text-[30px] text-title">
            Édition du site
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-[190px_1fr]">
            <dt>Nom commercial</dt>
            <dd>{legalInformation.businessName}</dd>
            <dt>Exploitante</dt>
            <dd>
              <MissingInformation>{legalInformation.operator}</MissingInformation>
            </dd>
            <dt>Forme juridique</dt>
            <dd>
              <MissingInformation>
                {legalInformation.legalStatus}
              </MissingInformation>
            </dd>
            <dt>Adresse</dt>
            <dd>
              <MissingInformation>
                {legalInformation.postalAddress}
              </MissingInformation>
            </dd>
            <dt>Immatriculation</dt>
            <dd>
              <MissingInformation>
                {legalInformation.registration}
              </MissingInformation>
            </dd>
            <dt>E-mail</dt>
            <dd>
              <MissingInformation>{legalInformation.email}</MissingInformation>
            </dd>
            <dt>Téléphone</dt>
            <dd>
              <MissingInformation>{legalInformation.phone}</MissingInformation>
            </dd>
          </dl>
        </section>

        <section aria-labelledby="publication">
          <h2 id="publication" className="font-ahsing text-[30px] text-title">
            Direction de la publication
          </h2>
          <p className="mt-4">
            <MissingInformation>
              {legalInformation.publicationDirector}
            </MissingInformation>
          </p>
        </section>

        <section aria-labelledby="hosting">
          <h2 id="hosting" className="font-ahsing text-[30px] text-title">
            Hébergement
          </h2>
          <p className="mt-4">
            <MissingInformation>{legalInformation.host}</MissingInformation>
          </p>
        </section>

        <section aria-labelledby="copyright">
          <h2 id="copyright" className="font-ahsing text-[30px] text-title">
            Propriété intellectuelle
          </h2>
          <p className="mt-4">
            Les textes, photographies, illustrations, éléments graphiques,
            logos et autres contenus présents sur ce site sont protégés par le
            droit de la propriété intellectuelle. Toute reproduction,
            représentation, adaptation ou exploitation, totale ou partielle,
            sans autorisation écrite préalable est interdite, sauf exceptions
            prévues par la loi.
          </p>
        </section>

        <section aria-labelledby="liability">
          <h2 id="liability" className="font-ahsing text-[30px] text-title">
            Responsabilité
          </h2>
          <p className="mt-4">
            Maison des Muses s’efforce de fournir des informations exactes et
            à jour. Ces informations restent générales et peuvent être
            modifiées sans préavis. Les liens vers des services tiers sont
            proposés pour faciliter la navigation ; Maison des Muses ne
            contrôle pas leur contenu ni leur disponibilité.
          </p>
        </section>

        <section aria-labelledby="privacy">
          <h2 id="privacy" className="font-ahsing text-[30px] text-title">
            Données personnelles
          </h2>
          <p className="mt-4">
            Les modalités de traitement des données personnelles et
            d’exercice de vos droits sont détaillées dans la{" "}
            <Link
              href="/politique-de-confidentialite"
              className="underline decoration-accent underline-offset-4"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
