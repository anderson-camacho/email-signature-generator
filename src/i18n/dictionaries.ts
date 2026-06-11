export const locales = ["es", "en", "pt-BR", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  "pt-BR": "Português (Brasil)",
  fr: "Français",
  de: "Deutsch",
};

const es = {
  language: "Idioma",
  title: "Generador gratuito de firmas para Gmail",
  promise:
    "Crea una firma profesional para Gmail gratis, sin registrarte y directamente desde tu navegador.",
  privacy:
    "Tus datos permanecen en este dispositivo y no se envían a servidores.",
  generator: "Generador",
  guide: "Guía de Gmail",
  templates: "Plantillas",
  faq: "Preguntas frecuentes",
  privacyPage: "Privacidad",
  form: "Personaliza tu firma",
  preview: "Vista previa",
  copy: "Copiar firma",
  download: "Descargar HTML",
  export: "Exportar JSON",
  import: "Importar JSON",
  clear: "Borrar datos locales",
  saved: "Borrador guardado localmente.",
  localWarning:
    "La imagen local solo sirve para previsualización. Usa una URL HTTPS pública antes de copiar la firma definitiva.",
  copied: "Firma copiada. Pégala en Gmail y envía un correo de prueba.",
  invalid: "Revisa los campos marcados o el archivo importado.",
  cleared: "Datos locales eliminados.",
  about:
    "Optimizado para Gmail. La apariencia puede variar entre clientes de correo; envía siempre un mensaje de prueba.",
};
type Dictionary = typeof es;
const en: Dictionary = {
  language: "Language",
  title: "Free Gmail signature generator",
  promise:
    "Create a professional Gmail signature for free, without signing up, directly in your browser.",
  privacy: "Your data stays on this device and is not sent to servers.",
  generator: "Generator",
  guide: "Gmail guide",
  templates: "Templates",
  faq: "FAQ",
  privacyPage: "Privacy",
  form: "Customize your signature",
  preview: "Preview",
  copy: "Copy signature",
  download: "Download HTML",
  export: "Export JSON",
  import: "Import JSON",
  clear: "Clear local data",
  saved: "Draft saved locally.",
  localWarning:
    "The local image is only for preview. Use a public HTTPS URL before copying the final signature.",
  copied: "Signature copied. Paste it into Gmail and send a test email.",
  invalid: "Review marked fields or the imported file.",
  cleared: "Local data cleared.",
  about:
    "Optimized for Gmail. Appearance may vary across email clients; always send a test message.",
};
const ptBR: Dictionary = {
  ...en,
  language: "Idioma",
  title: "Gerador gratuito de assinaturas para Gmail",
  promise:
    "Crie uma assinatura profissional para Gmail grátis, sem cadastro e diretamente no navegador.",
  privacy:
    "Seus dados permanecem neste dispositivo e não são enviados a servidores.",
  generator: "Gerador",
  guide: "Guia do Gmail",
  templates: "Modelos",
  faq: "Perguntas frequentes",
  privacyPage: "Privacidade",
  form: "Personalize sua assinatura",
  preview: "Pré-visualização",
  copy: "Copiar assinatura",
  download: "Baixar HTML",
  export: "Exportar JSON",
  import: "Importar JSON",
  clear: "Apagar dados locais",
};
const fr: Dictionary = {
  ...en,
  language: "Langue",
  title: "Générateur gratuit de signatures Gmail",
  promise:
    "Créez gratuitement une signature Gmail professionnelle, sans inscription, directement dans votre navigateur.",
  privacy:
    "Vos données restent sur cet appareil et ne sont pas envoyées à des serveurs.",
  generator: "Générateur",
  guide: "Guide Gmail",
  templates: "Modèles",
  faq: "Questions fréquentes",
  privacyPage: "Confidentialité",
  form: "Personnalisez votre signature",
  preview: "Aperçu",
  copy: "Copier la signature",
  download: "Télécharger HTML",
  export: "Exporter JSON",
  import: "Importer JSON",
  clear: "Effacer les données locales",
};
const de: Dictionary = {
  ...en,
  language: "Sprache",
  title: "Kostenloser Gmail-Signaturgenerator",
  promise:
    "Erstellen Sie kostenlos und ohne Registrierung direkt im Browser eine professionelle Gmail-Signatur.",
  privacy:
    "Ihre Daten bleiben auf diesem Gerät und werden nicht an Server gesendet.",
  generator: "Generator",
  guide: "Gmail-Anleitung",
  templates: "Vorlagen",
  faq: "Häufige Fragen",
  privacyPage: "Datenschutz",
  form: "Signatur anpassen",
  preview: "Vorschau",
  copy: "Signatur kopieren",
  download: "HTML herunterladen",
  export: "JSON exportieren",
  import: "JSON importieren",
  clear: "Lokale Daten löschen",
};
export const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
  "pt-BR": ptBR,
  fr,
  de,
};
export const dictionary = (locale: string) =>
  dictionaries[locale as Locale] ?? es;
