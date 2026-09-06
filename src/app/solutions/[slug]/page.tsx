import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, Settings2 } from "lucide-react";
import { solutions, resources } from "@/lib/content";
import {
  Action,
  ContactCTA,
  ProductVisual,
  ResourceList,
} from "@/components/site";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  return {
    title: s?.name,
    description: s?.description,
    alternates: { canonical: "/solutions/" + slug },
  };
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <div className="container intro solution-intro">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/#solutions">Solutions</Link>
          <span>/</span>
          <span aria-current="page">{s.name}</span>
        </nav>
        <div className="solution-intro-grid">
          <div>
            <h1>{s.title}</h1>
            <p>{s.description}</p>
            <div className="actions">
              {s.platform && (
                <Action href={s.platform} external>
                  Accéder à {s.name}
                </Action>
              )}
              <Action href="/contact" secondary={!!s.platform}>
                Parlons de vos besoins
              </Action>
            </div>
          </div>
          <div className="solution-identity">
            <span>{s.name}</span>
            <p>{s.audience}</p>
          </div>
        </div>
      </div>
      {s.image && (
        <div className="container inner-product">
          <ProductVisual solution={s} />
        </div>
      )}
      {s.groups.length > 0 ? (
        <section className="container section capabilities">
          <div className="section-heading">
            <h2>Ce que vous pouvez faire.</h2>
            <p>
              Les fonctionnalités présentées par GlobalCluster, organisées
              autour de votre travail.
            </p>
          </div>
          <div className="capability-groups">
            {s.groups.map((g) => (
              <article key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
                <details className="feature-disclosure">
                  <summary>
                    Voir les fonctionnalités <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    {g.features.map((f) => (
                      <li key={f}>
                        <Check size={16} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </article>
            ))}
          </div>
          {slug === "paie-rh" && (
            <p className="source-note">
              Les intitulés des déclarations et des états reprennent les
              fonctionnalités publiées. Leur adéquation à votre situation et aux
              exigences en vigueur est à vérifier avec GlobalCluster.
            </p>
          )}
          {slug === "etats-financiers" && (
            <div className="formats">
              <div>
                <h3>Importez vos données</h3>
                <p>Excel · TXT</p>
              </div>
              <ArrowUpRight aria-hidden="true" />
              <div>
                <h3>Partagez vos états</h3>
                <p>Excel · PDF</p>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="container pr-section">
          <div className="pr-mark">
            <Settings2 size={90} strokeWidth={1} />
          </div>
          <div>
            <h2>PR, pour pièces de rechange.</h2>
            <p>
              Vous gérez un atelier ou une usine ? Présentez-nous votre contexte
              pour échanger sur la solution Gestion PR.
            </p>
            <p>
              Contactez GlobalCluster pour connaître le périmètre fonctionnel et
              les modalités d’accès.
            </p>
            <Link className="text-action" href="/contact">
              Contacter l’équipe <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      )}
      {slug === "paie-rh" && (
        <section className="container section">
          <div className="section-heading">
            <h2>Pour découvrir et prendre en main.</h2>
            <Link href="/guides" className="text-action">
              Tous les guides <ArrowUpRight size={17} />
            </Link>
          </div>
          <ResourceList
            items={[resources[0], resources[2], resources[4]]}
            compact
          />
        </section>
      )}
      <ContactCTA />
    </>
  );
}
