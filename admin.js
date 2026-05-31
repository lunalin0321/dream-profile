const storageKey = "dream-private-data";
const iconOptions = ["rose", "anchor", "leaf", "butterfly", "clock", "star", "crown", "feather"];
const form = document.querySelector("[data-admin-form]");
const pitEditor = document.querySelector("[data-pit-editor]");
const socialEditor = document.querySelector("[data-social-editor]");
const postEditor = document.querySelector("[data-post-editor]");
const toast = document.querySelector(".toast");

let draft = loadDraft();

function loadDraft() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      return mergeData(window.DREAM_DATA, JSON.parse(saved));
    } catch {
      localStorage.removeItem(storageKey);
    }
  }
  return structuredClone(window.DREAM_DATA);
}

function mergeData(defaultData, savedData) {
  return structuredClone({
    ...defaultData,
    ...savedData,
    profile: { ...defaultData.profile, ...(savedData.profile || {}) },
    about: { ...defaultData.about, ...(savedData.about || {}) },
    rules: { ...defaultData.rules, ...(savedData.rules || {}) },
    message: { ...defaultData.message, ...(savedData.message || {}) },
    pitList: savedData.pitList || defaultData.pitList,
    socialLinks: savedData.socialLinks || defaultData.socialLinks,
    posts: savedData.posts || defaultData.posts,
  });
}

function ensureCollections() {
  draft.pitList ||= [];
  draft.socialLinks ||= [];
  draft.posts ||= [];
}

function linesToText(value) {
  return (value || []).join("\n");
}

function textToLines(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function bindBasicFields() {
  setValue("profile.username", draft.profile.username);
  setValue("profile.brand", draft.profile.brand);
  setValue("profile.displayName", draft.profile.displayName);
  setValue("profile.following", draft.profile.following);
  setValue("profile.lines", linesToText(draft.profile.lines));
  setValue("profile.linkText", draft.profile.linkText);
  setValue("profile.footer", draft.profile.footer);
  setValue("about.title", draft.about.title);
  setValue("about.paragraphs", linesToText(draft.about.paragraphs));
  setValue("rules.title", draft.rules.title);
  setValue("rules.items", linesToText(draft.rules.items));
  setValue("message.title", draft.message.title);
  setValue("message.text", draft.message.text);
}

function setValue(name, value) {
  const input = form.elements[name];
  if (input) input.value = value || "";
}

function collectBasicFields() {
  draft.profile.username = form.elements["profile.username"].value.trim();
  draft.profile.brand = form.elements["profile.brand"].value.trim();
  draft.profile.displayName = form.elements["profile.displayName"].value.trim();
  draft.profile.following = form.elements["profile.following"].value.trim();
  draft.profile.lines = textToLines(form.elements["profile.lines"].value);
  draft.profile.linkText = form.elements["profile.linkText"].value.trim();
  draft.profile.footer = form.elements["profile.footer"].value.trim();
  draft.about.title = form.elements["about.title"].value.trim();
  draft.about.paragraphs = textToLines(form.elements["about.paragraphs"].value);
  draft.rules.title = form.elements["rules.title"].value.trim();
  draft.rules.items = textToLines(form.elements["rules.items"].value);
  draft.message.title = form.elements["message.title"].value.trim();
  draft.message.text = form.elements["message.text"].value.trim();
}

function renderPitEditor() {
  ensureCollections();
  pitEditor.innerHTML = draft.pitList
    .map(
      (group, index) => `
        <article class="editor-card" data-pit-index="${index}">
          <div class="editor-card-head">
            <h3>${group.title || `坑單分類 ${index + 1}`}</h3>
            <div class="mini-actions">
              <button type="button" data-pit-up>上移</button>
              <button type="button" data-pit-down>下移</button>
              <button type="button" data-pit-delete>刪除</button>
            </div>
          </div>
          <div class="form-grid">
            <label>
              分類標題
              <input data-pit-field="title" type="text" value="${escapeAttr(group.title)}" />
            </label>
            <label class="wide">
              作品，每行一個
              <textarea data-pit-field="items" rows="4">${escapeHtml(linesToText(group.items))}</textarea>
            </label>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSocialEditor() {
  ensureCollections();
  socialEditor.innerHTML = draft.socialLinks
    .map(
      (link, index) => `
        <article class="editor-card" data-social-index="${index}">
          <div class="editor-card-head">
            <h3>${link.label || `社群連結 ${index + 1}`}</h3>
            <div class="mini-actions">
              <button type="button" data-social-up>上移</button>
              <button type="button" data-social-down>下移</button>
              <button type="button" data-social-delete>刪除</button>
            </div>
          </div>
          <div class="form-grid">
            ${socialField("label", "平台名稱", link.label)}
            ${socialField("handle", "顯示帳號 / 文字", link.handle)}
            <label class="wide">
              網址
              <input data-social-field="url" type="url" value="${escapeAttr(link.url)}" />
            </label>
            <label class="wide">
              說明
              <input data-social-field="note" type="text" value="${escapeAttr(link.note)}" />
            </label>
          </div>
        </article>
      `
    )
    .join("");
}

function renderPostEditor() {
  postEditor.innerHTML = draft.posts
    .map(
      (post, index) => `
        <article class="editor-card" data-post-index="${index}">
          <div class="editor-card-head">
            <h3>#${post.id || index + 1} ${post.work || "未命名作品"} / ${post.character || "夢角"}</h3>
            <div class="mini-actions">
              <button type="button" data-post-up>上移</button>
              <button type="button" data-post-down>下移</button>
              <button type="button" data-post-copy>複製</button>
              <button type="button" data-post-delete>刪除</button>
            </div>
          </div>
          <div class="form-grid">
            ${field("id", "編號", post.id)}
            ${field("work", "作品名", post.work)}
            ${field("character", "夢角名", post.character)}
            ${field("dreamer", "夢主名", post.dreamer)}
            ${field("relation", "關係定位", post.relation)}
            ${field("status", "狀態", post.status)}
            <label>
              重點色
              <input data-post-field="color" type="color" value="${escapeAttr(post.color || "#8cc9ff")}" />
            </label>
            <label>
              icon
              <select data-post-field="icon">
                ${iconOptions.map((icon) => `<option value="${icon}" ${icon === post.icon ? "selected" : ""}>${icon}</option>`).join("")}
              </select>
            </label>
            <label class="wide">
              界線 / 雷點，每行一條
              <textarea data-post-field="boundaries" rows="3">${escapeHtml(linesToText(post.boundaries))}</textarea>
            </label>
            <label class="wide">
              標籤，每行一個
              <textarea data-post-field="tags" rows="3">${escapeHtml(linesToText(post.tags))}</textarea>
            </label>
            <label class="wide">
              備註
              <textarea data-post-field="note" rows="3">${escapeHtml(post.note)}</textarea>
            </label>
          </div>
        </article>
      `
    )
    .join("");
}

function field(key, label, value) {
  return `<label>${label}<input data-post-field="${key}" type="text" value="${escapeAttr(value)}" /></label>`;
}

function socialField(key, label, value) {
  return `<label>${label}<input data-social-field="${key}" type="text" value="${escapeAttr(value)}" /></label>`;
}

function collectEditors() {
  draft.pitList = [...pitEditor.querySelectorAll("[data-pit-index]")].map((card) => ({
    title: card.querySelector('[data-pit-field="title"]').value.trim(),
    items: textToLines(card.querySelector('[data-pit-field="items"]').value),
  }));

  draft.socialLinks = [...socialEditor.querySelectorAll("[data-social-index]")].map((card) => ({
    label: socialValue(card, "label"),
    handle: socialValue(card, "handle"),
    url: socialValue(card, "url"),
    note: socialValue(card, "note"),
  }));

  draft.posts = [...postEditor.querySelectorAll("[data-post-index]")].map((card) => ({
    id: value(card, "id"),
    work: value(card, "work"),
    character: value(card, "character"),
    relation: value(card, "relation"),
    dreamer: value(card, "dreamer"),
    status: value(card, "status"),
    color: value(card, "color") || "#8cc9ff",
    icon: value(card, "icon") || "star",
    boundaries: textToLines(value(card, "boundaries")),
    tags: textToLines(value(card, "tags")),
    note: value(card, "note"),
  }));
}

function value(card, key) {
  return card.querySelector(`[data-post-field="${key}"]`).value.trim();
}

function socialValue(card, key) {
  return card.querySelector(`[data-social-field="${key}"]`).value.trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function moveItem(list, index, direction) {
  const next = index + direction;
  if (next < 0 || next >= list.length) return;
  const [item] = list.splice(index, 1);
  list.splice(next, 0, item);
}

function makePost() {
  const nextId = String(draft.posts.length + 1).padStart(2, "0");
  return {
    id: nextId,
    work: "新作品",
    character: "夢角名",
    relation: "夢女設定 / 關係定位",
    dreamer: "夢主名",
    status: "草稿",
    boundaries: ["同擔：", "同嫁：", "雷點："],
    tags: ["#新作品", "#夢角名"],
    note: "補充設定、公開程度、委託圖或口嗨規則。",
    color: "#8cc9ff",
    icon: "star",
  };
}

function makeSocialLink() {
  return {
    label: "新社群",
    handle: "@your_id",
    url: "https://example.com/",
    note: "這裡寫用途或備註。",
  };
}

function savePreview() {
  collectBasicFields();
  collectEditors();
  localStorage.setItem(storageKey, JSON.stringify(draft));
  showToast("已暫存，可回首頁預覽");
}

function downloadData() {
  collectBasicFields();
  collectEditors();
  const content = `window.DREAM_DATA = ${JSON.stringify(draft, null, 2)};\n`;
  const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.js";
  link.click();
  URL.revokeObjectURL(url);
  showToast("已下載 data.js");
}

function resetPreview() {
  localStorage.removeItem(storageKey);
  draft = structuredClone(window.DREAM_DATA);
  ensureCollections();
  bindBasicFields();
  renderPitEditor();
  renderSocialEditor();
  renderPostEditor();
  showToast("已清除暫存，回到 data.js 內容");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelector("[data-save-preview]").addEventListener("click", savePreview);
document.querySelector("[data-download]").addEventListener("click", downloadData);
document.querySelector("[data-reset-preview]").addEventListener("click", resetPreview);
document.querySelector("[data-add-pit]").addEventListener("click", () => {
  collectBasicFields();
  collectEditors();
  draft.pitList.push({ title: "新分類", items: ["作品名"] });
  renderPitEditor();
});
document.querySelector("[data-add-social]").addEventListener("click", () => {
  collectBasicFields();
  collectEditors();
  draft.socialLinks.push(makeSocialLink());
  renderSocialEditor();
});
document.querySelector("[data-add-post]").addEventListener("click", () => {
  collectBasicFields();
  collectEditors();
  draft.posts.push(makePost());
  renderPostEditor();
});

pitEditor.addEventListener("click", (event) => {
  const card = event.target.closest("[data-pit-index]");
  if (!card) return;
  collectBasicFields();
  collectEditors();
  const index = Number(card.dataset.pitIndex);
  if (event.target.matches("[data-pit-up]")) moveItem(draft.pitList, index, -1);
  if (event.target.matches("[data-pit-down]")) moveItem(draft.pitList, index, 1);
  if (event.target.matches("[data-pit-delete]")) draft.pitList.splice(index, 1);
  renderPitEditor();
});

socialEditor.addEventListener("click", (event) => {
  const card = event.target.closest("[data-social-index]");
  if (!card) return;
  collectBasicFields();
  collectEditors();
  const index = Number(card.dataset.socialIndex);
  if (event.target.matches("[data-social-up]")) moveItem(draft.socialLinks, index, -1);
  if (event.target.matches("[data-social-down]")) moveItem(draft.socialLinks, index, 1);
  if (event.target.matches("[data-social-delete]")) draft.socialLinks.splice(index, 1);
  renderSocialEditor();
});

postEditor.addEventListener("click", (event) => {
  const card = event.target.closest("[data-post-index]");
  if (!card) return;
  collectBasicFields();
  collectEditors();
  const index = Number(card.dataset.postIndex);
  if (event.target.matches("[data-post-up]")) moveItem(draft.posts, index, -1);
  if (event.target.matches("[data-post-down]")) moveItem(draft.posts, index, 1);
  if (event.target.matches("[data-post-copy]")) {
    const copy = structuredClone(draft.posts[index]);
    copy.id = String(draft.posts.length + 1).padStart(2, "0");
    copy.work = `${copy.work} copy`;
    draft.posts.splice(index + 1, 0, copy);
  }
  if (event.target.matches("[data-post-delete]")) draft.posts.splice(index, 1);
  renderPostEditor();
});

ensureCollections();
bindBasicFields();
renderPitEditor();
renderSocialEditor();
renderPostEditor();
