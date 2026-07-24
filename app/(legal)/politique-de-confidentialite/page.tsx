import type { Metadata } from "next";

import { legalInformation } from "@/app/legal-information";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Maison des Muses",
  description:
    "Politique de confidentialité et protection des données personnelles de Maison des Muses.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mt-10 rounded-[36px] border border-white/70 bg-white px-6 py-10 shadow-sm sm:px-10 lg:bg-white/55 lg:px-14 lg:py-14 lg:backdrop-blur-md">
      <header>
        <p className="font-seasons text-[14px] uppercase tracking-[0.12em] text-accent">
          Vos données
        </p>
        <h1 className="mt-4 font-ahsing text-[44px] leading-[0.9] tracking-[-0.03em] text-title sm:text-[60px] lg:text-[72px]">
          Politique de confidentialité
        </h1>
        <p className="mt-6 font-seasons text-[16px] leading-relaxed text-desc">
          Dernière mise à jour : {legalInformation.lastUpdated}
        </p>
      </header>

      <div className="mt-12 space-y-10 font-seasons text-[16px] leading-relaxed text-desc">
        <section aria-labelledby="controller">
          <h2 id="controller" className="font-ahsing text-[30px] text-title">
            Responsable du traitement
          </h2>
          <p className="mt-4">
            Le responsable du traitement est {legalInformation.businessName},
            situé à {legalInformation.location}. Les informations
            administratives et l’adresse électronique de contact doivent être
            complétées dans les mentions légales avant la publication du site.
          </p>
        </section>

        <section aria-labelledby="site-data">
          <h2 id="site-data" className="font-ahsing text-[30px] text-title">
            Données collectées sur le site
          </h2>
          <p className="mt-4">
            À la date de mise à jour de cette politique, le site ne comporte
            aucun formulaire, espace client, paiement en ligne, inscription à
            une newsletter ou outil de mesure d’audience. Maison des Muses ne
            collecte donc directement aucune donnée personnelle pendant votre
            simple consultation du site.
          </p>
          <p className="mt-4">
            Des données techniques indispensables au fonctionnement et à la
            sécurité du site peuvent néanmoins être traitées par l’hébergeur :
            adresse IP, date et heure de connexion, type de navigateur, pages
            demandées et journaux techniques.
          </p>
        </section>

        <section aria-labelledby="social-contact">
          <h2
            id="social-contact"
            className="font-ahsing text-[30px] text-title"
          >
            Contact et prise de rendez-vous
          </h2>
          <p className="mt-4">
            Les demandes sont effectuées sur Instagram. Lorsque vous contactez
            Maison des Muses, les informations que vous choisissez de
            transmettre — par exemple votre nom, votre identifiant, vos
            coordonnées, la prestation souhaitée et vos disponibilités — sont
            utilisées uniquement pour répondre à votre demande et organiser
            votre rendez-vous.
          </p>
          <p className="mt-4">
            Ce traitement repose sur votre demande et sur les mesures
            précontractuelles ou contractuelles nécessaires à la réservation.
            Instagram traite par ailleurs vos données selon ses propres
            conditions et sa propre politique de confidentialité.
          </p>
        </section>

        <section aria-labelledby="purposes">
          <h2 id="purposes" className="font-ahsing text-[30px] text-title">
            Finalités, destinataires et conservation
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            <li>répondre aux demandes d’information ;</li>
            <li>organiser, confirmer et suivre les rendez-vous ;</li>
            <li>assurer la sécurité et le bon fonctionnement du site ;</li>
            <li>respecter les obligations légales et comptables applicables.</li>
          </ul>
          <p className="mt-4">
            Les données sont accessibles uniquement à Maison des Muses et, dans
            la mesure nécessaire, aux prestataires techniques ou plateformes
            utilisés. Elles sont conservées pendant la durée nécessaire à la
            finalité concernée, puis archivées ou supprimées selon les délais
            légaux applicables. Les pièces comptables, lorsqu’elles existent,
            peuvent notamment être conservées dix ans.
          </p>
        </section>

        <section aria-labelledby="transfers">
          <h2 id="transfers" className="font-ahsing text-[30px] text-title">
            Services tiers et transferts
          </h2>
          <p className="mt-4">
            Le site contient des liens vers Instagram, TikTok et YouTube. Ces
            services peuvent traiter des données hors de l’Espace économique
            européen selon leurs propres politiques et mécanismes de
            protection. Aucun contenu social n’est directement intégré dans la
            page : ces traitements commencent lorsque vous choisissez de
            suivre un lien externe.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies" className="font-ahsing text-[30px] text-title">
            Cookies
          </h2>
          <p className="mt-4">
            Le site ne dépose actuellement aucun cookie publicitaire ou de
            mesure d’audience. Des traceurs strictement nécessaires peuvent
            être utilisés par l’infrastructure technique pour assurer la
            sécurité et le fonctionnement du service. Si un outil d’analytics,
            une vidéo intégrée ou un autre traceur non essentiel est ajouté,
            cette politique sera mise à jour et votre consentement sera demandé
            lorsque la loi l’exige.
          </p>
        </section>

        <section aria-labelledby="rights">
          <h2 id="rights" className="font-ahsing text-[30px] text-title">
            Vos droits
          </h2>
          <p className="mt-4">
            Selon votre situation, vous disposez de droits d’accès, de
            rectification, d’effacement, d’opposition, de limitation et de
            portabilité de vos données. Vous pouvez actuellement adresser votre
            demande par message privé à{" "}
            <a
              href={legalInformation.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent underline-offset-4"
            >
              {legalInformation.instagramLabel}
            </a>
            . Une adresse e-mail dédiée devra être ajoutée ici avant la
            publication.
          </p>
          <p className="mt-4">
            Si vous estimez, après nous avoir contactés, que vos droits ne sont
            pas respectés, vous pouvez déposer une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent underline-offset-4"
            >
              CNIL
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="updates">
          <h2 id="updates" className="font-ahsing text-[30px] text-title">
            Mise à jour
          </h2>
          <p className="mt-4">
            Cette politique peut évoluer pour tenir compte des changements du
            site, des outils utilisés ou de la réglementation. La date de
            dernière mise à jour figure en haut de la page.
          </p>
        </section>
      </div>
    </article>
  );
}
