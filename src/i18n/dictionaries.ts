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
  title: "Generador gratuito de firmas de correo",
  promise:
    "Crea una firma profesional de correo gratis, sin registrarte y directamente desde tu navegador.",
  privacy:
    "Tus datos permanecen en este dispositivo y no se envían a servidores.",
  generator: "Generador",
  guide: "Guia de instalacion",
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
  copied: "Firma copiada. Pegala en tu cliente de correo y envia una prueba.",
  invalid: "Revisa los campos marcados o el archivo importado.",
  cleared: "Datos locales eliminados.",
  about:
    "Pensado para distintos clientes de correo. La apariencia puede variar; envia siempre un mensaje de prueba.",
  directStart:
    "Empieza a construir tu firma de inmediato, con vista previa y guardado local.",
  previewNote:
    "Pensado para verse profesional, rapido y claro desde el primer minuto.",
  mainFlowTitle: "Pagina principal",
  mainFlowCopy:
    "Entra directo al editor y evita una portada explicativa antes de crear.",
  savedFlowTitle: "Firmas guardadas",
  savedFlowCopy:
    "Guarda versiones en este navegador para abrirlas, iterarlas y probar opciones.",
  saveToLibrary: "Guardar version",
  savedToLibrary: "Firma guardada en este navegador.",
  savedLibrary: "Firmas guardadas",
  savedLibraryHint: "Reabrir versiones locales",
  libraryEmpty: "Todavia no guardas versiones en este navegador.",
  savedPageCopy:
    "Revisa mejor tus versiones guardadas, abre una, duplicala o elimina las que no sirven.",
  savedPageAction: "Abrir biblioteca",
  savedBackAction: "Volver al editor",
  supportTitle: "Apoya el proyecto",
  supportLink: "Ver apoyo",
  supportCopy:
    "Ayuda a mantener la herramienta libre, util y mejor cuidada para la comunidad.",
};
type Dictionary = typeof es;
const en: Dictionary = {
  language: "Language",
  title: "Free email signature generator",
  promise:
    "Create a professional email signature for free, without signing up, directly in your browser.",
  privacy: "Your data stays on this device and is not sent to servers.",
  generator: "Generator",
  guide: "Installation guide",
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
  copied:
    "Signature copied. Paste it into your email client and send a test message.",
  invalid: "Review marked fields or the imported file.",
  cleared: "Local data cleared.",
  about:
    "Designed for multiple email clients. Appearance may vary, so always send a test message.",
  directStart:
    "Start building immediately with live preview and local draft storage.",
  previewNote:
    "Made to feel professional, fast, and easy to scan from the start.",
  mainFlowTitle: "Main flow",
  mainFlowCopy:
    "Open the site and begin editing immediately instead of landing on an explainer page.",
  savedFlowTitle: "Saved signatures",
  savedFlowCopy:
    "Keep local versions in the browser so you can reopen and compare them quickly.",
  saveToLibrary: "Save version",
  savedToLibrary: "Signature saved in this browser.",
  savedLibrary: "Saved signatures",
  savedLibraryHint: "Reopen local versions",
  libraryEmpty: "No saved versions in this browser yet.",
  savedPageCopy:
    "Review saved versions more clearly, reopen one, duplicate it, or remove what you no longer need.",
  savedPageAction: "Open library",
  savedBackAction: "Back to editor",
  supportTitle: "Support the project",
  supportLink: "View support",
  supportCopy:
    "Help keep the tool free, useful, and better maintained for the community.",
};
const ptBR: Dictionary = {
  ...en,
  language: "Idioma",
  title: "Gerador gratuito de assinaturas de email",
  promise:
    "Crie uma assinatura profissional para Gmail grátis, sem cadastro e diretamente no navegador.",
  privacy:
    "Seus dados permanecem neste dispositivo e não são enviados a servidores.",
  generator: "Gerador",
  guide: "Guia de instalacao",
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
  title: "Generateur gratuit de signatures email",
  promise:
    "Créez gratuitement une signature Gmail professionnelle, sans inscription, directement dans votre navigateur.",
  privacy:
    "Vos données restent sur cet appareil et ne sont pas envoyées à des serveurs.",
  generator: "Générateur",
  guide: "Guide d'installation",
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
  title: "Kostenloser E-Mail-Signaturgenerator",
  promise:
    "Erstellen Sie kostenlos und ohne Registrierung direkt im Browser eine professionelle Gmail-Signatur.",
  privacy:
    "Ihre Daten bleiben auf diesem Gerät und werden nicht an Server gesendet.",
  generator: "Generator",
  guide: "Installationsanleitung",
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
