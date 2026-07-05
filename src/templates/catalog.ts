export const templateCatalog = [
  {
    id: "minimal",
    label: "Minimal",
    cardTitle: "Executive",
    note: "Direct, clean, corporate",
  },
  {
    id: "professional-logo",
    label: "Professional logo",
    cardTitle: "Brand Focus",
    note: "Logo-first and professional",
  },
  {
    id: "professional-photo",
    label: "Professional photo",
    cardTitle: "Founder",
    note: "Human, warm, personal",
  },
  {
    id: "administrative-area",
    label: "Administrative area",
    cardTitle: "Operations",
    note: "Functional and team-oriented",
  },
  {
    id: "scripted-intro",
    label: "Scripted intro",
    cardTitle: "Elegant Intro",
    note: "Handwritten greeting and profile",
  },
  {
    id: "bold-banner",
    label: "Bold banner",
    cardTitle: "Corado Bold",
    note: "Strong split layout with emphasis",
  },
  {
    id: "promo-banner",
    label: "Promo banner",
    cardTitle: "Marketing CTA",
    note: "Contact details with promo strip",
  },
  {
    id: "team-column",
    label: "Team column",
    cardTitle: "Team Column",
    note: "Compact corporate roster style",
  },
  {
    id: "orb-profile",
    label: "Orb profile",
    cardTitle: "Atlas Glow",
    note: "Rounded badge with social row",
  },
  {
    id: "scholar-strip",
    label: "Scholar strip",
    cardTitle: "Scholar Panel",
    note: "Academic or consulting profile",
  },
  {
    id: "property-cta",
    label: "Property CTA",
    cardTitle: "Property CTA",
    note: "Real-estate card with call to action",
  },
  {
    id: "social-stack",
    label: "Social stack",
    cardTitle: "Creator Stack",
    note: "Vertical social rail and soft badge",
  },
  {
    id: "executive-card",
    label: "Executive card",
    cardTitle: "Executive Slate",
    note: "Sharp portrait card with CTA",
  },
  {
    id: "legal-brief",
    label: "Legal brief",
    cardTitle: "Legal Brief",
    note: "Counsel layout with trust accents",
  },
  {
    id: "medical-profile",
    label: "Medical profile",
    cardTitle: "Care Profile",
    note: "Healthcare-ready structure",
  },
  {
    id: "holiday-postcard",
    label: "Holiday postcard",
    cardTitle: "Holiday Note",
    note: "Seasonal greeting with bright promo",
  },
] as const;

export type TemplateId = (typeof templateCatalog)[number]["id"];

export const templateIds = templateCatalog.map((template) => template.id);
