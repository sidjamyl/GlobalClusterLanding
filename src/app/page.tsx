import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import {
  Action,
  ContactCTA,
  ProductVisual,
  ResourceList,
  SolutionIcon,
} from "@/components/site";
import { resources, solutions } from "@/lib/content";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero container">
        <h1>
          Solutions de gestion pour <span>entrepreneurs et ETI</span>
        </h1>
        <p>
          Nous investissons nos ressources dans la qualité de nos produits et
          nous veillons à leur accessibilité pour tous.
        </p>
        <div className="actions">
          <Action href="#solutions">Découvrir les solutions</Action>
          <Action href="/plateformes" secondary>
            Accéder aux plateformes
          </Action>
        </div>
        <ProductVisual solution={solutions[0]} hero />
      </section>
      <section id="solutions" className="container section solutions-section">
        <div className="section-heading">
          <h2>
            À chaque métier,
            <br />
            sa solution.
          </h2>
          <p>
            Paie, états financiers ou pièces de rechange : trouvez l’outil qui
            répond à votre activité.
          </p>
        </div>
        <div className="solution-overview">
          {solutions.map((s) => (
            <Link
              href={"/solutions/" + s.slug}
              key={s.slug}
              className="solution-link"
            >
              <div className="solution-top">
                <SolutionIcon slug={s.slug} />
                <ArrowUpRight size={23} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.short}</p>
              <span className="solution-audience">{s.audience}</span>
              <span className="text-action">
                Découvrir la solution <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="features-section">
        <div className="container section">
          <div className="section-heading">
            <h2>
              Le détail compte.
              <br />
              La vue d’ensemble aussi.
            </h2>
            <p>
              Des fonctionnalités concrètes pour organiser vos dossiers et
              suivre vos opérations.
            </p>
          </div>
          <div className="feature-split">
            <div className="feature-copy">
              <span className="product-label">Paie et RH</span>
              <h3>
                Une paie structurée,
                <br />
                du début à la fin.
              </h3>
              <p>
                Paramétrez vos dossiers, préparez vos variables et retrouvez
                l’historique de vos bulletins dans un même environnement.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  Dossiers et droits utilisateurs paramétrables
                </li>
                <li>
                  <Check />
                  Saisie des variables avec Excel
                </li>
                <li>
                  <Check />
                  Calcul, validation et paiement de la paie
                </li>
              </ul>
              <Link className="text-action" href="/solutions/paie-rh">
                Explorer Paie et RH <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="feature-image payroll-detail">
              <Image
                src="/assets/payroll.webp"
                alt="Les trois options de création d’un salarié dans GlobalCluster."
                width={1520}
                height={771}
                sizes="(max-width: 768px) 92vw, 620px"
              />
              <div className="image-caption">
                Profils, fiches et création de salariés
              </div>
            </div>
          </div>
          <div className="feature-split reverse">
            <div className="feature-copy">
              <span className="product-label">États financiers</span>
              <h3>
                Vos exercices passés
                <br />
                éclairent votre reporting.
              </h3>
              <p>
                Préparez vos états financiers à partir de vos données comptables
                et conservez l’historique de vos exercices.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  Import des données Excel et TXT
                </li>
                <li>
                  <Check />
                  États financiers et liasse fiscale
                </li>
                <li>
                  <Check />
                  Reporting personnalisé, exports Excel et PDF
                </li>
              </ul>
              <Link className="text-action" href="/solutions/etats-financiers">
                Explorer les états financiers <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="feature-image finance-detail">
              <Image
                src="/assets/finance.webp"
                alt="Indicateurs de résultat et de bilan dans la solution États financiers."
                width={1830}
                height={615}
                sizes="(max-width: 768px) 92vw, 620px"
              />
              <div className="image-caption">
                Indicateurs de résultat et de bilan · Capture source
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>
            Découvrez les outils.
            <br />
            Prenez vos repères.
          </h2>
          <Link className="text-action" href="/documents">
            Toutes les ressources <ArrowUpRight size={17} />
          </Link>
        </div>
        <ResourceList
          items={[resources[0], resources[4], resources[2]]}
          compact
        />
      </section>
      <ContactCTA />
    </>
  );
}
