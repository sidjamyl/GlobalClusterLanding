import type { Metadata } from "next";
import { InvoiceJourney, ProductExplorer } from "@/components/home-product";

export const metadata: Metadata = {
  title: "Démonstrations des applications",
  description: "Parcourez les applications Global Cluster et suivez un exemple de traitement de facture.",
  alternates: {canonical:"/applications"}
};

export default function Applications(){
  return <><div className="sheet demo-heading"><h1>Les applications<br/><span>en pratique.</span></h1></div><ProductExplorer/><InvoiceJourney/></>;
}
