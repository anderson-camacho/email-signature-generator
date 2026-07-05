import {
  defaultConfig,
  type SignatureConfig,
  type SocialLink,
  type SocialPlatform,
} from "../core/signature-types";
import { renderSignature } from "../templates/registry";
import {
  templateFieldSupport,
  type ConfigurableFieldName,
} from "../templates/catalog";
import { exportConfig, importConfig } from "../export/json-config";
import {
  loadDraft,
  saveDraft,
  clearDraft,
  loadSavedSignatures,
  saveSavedSignatures,
  type SavedSignatureRecord,
} from "../storage/local-storage-adapter";
import {
  isEmail,
  isReadableText,
  normalizePhone,
  safeHttpsUrl,
} from "../core/validators";

const editor = document.querySelector<HTMLElement>("[data-editor]")!;
const locale = editor.dataset.locale ?? "en";
const messages = {
  copied: editor.dataset.copied!,
  invalid: editor.dataset.invalid!,
  cleared: editor.dataset.cleared!,
};
const socialMessages = {
  empty:
    editor.dataset.socialEmpty ??
    "No social buttons added. Your signature will not show this section.",
  platform: editor.dataset.socialPlatformLabel ?? "Platform",
  url: editor.dataset.socialUrlLabel ?? "Public HTTPS URL",
  icon: editor.dataset.socialIconLabel ?? "Icon color",
  original: editor.dataset.socialOriginalLabel ?? "Original platform color",
  primary: editor.dataset.socialPrimaryLabel ?? "Selected primary color",
  remove: editor.dataset.socialRemoveLabel ?? "Remove",
};
const exportMessages = {
  title: editor.dataset.exportTitle ?? "Your email signature",
  copy:
    editor.dataset.exportCopy ??
    "Copy the signature below and paste it into your email client's signature settings.",
};
const localImageMessages = {
  noFile: editor.dataset.localImageNoFile ?? "Choose an image to adjust.",
  ready:
    editor.dataset.localImageReady ??
    "Image ready and saved with this signature.",
  invalid: editor.dataset.localImageInvalid ?? "Use JPG, PNG, WebP, or GIF.",
};
const validationMessages = {
  email:
    editor.dataset.validationEmail ??
    "Enter a valid email address, for example name@example.com.",
  phone:
    editor.dataset.validationPhone ??
    "Use an international phone number with 7 to 15 digits.",
  website:
    editor.dataset.validationWebsite ??
    "Use a valid public HTTPS URL, for example https://example.com.",
  text:
    editor.dataset.validationText ??
    "Use readable text only. Letters from any language, numbers, spaces, and normal punctuation are allowed.",
};
const localizedDefaults = (() => {
  try {
    return JSON.parse(
      editor.dataset.defaultConfig ?? "{}",
    ) as Partial<SignatureConfig>;
  } catch {
    return {};
  }
})();
const form = document.querySelector<HTMLFormElement>("#signature-form")!;
const preview = document.querySelector<HTMLElement>("#preview")!;
const status = document.querySelector<HTMLElement>("#status")!;
const socialList = document.querySelector<HTMLElement>("#social-list")!;
const saveLibraryButton =
  document.querySelector<HTMLButtonElement>("#save-library")!;
const templateButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-template]");
const templatePreviews = document.querySelectorAll<HTMLElement>(
  "[data-template-preview]",
);
const previewModeButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-preview-mode]",
);
const previewStage = document.querySelector<HTMLElement>("#preview-stage")!;
const editorLayout = document.querySelector<HTMLElement>(
  "[data-editor-layout]",
);
const drawerBackdrop = document.querySelector<HTMLElement>(
  "[data-drawer-backdrop]",
);
const drawerToggles = document.querySelectorAll<HTMLButtonElement>(
  "[data-drawer-toggle]",
);
const drawerCloseButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-drawer-close]",
);
const drawerPanels = {
  config: document.querySelector<HTMLElement>('[data-drawer-panel="config"]'),
  templates: document.querySelector<HTMLElement>(
    '[data-drawer-panel="templates"]',
  ),
};
const compactEditorMedia = window.matchMedia("(max-width: 1100px)");
const fieldWrappers = document.querySelectorAll<HTMLElement>(
  "[data-field-wrapper]",
);
const templateFieldSummary = document.querySelector<HTMLElement>(
  "#template-field-summary",
);
const localImageInput =
  document.querySelector<HTMLInputElement>("#local-image")!;
const localImageWarning =
  document.querySelector<HTMLElement>("#local-warning")!;
const localImageModal =
  document.querySelector<HTMLElement>("#local-image-modal")!;
const localImageCanvas = document.querySelector<HTMLCanvasElement>(
  "#local-image-canvas",
)!;
const localImageContext = localImageCanvas.getContext("2d")!;
const localImageTarget = document.querySelector<HTMLSelectElement>(
  "#local-image-target",
)!;
const localImageMode =
  document.querySelector<HTMLSelectElement>("#local-image-mode")!;
const localImageFormat = document.querySelector<HTMLSelectElement>(
  "#local-image-format",
)!;
const localImageZoom =
  document.querySelector<HTMLInputElement>("#local-image-zoom")!;
const localImageX = document.querySelector<HTMLInputElement>("#local-image-x")!;
const localImageY = document.querySelector<HTMLInputElement>("#local-image-y")!;
const openLocalImageToolsButton = document.querySelector<HTMLButtonElement>(
  "#open-local-image-tools",
)!;
const applyLocalImageButton =
  document.querySelector<HTMLButtonElement>("#apply-local-image")!;
const removeLocalImageButton = document.querySelector<HTMLButtonElement>(
  "#remove-local-image",
)!;
const control = (name: string) =>
  form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
const dataImagePattern = /^data:image\/(png|jpe?g|webp|gif);base64,/i;
const isDataImageUrl = (value: string) => dataImagePattern.test(value);
type ValidationKind = "email" | "phone" | "website" | "text";

const freshConfig = (): SignatureConfig => ({
  ...structuredClone(defaultConfig),
  ...localizedDefaults,
  socials: [],
});

type DrawerName = keyof typeof drawerPanels;

let config: SignatureConfig = (() => {
  const base = freshConfig();
  try {
    const draft = loadDraft(localStorage);
    return draft ? { ...base, ...draft, socials: draft.socials ?? [] } : base;
  } catch {
    return base;
  }
})();
let timer: ReturnType<typeof setTimeout>;
let activeDrawer: DrawerName | null = null;
let savedSignatures: SavedSignatureRecord[] = (() => {
  try {
    return loadSavedSignatures(localStorage);
  } catch {
    return [];
  }
})();

function populate() {
  for (const [key, value] of Object.entries(config)) {
    if (key !== "socials") {
      const input = control(key);
      if (input) {
        if (
          (key === "logoUrl" || key === "photoUrl") &&
          isDataImageUrl(String(value))
        ) {
          input.value = "";
          if (input instanceof HTMLInputElement) {
            input.placeholder = localImageMessages.ready;
          }
        } else {
          input.value = String(value);
        }
        if (input instanceof HTMLInputElement && input.dataset.exampleValue) {
          input.dataset.exampleActive = String(
            input.value === input.dataset.exampleValue,
          );
        }
      }
    }
  }
  renderSocialEditor();
}

function read() {
  const data = Object.fromEntries(new FormData(form));
  const nextConfig = { ...config, ...data } as SignatureConfig;
  (["logoUrl", "photoUrl"] as const).forEach((key) => {
    const value = String(data[key] ?? "").trim();
    if (!value && isDataImageUrl(config[key])) {
      nextConfig[key] = config[key];
    }
  });
  config = nextConfig;
}

const render = () => {
  preview.innerHTML = renderSignature(config, locale);
  renderTemplatePreviews();
  updateFieldSupportState();
  validateFormFields();
  updateLocalImageRemoveState();
};

function renderTemplatePreviews() {
  templatePreviews.forEach((node) => {
    const template = node.dataset.templatePreview as
      | SignatureConfig["template"]
      | undefined;
    if (!template) return;
    node.innerHTML = renderSignature(
      {
        ...config,
        template,
      },
      locale,
    );
  });
}

function updateFieldSupportState() {
  const supportedFields = new Set(
    templateFieldSupport[config.template] ?? [],
  ) as Set<ConfigurableFieldName>;
  const hiddenLabels: string[] = [];

  fieldWrappers.forEach((wrapper) => {
    const fieldName = wrapper.dataset.fieldName as
      | ConfigurableFieldName
      | undefined;
    const supportNote = wrapper.querySelector<HTMLElement>(
      "[data-field-support-note]",
    );
    const fieldControl = wrapper.querySelector<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("[data-field-control]");
    if (!fieldName || !supportNote) return;

    const isSupported = supportedFields.has(fieldName);
    wrapper.classList.toggle("is-field-unused", !isSupported);
    supportNote.hidden = isSupported;
    supportNote.style.display = isSupported ? "none" : "inline-flex";
    supportNote.setAttribute("aria-hidden", String(isSupported));
    if (fieldControl) {
      fieldControl.disabled = !isSupported;
      fieldControl.setAttribute("aria-disabled", String(!isSupported));
    }

    if (!isSupported && wrapper.dataset.fieldLabel) {
      hiddenLabels.push(wrapper.dataset.fieldLabel);
    }
  });

  if (!templateFieldSummary) return;

  if (!hiddenLabels.length) {
    templateFieldSummary.textContent =
      editor.dataset.templateFieldsAll ??
      "This template shows all of these configurable fields.";
    return;
  }

  templateFieldSummary.textContent = `${
    editor.dataset.templateFieldsHiddenPrefix ?? "This template does not show:"
  } ${hiddenLabels.join(", ")}.`;
}

function validationMessageFor(input: HTMLInputElement) {
  const value = input.value.trim();
  const kind = input.dataset.validationKind as ValidationKind | undefined;
  if (!value || input.disabled || !kind) return "";

  if (kind === "email") {
    return isEmail(value) ? "" : validationMessages.email;
  }

  if (kind === "phone") {
    return normalizePhone(value) ? "" : validationMessages.phone;
  }

  if (kind === "website") {
    return safeHttpsUrl(value) ? "" : validationMessages.website;
  }

  return isReadableText(value) ? "" : validationMessages.text;
}

function validateField(input: HTMLInputElement) {
  const message = validationMessageFor(input);
  const wrapper = input.closest<HTMLElement>("[data-field-wrapper]");
  const error = wrapper?.querySelector<HTMLElement>("[data-field-error]");

  input.setCustomValidity(message);
  input.setAttribute("aria-invalid", String(Boolean(message)));
  wrapper?.classList.toggle("has-field-error", Boolean(message));

  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }
}

function validateFormFields() {
  form
    .querySelectorAll<HTMLInputElement>("[data-validation-kind]")
    .forEach(validateField);
}

const download = (content: string, name: string, type: string) => {
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(new Blob([content], { type }));
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
};

const platforms: SocialPlatform[] = [
  "linkedin",
  "instagram",
  "facebook",
  "x",
  "youtube",
  "tiktok",
  "whatsapp",
  "github",
  "dribbble",
  "behance",
  "pinterest",
];

const platformLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  github: "GitHub",
  dribbble: "Dribbble",
  behance: "Behance",
  pinterest: "Pinterest",
};

function socialControl(
  tag: "select" | "input",
  label: string,
  value: string,
  onChange: (value: string) => void,
  className?: string,
) {
  const wrapper = document.createElement("label");
  if (className) wrapper.className = className;
  wrapper.textContent = label;
  const element = document.createElement(tag);
  if (element instanceof HTMLInputElement) {
    element.type = "url";
    element.placeholder = "https://";
  }
  element.value = value;
  element.addEventListener("input", () => onChange(element.value));
  wrapper.append(element);
  return { wrapper, element };
}

function updateSocial(id: string, values: Partial<SocialLink>) {
  config.socials = config.socials.map((social) =>
    social.id === id ? { ...social, ...values } : social,
  );
  render();
  scheduleSave();
}

function renderSocialEditor() {
  socialList.replaceChildren();
  if (!config.socials.length) {
    const empty = document.createElement("p");
    empty.className = "social-empty";
    empty.textContent = socialMessages.empty;
    socialList.append(empty);
  }

  config.socials.forEach((social, index) => {
    const card = document.createElement("div");
    card.className = "social-card";

    const badge = document.createElement("span");
    badge.className = "social-card-number";
    badge.textContent = String(index + 1);

    const header = document.createElement("div");
    header.className = "social-card-header";

    const platform = socialControl(
      "select",
      socialMessages.platform,
      social.platform,
      (value) => updateSocial(social.id, { platform: value as SocialPlatform }),
      "social-field social-field-platform",
    );

    platforms.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = platformLabels[name];
      platform.element.append(option);
    });
    platform.element.value = social.platform;

    const url = socialControl(
      "input",
      socialMessages.url,
      social.url,
      (value) => updateSocial(social.id, { url: value }),
      "social-field social-field-url",
    );

    const style = socialControl(
      "select",
      socialMessages.icon,
      social.iconStyle,
      (value) =>
        updateSocial(social.id, {
          iconStyle: value === "primary" ? "primary" : "original",
        }),
      "social-field social-field-style",
    );

    (
      [
        ["original", socialMessages.original],
        ["primary", socialMessages.primary],
      ] as const
    ).forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      style.element.append(option);
    });
    style.element.value = social.iconStyle;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-social";
    remove.textContent = socialMessages.remove;
    remove.addEventListener("click", () => {
      config.socials = config.socials.filter((item) => item.id !== social.id);
      renderSocialEditor();
      render();
      scheduleSave();
    });

    const grid = document.createElement("div");
    grid.className = "social-card-grid";
    grid.append(platform.wrapper, style.wrapper, url.wrapper);

    header.append(badge, remove);
    card.append(header, grid);
    socialList.append(card);
  });
}

function scheduleSave() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      saveDraft(localStorage, config);
    } catch {
      status.textContent = messages.invalid;
    }
  }, 300);
}

function setDrawer(nextDrawer: DrawerName | null) {
  const isCompact = compactEditorMedia.matches;
  activeDrawer = isCompact ? nextDrawer : null;

  if (editorLayout) {
    if (activeDrawer) {
      editorLayout.dataset.drawerOpen = activeDrawer;
    } else {
      delete editorLayout.dataset.drawerOpen;
    }
  }

  Object.entries(drawerPanels).forEach(([name, panel]) => {
    panel?.setAttribute(
      "aria-hidden",
      String(isCompact && activeDrawer !== name),
    );
  });

  drawerToggles.forEach((button) => {
    const isExpanded = button.dataset.drawerToggle === activeDrawer;
    button.setAttribute("aria-expanded", String(isExpanded));
  });

  if (drawerBackdrop) {
    drawerBackdrop.hidden = !isCompact || activeDrawer === null;
  }

  document.body.classList.toggle(
    "drawer-lock",
    isCompact && activeDrawer !== null,
  );
}

function closeDrawer() {
  setDrawer(null);
}

let sourceLocalImage: HTMLImageElement | null = null;
let localImageFileUrl: string | null = null;
let localImageUploadTarget: "photoUrl" | "logoUrl" = "photoUrl";

function supportsLocalImage(file: File) {
  const supportedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const supportedExtensions = /\.(jpe?g|png|webp|gif)$/i;
  return (
    supportedTypes.includes(file.type) || supportedExtensions.test(file.name)
  );
}

function setLocalImageModal(open: boolean) {
  localImageModal.hidden = !open;
  document.body.classList.toggle("drawer-lock", open || activeDrawer !== null);
}

function resetLocalImageControls() {
  localImageMode.value = "cover";
  localImageFormat.value = "image/webp";
  localImageZoom.value = "1";
  localImageX.value = "0";
  localImageY.value = "0";
}

function drawLocalImagePreview() {
  if (!sourceLocalImage) return;

  const size = localImageCanvas.width;
  const mode = localImageMode.value;
  const zoom = Number(localImageZoom.value);
  const xOffset = Number(localImageX.value) / 100;
  const yOffset = Number(localImageY.value) / 100;
  const scaleBase =
    mode === "contain"
      ? Math.min(
          size / sourceLocalImage.naturalWidth,
          size / sourceLocalImage.naturalHeight,
        )
      : Math.max(
          size / sourceLocalImage.naturalWidth,
          size / sourceLocalImage.naturalHeight,
        );
  const scale = scaleBase * zoom;
  const width = sourceLocalImage.naturalWidth * scale;
  const height = sourceLocalImage.naturalHeight * scale;
  const maxX = Math.max(0, (width - size) / 2);
  const maxY = Math.max(0, (height - size) / 2);
  const x = (size - width) / 2 + maxX * xOffset;
  const y = (size - height) / 2 + maxY * yOffset;

  localImageContext.clearRect(0, 0, size, size);
  localImageContext.fillStyle = "#ffffff";
  localImageContext.fillRect(0, 0, size, size);
  localImageContext.drawImage(sourceLocalImage, x, y, width, height);
}

function updateLocalImageRemoveState() {
  removeLocalImageButton.disabled = !(
    isDataImageUrl(config.photoUrl) || isDataImageUrl(config.logoUrl)
  );
}

async function openLocalImageEditor(file: File) {
  if (!supportsLocalImage(file)) {
    status.textContent = localImageMessages.invalid;
    localImageInput.value = "";
    return;
  }

  if (localImageFileUrl) URL.revokeObjectURL(localImageFileUrl);
  localImageFileUrl = URL.createObjectURL(file);
  sourceLocalImage = new Image();
  sourceLocalImage.src = localImageFileUrl;
  await sourceLocalImage.decode();
  localImageTarget.value = localImageUploadTarget;
  resetLocalImageControls();
  drawLocalImagePreview();
  localImageWarning.hidden = false;
  setLocalImageModal(true);
}

function applyLocalImage() {
  if (!sourceLocalImage) {
    status.textContent = localImageMessages.noFile;
    return;
  }

  drawLocalImagePreview();
  const format = localImageFormat.value;
  const dataUrl = localImageCanvas.toDataURL(
    format,
    format === "image/png" ? undefined : 0.82,
  );
  localImageUploadTarget = localImageTarget.value as "photoUrl" | "logoUrl";
  config = {
    ...config,
    [localImageUploadTarget]: dataUrl,
  };
  populate();
  render();
  scheduleSave();
  localImageWarning.hidden = true;
  status.textContent = localImageMessages.ready;
  setLocalImageModal(false);
}

function removeLocalImage() {
  localImageInput.value = "";
  if (isDataImageUrl(config.photoUrl)) config.photoUrl = "";
  if (isDataImageUrl(config.logoUrl)) config.logoUrl = "";
  localImageWarning.hidden = true;
  populate();
  render();
  scheduleSave();
}

populate();
render();
setDrawer(null);

form.addEventListener("input", () => {
  const activeField = document.activeElement;
  if (
    activeField instanceof HTMLInputElement &&
    activeField.dataset.exampleValue &&
    activeField.dataset.exampleActive !== "false"
  ) {
    activeField.dataset.exampleActive = "false";
  }
  read();
  render();
  scheduleSave();
});

form.addEventListener("focusin", (event) => {
  const target = event.target;
  if (
    !(target instanceof HTMLInputElement) ||
    !target.dataset.exampleValue ||
    target.disabled ||
    target.dataset.exampleActive !== "true"
  ) {
    return;
  }
  target.value = "";
  target.dataset.exampleActive = "false";
  read();
  render();
  scheduleSave();
});

document.querySelector<HTMLButtonElement>("#add-social")!.onclick = () => {
  config.socials.push({
    id: crypto.randomUUID(),
    platform: "instagram",
    url: "",
    iconStyle: "original",
  });
  renderSocialEditor();
  render();
};

document.querySelector<HTMLButtonElement>("#copy")!.onclick = async () => {
  const html = renderSignature(config, locale);
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([preview.textContent ?? ""], {
          type: "text/plain",
        }),
      }),
    ]);
    status.textContent = messages.copied;
  } catch {
    const range = document.createRange();
    range.selectNodeContents(preview);
    const selection = getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    status.textContent = messages.invalid;
  }
};

document.querySelector<HTMLButtonElement>("#download")!.onclick = () =>
  download(
    `<!doctype html><meta charset="utf-8"><h1>${exportMessages.title}</h1><p>${exportMessages.copy}</p>${renderSignature(config, locale)}`,
    "email-signature.html",
    "text/html",
  );

document.querySelector<HTMLButtonElement>("#export")!.onclick = () =>
  download(
    exportConfig(config),
    "email-signature-config.json",
    "application/json",
  );

document.querySelector<HTMLInputElement>("#import")!.onchange = async (
  event,
) => {
  try {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    config = importConfig(await file.text());
    populate();
    render();
    saveDraft(localStorage, config);
  } catch {
    status.textContent = messages.invalid;
  }
};

document.querySelector<HTMLButtonElement>("#clear")!.onclick = () => {
  try {
    clearDraft(localStorage);
  } catch {
    /* unavailable storage is non-fatal */
  }
  config = freshConfig();
  populate();
  render();
  status.textContent = messages.cleared;
};

saveLibraryButton.onclick = () => {
  read();
  const name =
    config.fullName.trim() ||
    config.company.trim() ||
    `Signature ${savedSignatures.length + 1}`;
  const entry: SavedSignatureRecord = {
    id: crypto.randomUUID(),
    name,
    updatedAt: new Date().toISOString(),
    config: structuredClone(config),
  };
  savedSignatures = [entry, ...savedSignatures].slice(0, 12);
  saveSavedSignatures(localStorage, savedSignatures);
  status.textContent =
    editor.dataset.savedToLibrary ?? "Signature saved in this browser.";
};

localImageInput.addEventListener("change", (event) => {
  const file = (event.currentTarget as HTMLInputElement).files?.[0];
  if (!file) {
    localImageWarning.hidden = true;
    return;
  }
  void openLocalImageEditor(file).catch(() => {
    status.textContent = localImageMessages.invalid;
  });
});

openLocalImageToolsButton.addEventListener("click", () => {
  const file = localImageInput.files?.[0];
  if (!file) {
    status.textContent = localImageMessages.noFile;
    return;
  }
  void openLocalImageEditor(file).catch(() => {
    status.textContent = localImageMessages.invalid;
  });
});

applyLocalImageButton.addEventListener("click", applyLocalImage);
removeLocalImageButton.addEventListener("click", removeLocalImage);
document
  .querySelectorAll<HTMLElement>("[data-local-image-cancel]")
  .forEach((button) => {
    button.addEventListener("click", () => setLocalImageModal(false));
  });
[
  localImageTarget,
  localImageMode,
  localImageFormat,
  localImageZoom,
  localImageX,
  localImageY,
].forEach((element) => {
  element.addEventListener("input", drawLocalImagePreview);
});

drawerToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const drawer = button.dataset.drawerToggle as DrawerName | undefined;
    if (!drawer) return;
    setDrawer(activeDrawer === drawer ? null : drawer);
  });
});

drawerCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDrawer);
});

drawerBackdrop?.addEventListener("click", closeDrawer);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !localImageModal.hidden) {
    setLocalImageModal(false);
    return;
  }
  if (event.key === "Escape") closeDrawer();
});

compactEditorMedia.addEventListener("change", () => {
  setDrawer(null);
});

document
  .querySelectorAll<HTMLButtonElement>("[data-palette-primary]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const primary = button.dataset.palettePrimary;
      const secondary = button.dataset.paletteSecondary;
      if (!primary || !secondary) return;
      const primaryInput = control("primaryColor");
      const secondaryInput = control("secondaryColor");
      if (primaryInput && secondaryInput) {
        primaryInput.value = primary;
        secondaryInput.value = secondary;
        read();
        render();
        scheduleSave();
      }
    });
  });

templateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const template = button.dataset.template;
    const templateInput = control("template");
    if (!template || !templateInput) return;
    templateInput.value = template;
    read();
    render();
    scheduleSave();
    closeDrawer();
  });
});

previewModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.previewMode;
    if (!mode) return;
    previewStage.dataset.mode = mode;
    previewModeButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });
  });
});
