import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Play,
  UsersRound,
  ChartNoAxesCombined,
  Settings2,
  MousePointer2,
  Mail,
  Phone,
} from "lucide-react";
import {
  company,
  solutions,
  type Resource,
  type Solution,
} from "@/lib/content";

export function SolutionIcon({ slug }: { slug: string }) {
  const Icon =
    slug === "paie-rh"
      ? UsersRound
      : slug === "etats-financiers"
        ? ChartNoAxesCombined
        : Settings2;
  return <Icon size={25} strokeWidth={1.6} aria-hidden="true" />;
}
export function Action({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <Link href={href} className={secondary ? "button secondary" : "button"}>
      {children}
      {external ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}
    </Link>
  );
}
export function Intro({
  title,
  description,
  current,
}: {
  title: string;
  description: string;
  current: string;
}) {
  return (
    <div className="container intro">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{current}</span>
      </nav>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function ProductVisual({
  solution,
  hero = false,
}: {
  solution: Solution;
  hero?: boolean;
}) {
  if (!solution.image) return null;
  return (
    <figure className={hero ? "product-visual hero-visual" : "product-visual"}>
      <div className="product-stage">
        <div className="product-window">
          <div className="window-bar">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>
              GlobalCluster <span className="window-separator">/</span>{" "}
              {solution.name}
            </span>
            <span className="window-tag">Aperçu produit</span>
          </div>
          <Image
            src={solution.image}
            alt={solution.alt ?? solution.name}
            width={solution.slug === "paie-rh" ? 1520 : 1830}
            height={solution.slug === "paie-rh" ? 771 : 615}
            priority={hero}
            sizes={
              hero
                ? "(max-width: 768px) 94vw, 1080px"
                : "(max-width: 768px) 92vw, 1000px"
            }
            className="product-image"
          />
        </div>
        {hero && (
          <div className="cursor-decoration" aria-hidden="true">
            <span className="capability-cursor cursor-one">
              <MousePointer2 size={29} fill="currentColor" />
              <span>Multi-dossiers</span>
            </span>
            <span className="capability-cursor cursor-two">
              <MousePointer2 size={29} fill="currentColor" />
              <span>Profils salariés</span>
            </span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{solution.name}</span> · Capture de l’interface publiée par
        GlobalCluster.
      </figcaption>
    </figure>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta container">
      <div>
        <h2>Parlons de votre gestion.</h2>
        <p>Une question sur nos solutions ? Échangeons sur vos besoins.</p>
      </div>
      <Action href="/contact">Nous contacter</Action>
    </section>
  );
}
export function ResourceList({
  items,
  compact = false,
}: {
  items: Resource[];
  compact?: boolean;
}) {
  const Heading = compact ? "h3" : "h2";
  return (
    <div className={compact ? "resource-list compact" : "resource-list"}>
      {items.map((r) => {
        const navigate = compact && r.type === "Vidéo";
        return (
          <article
            className="resource-item"
            key={r.id}
            id={!compact ? r.id : undefined}
          >
            <div className="resource-symbol">
              {r.type === "PDF" ? <FileText size={24} /> : <Play size={24} />}
            </div>
            <div className="resource-content">
              <span className="resource-type">
                {r.type}
                {r.guide ? " · Guide" : ""}
              </span>
              <Heading>{r.title}</Heading>
              <p>{r.description}</p>
              {r.type === "Vidéo" && !compact && (
                <details className="video-disclosure">
                  <summary>
                    Lire la vidéo <Play size={15} />
                  </summary>
                  <video
                    controls
                    preload="none"
                    playsInline
                    aria-label={r.title}
                  >
                    <source src={r.path} type="video/mp4" />
                    Votre navigateur ne peut pas lire cette vidéo. Utilisez le
                    lien de téléchargement.
                  </video>
                  <p className="small">
                    La vidéo d’origine est fournie sans sous-titres vérifiés.
                  </p>
                </details>
              )}
            </div>
            <a
              className="resource-action"
              href={navigate ? "/documents#" + r.id : r.path}
              download={navigate ? undefined : true}
              aria-label={`${navigate ? "Voir la vidéo" : "Télécharger le fichier " + r.type} : ${r.title}`}
            >
              <span>
                {navigate ? "Voir" : r.type === "PDF" ? "PDF" : "Télécharger"}
              </span>
              {navigate ? <ArrowUpRight size={20} /> : <Download size={20} />}
            </a>
          </article>
        );
      })}
    </div>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="GlobalCluster — Accueil">
            <Image
              src="/wp-content/uploads/2022/12/logo_globalcluster.png"
              alt="GlobalCluster"
              width={112}
              height={100}
            />
          </Link>
          <p>
            Des solutions de gestion.
            <br />
            Une vision d’ensemble.
          </p>
        </div>
        <div>
          <h2>Solutions</h2>
          {solutions.map((s) => (
            <Link key={s.slug} href={"/solutions/" + s.slug}>
              {s.name}
            </Link>
          ))}
          <Link href="/plateformes">
            Accéder aux plateformes <ArrowUpRight size={14} />
          </Link>
        </div>
        <div>
          <h2>Ressources</h2>
          <Link href="/documents">Documents & supports</Link>
          <Link href="/guides">Guides vidéo</Link>
          <Link href="/contact">Nous contacter</Link>
        </div>
        <div className="footer-contact">
          <h2>Restons en contact</h2>
          <a href={"mailto:" + company.email}>
            <Mail size={15} />
            {company.email}
          </a>
          <a href={"tel:" + company.telephone}>
            <Phone size={15} />
            {company.phone}
          </a>
          <address>{company.address}</address>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GlobalCluster</span>
        <div>
          <a href={company.facebook}>
            Facebook <ArrowUpRight size={13} />
          </a>
          <a href={company.linkedin}>
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
        <span>Alger, Algérie</span>
      </div>
    </footer>
  );
}
