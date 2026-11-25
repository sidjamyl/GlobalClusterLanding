import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Intro, SolutionIcon, Action } from "@/components/site";
import { solutions } from "@/lib/content";
export const metadata: Metadata = {
  title: "Accéder aux plateformes",
  description:
    "Retrouvez les accès directs aux applications GlobalCluster Paie et RH et États financiers.",
  alternates: { canonical: "/plateformes" },
};
export default function Platforms() {
  return (
    <>
      <Intro
        current="Plateformes"
        title="Retrouvez votre espace de travail."
        description="Choisissez votre application GlobalCluster pour accéder à votre plateforme habituelle."
      />
      <section
        className="container platform-list"
        aria-label="Applications GlobalCluster"
      >
        <article className="platform-entry">
          <div className="platform-icon"><SolutionIcon slug="etats-financiers" /></div>
          <div><h2>Global Cluster</h2><p>Retrouvez les applications de votre société dans votre espace de gestion.</p><span className="external-note"><ExternalLink size={14}/> Application externe · globalcluster-dz.net</span></div>
          <Action href="https://globalcluster-dz.net/GCS" external>Ouvrir mon espace</Action>
        </article>
        {solutions
          .filter((s) => s.platform)
          .map((s) => (
            <article className="platform-entry" key={s.slug}>
              <div className="platform-icon">
                <SolutionIcon slug={s.slug} />
              </div>
              <div>
                <h2>{s.name}</h2>
                <p>{s.description}</p>
                <span className="external-note">
                  <ExternalLink size={14} /> Application externe ·
                  globalcluster-dz.net
                </span>
              </div>
              <Action href={s.platform!} external>
                Ouvrir {s.name}
              </Action>
            </article>
          ))}
        <div className="platform-help">
          <div>
            <h2>Vous cherchez Gestion PR ?</h2>
            <p>
              Contactez-nous pour connaître les modalités d’accès à la solution.
            </p>
          </div>
          <Link className="text-action" href="/contact">
            Nous contacter <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
