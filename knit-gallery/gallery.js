(function () {
  function el(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else node.setAttribute(k, v);
      }
    }
    return node;
  }

  function formatDate(ts) {
    if (!ts) return "";
    try {
      if (typeof ts.toDate === "function") {
        return new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(ts.toDate());
      }
    } catch {}
    return "";
  }

  async function loadPosts() {
    const knit = window.__knit;
    if (!knit || !knit.db) throw new Error("Firebase not initialized. Check knit-gallery/config.js.");

    const statusEl = document.getElementById("status");
    const grid = document.getElementById("grid");
    statusEl.textContent = "作品を読み込み中…";
    grid.style.display = "none";

    const snap = await knit.db.collection("posts").orderBy("createdAt", "desc").limit(50).get();

    grid.innerHTML = "";
    if (snap.empty) {
      statusEl.textContent = "まだ投稿がありません。";
      return;
    }

    snap.forEach((doc) => {
      const data = doc.data() || {};
      const photos = Array.isArray(data.photos) ? data.photos : [];
      const cover = photos[0] && photos[0].url ? photos[0].url : "";
      if (!cover) return;

      const card = el("div", { class: "card" });
      const link = el("a", { href: `./post.html?id=${encodeURIComponent(doc.id)}` });

      const img = el("img", { class: "thumb", src: cover, alt: data.title ? String(data.title) : "photo" });
      const meta = el("div", { class: "meta" });
      meta.appendChild(el("div", { class: "title", text: data.title ? String(data.title) : "無題" }));

      const dateText = formatDate(data.createdAt);
      meta.appendChild(el("div", { class: "date", text: dateText ? `投稿日: ${dateText}` : "" }));

      link.appendChild(img);
      link.appendChild(meta);
      card.appendChild(link);
      grid.appendChild(card);
    });

    grid.style.display = "grid";
    statusEl.textContent = "";
  }

  window.addEventListener("DOMContentLoaded", () => {
    loadPosts().catch((e) => {
      const statusEl = document.getElementById("status");
      if (statusEl) statusEl.textContent = `エラー: ${e && e.message ? e.message : String(e)}`;
      // eslint-disable-next-line no-console
      console.error(e);
    });
  });
})();

