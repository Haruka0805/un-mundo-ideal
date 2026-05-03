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

  async function loadPost(postId) {
    const knit = window.__knit;
    if (!knit || !knit.db) throw new Error("Firebase not initialized. Check knit-gallery/config.js.");

    const statusEl = document.getElementById("status");
    const panelEl = document.getElementById("panel");

    statusEl.textContent = "読み込み中…";
    panelEl.style.display = "none";

    const doc = await knit.db.collection("posts").doc(postId).get();
    if (!doc.exists) {
      statusEl.textContent = "この作品が見つかりません。";
      return;
    }

    const data = doc.data() || {};
    const photos = Array.isArray(data.photos) ? data.photos : [];
    photos.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (photos.length === 0) {
      statusEl.textContent = "写真が登録されていません。";
      return;
    }

    const cover = photos[0] && photos[0].url ? photos[0].url : "";
    document.getElementById("hero").src = cover;

    document.getElementById("title").textContent = data.title ? String(data.title) : "無題";
    document.getElementById("date").textContent = formatDate(data.createdAt) ? `投稿日: ${formatDate(data.createdAt)}` : "";
    document.getElementById("desc").textContent = data.description ? String(data.description) : "";

    const photosGrid = document.getElementById("photos");
    photosGrid.innerHTML = "";
    photos.slice(0, 30).forEach((p) => {
      if (!p || !p.url) return;
      const img = el("img", { src: p.url, alt: "photo" });
      photosGrid.appendChild(img);
    });

    statusEl.textContent = "";
    panelEl.style.display = "block";
  }

  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      const statusEl = document.getElementById("status");
      if (statusEl) statusEl.textContent = "作品IDがありません。";
      return;
    }
    loadPost(id).catch((e) => {
      const statusEl = document.getElementById("status");
      if (statusEl) statusEl.textContent = `エラー: ${e && e.message ? e.message : String(e)}`;
      // eslint-disable-next-line no-console
      console.error(e);
    });
  });
})();

