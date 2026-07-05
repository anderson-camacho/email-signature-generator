export const locales = ["es", "en", "pt-BR", "fr", "de", "zh-CN", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  "pt-BR": "Português (Brasil)",
  fr: "Français",
  de: "Deutsch",
  "zh-CN": "简体中文",
  ru: "Русский",
};

const es = {
  language: "Idioma",
  title: "Generador gratuito de firmas de correo",
  promise:
    "Crea una firma profesional de correo gratis, sin registrarte y directamente desde tu navegador.",
  privacy:
    "Tus datos permanecen en este dispositivo y no se envían a servidores.",
  generator: "Generador",
  guide: "Guía de instalación",
  templates: "Plantillas",
  faq: "Preguntas frecuentes",
  privacyPage: "Privacidad",
  donationThanksTitle: "Gracias por tu donaciÃ³n",
  donationThanksCopy:
    "La ventana de PayPal deberÃ­a cerrarse y tu sesiÃ³n seguirÃ¡ aquÃ­ en la pÃ¡gina.",
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
  copied: "Firma copiada. Pégala en tu cliente de correo y envía una prueba.",
  invalid: "Revisa los campos marcados o el archivo importado.",
  cleared: "Datos locales eliminados.",
  about:
    "Pensado para distintos clientes de correo. La apariencia puede variar; envía siempre un mensaje de prueba.",
  directStart:
    "Empieza a construir tu firma de inmediato, con vista previa y guardado local.",
  previewNote:
    "Pensado para verse profesional, rápido y claro desde el primer minuto.",
  mainFlowTitle: "Página principal",
  mainFlowCopy:
    "Entra directo al editor y evita una portada explicativa antes de crear.",
  savedFlowTitle: "Firmas guardadas",
  savedFlowCopy:
    "Guarda versiones en este navegador para abrirlas, iterarlas y probar opciones.",
  saveToLibrary: "Guardar versión",
  savedToLibrary: "Firma guardada en este navegador.",
  savedLibrary: "Firmas guardadas",
  savedLibraryHint: "Reabrir versiones locales",
  libraryEmpty: "Todavía no guardas versiones en este navegador.",
  savedPageCopy:
    "Revisa mejor tus versiones guardadas, abre una, duplícala o elimina las que no sirven.",
  savedPageAction: "Abrir biblioteca",
  savedBackAction: "Volver al editor",
  drawerConfig: "Configurar",
  drawerTemplates: "Plantillas",
  drawerClose: "Cerrar",
  supportTitle: "Apoya el proyecto",
  supportLink: "Ver apoyo",
  supportCopy:
    "Ayuda a mantener la herramienta libre, útil y mejor cuidada para la comunidad.",
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
  donationThanksTitle: "Thanks for your donation",
  donationThanksCopy:
    "The PayPal window should close and your session will stay here on the page.",
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
  drawerConfig: "Setup",
  drawerTemplates: "Templates",
  drawerClose: "Close",
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
    "Crie uma assinatura profissional de email grátis, sem cadastro e diretamente no navegador.",
  privacy: "Seus dados permanecem neste dispositivo e não são enviados a servidores.",
  generator: "Gerador",
  guide: "Guia de instalação",
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
  title: "Générateur gratuit de signatures email",
  promise:
    "Créez gratuitement une signature email professionnelle, sans inscription, directement dans votre navigateur.",
  privacy: "Vos données restent sur cet appareil et ne sont pas envoyées à des serveurs.",
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
    "Erstellen Sie kostenlos und ohne Registrierung direkt im Browser eine professionelle E-Mail-Signatur.",
  privacy: "Ihre Daten bleiben auf diesem Gerät und werden nicht an Server gesendet.",
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

const zhCN: Dictionary = {
  ...en,
  language: "语言",
  title: "免费电子邮件签名生成器",
  promise: "直接在浏览器中免费创建专业电子邮件签名，无需注册。",
  privacy: "你的数据仅保留在当前设备上，不会发送到服务器。",
  generator: "生成器",
  guide: "安装指南",
  templates: "模板",
  faq: "常见问题",
  privacyPage: "隐私",
  form: "自定义签名",
  preview: "预览",
  copy: "复制签名",
  download: "下载 HTML",
  export: "导出 JSON",
  import: "导入 JSON",
  clear: "清除本地数据",
  saved: "草稿已保存在本地。",
  localWarning:
    "本地图像仅用于预览。复制最终签名前，请使用公开的 HTTPS 图片地址。",
  copied: "签名已复制。请粘贴到邮件客户端并发送测试邮件。",
  invalid: "请检查标记的字段或导入的文件。",
  cleared: "本地数据已清除。",
  about:
    "适用于多种邮件客户端。显示效果可能有所不同，请务必先发送测试邮件。",
  directStart: "立即开始创建签名，支持实时预览和本地草稿保存。",
  previewNote: "从一开始就力求专业、快速且易于理解。",
  mainFlowTitle: "主流程",
  mainFlowCopy: "直接进入编辑器开始工作，而不是先看到说明页。",
  savedFlowTitle: "已保存的签名",
  savedFlowCopy: "在浏览器中保留本地版本，方便重新打开和快速比较。",
  saveToLibrary: "保存版本",
  savedToLibrary: "签名已保存在当前浏览器中。",
  savedLibrary: "已保存的签名",
  savedLibraryHint: "重新打开本地版本",
  libraryEmpty: "当前浏览器中还没有保存的版本。",
  savedPageCopy:
    "更清楚地查看已保存版本，重新打开、复制，或删除不再需要的内容。",
  savedPageAction: "打开资料库",
  savedBackAction: "返回编辑器",
  supportTitle: "支持这个项目",
  supportLink: "查看支持方式",
  supportCopy:
    "帮助这个工具继续保持免费、实用，并为社区提供更好的维护。",
};

const ru: Dictionary = {
  ...en,
  language: "Язык",
  title: "Бесплатный генератор email-подписей",
  promise:
    "Создавайте профессиональную email-подпись бесплатно, без регистрации и прямо в браузере.",
  privacy: "Ваши данные остаются на этом устройстве и не отправляются на серверы.",
  generator: "Генератор",
  guide: "Руководство по установке",
  templates: "Шаблоны",
  faq: "Частые вопросы",
  privacyPage: "Конфиденциальность",
  form: "Настройте подпись",
  preview: "Предпросмотр",
  copy: "Копировать подпись",
  download: "Скачать HTML",
  export: "Экспорт JSON",
  import: "Импорт JSON",
  clear: "Очистить локальные данные",
  saved: "Черновик сохранен локально.",
  localWarning:
    "Локальное изображение используется только для предпросмотра. Перед копированием итоговой подписи используйте публичный HTTPS URL.",
  copied: "Подпись скопирована. Вставьте ее в почтовый клиент и отправьте тестовое письмо.",
  invalid: "Проверьте отмеченные поля или импортированный файл.",
  cleared: "Локальные данные очищены.",
  about:
    "Подходит для разных почтовых клиентов. Отображение может отличаться, поэтому всегда отправляйте тестовое письмо.",
  directStart:
    "Сразу начинайте собирать подпись с живым предпросмотром и локальным сохранением черновика.",
  previewNote:
    "Сделано так, чтобы с первой минуты ощущаться профессионально, быстро и понятно.",
  mainFlowTitle: "Основной сценарий",
  mainFlowCopy:
    "Открывайте сайт и сразу переходите к редактированию без промежуточной объясняющей страницы.",
  savedFlowTitle: "Сохраненные подписи",
  savedFlowCopy:
    "Храните локальные версии в браузере, чтобы быстро открывать их снова и сравнивать.",
  saveToLibrary: "Сохранить версию",
  savedToLibrary: "Подпись сохранена в этом браузере.",
  savedLibrary: "Сохраненные подписи",
  savedLibraryHint: "Открыть локальные версии",
  libraryEmpty: "В этом браузере пока нет сохраненных версий.",
  savedPageCopy:
    "Просматривайте сохраненные версии удобнее, открывайте, дублируйте или удаляйте лишнее.",
  savedPageAction: "Открыть библиотеку",
  savedBackAction: "Назад в редактор",
  supportTitle: "Поддержать проект",
  supportLink: "Посмотреть поддержку",
  supportCopy:
    "Помогите сохранить инструмент бесплатным, полезным и лучше поддерживаемым для сообщества.",
};

export const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
  "pt-BR": ptBR,
  fr,
  de,
  "zh-CN": zhCN,
  ru,
};

export const dictionary = (locale: string) =>
  dictionaries[locale as Locale] ?? es;

const regionToLocale: Record<string, Locale> = {
  AR: "es",
  AT: "de",
  AU: "en",
  BE: "fr",
  BO: "es",
  BR: "pt-BR",
  BY: "ru",
  CA: "en",
  CH: "de",
  CL: "es",
  CM: "fr",
  CN: "zh-CN",
  CO: "es",
  CR: "es",
  CU: "es",
  DE: "de",
  DO: "es",
  EC: "es",
  ES: "es",
  FR: "fr",
  GB: "en",
  GT: "es",
  HK: "zh-CN",
  HN: "es",
  IE: "en",
  KG: "ru",
  KZ: "ru",
  LU: "fr",
  LV: "ru",
  MC: "fr",
  MD: "ru",
  MO: "zh-CN",
  MX: "es",
  NI: "es",
  NZ: "en",
  PA: "es",
  PE: "es",
  PR: "es",
  PY: "es",
  RU: "ru",
  SG: "zh-CN",
  SN: "fr",
  SV: "es",
  TJ: "ru",
  TM: "ru",
  TW: "zh-CN",
  UA: "ru",
  US: "en",
  UY: "es",
  UZ: "ru",
  VE: "es",
};

export const localeStorageKey = "email-signature-generator:locale";

export function normalizeLocaleCandidate(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower === "pt" || lower.startsWith("pt-")) return "pt-BR";
  if (lower === "zh" || lower.startsWith("zh-")) return "zh-CN";
  if (lower === "es" || lower.startsWith("es-")) return "es";
  if (lower === "en" || lower.startsWith("en-")) return "en";
  if (lower === "fr" || lower.startsWith("fr-")) return "fr";
  if (lower === "de" || lower.startsWith("de-")) return "de";
  if (lower === "ru" || lower.startsWith("ru-")) return "ru";
  return locales.includes(value as Locale) ? (value as Locale) : null;
}

export function resolvePreferredLocale(candidates: string[]): Locale {
  for (const candidate of candidates) {
    const normalized = normalizeLocaleCandidate(candidate);
    if (normalized) return normalized;

    const parts = candidate.split("-");
    const region = parts[1]?.toUpperCase();
    if (region && regionToLocale[region]) return regionToLocale[region];
  }
  return "es";
}
