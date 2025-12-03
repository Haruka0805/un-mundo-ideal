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

/** 編み図ライブラリ（最小）
 * key: `${item}|${pattern}` の組み合わせ
 * value: { title, instructions (plain text), svg (inline) }
 * SVGは簡略図（概念図）。正確な目数はinstructionsを参照。
 */
const PATTERN_LIBRARY = {
  "コースター|かぎ針：細編み": {
    title: "円コースター（細編み）",
    instructions: [
      "糸：並太〜中細 / かぎ針：3/0〜5/0 号",
      "R1: 輪の作り目に細編み 6（6）",
      "R2: 全目増し目（1目に細編み2）（12）",
      "R3: *細編み1, 増し目1* ×6（18）",
      "R4: *細編み2, 増し目1* ×6（24）",
      "R5: *細編み3, 増し目1* ×6（30）",
      "…直径が欲しいサイズで止め、引き抜き編みで縁取り → 糸始末"
    ].join("\n"),
    svg: (()=>{
      const circles = [];
      const cx = 64, cy = 64;
      const radii = [10, 20, 30, 40, 50];
      radii.forEach((r,i)=>{
        circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#222" stroke-dasharray="${i%2?2:0},4" stroke-width="${i===radii.length-1?2:1}"/>`);
      });
      return `<svg viewBox="0 0 128 128" width="160" height="160">${circles.join("")}<text x="64" y="64" text-anchor="middle" dominant-baseline="middle" font-size="10">概念図</text></svg>`;
    })()
  },
  "コースター|ガーター編み": {
    title: "角コースター（棒針：ガーター）",
    instructions: [
      "糸：並太 / 棒針：6〜8号",
      "作り目：16目",
      "Rows 1-24: すべて表編み（ガーター）",
      "伏せ止め → 糸始末。必要なら軽くアイロンブロッキング。"
    ].join("\n"),
    svg: (()=>{
      let rects = [];
      let n=6, m=6, w=18, h=14, offx=8, offy=8;
      for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
          rects.push(`<rect x="${offx+j*w}" y="${offy+i*h}" width="${w-2}" height="${h-2}" fill="none" stroke="#222" stroke-width="1"/>`);
        }
      }
      return `<svg viewBox="0 0 128 100" width="200" height="160">${rects.join("")}<text x="64" y="90" text-anchor="middle" font-size="10">目数概念図（格子）</text></svg>`;
    })()
  },
  "ヘアタイ|かぎ針：長編み": {
    title: "簡単ヘアタイ（長編み）",
    instructions: [
      "糸：中細〜合太 / かぎ針：3/0〜5/0 号",
      "作り目：鎖 70〜80（頭周りに合わせて）",
      "R1: 立ち上がり3、鎖から長編みを端まで",
      "R2: 立ち上がり3、長編みで往復（幅を出したい場合は2〜3段）",
      "端を合わせて引き抜きはぎ、またはリボン結び用に端はそのままでもOK"
    ].join("\n"),
    svg: `<svg viewBox="0 0 200 60" width="240" height="100">
      <rect x="10" y="20" width="180" height="20" fill="none" stroke="#222" stroke-width="2" rx="6"/>
      <text x="100" y="18" text-anchor="middle" font-size="10">帯状イメージ</text>
    </svg>`
  },
  "ミニ巾着|かぎ針：長編み": {
    title: "ミニ巾着（ぐるぐる長編み）",
    instructions: [
      "糸：並太 / かぎ針：6/0号 目安",
      "底：鎖 25 を輪にし、長編みで1周。以降ぐるぐるに長編みで筒を編む（高さ 10〜12cm）",
      "紐通し段：*長編み1、鎖1（1目飛ばし）* を1周",
      "最終段：細編み1周 → 糸始末。紐を通して完成。"
    ].join("\n"),
    svg: `<svg viewBox="0 0 120 160" width="140" height="180">
      <rect x="25" y="30" width="70" height="100" fill="none" stroke="#222" stroke-width="2" rx="8"/>
      <line x1="25" y1="80" x2="95" y2="80" stroke="#222" stroke-dasharray="4,3"/>
      <text x="60" y="18" text-anchor="middle" font-size="10">紐通し段</text>
    </svg>`
  }
};

/** 与えられた item / pattern に最も近い編み図を返す */
function findPatternChart(item, pattern){
  const key = `${item}|${pattern}`;
  if (PATTERN_LIBRARY[key]) return PATTERN_LIBRARY[key];
  // 近縁の候補探し（コースターはどの編地でも概念図で代替 など）
  const fallbackKeys = Object.keys(PATTERN_LIBRARY).filter(k => k.startsWith(item + "|"));
  if (fallbackKeys.length) return PATTERN_LIBRARY[fallbackKeys[0]];
  return null;
}

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
  // 生成後に編み図を紐づける（なければfallback）
  const item = choice(ITEMS);
  const pattern = choice(PATTERNS);
  const mission = {
    id: uid(),
    item,
    color: choice(COLORS[tone] || COLORS.pastel),
    pattern,
    tone,
    isFavorite: false,
    createdAt: new Date().toISOString()
  };
  const chart = findPatternChart(item, pattern);
  if (chart) mission.chart = chart;
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
    ${renderChartDetails(m)}
    <div class="actions">
      <button class="btn" data-act="fav" data-id="${m.id}">${m.isFavorite ? "★ お気に入り" : "☆ お気に入り"}</button>
      <button class="btn" data-act="del-today" data-id="${m.id}">🗑 今日のお題を削除</button>
    </div>
  `;
}

function renderChartDetails(m){
  if (!m.chart) {
    return `<details class="chart"><summary>編み図／手順</summary><div class="empty">この組み合わせの編み図は準備中です。</div></details>`;
  }
  const c = m.chart;
  return `<details class="chart" open>
    <summary>編み図／手順：${c.title}</summary>
    <div class="chart-body">
      <div class="chart-svg">${c.svg}</div>
      <pre class="chart-text">${c.instructions}</pre>
    </div>
  </details>`;
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
        ${renderChartDetails(m)}
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
