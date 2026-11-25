"use client";
import { useEffect, useRef } from "react";
import { Building2, FileText, Landmark, Layers3, Warehouse, Check, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/content";

export function DemoForm() {
  return <form className="demo-form" onSubmit={event => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    const body = "Bonjour, je souhaite découvrir Global Cluster." + (email ? "\nMon adresse professionnelle : " + email : "");
    window.location.href = "mailto:" + company.email + "?subject=Démo%20Global%20Cluster&body=" + encodeURIComponent(body);
  }}>
    <input type="email" name="email" autoComplete="email" aria-label="Votre e-mail professionnel" placeholder="Votre e-mail pro" />
    <button>Demander une démo</button>
  </form>;
}

export function LedgerStage() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(250, node.offsetHeight * .85)));
      node.style.setProperty("--travel", String(progress));
      node.dataset.folded = String(progress > .56);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, {passive:true});
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  return <div className="ledger-stage" ref={stage} role="img" aria-label="Exemple fictif de suivi des sociétés, de la trésorerie et des pièces comptables">
    <div className="ledger-set" aria-hidden="true">
      <div className="ledger-window ledger-left"><small>Mon environnement</small><h3>Mes sociétés</h3>
      <div className="ledger-list">
        <div><Building2/><span>Atelier Atlas</span><em>Alger</em></div>
        <div><Warehouse/><span>Manufacture Est</span><em>Sétif</em></div>
        <div><Layers3/><span>Studio Tell</span><em>Oran</em></div>
      </div></div>
      <div className="ledger-window ledger-center"><small>Tableau de bord</small><h3>Trésorerie</h3>
      <div className="amount"><small>Encaissements</small><strong>1 350 000 <sup>DA</sup></strong><ArrowDownLeft/></div>
      <div className="amount"><small>Décaissements</small><strong>820 000 <sup>DA</sup></strong><ArrowUpRight/></div>
      <div className="ledger-foot"><Landmark size={12}/> Synthèse de la période</div></div>
      <div className="ledger-window ledger-right"><small>GC Connect</small><h3>Pièces fournisseurs</h3>
      <div className="ledger-list">
      <div><FileText/><span>Facture 024</span><em>Reçue</em></div>
      <div><FileText/><span>Facture 023</span><em>À contrôler</em></div>
      <div><Check/><span>Facture 022</span><em>Approuvée</em></div></div></div>
    </div>
  </div>;
}

export function MotionSection({children,className,id}:{children:React.ReactNode;className:string;id?:string}) {
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const el=ref.current;
    if (!el) return;
    const observer=new IntersectionObserver(([entry])=>{el.dataset.play=String(entry.isIntersecting);},{threshold:.12});
    observer.observe(el);
    return ()=>observer.disconnect();
  },[]);
  return <section ref={ref} id={id} className={className}>{children}</section>;
}
