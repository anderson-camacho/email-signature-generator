import {
  defaultConfig,
  type SignatureConfig,
  type SocialLink,
  type SocialPlatform,
} from "../core/signature-types";
import { renderSignature } from "../templates/registry";
import { exportConfig, importConfig } from "../export/json-config";
import {
  loadDraft,
  saveDraft,
  clearDraft,
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
const control = (name: string) =>
  form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
let config: SignatureConfig = (() => {
  try {
    return loadDraft(localStorage) ?? structuredClone(defaultConfig);
  } catch {
    return structuredClone(defaultConfig);
  }
})();
let timer: ReturnType<typeof setTimeout>;

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
};
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
];

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
      option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
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

populate();
render();
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
    `<!doctype html><meta charset="utf-8"><h1>Your email signature</h1><p>Copy the signature below and paste it into Gmail settings.</p>${renderSignature(config)}`,
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
