import { renderSignature } from "../templates/registry";
import {
  loadSavedSignatures,
  saveSavedSignatures,
  saveDraft,
} from "../storage/local-storage-adapter";

const page = document.querySelector<HTMLElement>("[data-saved-page]");
if (!page) {
  // no-op outside saved signatures page
} else {
  const locale = page.dataset.locale ?? "es";
  const isSpanish = locale === "es";
  const ui = isSpanish
    ? {
        open: "Abrir",
        duplicate: "Duplicar",
        duplicateSuffix: "copia",
        remove: "Borrar",
      }
    : {
        open: "Open",
        duplicate: "Duplicate",
        duplicateSuffix: "copy",
        remove: "Delete",
      };
  const grid = document.querySelector<HTMLElement>("#saved-page-grid")!;
  const empty = document.querySelector<HTMLElement>("#saved-empty")!;

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  let signatures = (() => {
    try {
      return loadSavedSignatures(localStorage);
    } catch {
      return [];
    }
  })();

  function renderList() {
    grid.replaceChildren();
    empty.hidden = signatures.length > 0;
    if (!signatures.length) return;

    signatures.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "saved-page-card";

      const preview = document.createElement("div");
      preview.className = "saved-page-preview";
      preview.innerHTML = `<div class="saved-page-preview-inner">${renderSignature(entry.config, locale)}</div>`;

      const body = document.createElement("div");
      body.className = "saved-page-body";
      body.innerHTML = `
        <div class="saved-page-meta">
          <strong>${entry.name}</strong>
          <span>${formatDate(entry.updatedAt)}</span>
        </div>
        <p>${entry.config.fullName} - ${entry.config.jobTitle}</p>
      `;

      const actions = document.createElement("div");
      actions.className = "saved-page-actions";

      const open = document.createElement("button");
      open.className = "ghost-button";
      open.textContent = ui.open;
      open.addEventListener("click", () => {
        saveDraft(localStorage, entry.config);
        window.location.href = `/${locale}/`;
      });

      const duplicate = document.createElement("button");
      duplicate.className = "ghost-button";
      duplicate.textContent = ui.duplicate;
      duplicate.addEventListener("click", () => {
        signatures = [
          {
            ...entry,
            id: crypto.randomUUID(),
            name: `${entry.name} ${ui.duplicateSuffix}`,
            updatedAt: new Date().toISOString(),
          },
          ...signatures,
        ].slice(0, 24);
        saveSavedSignatures(localStorage, signatures);
        renderList();
      });

      const remove = document.createElement("button");
      remove.className = "ghost-button danger";
      remove.textContent = ui.remove;
      remove.addEventListener("click", () => {
        signatures = signatures.filter((item) => item.id !== entry.id);
        saveSavedSignatures(localStorage, signatures);
        renderList();
      });

      actions.append(open, duplicate, remove);
      body.append(actions);
      card.append(preview, body);
      grid.append(card);
    });
  }

  renderList();
}
