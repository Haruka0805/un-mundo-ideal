(function () {
  const MAX_FILES = 12;
  const MAX_BYTES = 20 * 1024 * 1024; // 20MB

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function setDisplay(id, display) {
    const el = $(id);
    if (el) el.style.display = display;
  }

  function updateStatus(text) {
    setText("status", text);
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return "";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
  }

  function renderPreviews(files) {
    const previews = $("previews");
    previews.innerHTML = "";

    files.forEach((file) => {
      const wrapper = document.createElement("div");
      wrapper.className = "p";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      wrapper.appendChild(img);
      previews.appendChild(wrapper);
    });
  }

  async function ensureSignedIn() {
    const knit = window.__knit;
    if (!knit || !knit.auth) throw new Error("Firebase not initialized.");

    const user = knit.auth.currentUser;
    if (user) return user;

    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await knit.auth.signInWithPopup(provider);
    return result.user;
  }

  async function uploadPost({ user, title, description, files }) {
    const knit = window.__knit;
    const postRef = knit.db.collection("posts").doc();
    const postId = postRef.id;

    await postRef.set({
      title,
      description: description || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      authorUid: user.uid,
      photos: [],
    });

    const photos = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updateStatus(`写真をアップロード中… (${i + 1}/${files.length})`);

      const storagePath = `posts/${user.uid}/${postId}/photos/${i}-${file.name}`;
      const ref = knit.storage.ref(storagePath);
      await ref.put(file);
      const url = await ref.getDownloadURL();
      photos.push({ url, storagePath, order: i });
    }

    await postRef.update({ photos });
    return postId;
  }

  window.addEventListener("DOMContentLoaded", () => {
    const knit = window.__knit;
    if (!knit || !knit.auth) {
      updateStatus("Firebase の初期化に失敗しました。config.js を確認してください。");
      return;
    }

    const signInBtn = $("signInBtn");
    const signOutBtn = $("signOutBtn");
    const form = $("form");
    const filesInput = $("files");
    const limitHint = $("limitHint");

    limitHint.textContent = `最大 ${MAX_FILES} 枚、1枚あたり最大 ${formatBytes(MAX_BYTES)} です。`;

    filesInput.addEventListener("change", () => {
      const files = Array.from(filesInput.files || []);
      const clipped = files.slice(0, MAX_FILES);
      renderPreviews(clipped);
    });

    signInBtn.addEventListener("click", async () => {
      try {
        updateStatus("Googleでログイン中…");
        await ensureSignedIn();
        updateStatus("ログインに成功しました。フォームを表示します。");
      } catch (e) {
        updateStatus(`ログイン失敗: ${e && e.message ? e.message : String(e)}`);
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    signOutBtn.addEventListener("click", async () => {
      await knit.auth.signOut();
      updateStatus("ログアウトしました。");
    });

    knit.auth.onAuthStateChanged((user) => {
      if (!user) {
        setDisplay("signInSection", "block");
        setDisplay("authSection", "none");
        setDisplay("form", "none");
        return;
      }

      setDisplay("signInSection", "none");
      setDisplay("authSection", "block");
      setDisplay("form", "block");
      $("authHint").textContent = `ログイン中: ${user.displayName || user.email || user.uid}`;
      updateStatus("投稿フォームの準備ができました。");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const user = await ensureSignedIn();

        const title = $("title").value.trim();
        const description = $("description").value.trim();
        const files = Array.from(filesInput.files || []);

        if (!title) throw new Error("作品名が必要です。");
        if (files.length === 0) throw new Error("写真を選択してください。");
        if (files.length > MAX_FILES) throw new Error(`写真は最大 ${MAX_FILES} 枚です。`);

        for (const f of files) {
          if (f.size > MAX_BYTES) {
            throw new Error(`ファイルが大きすぎます: ${f.name} (${formatBytes(f.size)})`);
          }
        }

        $("submitBtn").disabled = true;
        updateStatus("投稿を作成中…");

        const postId = await uploadPost({ user, title, description, files });
        updateStatus("アップロード完了。詳細ページを開きます。");
        window.location.href = `./post.html?id=${encodeURIComponent(postId)}`;
      } catch (err) {
        updateStatus(`エラー: ${err && err.message ? err.message : String(err)}`);
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        $("submitBtn").disabled = false;
      }
    });
  });
})();

