import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Landmark, UsersRound, Warehouse } from "lucide-react";
import { AssetGlobe } from "@/components/asset-globe";
import { DocumentFlow, Staves } from "@/components/amber-art";
import { DemoForm, LedgerStage, MotionSection } from "@/components/amber-motion";

export const metadata: Metadata = {
  title: {absolute:"Global Cluster — La gestion de vos sociétés"},
  description:"Factures, immobilisations, paie et états financiers. Retrouvez les applications Global Cluster pour chaque société.",
  alternates:{canonical:"/"}
};
const gestures=[
  ["Suivre","Ventes, créances et trésorerie. Retrouvez les chiffres de la société sur laquelle vous travaillez."],
  ["Traiter","De la facture reçue à la pièce approuvée, gardez le fil des justificatifs fournisseurs."],
  ["Clôturer","Contrôlez la balance comptable avant de préparer vos états financiers."]
];
const apps=[
  ["GC Suite","Ventes, créances et trésorerie","/plateformes"],
  ["GC Connect","Pièces et factures fournisseurs","/plateformes"],
  ["GC Assets","Immobilisations et amortissements","/plateformes"],
  ["GC Tax Reporting","Balance et états financiers","/solutions/etats-financiers"],
  ["GC Payroll","Dossiers salariés et bulletins de paie","/solutions/paie-rh"],
  ["Gestion PR","Pièces de rechange en atelier","/solutions/gestion-pr"]
];

export default function Home(){
 return <div className="amber-home">
  <section aria-labelledby="amber-title"><div className="sheet hero-copy">
    <div><h1 id="amber-title">Vos sociétés.<br/><span>Une seule vue.</span></h1>
    <p>De la facture au bilan, retrouvez vos comptes,<br className="desktop-break"/> vos équipes et vos actifs dans Global Cluster.</p></div><DemoForm/>
  </div><LedgerStage/></section>
  <MotionSection className="sheet gestures"><h2>Chaque société a ses comptes.<br/><span>Gardez le fil de chacun.</span></h2>
    <div className="gesture-row">{gestures.map(([title,copy],i)=><article key={title}><Staves variant={i}/><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </MotionSection>
  <MotionSection className="focus-passage" id="de-la-piece-au-bilan">
    <p>
      <span>Une facture entre dans vos comptes.</span>{" "}
      <span>Votre trésorerie se précise.</span>{" "}
      <span>Le bilan prend forme.</span>
    </p>
  </MotionSection>
  <MotionSection className="sheet features" id="applications">
    <header><div><small>Applications</small><h2>Des pièces aux actifs,<br/><span>suivez chaque mouvement.</span></h2></div>
    <p>Deux regards sur votre activité. L’un suit le chemin d’une facture, l’autre la répartition de vos immobilisations.</p></header>
    <div className="diptych">
    <article className="art-card copper"><DocumentFlow/><div><small>GC Connect</small><h3>De la facture reçue à la pièce approuvée.</h3><p>Réception, extraction, contrôle. Suivez chaque justificatif jusqu’à son approbation.</p></div></article>
    <article className="art-card opal"><AssetGlobe/><div><small>GC Assets</small><h3>Votre parc, sous tous ses angles.</h3><p>Consultez la répartition de vos actifs et suivez leur amortissement.</p></div></article>
    </div>
    <div className="feature-notes">{[
      {Icon:Landmark,title:"Préparez la clôture.",copy:"Contrôlez les soldes de la balance avant d’établir vos états financiers.",href:"/solutions/etats-financiers"},
      {Icon:UsersRound,title:"Retrouvez chaque bulletin.",copy:"Passez du dossier salarié à ses variables de paie et à son historique.",href:"/solutions/paie-rh"},
      {Icon:Warehouse,title:"Suivez les pièces en atelier.",copy:"Retrouvez les références et les mouvements de vos pièces de rechange.",href:"/solutions/gestion-pr"}
    ].map(({Icon,title,copy,href})=><Link href={href} key={href}><Icon size={19}/><h3>{title}</h3><p>{copy}</p></Link>)}</div>
  </MotionSection>
  <section className="sheet app-index"><h2>Les applications<br/><span>de Global Cluster.</span></h2><div>{apps.map(([name,detail,href])=><Link key={name} href={href}><strong>{name}</strong><span>{detail}</span><ArrowUpRight size={19}/></Link>)}</div></section>
  <section className="sheet final-demo"><h2>Parlons de <span>votre gestion.</span></h2><DemoForm/></section>
 </div>
}
