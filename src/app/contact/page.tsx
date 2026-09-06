import type { Metadata } from "next";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Intro } from "@/components/site";
import { company } from "@/lib/content";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez GlobalCluster par e-mail ou téléphone. Retrouvez nos coordonnées à El Achour, Alger.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <>
      <Intro
        current="Contact"
        title="Votre besoin est le point de départ."
        description="Une question sur une solution ou sur son utilisation ? Contactez directement l’équipe GlobalCluster."
      />
      <section className="container contact-layout" aria-label="Coordonnées">
        <div className="contact-methods">
          <a className="contact-method" href={"mailto:" + company.email}>
            <Mail />
            <span>
              <small>Écrivez-nous</small>
              <strong>{company.email}</strong>
            </span>
            <ArrowUpRight />
          </a>
          <a className="contact-method" href={"tel:" + company.telephone}>
            <Phone />
            <span>
              <small>Appelez-nous</small>
              <strong>{company.phone}</strong>
            </span>
            <ArrowUpRight />
          </a>
          <p className="small">Depuis l’étranger : +213 770 29 15 05</p>
        </div>
        <div className="address-panel">
          <MapPin size={27} />
          <h2>Retrouvez-nous à Alger.</h2>
          <address>{company.address}</address>
          <div className="social-links">
            <a href={company.facebook}>
              Facebook <ArrowUpRight size={16} />
            </a>
            <a href={company.linkedin}>
              LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
