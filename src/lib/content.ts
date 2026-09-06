export const company = {
  email: "contact@globalcluster.net",
  phone: "0770 29 15 05",
  telephone: "+213770291505",
  address:
    "Coopérative Ouahrani Abdelkader, 16106 Oued Romane El Achour, Alger, Algérie.",
  facebook: "https://www.facebook.com/IBSOFTWARE/",
  linkedin: "https://www.linkedin.com/company/ib-software-sarl",
};
export type Solution = {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  audience: string;
  platform?: string;
  image?: string;
  alt?: string;
  groups: { title: string; summary: string; features: string[] }[];
};
export const solutions: Solution[] = [
  {
    slug: "paie-rh",
    name: "Paie et RH",
    short:
      "De la fiche salarié au bulletin de paie, réunissez vos opérations de paie et de ressources humaines.",
    title: "Votre paie, vos équipes. Un même espace.",
    description:
      "Une solution de gestion de la paie et des ressources humaines pour les entreprises et les professionnels de la comptabilité.",
    audience: "Entreprises & profession comptable",
    platform: "https://globalcluster-dz.net/GlobalClusterPayroll",
    image: "/assets/payroll.webp",
    alt: "Interface GlobalCluster : création d’un salarié à partir d’un profil, d’une fiche ou d’une nouvelle création.",
    groups: [
      {
        title: "Paramétrage & flexibilité",
        summary:
          "Adaptez vos dossiers, vos règles de paie et les droits d’accès à votre organisation.",
        features: [
          "Multi-dossiers, multi-établissements et navigation entre dossiers",
          "Gestion multi-utilisateurs et droits utilisateurs évolués",
          "Récupération des historiques et historique du salarié",
          "Rubriques, algorithme de calcul et variables de paie paramétrables",
          "Confidentialité des salaires",
          "Profils et bulletins modèles",
          "Connexion aux pointeuses",
        ],
      },
      {
        title: "Opérations & traitements",
        summary:
          "Préparez les variables et suivez votre paie, du calcul à la validation et au paiement.",
        features: [
          "Report automatique de période et variables de paie reportables",
          "Simulation rapide des bulletins et calcul de paie à l’envers",
          "Saisie des variables en ligne ou avec Excel",
          "Confidentialité par salarié",
          "Historique des bulletins et envoi par e-mail",
          "Workflow de paie : calcul, validation, paiement",
          "Gestion des congés et des soldes de tout compte (STC)",
          "Gestion des prêts et des acomptes",
        ],
      },
      {
        title: "Conformité & reporting",
        summary:
          "Retrouvez les déclarations, les états de paie et les interfaces comptables présentés par la solution.",
        features: [
          "Déclarations mensuelles, DAS CNAS et DAS Cacobath",
          "301 BIS et document ATS",
          "Livre de paie, journal de paie et regroupements",
          "Comptabilité analytique et écritures comptables",
          "Interface avec la comptabilité",
          "Comptes de reporting et modèle Power BI",
        ],
      },
      {
        title: "Application mobile & RH",
        summary:
          "Prolongez la gestion des salariés avec les documents RH et l’accès mobile.",
        features: [
          "Documents administratifs : attestations et certificats de travail, titres de congé et relevés des émoluments",
          "EDI entrées/sorties (« turnover ») et mutation des salariés",
          "Envoi de documents par e-mail et reporting RH",
          "Profil de salarié personnalisé",
          "Ouverture SIRH",
          "Application mobile salarié",
        ],
      },
    ],
  },
  {
    slug: "etats-financiers",
    name: "États financiers",
    short:
      "Préparez, éditez et archivez vos états financiers. Gardez vos exercices et votre reporting à portée de main.",
    title: "Vos états financiers, dans la continuité de vos comptes.",
    description:
      "De la balance aux états financiers, organisez la préparation, l’édition et l’archivage de vos documents comptables.",
    audience: "Gestionnaires & professionnels comptables",
    platform: "https://globalcluster-dz.net/Etats_Financiers",
    image: "/assets/finance.webp",
    alt: "Capture GlobalCluster des indicateurs de résultat et de bilan, avec historique des exercices.",
    groups: [
      {
        title: "Paramétrage & flexibilité",
        summary:
          "Structurez vos dossiers et personnalisez vos calculs, tout en conservant vos archives.",
        features: [
          "Multi-dossiers, multi-établissements et navigation entre dossiers",
          "Gestion multi-utilisateurs et confidentialité",
          "Calcul par rubriques, lignes paramétrables et algorithme de calcul",
          "Archivage des états",
        ],
      },
      {
        title: "Opérations & reporting",
        summary:
          "Rassemblez vos données comptables et préparez les états utiles à votre activité.",
        features: [
          "États financiers et liasse fiscale",
          "Balance des comptes et journaux des opérations",
          "Import de données Excel et TXT",
          "Business Intelligence intégrée",
          "Export Excel et PDF",
          "Historique des exercices antérieurs",
          "Reporting personnalisé",
        ],
      },
    ],
  },
  {
    slug: "gestion-pr",
    name: "Gestion PR",
    short:
      "La gestion des pièces de rechange, pensée pour les ateliers et les usines.",
    title: "Les pièces de rechange ont leur solution de gestion.",
    description:
      "Gestion PR est l’offre GlobalCluster dédiée à la gestion des pièces de rechange pour les ateliers et les usines.",
    audience: "Ateliers & usines",
    groups: [],
  },
];
export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Vidéo";
  path: string;
  guide: boolean;
};
export const resources: Resource[] = [
  {
    id: "presentation",
    title: "Présentation de GlobalCluster",
    description: "Le document de présentation de la solution.",
    type: "PDF",
    path: "/wp-content/uploads/2025/01/Global-Cluster-presentation-VF.pdf",
    guide: false,
  },
  {
    id: "overview",
    title: "Découvrir Paie et RH en vidéo",
    description:
      "Une présentation pour découvrir la solution et son interface.",
    type: "Vidéo",
    path: "/wp-content/uploads/2025/02/GCP-FINALE-EN-2.mp4",
    guide: true,
  },
  {
    id: "mobile",
    title: "L’application mobile salarié",
    description:
      "Découvrez l’application mobile à travers sa présentation vidéo.",
    type: "Vidéo",
    path: "/wp-content/uploads/2025/04/Application-Mobile-Video.mp4",
    guide: false,
  },
  {
    id: "getting-started",
    title: "Document de prise en main",
    description:
      "Support publié pour découvrir la solution. Les conditions commerciales actuelles sont à confirmer auprès de GlobalCluster.",
    type: "PDF",
    path: "/wp-content/uploads/2025/04/Tester-ici-la-version-gratuite-sur-un-mois-1.pdf",
    guide: false,
  },
  {
    id: "payslips",
    title: "Créer les bulletins de paie",
    description: "Un guide vidéo consacré à la création des bulletins.",
    type: "Vidéo",
    path: "/wp-content/uploads/2025/04/Creation-des-bulletins-V1.0.mp4",
    guide: true,
  },
];
export const routes = [
  "/",
  ...solutions.map((s) => `/solutions/${s.slug}`),
  "/plateformes",
  "/documents",
  "/guides",
  "/contact",
];
