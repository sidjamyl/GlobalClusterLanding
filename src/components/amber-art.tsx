import { Check, FileText, ScanLine, Building2 } from "lucide-react";

const levels=[[35,17,52,29,43],[38,36,34,32,30],[58,61,68,53,35]];
export function Staves({variant}:{variant:number}) {
  return <svg className="staves" viewBox="0 0 100 92" aria-hidden="true">
    {levels[variant].map((cy,i)=><g key={i} style={{animationDelay:i*85+"ms"}}><path d={`M${10+i*17} 8v72`} stroke="currentColor" opacity=".18" strokeDasharray="1 3"/><circle cx={10+i*17} cy={cy} r="3.6" fill="currentColor"/></g>)}
  </svg>;
}

export function DocumentFlow() {
  return <div className="flow-art" aria-hidden="true">
    <svg viewBox="0 0 320 220" preserveAspectRatio="none"><g fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4">
    <path d="M135 35 H184 Q202 35 202 58 V84 Q202 110 226 110 H272 M135 110 H272 M135 185 H184 Q202 185 202 161 V137 Q202 110 226 110"/></g></svg>
    <span><FileText/><b>Facture reçue<small>FAC–2026–024</small></b></span><span><ScanLine/><b>Montant extrait<small>119 000 DA</small></b></span><span><Building2/><b>Fournisseur<small>Atelier Atlas</small></b></span><span><Check/></span>
  </div>;
}

