const iconPaths = {
  rose: '<path d="M12 8c2-3 6-2 6 1 0 3-3 5-6 8-3-3-6-5-6-8 0-3 4-4 6-1Z" /><path d="M12 17v4M9 20h6M7 6 4 3M17 6l3-3" />',
  anchor: '<path d="M12 5v14M8 9h8M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M5 14c1 4 4 6 7 6s6-2 7-6M5 14h4M19 14h-4" />',
  leaf: '<path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" /><path d="M5 19 15 9" />',
  butterfly: '<path d="M12 12C8 6 3 5 3 10c0 4 4 5 9 2ZM12 12c4-6 9-7 9-2 0 4-4 5-9 2ZM12 12v7M10 15h4" />',
  clock: '<circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2M12 2v2M12 20v2M2 12h2M20 12h2" />',
  star: '<path d="m12 2 2.4 7.6H22l-6.2 4.6 2.4 7.6L12 17.2l-6.2 4.6 2.4-7.6L2 9.6h7.6z" />',
  crown: '<path d="M4 18h16M6 15l-2-9 5 4 3-6 3 6 5-4-2 9z" />',
  feather: '<path d="M20 4C13 4 7 9 6 18c7-1 12-7 12-14Z" /><path d="M6 18 14 10M8 14h5M9 11h4" />',
  moon: '<path d="M19 15.5A8 8 0 0 1 8.5 5 7 7 0 1 0 19 15.5Z" />',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />',
  book: '<path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4z" /><path d="M5 4v12M9 8h6M9 12h5" />',
  camera: '<path d="M5 7h3l2-2h4l2 2h3v12H5z" /><circle cx="12" cy="13" r="3.5" />',
  mail: '<path d="M4 6h16v12H4zM4 7l8 6 8-6" />',
  link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />',
  x: '<path d="M5 5l14 14M19 5 5 19" />',
  instagram: '<rect x="5" y="5" width="14" height="14" rx="4" /><circle cx="12" cy="12" r="3" /><path d="M16.5 7.5h.01" />',
  plurk: '<path d="M7 18V6h6a4 4 0 0 1 0 8H7" /><path d="M12 14l5 4" />',
  wavebox: '<path d="M4 12c2.2-4 5.8-4 8 0s5.8 4 8 0" /><path d="M4 17c2.2-4 5.8-4 8 0s5.8 4 8 0" /><path d="M4 7c2.2-4 5.8-4 8 0s5.8 4 8 0" />',
};

const storageKey = "dream-private-data";
const data = loadData();
const posts = data.posts || [];
const grid = document.querySelector(".post-grid");
const pinned = document.querySelector(".pinned-grid");
const pitGrid = document.querySelector(".pit-grid");
const socialGrid = document.querySelector(".social-grid");
const tagCloud = document.querySelector(".tag-cloud");
const toast = document.querySelector(".toast");

function loadData() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      return mergeData(window.DREAM_DATA, JSON.parse(saved));
    } catch {
      localStorage.removeItem(storageKey);
    }
  }
  return window.DREAM_DATA;
}

function mergeData(defaultData, savedData) {
  return {
    ...defaultData,
    ...savedData,
    profile: { ...defaultData.profile, ...(savedData.profile || {}) },
    about: { ...defaultData.about, ...(savedData.about || {}) },
    rules: { ...defaultData.rules, ...(savedData.rules || {}) },
    message: { ...defaultData.message, ...(savedData.message || {}) },
    pitList: savedData.pitList || defaultData.pitList,
    socialLinks: savedData.socialLinks || defaultData.socialLinks,
    posts: savedData.posts || defaultData.posts,
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.star}</svg>`;
}

function renderIcon(item) {
  if (item.iconImage) {
    return `<img class="custom-icon" src="${escapeHtml(item.iconImage)}" alt="" loading="lazy" />`;
  }
  return icon(item.icon);
}

function renderProfile() {
  document.title = `${data.profile.username} | 夢女自介`;
  document.querySelectorAll("[data-profile]").forEach((node) => {
    node.textContent = data.profile[node.dataset.profile] || "";
  });

  const bio = document.querySelector("[data-profile-bio]");
  bio.innerHTML = `
    <p class="display-name">${escapeHtml(data.profile.displayName)}</p>
    ${(data.profile.lines || []).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
    <p class="profile-link">${escapeHtml(data.profile.linkText)}</p>
  `;

  renderInfoBlock("[data-about]", data.about, "paragraphs");
  renderInfoBlock("[data-rules]", data.rules, "items");
  const message = document.querySelector("[data-message]");
  message.querySelector("h2").textContent = data.message.title;
  message
    .querySelector(".message-actions")
    .insertAdjacentHTML("beforebegin", `<p>${escapeHtml(data.message.text)}</p>`);
}

function renderInfoBlock(selector, block, field) {
  const target = document.querySelector(selector);
  target.querySelector("h2").textContent = block.title;
  const content =
    field === "items"
      ? `<ul>${(block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : (block.paragraphs || []).map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  target.insertAdjacentHTML("beforeend", content);
}

function renderPosts() {
  grid.innerHTML = posts
    .map(
      (post) => `
        <a class="post-tile" style="--tile-accent: ${post.color}" href="#dream-${post.id}" aria-label="${escapeHtml(post.work)} ${escapeHtml(post.character)}">
          <span class="pin" aria-hidden="true">${icon("star")}</span>
          <div class="tile-inner">
            <span class="tile-icon">${renderIcon(post)}</span>
            <div>
              <h3>${escapeHtml(post.work)}</h3>
              <p>${escapeHtml(post.character)}</p>
            </div>
            <small>#${escapeHtml(post.id)}</small>
          </div>
        </a>
      `
    )
    .join("");

  pinned.innerHTML = posts
    .map(
      (post) => `
        <article class="dream-card" id="dream-${post.id}" style="--tile-accent: ${post.color}">
          <div class="card-title">
            ${renderIcon(post)}
            <h3>${escapeHtml(post.work)}</h3>
          </div>
          <dl class="meta-list">
            <div><dt>角色</dt><dd>${escapeHtml(post.character)}</dd></div>
            <div><dt>關係</dt><dd>${escapeHtml(post.relation)}</dd></div>
            <div><dt>夢主</dt><dd>${escapeHtml(post.dreamer)}</dd></div>
            <div><dt>狀態</dt><dd>${escapeHtml(post.status)}</dd></div>
          </dl>
          <ul class="boundaries">
            ${(post.boundaries || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="tags">${(post.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <p class="note">${escapeHtml(post.note)}</p>
          <span class="number">#${escapeHtml(post.id)}</span>
        </article>
      `
    )
    .join("");

  const uniqueTags = [...new Set(posts.flatMap((post) => post.tags || []))];
  tagCloud.innerHTML = uniqueTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");

  document.querySelector("[data-stat-posts]").textContent = posts.length;
  document.querySelector("[data-stat-works]").textContent = new Set(posts.map((post) => post.work)).size;
}

function renderPitList() {
  pitGrid.innerHTML = (data.pitList || [])
    .map(
      (group) => `
        <article class="pit-card">
          <h3>${escapeHtml(group.title)}</h3>
          <ul>${(group.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function normalizeUrl(url) {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) return url;
  return `https://${url}`;
}

function renderSocialLinks() {
  socialGrid.innerHTML = (data.socialLinks || [])
    .map(
      (link) => `
        <a class="social-card" href="${escapeHtml(normalizeUrl(link.url))}" target="_blank" rel="noreferrer">
          <span aria-hidden="true">${renderIcon(link)}</span>
          <div>
            <h3>${escapeHtml(link.label)}</h3>
            <p class="handle">${escapeHtml(link.handle)}</p>
          </div>
          <p class="note">${escapeHtml(link.note)}</p>
        </a>
      `
    )
    .join("");
}

async function copyTemplate() {
  const nextId = String(posts.length + 1).padStart(2, "0");
  const template = `{
  id: "${nextId}",
  work: "作品名",
  character: "夢角名",
  relation: "夢女設定 / 關係定位",
  dreamer: "夢主名",
  status: "主夢 / 副夢 / 草稿",
  boundaries: ["同擔：", "同嫁：", "雷點："],
  tags: ["#作品名", "#夢角名"],
  note: "補充設定、公開程度、委託圖或口嗨規則。",
  color: "#8cc9ff",
  icon: "star",
},`;

  try {
    await navigator.clipboard.writeText(template);
    showToast("已複製新增夢角資料模板");
  } catch {
    showToast("無法自動複製，請到 admin.html 新增");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

const accentCycle = ["#8cc9ff", "#d46a5d", "#90aa69", "#9b78e8", "#d6a03b"];
let accentIndex = 0;

function cycleAccent() {
  accentIndex = (accentIndex + 1) % accentCycle.length;
  document.documentElement.style.setProperty("--accent", accentCycle[accentIndex]);
  document.documentElement.style.setProperty("--accent-soft", `${accentCycle[accentIndex]}29`);
}

document.querySelector("[data-copy-template]").addEventListener("click", copyTemplate);
document.querySelector("[data-theme-toggle]").addEventListener("click", cycleAccent);

renderProfile();
renderPosts();
renderPitList();
renderSocialLinks();
