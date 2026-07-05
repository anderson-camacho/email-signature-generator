export const locales = [
  "es",
  "en",
  "pt-BR",
  "fr",
  "de",
  "it",
  "ja",
  "ko",
  "ar",
  "hi",
  "zh-CN",
  "ru",
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  "pt-BR": "Português (Brasil)",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  hi: "हिन्दी",
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
  donationThanksTitle: "Gracias por tu donación",
  donationThanksCopy:
    "La ventana de PayPal debería cerrarse y tu sesión seguirá aquí en la página.",
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
  drawerClose: "Cerrar panel",
  fieldHidden: "Este template no muestra este campo aunque lo llenes.",
  templateFieldSummaryAll:
    "Este template aprovecha todos estos campos configurables.",
  templateFieldSummaryHidden: "Este template no muestra:",
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
  drawerClose: "Close panel",
  fieldHidden:
    "This template does not show this field, even if you fill it in.",
  templateFieldSummaryAll:
    "This template uses all of these configurable fields.",
  templateFieldSummaryHidden: "This template does not show:",
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
  privacy:
    "Seus dados permanecem neste dispositivo e não são enviados a servidores.",
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
  drawerConfig: "Configurar",
  drawerTemplates: "Modelos",
  drawerClose: "Fechar painel",
  fieldHidden: "Este modelo não mostra este campo, mesmo que você o preencha.",
  templateFieldSummaryAll: "Este modelo usa todos estes campos configuráveis.",
  templateFieldSummaryHidden: "Este modelo não mostra:",
};

const fr: Dictionary = {
  ...en,
  language: "Langue",
  title: "Générateur gratuit de signatures email",
  promise:
    "Créez gratuitement une signature email professionnelle, sans inscription, directement dans votre navigateur.",
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
  drawerConfig: "Configurer",
  drawerTemplates: "Modèles",
  drawerClose: "Fermer le panneau",
  fieldHidden: "Ce modèle n'affiche pas ce champ, même si vous le remplissez.",
  templateFieldSummaryAll: "Ce modèle utilise tous ces champs configurables.",
  templateFieldSummaryHidden: "Ce modèle n'affiche pas :",
};

const de: Dictionary = {
  ...en,
  language: "Sprache",
  title: "Kostenloser E-Mail-Signaturgenerator",
  promise:
    "Erstellen Sie kostenlos und ohne Registrierung direkt im Browser eine professionelle E-Mail-Signatur.",
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
  drawerConfig: "Konfigurieren",
  drawerTemplates: "Vorlagen",
  drawerClose: "Bereich schließen",
  fieldHidden:
    "Diese Vorlage zeigt dieses Feld nicht an, auch wenn Sie es ausfüllen.",
  templateFieldSummaryAll:
    "Diese Vorlage verwendet alle diese konfigurierbaren Felder.",
  templateFieldSummaryHidden: "Diese Vorlage zeigt nicht an:",
};

const it: Dictionary = {
  ...en,
  language: "Lingua",
  title: "Generatore gratuito di firme email",
  promise:
    "Crea una firma email professionale gratis, senza registrarti e direttamente dal browser.",
  privacy:
    "I tuoi dati restano su questo dispositivo e non vengono inviati ai server.",
  generator: "Generatore",
  guide: "Guida di installazione",
  templates: "Modelli",
  faq: "FAQ",
  privacyPage: "Privacy",
  form: "Personalizza la tua firma",
  preview: "Anteprima",
  copy: "Copia firma",
  download: "Scarica HTML",
  export: "Esporta JSON",
  import: "Importa JSON",
  clear: "Cancella dati locali",
  drawerConfig: "Configura",
  drawerTemplates: "Modelli",
  drawerClose: "Chiudi pannello",
  fieldHidden: "Questo modello non mostra questo campo, anche se lo compili.",
  templateFieldSummaryAll:
    "Questo modello usa tutti questi campi configurabili.",
  templateFieldSummaryHidden: "Questo modello non mostra:",
};

const ja: Dictionary = {
  ...en,
  language: "言語",
  title: "無料メール署名ジェネレーター",
  promise:
    "登録なしで、ブラウザーから直接プロフェッショナルなメール署名を無料で作成できます。",
  privacy: "データはこの端末内に保持され、サーバーには送信されません。",
  generator: "ジェネレーター",
  guide: "導入ガイド",
  templates: "テンプレート",
  faq: "よくある質問",
  privacyPage: "プライバシー",
  form: "署名をカスタマイズ",
  preview: "プレビュー",
  copy: "署名をコピー",
  download: "HTML をダウンロード",
  export: "JSON をエクスポート",
  import: "JSON をインポート",
  clear: "ローカルデータを削除",
  drawerConfig: "設定",
  drawerTemplates: "テンプレート",
  drawerClose: "パネルを閉じる",
  fieldHidden: "このテンプレートでは、この項目を入力しても表示されません。",
  templateFieldSummaryAll:
    "このテンプレートでは、これらの設定項目をすべて使用します。",
  templateFieldSummaryHidden: "このテンプレートでは表示されません:",
};

const ko: Dictionary = {
  ...en,
  language: "언어",
  title: "무료 이메일 서명 생성기",
  promise:
    "가입 없이 브라우저에서 바로 전문적인 이메일 서명을 무료로 만들 수 있습니다.",
  privacy: "데이터는 이 기기에만 저장되며 서버로 전송되지 않습니다.",
  generator: "생성기",
  guide: "설치 가이드",
  templates: "템플릿",
  faq: "자주 묻는 질문",
  privacyPage: "개인정보",
  form: "서명 맞춤 설정",
  preview: "미리보기",
  copy: "서명 복사",
  download: "HTML 다운로드",
  export: "JSON 내보내기",
  import: "JSON 가져오기",
  clear: "로컬 데이터 지우기",
  drawerConfig: "설정",
  drawerTemplates: "템플릿",
  drawerClose: "패널 닫기",
  fieldHidden: "이 템플릿은 이 필드를 입력해도 표시하지 않습니다.",
  templateFieldSummaryAll: "이 템플릿은 이러한 설정 필드를 모두 사용합니다.",
  templateFieldSummaryHidden: "이 템플릿에서 표시되지 않음:",
};

const ar: Dictionary = {
  ...en,
  language: "اللغة",
  title: "مولد توقيع البريد الإلكتروني المجاني",
  promise:
    "أنشئ توقيع بريد إلكتروني احترافيًا مجانًا ومن المتصفح مباشرة بدون تسجيل.",
  privacy: "تبقى بياناتك على هذا الجهاز ولا يتم إرسالها إلى الخوادم.",
  generator: "المولد",
  guide: "دليل التثبيت",
  templates: "القوالب",
  faq: "الأسئلة الشائعة",
  privacyPage: "الخصوصية",
  form: "خصّص توقيعك",
  preview: "المعاينة",
  copy: "نسخ التوقيع",
  download: "تنزيل HTML",
  export: "تصدير JSON",
  import: "استيراد JSON",
  clear: "حذف البيانات المحلية",
  drawerConfig: "الإعدادات",
  drawerTemplates: "القوالب",
  drawerClose: "إغلاق اللوحة",
  fieldHidden: "هذا القالب لا يعرض هذا الحقل حتى إذا قمت بتعبئته.",
  templateFieldSummaryAll: "هذا القالب يستخدم كل هذه الحقول القابلة للإعداد.",
  templateFieldSummaryHidden: "هذا القالب لا يعرض:",
};

const hi: Dictionary = {
  ...en,
  language: "भाषा",
  title: "मुफ्त ईमेल सिग्नेचर जनरेटर",
  promise:
    "बिना साइन अप किए, सीधे अपने ब्राउज़र में मुफ्त प्रोफेशनल ईमेल सिग्नेचर बनाइए।",
  privacy: "आपका डेटा इसी डिवाइस पर रहता है और सर्वरों को नहीं भेजा जाता।",
  generator: "जनरेटर",
  guide: "इंस्टॉलेशन गाइड",
  templates: "टेम्पलेट्स",
  faq: "अक्सर पूछे जाने वाले सवाल",
  privacyPage: "गोपनीयता",
  form: "अपना सिग्नेचर कस्टमाइज़ करें",
  preview: "प्रीव्यू",
  copy: "सिग्नेचर कॉपी करें",
  download: "HTML डाउनलोड करें",
  export: "JSON एक्सपोर्ट करें",
  import: "JSON इंपोर्ट करें",
  clear: "लोकल डेटा साफ करें",
  drawerConfig: "सेटअप",
  drawerTemplates: "टेम्पलेट्स",
  drawerClose: "पैनल बंद करें",
  fieldHidden: "यह टेम्पलेट इस फ़ील्ड को नहीं दिखाता, चाहे आप इसे भर दें।",
  templateFieldSummaryAll:
    "यह टेम्पलेट इन सभी कॉन्फ़िगर किए जा सकने वाले फ़ील्ड्स का उपयोग करता है।",
  templateFieldSummaryHidden: "यह टेम्पलेट नहीं दिखाता:",
};

Object.assign(ptBR, {
  donationThanksTitle: "Obrigado pela sua doação",
  donationThanksCopy:
    "A janela do PayPal deve fechar e sua sessão continuará aqui.",
  saved: "Rascunho salvo localmente.",
  localWarning:
    "A imagem local serve apenas para pré-visualização. Use uma URL HTTPS pública na assinatura final.",
  copied: "Assinatura copiada. Cole no seu cliente de email e envie um teste.",
  invalid: "Revise os campos marcados ou o arquivo importado.",
  cleared: "Dados locais apagados.",
  about:
    "Pensado para vários clientes de email. Envie sempre uma mensagem de teste.",
  directStart:
    "Comece a criar sua assinatura agora, com pré-visualização e salvamento local.",
  previewNote:
    "Pensado para parecer profissional, rápido e claro desde o início.",
  mainFlowTitle: "Página principal",
  mainFlowCopy:
    "Entre direto no editor e evite uma capa explicativa antes de criar.",
  savedFlowTitle: "Assinaturas salvas",
  savedFlowCopy:
    "Salve versões neste navegador para abrir, ajustar e testar opções.",
  saveToLibrary: "Salvar versão",
  savedToLibrary: "Assinatura salva neste navegador.",
  savedLibrary: "Assinaturas salvas",
  savedLibraryHint: "Reabrir versões locais",
  libraryEmpty: "Ainda não há versões salvas neste navegador.",
  savedPageCopy:
    "Revise suas versões salvas, abra, duplique ou remova o que não serve.",
  savedPageAction: "Abrir biblioteca",
  savedBackAction: "Voltar ao editor",
  supportTitle: "Apoie o projeto",
  supportLink: "Ver apoio",
  supportCopy:
    "Ajude a manter a ferramenta gratuita, útil e melhor cuidada para a comunidade.",
});

Object.assign(fr, {
  donationThanksTitle: "Merci pour votre don",
  donationThanksCopy:
    "La fenêtre PayPal devrait se fermer et votre session restera ici.",
  saved: "Brouillon enregistré localement.",
  localWarning:
    "L'image locale sert seulement à l'aperçu. Utilisez une URL HTTPS publique dans la signature finale.",
  copied:
    "Signature copiée. Collez-la dans votre client email et envoyez un test.",
  invalid: "Vérifiez les champs marqués ou le fichier importé.",
  cleared: "Données locales effacées.",
  about:
    "Pensé pour plusieurs clients email. Envoyez toujours un message de test.",
  directStart:
    "Commencez à créer votre signature avec aperçu et sauvegarde locale.",
  previewNote:
    "Conçu pour paraître professionnel, rapide et clair dès le début.",
  mainFlowTitle: "Page principale",
  mainFlowCopy: "Accédez directement à l'éditeur sans page d'introduction.",
  savedFlowTitle: "Signatures enregistrées",
  savedFlowCopy:
    "Gardez des versions dans ce navigateur pour les ouvrir et les tester.",
  saveToLibrary: "Enregistrer la version",
  savedToLibrary: "Signature enregistrée dans ce navigateur.",
  savedLibrary: "Signatures enregistrées",
  savedLibraryHint: "Rouvrir les versions locales",
  libraryEmpty: "Aucune version enregistrée dans ce navigateur.",
  savedPageCopy:
    "Revoyez vos versions enregistrées, ouvrez-les, dupliquez-les ou supprimez-les.",
  savedPageAction: "Ouvrir la bibliothèque",
  savedBackAction: "Retour à l'éditeur",
  supportTitle: "Soutenir le projet",
  supportLink: "Voir le soutien",
  supportCopy:
    "Aidez à garder l'outil gratuit, utile et mieux maintenu pour la communauté.",
});

Object.assign(de, {
  donationThanksTitle: "Danke für Ihre Spende",
  donationThanksCopy:
    "Das PayPal-Fenster sollte sich schließen und Ihre Sitzung bleibt hier.",
  saved: "Entwurf lokal gespeichert.",
  localWarning:
    "Das lokale Bild dient nur der Vorschau. Nutzen Sie eine öffentliche HTTPS-URL in der finalen Signatur.",
  copied:
    "Signatur kopiert. Fügen Sie sie im E-Mail-Client ein und senden Sie einen Test.",
  invalid: "Prüfen Sie die markierten Felder oder die importierte Datei.",
  cleared: "Lokale Daten gelöscht.",
  about:
    "Für verschiedene E-Mail-Clients gedacht. Senden Sie immer eine Testnachricht.",
  directStart: "Beginnen Sie sofort mit Vorschau und lokaler Speicherung.",
  previewNote:
    "Entwickelt für einen professionellen, schnellen und klaren Eindruck.",
  mainFlowTitle: "Hauptseite",
  mainFlowCopy: "Direkt in den Editor gehen, ohne vorherige Erklärseite.",
  savedFlowTitle: "Gespeicherte Signaturen",
  savedFlowCopy:
    "Versionen in diesem Browser speichern, erneut öffnen und testen.",
  saveToLibrary: "Version speichern",
  savedToLibrary: "Signatur in diesem Browser gespeichert.",
  savedLibrary: "Gespeicherte Signaturen",
  savedLibraryHint: "Lokale Versionen erneut öffnen",
  libraryEmpty: "In diesem Browser sind noch keine Versionen gespeichert.",
  savedPageCopy:
    "Gespeicherte Versionen ansehen, öffnen, duplizieren oder entfernen.",
  savedPageAction: "Bibliothek öffnen",
  savedBackAction: "Zurück zum Editor",
  supportTitle: "Projekt unterstützen",
  supportLink: "Unterstützung ansehen",
  supportCopy:
    "Helfen Sie, das Werkzeug kostenlos, nützlich und gut gepflegt zu halten.",
});

Object.assign(it, {
  donationThanksTitle: "Grazie per la donazione",
  donationThanksCopy:
    "La finestra PayPal dovrebbe chiudersi e la sessione resterà qui.",
  saved: "Bozza salvata localmente.",
  localWarning:
    "L'immagine locale serve solo per l'anteprima. Usa un URL HTTPS pubblico nella firma finale.",
  copied: "Firma copiata. Incollala nel client email e invia una prova.",
  invalid: "Controlla i campi evidenziati o il file importato.",
  cleared: "Dati locali cancellati.",
  about:
    "Pensato per diversi client email. Invia sempre un messaggio di prova.",
  directStart:
    "Inizia subito a creare la firma, con anteprima e salvataggio locale.",
  previewNote:
    "Pensato per apparire professionale, rapido e chiaro fin dall'inizio.",
  mainFlowTitle: "Pagina principale",
  mainFlowCopy: "Vai direttamente all'editor senza una pagina introduttiva.",
  savedFlowTitle: "Firme salvate",
  savedFlowCopy: "Salva versioni in questo browser per aprirle e provarle.",
  saveToLibrary: "Salva versione",
  savedToLibrary: "Firma salvata in questo browser.",
  savedLibrary: "Firme salvate",
  savedLibraryHint: "Riapri versioni locali",
  libraryEmpty: "Non ci sono ancora versioni salvate in questo browser.",
  savedPageCopy:
    "Rivedi le versioni salvate, apri, duplica o elimina quelle inutili.",
  savedPageAction: "Apri libreria",
  savedBackAction: "Torna all'editor",
  supportTitle: "Sostieni il progetto",
  supportLink: "Vedi supporto",
  supportCopy:
    "Aiuta a mantenere lo strumento gratuito, utile e curato per la comunità.",
});

Object.assign(ja, {
  donationThanksTitle: "寄付ありがとうございます",
  donationThanksCopy:
    "PayPalウィンドウが閉じ、このページでセッションが続きます。",
  saved: "下書きはローカルに保存されました。",
  localWarning:
    "ローカル画像はプレビュー用です。最終署名では公開HTTPS URLを使用してください。",
  copied:
    "署名をコピーしました。メールクライアントに貼り付けてテスト送信してください。",
  invalid: "マークされた項目またはインポートファイルを確認してください。",
  cleared: "ローカルデータを削除しました。",
  about: "複数のメールクライアント向けです。必ずテスト送信してください。",
  directStart: "プレビューとローカル保存付きで、すぐに署名を作成できます。",
  previewNote:
    "最初からプロらしく、速く、分かりやすく見えるように設計されています。",
  mainFlowTitle: "メインページ",
  mainFlowCopy: "説明ページを挟まず、直接エディターを開きます。",
  savedFlowTitle: "保存済み署名",
  savedFlowCopy: "このブラウザにバージョンを保存し、開き直して調整できます。",
  saveToLibrary: "バージョンを保存",
  savedToLibrary: "署名をこのブラウザに保存しました。",
  savedLibrary: "保存済み署名",
  savedLibraryHint: "ローカルバージョンを開く",
  libraryEmpty: "このブラウザにはまだ保存済みバージョンがありません。",
  savedPageCopy: "保存済みバージョンを確認し、開く、複製、削除ができます。",
  savedPageAction: "ライブラリを開く",
  savedBackAction: "エディターに戻る",
  supportTitle: "プロジェクトを支援",
  supportLink: "支援を見る",
  supportCopy: "ツールを無料で便利に保ち、コミュニティ向けに改善する支援です。",
});

Object.assign(ko, {
  donationThanksTitle: "기부해 주셔서 감사합니다",
  donationThanksCopy: "PayPal 창이 닫히고 이 페이지에서 세션이 계속됩니다.",
  saved: "초안이 로컬에 저장되었습니다.",
  localWarning:
    "로컬 이미지는 미리보기용입니다. 최종 서명에는 공개 HTTPS URL을 사용하세요.",
  copied:
    "서명이 복사되었습니다. 메일 클라이언트에 붙여 넣고 테스트를 보내세요.",
  invalid: "표시된 필드 또는 가져온 파일을 확인하세요.",
  cleared: "로컬 데이터가 삭제되었습니다.",
  about:
    "여러 메일 클라이언트를 위해 설계되었습니다. 항상 테스트 메일을 보내세요.",
  directStart: "미리보기와 로컬 저장으로 바로 서명을 만들 수 있습니다.",
  previewNote: "처음부터 전문적이고 빠르며 명확하게 보이도록 설계되었습니다.",
  mainFlowTitle: "메인 페이지",
  mainFlowCopy: "설명 페이지 없이 바로 편집기로 이동합니다.",
  savedFlowTitle: "저장된 서명",
  savedFlowCopy: "이 브라우저에 버전을 저장하고 다시 열어 조정할 수 있습니다.",
  saveToLibrary: "버전 저장",
  savedToLibrary: "서명이 이 브라우저에 저장되었습니다.",
  savedLibrary: "저장된 서명",
  savedLibraryHint: "로컬 버전 다시 열기",
  libraryEmpty: "이 브라우저에 저장된 버전이 아직 없습니다.",
  savedPageCopy: "저장된 버전을 확인하고 열기, 복제 또는 삭제할 수 있습니다.",
  savedPageAction: "라이브러리 열기",
  savedBackAction: "편집기로 돌아가기",
  supportTitle: "프로젝트 지원",
  supportLink: "지원 보기",
  supportCopy:
    "도구를 무료이고 유용하게 유지하며 커뮤니티를 위해 개선하도록 도와주세요.",
});

Object.assign(ar, {
  donationThanksTitle: "شكرا على تبرعك",
  donationThanksCopy: "يجب أن تغلق نافذة PayPal وتبقى جلستك هنا في الصفحة.",
  saved: "تم حفظ المسودة محليا.",
  localWarning:
    "الصورة المحلية للمعاينة فقط. استخدم رابط HTTPS عاما في التوقيع النهائي.",
  copied: "تم نسخ التوقيع. الصقه في عميل البريد وارسل اختبارا.",
  invalid: "راجع الحقول المحددة أو الملف المستورد.",
  cleared: "تم حذف البيانات المحلية.",
  about: "مصمم لعدة عملاء بريد. ارسل دائما رسالة اختبار.",
  directStart: "ابدأ إنشاء توقيعك فورا مع معاينة وحفظ محلي.",
  previewNote: "مصمم ليبدو احترافيا وسريعا وواضحا من البداية.",
  mainFlowTitle: "الصفحة الرئيسية",
  mainFlowCopy: "ادخل مباشرة إلى المحرر دون صفحة شرح قبل الإنشاء.",
  savedFlowTitle: "التواقيع المحفوظة",
  savedFlowCopy: "احفظ نسخا في هذا المتصفح لفتحها وتعديلها وتجربة الخيارات.",
  saveToLibrary: "حفظ نسخة",
  savedToLibrary: "تم حفظ التوقيع في هذا المتصفح.",
  savedLibrary: "التواقيع المحفوظة",
  savedLibraryHint: "إعادة فتح النسخ المحلية",
  libraryEmpty: "لا توجد نسخ محفوظة في هذا المتصفح بعد.",
  savedPageCopy: "راجع النسخ المحفوظة وافتحها أو كررها أو احذف غير المطلوب.",
  savedPageAction: "فتح المكتبة",
  savedBackAction: "العودة إلى المحرر",
  supportTitle: "ادعم المشروع",
  supportLink: "عرض الدعم",
  supportCopy: "ساعد في إبقاء الأداة مجانية ومفيدة ومحسنة للمجتمع.",
});

Object.assign(hi, {
  donationThanksTitle: "दान के लिए धन्यवाद",
  donationThanksCopy:
    "PayPal विंडो बंद होनी चाहिए और आपका सत्र इसी पेज पर रहेगा।",
  saved: "ड्राफ्ट स्थानीय रूप से सहेजा गया।",
  localWarning:
    "स्थानीय छवि केवल पूर्वावलोकन के लिए है। अंतिम हस्ताक्षर में सार्वजनिक HTTPS URL उपयोग करें।",
  copied:
    "हस्ताक्षर कॉपी हो गया। इसे ईमेल क्लाइंट में चिपकाएं और परीक्षण भेजें।",
  invalid: "चिह्नित फ़ील्ड या आयातित फ़ाइल जांचें।",
  cleared: "स्थानीय डेटा मिटा दिया गया।",
  about: "कई ईमेल क्लाइंट के लिए बनाया गया है। हमेशा परीक्षण संदेश भेजें।",
  directStart:
    "पूर्वावलोकन और स्थानीय सेव के साथ तुरंत हस्ताक्षर बनाना शुरू करें।",
  previewNote: "शुरुआत से पेशेवर, तेज और साफ दिखने के लिए बनाया गया।",
  mainFlowTitle: "मुख्य पेज",
  mainFlowCopy: "बनाने से पहले व्याख्या पेज के बिना सीधे संपादक खोलें।",
  savedFlowTitle: "सहेजे गए हस्ताक्षर",
  savedFlowCopy: "इस ब्राउज़र में संस्करण सहेजें, खोलें और विकल्प आजमाएं।",
  saveToLibrary: "संस्करण सहेजें",
  savedToLibrary: "हस्ताक्षर इस ब्राउज़र में सहेजा गया।",
  savedLibrary: "सहेजे गए हस्ताक्षर",
  savedLibraryHint: "स्थानीय संस्करण फिर खोलें",
  libraryEmpty: "इस ब्राउज़र में अभी कोई संस्करण सहेजा नहीं है।",
  savedPageCopy: "सहेजे गए संस्करण देखें, खोलें, डुप्लिकेट करें या हटाएं।",
  savedPageAction: "लाइब्रेरी खोलें",
  savedBackAction: "संपादक पर वापस जाएं",
  supportTitle: "परियोजना का समर्थन करें",
  supportLink: "समर्थन देखें",
  supportCopy:
    "टूल को मुफ्त, उपयोगी और समुदाय के लिए बेहतर बनाए रखने में मदद करें।",
});

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
  about: "适用于多种邮件客户端。显示效果可能有所不同，请务必先发送测试邮件。",
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
  drawerConfig: "设置",
  drawerTemplates: "模板",
  drawerClose: "关闭面板",
  fieldHidden: "这个模板不会显示这个字段，即使你填写了它。",
  templateFieldSummaryAll: "这个模板会使用这些可配置字段的全部内容。",
  templateFieldSummaryHidden: "这个模板不会显示：",
  supportTitle: "支持这个项目",
  supportLink: "查看支持方式",
  supportCopy: "帮助这个工具继续保持免费、实用，并为社区提供更好的维护。",
};

const ru: Dictionary = {
  ...en,
  language: "Язык",
  title: "Бесплатный генератор email-подписей",
  promise:
    "Создавайте профессиональную email-подпись бесплатно, без регистрации и прямо в браузере.",
  privacy:
    "Ваши данные остаются на этом устройстве и не отправляются на серверы.",
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
  copied:
    "Подпись скопирована. Вставьте ее в почтовый клиент и отправьте тестовое письмо.",
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
  drawerConfig: "Настройка",
  drawerTemplates: "Шаблоны",
  drawerClose: "Закрыть панель",
  fieldHidden:
    "Этот шаблон не показывает это поле, даже если вы его заполните.",
  templateFieldSummaryAll: "Этот шаблон использует все эти настраиваемые поля.",
  templateFieldSummaryHidden: "Этот шаблон не показывает:",
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
  it,
  ja,
  ko,
  ar,
  hi,
  "zh-CN": zhCN,
  ru,
};

export const dictionary = (locale: string) =>
  dictionaries[locale as Locale] ?? es;

const regionToLocale: Record<string, Locale> = {
  AE: "ar",
  AR: "es",
  AT: "de",
  AU: "en",
  BE: "fr",
  BH: "ar",
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
  DZ: "ar",
  EC: "es",
  EG: "ar",
  ES: "es",
  FR: "fr",
  GB: "en",
  GT: "es",
  HK: "zh-CN",
  HN: "es",
  IE: "en",
  IN: "hi",
  IT: "it",
  JO: "ar",
  JP: "ja",
  KG: "ru",
  KR: "ko",
  KW: "ar",
  KZ: "ru",
  LB: "ar",
  LU: "fr",
  LV: "ru",
  MA: "ar",
  MC: "fr",
  MD: "ru",
  MO: "zh-CN",
  MX: "es",
  NI: "es",
  NZ: "en",
  OM: "ar",
  PA: "es",
  PE: "es",
  PR: "es",
  PY: "es",
  QA: "ar",
  RU: "ru",
  SA: "ar",
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

export function normalizeLocaleCandidate(
  value: string | null | undefined,
): Locale | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower === "pt" || lower.startsWith("pt-")) return "pt-BR";
  if (lower === "zh" || lower.startsWith("zh-")) return "zh-CN";
  if (lower === "es" || lower.startsWith("es-")) return "es";
  if (lower === "en" || lower.startsWith("en-")) return "en";
  if (lower === "fr" || lower.startsWith("fr-")) return "fr";
  if (lower === "de" || lower.startsWith("de-")) return "de";
  if (lower === "it" || lower.startsWith("it-")) return "it";
  if (lower === "ja" || lower.startsWith("ja-")) return "ja";
  if (lower === "ko" || lower.startsWith("ko-")) return "ko";
  if (lower === "ar" || lower.startsWith("ar-")) return "ar";
  if (lower === "hi" || lower.startsWith("hi-")) return "hi";
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
