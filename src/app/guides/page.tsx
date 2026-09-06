import type { Metadata } from "next";
import { Intro, ResourceList, ContactCTA } from "@/components/site";
import { resources } from "@/lib/content";
export const metadata: Metadata = {
  title: "Guides vidéo",
  description:
    "Découvrez les guides vidéo GlobalCluster pour prendre en main la paie et créer vos bulletins.",
  alternates: { canonical: "/guides" },
};
export default function Guides() {
  return (
    <>
      <Intro
        current="Guides"
        title="Voir les gestes. Prendre ses repères."
        description="Les guides vidéo vous accompagnent dans la découverte de Paie et RH et la création de vos bulletins."
      />
      <section className="container resource-page" aria-label="Guides vidéo">
        <ResourceList items={resources.filter((r) => r.guide)} />
      </section>
      <ContactCTA />
    </>
  );
}
