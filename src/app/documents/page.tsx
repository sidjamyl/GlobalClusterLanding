import type { Metadata } from "next";
import { Intro, ResourceList, ContactCTA } from "@/components/site";
import { resources } from "@/lib/content";
export const metadata: Metadata = {
  title: "Documents et supports",
  description:
    "Consultez les présentations PDF et les vidéos des solutions GlobalCluster.",
  alternates: { canonical: "/documents" },
};
export default function Documents() {
  return (
    <>
      <Intro
        current="Documents"
        title="Les ressources, au même endroit."
        description="Présentations, documents et vidéos : explorez nos solutions à votre rythme."
      />
      <section
        className="container resource-page"
        aria-label="Documents et présentations"
      >
        <ResourceList items={resources} />
      </section>
      <ContactCTA />
    </>
  );
}
