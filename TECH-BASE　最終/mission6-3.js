// ===== Cookie Utility =====
const COOKIE_NAME = "knitLog";
const COOKIE_DAYS = 365; // 1年保存

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const found = document.cookie.split("; ").find(row => row.startsWith(name + "="));
  return found ? decodeURIComponent(found.split("=")[1]) : "";
}

function saveLogToCookie(logArray) {
  try {
    const json = JSON.stringify(logArray);
    setCookie(COOKIE_NAME, json, COOKIE_DAYS);
  } catch (e) {
    alert("保存に失敗しました（データが大きすぎる可能性があります）。");
    console.error(e);
  }
}

function loadLogFromCookie() {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // 壊れたCookieはリセット
    setCookie(COOKIE_NAME, "", -1);
    return [];
  }
}

// ===== State =====
let LOG = []; // {id, dateISO, name, yarn, toolSize}

// ===== DOM =====
const logBody = document.getElementById("logBody");
const emptyState = document.getElementById("emptyState");
const openDialogBtn = document.getElementById("openDialogBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const printBtn = document.getElementById("printBtn");

const entryDialog = document.getElementById("entryDialog");
const entryForm = document.getElementById("entryForm");

// ===== Render =====
function renderLog() {
  emptyState.style.display = LOG.length === 0 ? "block" : "none";
  logBody.innerHTML = "";
  const rows = document.createDocumentFragment();

  LOG
    .slice().sort((a,b) => b.id - a.id)
    .forEach(item => {
      const tr = document.createElement("tr");

      const tdDate = document.createElement("td");
      tdDate.textContent = item.dateISO;

      const tdName = document.createElement("td");
      tdName.textContent = item.name;

      const tdYarn = document.createElement("td");
      tdYarn.textContent = item.yarn;

      const tdSize = document.createElement("td");
      tdSize.textContent = item.toolSize;

      const tdMemo = document.createElement("td"); // ←追加
      tdMemo.textContent = item.memo || "";        // ←追加

      const tdAction = document.createElement("td");
      tdAction.className = "action-cell";

      // 編集・削除ボタン
      const editBtn = document.createElement("button");
      editBtn.className = "btn";
      editBtn.textContent = "編集";
      editBtn.addEventListener("click", () => onEdit(item.id));
      tdAction.appendChild(editBtn);

      const delBtn = document.createElement("button");
      delBtn.className = "btn danger";
      delBtn.textContent = "削除";
      delBtn.addEventListener("click", () => onDelete(item.id));
      tdAction.appendChild(delBtn);

      tr.append(tdDate, tdName, tdYarn, tdSize, tdMemo, tdAction); // ←追加
      rows.appendChild(tr);
    });

  logBody.appendChild(rows);
}

// ===== Handlers =====
function openDialog() {
  entryForm.reset();
  entryDialog.showModal();
}

function closeDialog() {
  entryForm.reset();
  delete entryForm.dataset.editId;
  entryDialog.close();
}

function onSubmit(e) {
  e.preventDefault();
  const form = new FormData(entryForm);

  const dateSelected = String(form.get("entryDate") || "").trim();
  const name = String(form.get("entryName") || "").trim();
  const yarn = String(form.get("yarnType") || "").trim();
  const toolSize = String(form.get("toolSize") || "").trim();
  const memo = String(form.get("memo") || "").trim(); // ←追加

  if (!dateSelected || !name || !yarn || !toolSize) {
    alert("未入力の項目があります。");
    return;
  }

  const editId = entryForm.dataset.editId;
  if (editId) {
    // 編集モード
    const entry = LOG.find(e => e.id == editId);
    if (entry) {
      entry.dateISO = dateSelected;
      entry.name = name;
      entry.yarn = yarn;
      entry.toolSize = toolSize;
      entry.memo = memo; // ←追加
    }
    delete entryForm.dataset.editId;
  } else {
    // 新規追加
    const entry = {
      id: Date.now(),
      dateISO: dateSelected,
      name,
      yarn,
      toolSize,
      memo // ←追加
    };
    LOG.push(entry);
  }

  saveLogToCookie(LOG);
  renderLog();
  closeDialog();
}

function onDelete(id) {
  if (!confirm("この記録を削除しますか？")) return;
  LOG = LOG.filter(item => item.id !== id);
  saveLogToCookie(LOG);
  renderLog();
}

function onClearAll() {
  if (!confirm("全ての記録を削除します。よろしいですか？")) return;
  LOG = [];
  saveLogToCookie(LOG);
  renderLog();
}

function onEdit(id) {
  const entry = LOG.find(e => e.id === id);
  if (!entry) return;

  entryForm.entryName.value = entry.name;
  entryForm.entryDate.value = entry.dateISO;
  entryForm.yarnType.value = entry.yarn;
  entryForm.toolSize.value = entry.toolSize;
  entryForm.memo.value = entry.memo || ""; // ←追加

  entryForm.dataset.editId = id;
  entryDialog.showModal();
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  LOG = loadLogFromCookie();
  renderLog();

  openDialogBtn.addEventListener("click", openDialog);
  clearAllBtn.addEventListener("click", onClearAll);


  // dialog buttons
  document.getElementById("cancelBtn").addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog();
  });

  entryForm.addEventListener("submit", onSubmit);
});
