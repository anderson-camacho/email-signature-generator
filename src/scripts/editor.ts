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

const editor = document.querySelector<HTMLElement>("[data-editor]")!;
const messages = {
  copied: editor.dataset.copied!,
  invalid: editor.dataset.invalid!,
  cleared: editor.dataset.cleared!,
};
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
const editorLayout = document.querySelector<HTMLElement>("[data-editor-layout]");
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
const control = (name: string) =>
  form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;

type DrawerName = keyof typeof drawerPanels;

let config: SignatureConfig = (() => {
  try {
    return loadDraft(localStorage) ?? structuredClone(defaultConfig);
  } catch {
    return structuredClone(defaultConfig);
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
      if (input) input.value = String(value);
    }
  }
  renderSocialEditor();
}

function read() {
  const data = Object.fromEntries(new FormData(form));
  config = { ...config, ...data } as SignatureConfig;
}

const render = () => {
  preview.innerHTML = renderSignature(config);
  renderTemplatePreviews();
  updateFieldSupportState();
};

function renderTemplatePreviews() {
  templatePreviews.forEach((node) => {
    const template = node.dataset
      .templatePreview as SignatureConfig["template"] | undefined;
    if (!template) return;
    node.innerHTML = renderSignature({
      ...config,
      template,
    });
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
    if (!fieldName || !supportNote) return;

    const isSupported = supportedFields.has(fieldName);
    wrapper.classList.toggle("is-field-unused", !isSupported);
    supportNote.hidden = isSupported;

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
    editor.dataset.templateFieldsHiddenPrefix ??
    "This template does not show:"
  } ${hiddenLabels.join(", ")}.`;
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
) {
  const wrapper = document.createElement("label");
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
    empty.textContent =
      "No social buttons added. Your signature will not show this section.";
    socialList.append(empty);
  }

  config.socials.forEach((social, index) => {
    const card = document.createElement("div");
    card.className = "social-card";

    const badge = document.createElement("span");
    badge.className = "social-card-number";
    badge.textContent = String(index + 1);

    const platform = socialControl(
      "select",
      "Platform",
      social.platform,
      (value) => updateSocial(social.id, { platform: value as SocialPlatform }),
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
      "Public HTTPS URL",
      social.url,
      (value) => updateSocial(social.id, { url: value }),
    );

    const style = socialControl(
      "select",
      "Icon color",
      social.iconStyle,
      (value) =>
        updateSocial(social.id, {
          iconStyle: value === "primary" ? "primary" : "original",
        }),
    );

    (
      [
        ["original", "Original platform color"],
        ["primary", "Selected primary color"],
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
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      config.socials = config.socials.filter((item) => item.id !== social.id);
      renderSocialEditor();
      render();
      scheduleSave();
    });

    card.append(badge, platform.wrapper, url.wrapper, style.wrapper, remove);
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

populate();
render();
setDrawer(null);

form.addEventListener("input", () => {
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
  const html = renderSignature(config);
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
    `<!doctype html><meta charset="utf-8"><h1>Your email signature</h1><p>Copy the signature below and paste it into your email client's signature settings.</p>${renderSignature(config)}`,
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
  config = structuredClone(defaultConfig);
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

document.querySelector<HTMLInputElement>("#local-image")!.onchange = (
  event,
) => {
  const file = (event.currentTarget as HTMLInputElement).files?.[0];
  document.querySelector<HTMLElement>("#local-warning")!.hidden = !file;
  if (file) {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.alt = "Local preview";
    image.width = 72;
    preview.prepend(image);
  }
};

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
