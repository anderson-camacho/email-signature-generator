import type { Locale } from "../i18n/dictionaries";
import { dictionary, locales } from "../i18n/dictionaries";

export const publicSiteUrl =
  import.meta.env.PUBLIC_SITE_URL ??
  "https://email-signature-generator.anderson-camacho-palacios.workers.dev";

export const siteBrand = "Email Signature Generator";
export const siteRepository =
  "https://github.com/anderson-camacho/email-signature-generator";
export const creatorUrl = "https://github.com/anderson-camacho";
export const licenseUrl = `${publicSiteUrl}/LICENSE`;

export type SeoPageKind =
  | "home"
  | "generator"
  | "saved"
  | "privacy"
  | "guide"
  | "faq"
  | "support"
  | "donations";

const localizedDescriptions: Record<Locale, Record<SeoPageKind, string>> = {
  es: {
    home: "Generador gratuito de firmas de correo con plantillas profesionales, vista previa, exportacion HTML y guardado local sin registro.",
    generator:
      "Crea, copia y exporta una firma profesional de correo desde tu navegador con datos guardados solo en tu dispositivo.",
    saved:
      "Reabre, duplica y organiza versiones de firmas guardadas localmente en tu navegador.",
    privacy:
      "Politica de privacidad del generador: datos locales, sin cuenta obligatoria y sin envio de datos de firma a servidores.",
    guide:
      "Guia para instalar una firma de correo en Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail y Thunderbird.",
    faq: "Preguntas frecuentes sobre firmas de correo, compatibilidad, imagenes HTTPS, privacidad y exportacion HTML.",
    support:
      "Apoya el proyecto abierto del generador de firmas y ayuda a mantener plantillas, pruebas y documentacion.",
    donations:
      "Opciones de donacion para apoyar el mantenimiento del generador gratuito de firmas de correo.",
  },
  en: {
    home: "Free email signature generator with professional templates, live preview, HTML export, and local-only drafts without sign-up.",
    generator:
      "Create, copy, and export a professional email signature in your browser with data stored only on your device.",
    saved:
      "Reopen, duplicate, and organize email signature versions saved locally in your browser.",
    privacy:
      "Privacy policy for the generator: local data, no required account, and no signature data sent to servers.",
    guide:
      "Guide to install an email signature in Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail, and Thunderbird.",
    faq: "Frequently asked questions about email signatures, compatibility, HTTPS images, privacy, and HTML export.",
    support:
      "Support the open-source signature generator and help maintain templates, testing, and documentation.",
    donations:
      "Donation options to support maintenance of the free email signature generator.",
  },
  "pt-BR": {
    home: "Gerador gratuito de assinaturas de email com modelos profissionais, previsualizacao, exportacao HTML e rascunhos locais.",
    generator:
      "Crie, copie e exporte uma assinatura profissional no navegador com dados salvos apenas no seu dispositivo.",
    saved:
      "Reabra, duplique e organize versoes de assinaturas salvas localmente no navegador.",
    privacy:
      "Privacidade do gerador: dados locais, sem conta obrigatoria e sem envio da assinatura a servidores.",
    guide:
      "Guia para instalar assinatura de email no Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail e Thunderbird.",
    faq: "Perguntas frequentes sobre assinaturas, compatibilidade, imagens HTTPS, privacidade e exportacao HTML.",
    support:
      "Apoie o projeto aberto e ajude a manter modelos, testes e documentacao.",
    donations: "Opcoes de doacao para apoiar a manutencao do gerador gratuito.",
  },
  fr: {
    home: "Generateur gratuit de signatures email avec modeles professionnels, apercu, export HTML et brouillons locaux.",
    generator:
      "Creez, copiez et exportez une signature email professionnelle dans le navigateur avec donnees locales.",
    saved:
      "Rouvrez, dupliquez et organisez les signatures enregistrees localement.",
    privacy:
      "Confidentialite du generateur: donnees locales, aucun compte obligatoire et aucune donnee envoyee aux serveurs.",
    guide:
      "Guide pour installer une signature dans Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail et Thunderbird.",
    faq: "Questions sur signatures email, compatibilite, images HTTPS, confidentialite et export HTML.",
    support:
      "Soutenez le projet ouvert et aidez a maintenir modeles, tests et documentation.",
    donations:
      "Options de don pour soutenir la maintenance du generateur gratuit.",
  },
  de: {
    home: "Kostenloser E-Mail-Signaturgenerator mit professionellen Vorlagen, Vorschau, HTML-Export und lokalen Entwuerfen.",
    generator:
      "Erstellen, kopieren und exportieren Sie eine professionelle Signatur direkt im Browser.",
    saved:
      "Oeffnen, duplizieren und organisieren Sie lokal gespeicherte Signaturversionen.",
    privacy:
      "Datenschutz: lokale Daten, kein Pflichtkonto und keine Signaturdaten an Server.",
    guide:
      "Anleitung fuer Signaturen in Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail und Thunderbird.",
    faq: "Fragen zu Signaturen, Kompatibilitaet, HTTPS-Bildern, Datenschutz und HTML-Export.",
    support:
      "Unterstuetzen Sie das offene Projekt und die Pflege von Vorlagen, Tests und Dokumentation.",
    donations:
      "Spendenoptionen zur Wartung des kostenlosen Signaturgenerators.",
  },
  it: {
    home: "Generatore gratuito di firme email con modelli professionali, anteprima, export HTML e bozze locali.",
    generator:
      "Crea, copia ed esporta una firma professionale nel browser con dati solo locali.",
    saved:
      "Riapri, duplica e organizza le firme salvate localmente nel browser.",
    privacy:
      "Privacy del generatore: dati locali, nessun account obbligatorio e nessun invio ai server.",
    guide:
      "Guida per installare una firma in Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail e Thunderbird.",
    faq: "Domande su firme email, compatibilita, immagini HTTPS, privacy ed export HTML.",
    support:
      "Sostieni il progetto aperto e aiuta modelli, test e documentazione.",
    donations: "Opzioni di donazione per sostenere il generatore gratuito.",
  },
  ja: {
    home: "プロ向けテンプレート、プレビュー、HTML出力、ローカル保存に対応した無料メール署名ジェネレーター。",
    generator:
      "ブラウザ内でプロ向けメール署名を作成、コピー、エクスポートできます。",
    saved: "ブラウザに保存した署名バージョンを開き直し、複製、整理できます。",
    privacy:
      "ローカルデータ、アカウント不要、署名データをサーバーへ送信しない方針。",
    guide:
      "Gmail、Outlook、Microsoft 365、Apple Mail、iCloud Mail、Thunderbirdへの署名設定ガイド。",
    faq: "メール署名、互換性、HTTPS画像、プライバシー、HTML出力に関する質問。",
    support:
      "オープンソースプロジェクトを支援し、テンプレート、テスト、文書の維持に協力できます。",
    donations: "無料署名ジェネレーターの保守を支援する寄付オプション。",
  },
  ko: {
    home: "전문 템플릿, 미리보기, HTML 내보내기, 로컬 저장을 제공하는 무료 이메일 서명 생성기.",
    generator:
      "브라우저에서 전문 이메일 서명을 만들고 복사하고 내보낼 수 있습니다.",
    saved:
      "브라우저에 로컬로 저장된 서명 버전을 다시 열고 복제하고 정리합니다.",
    privacy:
      "로컬 데이터, 필수 계정 없음, 서명 데이터를 서버로 보내지 않는 개인정보 안내.",
    guide:
      "Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail, Thunderbird 서명 설치 안내.",
    faq: "이메일 서명, 호환성, HTTPS 이미지, 개인정보, HTML 내보내기에 대한 질문.",
    support:
      "오픈소스 프로젝트를 지원하고 템플릿, 테스트, 문서 유지에 도움을 주세요.",
    donations: "무료 이메일 서명 생성기 유지보수를 위한 기부 옵션.",
  },
  ar: {
    home: "مولد توقيع بريد مجاني مع قوالب احترافية ومعاينة وتصدير HTML وحفظ محلي.",
    generator:
      "انشئ و انسخ و صدر توقيع بريد احترافي من المتصفح مع بيانات محفوظة محليا.",
    saved: "افتح وكرر ونظم نسخ التواقيع المحفوظة محليا في المتصفح.",
    privacy:
      "خصوصية المولد: بيانات محلية، بدون حساب اجباري، وبدون ارسال بيانات التوقيع للخوادم.",
    guide:
      "دليل تثبيت التوقيع في Gmail وOutlook وMicrosoft 365 وApple Mail وiCloud Mail وThunderbird.",
    faq: "اسئلة حول التواقيع والتوافق وصور HTTPS والخصوصية وتصدير HTML.",
    support: "ادعم المشروع المفتوح وساعد في القوالب والاختبارات والتوثيق.",
    donations: "خيارات تبرع لدعم صيانة مولد التوقيع المجاني.",
  },
  hi: {
    home: "पेशेवर टेम्पलेट, पूर्वावलोकन, HTML निर्यात और स्थानीय ड्राफ्ट वाला मुफ्त ईमेल हस्ताक्षर जनरेटर।",
    generator:
      "ब्राउज़र में पेशेवर ईमेल हस्ताक्षर बनाएं, कॉपी करें और निर्यात करें।",
    saved:
      "ब्राउज़र में स्थानीय रूप से सहेजे हस्ताक्षर संस्करण खोलें, डुप्लिकेट करें और व्यवस्थित करें।",
    privacy:
      "जनरेटर की गोपनीयता: स्थानीय डेटा, कोई अनिवार्य खाता नहीं, और सर्वर पर हस्ताक्षर डेटा नहीं भेजा जाता।",
    guide:
      "Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail और Thunderbird में हस्ताक्षर स्थापित करने की गाइड।",
    faq: "ईमेल हस्ताक्षर, संगतता, HTTPS छवियां, गोपनीयता और HTML निर्यात से जुड़े सवाल।",
    support:
      "ओपन सोर्स परियोजना का समर्थन करें और टेम्पलेट, परीक्षण और दस्तावेज़ में मदद करें।",
    donations: "मुफ्त ईमेल हस्ताक्षर जनरेटर के रखरखाव के लिए दान विकल्प।",
  },
  "zh-CN": {
    home: "免费电子邮件签名生成器，提供专业模板、实时预览、HTML导出和本地草稿。",
    generator: "在浏览器中创建、复制并导出专业电子邮件签名，数据仅保存在本地。",
    saved: "重新打开、复制并整理浏览器本地保存的签名版本。",
    privacy: "生成器隐私说明：本地数据、无需账户、签名数据不会发送到服务器。",
    guide:
      "在 Gmail、Outlook、Microsoft 365、Apple Mail、iCloud Mail 和 Thunderbird 中安装签名的指南。",
    faq: "关于电子邮件签名、兼容性、HTTPS图片、隐私和HTML导出的常见问题。",
    support: "支持开源项目，帮助维护模板、测试和文档。",
    donations: "支持免费电子邮件签名生成器维护的捐赠选项。",
  },
  ru: {
    home: "Бесплатный генератор email-подписей с профессиональными шаблонами, предпросмотром, HTML-экспортом и локальными черновиками.",
    generator:
      "Создавайте, копируйте и экспортируйте профессиональную email-подпись прямо в браузере.",
    saved:
      "Открывайте, дублируйте и упорядочивайте локально сохраненные версии подписей.",
    privacy:
      "Конфиденциальность: локальные данные, без обязательного аккаунта и без отправки подписи на серверы.",
    guide:
      "Руководство по установке подписи в Gmail, Outlook, Microsoft 365, Apple Mail, iCloud Mail и Thunderbird.",
    faq: "Вопросы об email-подписях, совместимости, HTTPS-изображениях, приватности и HTML-экспорте.",
    support:
      "Поддержите открытый проект и помогите с шаблонами, тестами и документацией.",
    donations:
      "Варианты пожертвований для поддержки бесплатного генератора подписей.",
  },
};

const pageTitleSuffix: Record<SeoPageKind, string> = {
  home: "",
  generator: "Generator",
  saved: "Saved signatures",
  privacy: "Privacy",
  guide: "Installation guide",
  faq: "FAQ",
  support: "Open-source support",
  donations: "Donations",
};

export const seoDescription = (locale: Locale, kind: SeoPageKind) =>
  localizedDescriptions[locale]?.[kind] ??
  localizedDescriptions.en[kind] ??
  dictionary(locale).promise;

export const seoTitle = (locale: Locale, kind: SeoPageKind, title?: string) => {
  if (title) return `${title} | ${siteBrand}`;
  const t = dictionary(locale);
  if (kind === "home") return t.title;
  return `${pageTitleSuffix[kind]} | ${siteBrand}`;
};

const localePrefixPattern = new RegExp(
  `^/(${locales.map((locale) => locale.replace("-", "\\-")).join("|")})(?=/|$)`,
);

export const pathWithoutLocale = (pathname: string) =>
  pathname.replace(localePrefixPattern, "") || "/";

export const localizedPath = (locale: Locale, pathname = "/") =>
  `/${locale}${pathWithoutLocale(pathname)}`.replace(/\/$/, "/");

export const localizedUrl = (locale: Locale, pathname = "/") =>
  new URL(localizedPath(locale, pathname), publicSiteUrl).toString();

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteBrand,
  url: publicSiteUrl,
  founder: {
    "@type": "Person",
    name: "Anderson Camacho Palacios",
    url: creatorUrl,
  },
  sameAs: [creatorUrl, siteRepository],
});

export const websiteJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteBrand,
  url: localizedUrl(locale, "/"),
  inLanguage: locale,
  isAccessibleForFree: true,
  publisher: organizationJsonLd(),
});

export const softwareJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteBrand,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: locale,
  isAccessibleForFree: true,
  url: localizedUrl(locale, "/"),
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: organizationJsonLd(),
  license: licenseUrl,
  codeRepository: siteRepository,
});

export const breadcrumbJsonLd = (
  locale: Locale,
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: localizedUrl(locale, item.path),
  })),
});

export const faqJsonLd = (
  questions: Array<{ question: string; answer: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const sitemapLocales = Object.fromEntries(
  locales.map((locale) => [locale, locale.toLowerCase()]),
);
