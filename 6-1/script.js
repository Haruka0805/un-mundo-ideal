// ==== Cookie utils ====
const Cookie = {
  set(k, v, days = 30) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${k}=${encodeURIComponent(v)};expires=${d.toUTCString()};path=/`;
  },
  get(k) {
    const row = document.cookie.split('; ').find(r => r.startsWith(k + '='));
    return row ? decodeURIComponent(row.split('=')[1]) : null;
  },
  del(k) {
    document.cookie = `${k}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
};

// ==== Data ====
const ITEMS = ["コースター","ポーチ","ヘアタイ","ミニ巾着","スマホポシェット","アームウォーマー","ビーニー帽","鍋敷き","エコたわし"];
const PATTERNS = ["ガーター編み","メリヤス編み","かぎ針：細編み","かぎ針：長編み","アフガン：Tss","縄編み","リブ編み"];
const COLORS = {
  pastel: ["ミントグリーン","ラベンダー","ベビーピンク","レモン","ペールブルー","ミルクホワイト"],
  natural: ["生成り","ベージュ","カーキ","チャコール","オリーブ","モカ"],
  vivid: ["真紅","コバルト","マゼンタ","ライム","ターコイズ","サンセットオレンジ"]
};

// state
let history = []; // latest first
let favorites = []; // array of mission ids
let tone = Cookie.get('km_lastColorTone') || 'pastel';

// streak
(function initStreak(){
  const today = new Date().toISOString().slice(0,10);
  const lastVisited = Cookie.get('km_lastVisited');
  let streak = Number(Cookie.get('km_streak') || 0);
  if (!lastVisited) {
    streak = 1;
  } else if (lastVisited !== today) {
    const diff = Math.round((Date.parse(today) - Date.parse(lastVisited))/86400000);
    streak = (diff === 1) ? streak + 1 : 1;
  }
  Cookie.set('km_streak', String(streak));
  Cookie.set('km_lastVisited', today);
  document.getElementById('streakView').textContent = `Streak: ${streak}`;
})();

// restore from cookies
(function restore(){
  const tSel = document.getElementById('toneSelect');
  tSel.value = tone;

  const histStr = Cookie.get('km_history');
  if (histStr) {
    try {
      history = JSON.parse(histStr);
    } catch(e){ history = []; }
  }
  const favStr = Cookie.get('km_favorites');
  if (favStr) {
    try {
      favorites = JSON.parse(favStr);
    } catch(e){ favorites = []; }
  }
  renderAll();
})();

// helpers
function uid(){ return crypto.randomUUID ? crypto.randomUUID() : (Date.now()+"-"+Math.random().toString(16).slice(2)); }
function choice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function generateMission(){
  const mission = {
    id: uid(),
    item: choice(ITEMS),
    color: choice(COLORS[tone] || COLORS.pastel),
    pattern: choice(PATTERNS),
    tone,
    isFavorite: false,
    createdAt: new Date().toISOString()
  };
  return mission;
}

function renderToday(m){
  const box = document.getElementById('todayMission');
  if (!m) {
    box.classList.add('empty');
    box.textContent = 'まだお題がありません。「お題を決める」を押してね。';
    return;
  }
  box.classList.remove('empty');
  box.innerHTML = `
    <div class="row">
      <span class="badge">作るもの</span><strong>${m.item}</strong>
    </div>
    <div class="row">
      <span class="badge">色</span><span>${m.color}（${m.tone}）</span>
    </div>
    <div class="row">
      <span class="badge">模様</span><span>${m.pattern}</span>
    </div>
    <div class="actions">
      <button class="btn" data-act="fav" data-id="${m.id}">${m.isFavorite ? "★ お気に入り" : "☆ お気に入り"}</button>
      <button class="btn" data-act="del-today" data-id="${m.id}">🗑 今日のお題を削除</button>
    </div>
  `;
}

function renderHistory(){
  const ul = document.getElementById('historyList');
  ul.innerHTML = '';
  history.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="card">
        <div class="row"><span class="badge">作るもの</span><strong>${m.item}</strong></div>
        <div class="row"><span class="badge">色</span><span>${m.color}（${m.tone}）</span></div>
        <div class="row"><span class="badge">模様</span><span>${m.pattern}</span></div>
        <div class="actions">
          <button class="btn" data-act="fav" data-id="${m.id}">${m.isFavorite ? "★ お気に入り" : "☆ お気に入り"}</button>
          <button class="btn" data-act="del" data-id="${m.id}">🗑 削除</button>
        </div>
      </div>
    `;
    ul.appendChild(li);
  });
}

function renderFavorites(){
  const ul = document.getElementById('favList');
  ul.innerHTML = '';
  const favs = history.filter(m => m.isFavorite);
  if (favs.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'お気に入りはまだありません。☆を押すと追加されます。';
    ul.appendChild(li);
    return;
  }
  favs.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="card"><strong>${m.item}</strong> / ${m.color} / ${m.pattern}</div>`;
    ul.appendChild(li);
  });
}

function renderAll(){
  // today's mission = latest history[0] if exists
  renderToday(history[0]);
  renderHistory();
  renderFavorites();
  // persist
  persist();
}

function persist(){
  // keep latest 10 only
  const trimmed = history.slice(0,10);
  if (trimmed.length !== history.length) history = trimmed;
  Cookie.set('km_history', JSON.stringify(trimmed));
  Cookie.set('km_favorites', JSON.stringify(history.filter(m => m.isFavorite).map(m => m.id)));
  Cookie.set('km_lastColorTone', tone);
  // save lastMission separately for clarity
  Cookie.set('km_lastMission', trimmed[0] ? JSON.stringify(trimmed[0]) : '');
}

// events
document.getElementById('toneSelect').addEventListener('change', (e)=>{
  tone = e.target.value;
  Cookie.set('km_lastColorTone', tone);
});

document.getElementById('genBtn').addEventListener('click', ()=>{
  const m = generateMission();
  history.unshift(m);
  renderAll();
});

// delegate clicks
document.body.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if (!btn) return;
  const act = btn.dataset.act;
  const id = btn.dataset.id;
  if (!act) return;

  if (act === 'fav') {
    const idx = history.findIndex(x => x.id === id);
    if (idx >= 0) {
      history[idx].isFavorite = !history[idx].isFavorite;
      renderAll();
    }
  }
  if (act === 'del') {
    history = history.filter(x => x.id !== id);
    renderAll();
  }
  if (act === 'del-today') {
    // same as deleting the first if id matches
    history = history.filter(x => x.id !== id);
    renderAll();
  }
});
