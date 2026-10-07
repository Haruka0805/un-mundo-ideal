/* =============================================
   Frozen English — main.js（リニューアル版）
   機能:
     ・センテンスカードをクリック → 読み上げ開始
     ・単語クリック → 意味ポップアップ
     ・自動進行（読み上げ後に次カードへ）
     ・雪 Canvas アニメーション
     ・下部固定ツールバー連動
   ============================================= */
'use strict';

/* =============================================
   1. 学習データ
   ============================================= */
const SENTENCES = [
  {
    id: 1,
    en: "The kingdom of Arendelle lay on the edge of a fjord, a deep mountain lake ringed by majestic peaks.",
    ja: "アレンデール王国は、フィヨルドのほとりに広がっていました。そこは、壮大な山々に囲まれた深い山の湖です。"
  },
  {
    id: 2,
    en: "It was a happy place.",
    ja: "それは、幸せな場所でした。"
  },
  {
    id: 3,
    en: "During the day, shopkeepers, fishermen, and ice sellers kept the city bustling.",
    ja: "昼間は、店主、漁師、氷売りたちが、街を賑やかに活気づけていました。"
  },
  {
    id: 4,
    en: "At night, the northern lights often lit up the sky with beautiful patterns.",
    ja: "夜になると、オーロラが美しい模様を描きながら、空を鮮やかに照らすことがよくありました。"
  },
  {
    id: 5,
    en: "The rulers of Arendelle, the King and Queen, were kind.",
    ja: "アレンデール王国の支配者である国王と女王は、心優しい人々でした。"
  },
  {
    id: 6,
    en: "Their young daughters, Elsa and Anna, were the joy of their lives.",
    ja: "幼い娘たち、エルサとアナは、二人の人生の喜びそのものでした。"
  }
];

/* 単語辞書 */
const DICT = {
  "arendelle":   { phonetic: "/ˈærəndɛl/",    pos: "固有名詞", meaning: "アレンデール（架空の王国名）",                   example: "The kingdom of Arendelle was peaceful." },
  "kingdom":     { phonetic: "/ˈkɪŋdəm/",     pos: "名詞",    meaning: "王国；王領",                                    example: "The kingdom stretched far and wide." },
  "lay":         { phonetic: "/leɪ/",          pos: "動詞",    meaning: "（lie の過去形）横たわる；位置する",             example: "The valley lay between two mountains." },
  "edge":        { phonetic: "/ɛdʒ/",          pos: "名詞",    meaning: "端；へり；縁",                                  example: "She stood at the edge of the cliff." },
  "fjord":       { phonetic: "/fjɔːrd/",       pos: "名詞",    meaning: "フィヨルド（氷河が削った細長い湾）",             example: "The ships sailed through the fjord." },
  "deep":        { phonetic: "/diːp/",         pos: "形容詞",  meaning: "深い；奥深い",                                  example: "The lake was very deep." },
  "mountain":    { phonetic: "/ˈmaʊntən/",     pos: "名詞",    meaning: "山；山岳",                                      example: "Snow covered the mountain peaks." },
  "lake":        { phonetic: "/leɪk/",         pos: "名詞",    meaning: "湖",                                            example: "They went fishing on the lake." },
  "ringed":      { phonetic: "/rɪŋd/",         pos: "動詞",    meaning: "囲まれた；取り囲んだ",                          example: "The valley was ringed by tall trees." },
  "majestic":    { phonetic: "/məˈdʒɛstɪk/",   pos: "形容詞",  meaning: "雄大な；威厳のある；壮麗な",                    example: "The majestic eagle soared above." },
  "peaks":       { phonetic: "/piːks/",        pos: "名詞",    meaning: "山頂；頂点",                                    example: "The peaks were covered in snow." },
  "happy":       { phonetic: "/ˈhæpi/",        pos: "形容詞",  meaning: "幸せな；嬉しい",                                example: "She felt happy seeing her friends." },
  "place":       { phonetic: "/pleɪs/",        pos: "名詞",    meaning: "場所；土地；地点",                              example: "This is my favorite place." },
  "during":      { phonetic: "/ˈdjʊərɪŋ/",    pos: "前置詞",  meaning: "〜の間（ずっと）；〜の間に",                     example: "It rained during the night." },
  "shopkeepers": { phonetic: "/ˈʃɒpˌkiːpəz/", pos: "名詞",    meaning: "店主；小売商人",                                example: "The shopkeepers opened their stores early." },
  "fishermen":   { phonetic: "/ˈfɪʃərmən/",   pos: "名詞",    meaning: "漁師；釣り人",                                  example: "The fishermen went out to sea." },
  "ice":         { phonetic: "/aɪs/",          pos: "名詞",    meaning: "氷",                                            example: "The ice on the pond was thick." },
  "sellers":     { phonetic: "/ˈsɛləz/",       pos: "名詞",    meaning: "売り手；販売者",                                example: "The sellers displayed their goods." },
  "kept":        { phonetic: "/kɛpt/",         pos: "動詞",    meaning: "（keep の過去形）保った；続けた",                example: "She kept the secret safe." },
  "city":        { phonetic: "/ˈsɪti/",        pos: "名詞",    meaning: "都市；市",                                      example: "The city was filled with lights." },
  "bustling":    { phonetic: "/ˈbʌslɪŋ/",      pos: "形容詞",  meaning: "賑やかな；活気のある",                          example: "It was a bustling marketplace." },
  "night":       { phonetic: "/naɪt/",         pos: "名詞",    meaning: "夜；夜間",                                      example: "The stars shine brightly at night." },
  "northern":    { phonetic: "/ˈnɔːðərn/",     pos: "形容詞",  meaning: "北の；北方の",                                   example: "The northern wind blew cold." },
  "lights":      { phonetic: "/laɪts/",        pos: "名詞",    meaning: "光；明かり（northern lights: オーロラ）",        example: "The northern lights danced in the sky." },
  "often":       { phonetic: "/ˈɒfən/",        pos: "副詞",    meaning: "しばしば；よく；頻繁に",                         example: "He often walks to school." },
  "lit":         { phonetic: "/lɪt/",          pos: "動詞",    meaning: "（light の過去形）照らした；輝かせた",           example: "Candles lit the dark room." },
  "sky":         { phonetic: "/skaɪ/",         pos: "名詞",    meaning: "空；天空",                                      example: "The sky was clear and blue." },
  "beautiful":   { phonetic: "/ˈbjuːtɪfəl/",  pos: "形容詞",  meaning: "美しい；素晴らしい",                            example: "What a beautiful sunset!" },
  "patterns":    { phonetic: "/ˈpætərnz/",     pos: "名詞",    meaning: "模様；パターン；型",                            example: "The fabric had lovely patterns." },
  "rulers":      { phonetic: "/ˈruːləz/",      pos: "名詞",    meaning: "支配者；統治者",                                example: "The rulers governed wisely." },
  "king":        { phonetic: "/kɪŋ/",          pos: "名詞",    meaning: "王；国王",                                      example: "The king sat on his throne." },
  "queen":       { phonetic: "/kwiːn/",        pos: "名詞",    meaning: "女王；王妃",                                    example: "The queen greeted her people." },
  "kind":        { phonetic: "/kaɪnd/",        pos: "形容詞",  meaning: "親切な；優しい；思いやりのある",                example: "She was kind to everyone." },
  "young":       { phonetic: "/jʌŋ/",          pos: "形容詞",  meaning: "若い；幼い",                                    example: "The young prince was brave." },
  "daughters":   { phonetic: "/ˈdɔːtərz/",     pos: "名詞",    meaning: "娘たち（daughter の複数形）",                   example: "Their daughters loved to sing." },
  "elsa":        { phonetic: "/ˈɛlsə/",        pos: "固有名詞", meaning: "エルサ（氷の魔法を持つアレンデールの女王）",    example: "Elsa had the power to create ice and snow." },
  "anna":        { phonetic: "/ˈænə/",         pos: "固有名詞", meaning: "アナ（エルサの妹、明るく勇敢な少女）",          example: "Anna loved her sister Elsa very much." },
  "joy":         { phonetic: "/dʒɔɪ/",         pos: "名詞",    meaning: "喜び；歓喜；楽しみ",                            example: "Laughter brought joy to everyone." },
  "lives":       { phonetic: "/laɪvz/",        pos: "名詞",    meaning: "生活；人生（life の複数形）",                   example: "They lived happy lives." },
  "were":        { phonetic: "/wɜːr/",         pos: "動詞",    meaning: "（be の過去形）〜だった",                        example: "The children were happy." },
  "day":         { phonetic: "/deɪ/",          pos: "名詞",    meaning: "日；昼間；一日",                                example: "It was a beautiful sunny day." },
};

/* =============================================
   2. 雪パーティクル（Canvas）
   ============================================= */
(function initSnow() {
  const canvas = document.getElementById('snowCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, flakes = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function newFlake() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H - H,
      r:     Math.random() * 2.6 + 0.8,
      vy:    Math.random() * 1.0 + 0.3,
      vx:    (Math.random() - 0.5) * 0.5,
      sway:  Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.45 + 0.15,
    };
  }

  for (let i = 0; i < 110; i++) flakes.push(newFlake());

  function frame() {
    ctx.clearRect(0, 0, W, H);
    flakes.forEach(f => {
      f.sway += 0.018;
      f.y    += f.vy;
      f.x    += f.vx + Math.sin(f.sway) * 0.35;
      if (f.y > H + 8) { f.y = -8; f.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,233,241,${f.alpha})`;
      ctx.shadowColor = `rgba(184,213,224,0.5)`;
      ctx.shadowBlur  = 3;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

/* =============================================
   3. アプリケーション
   ============================================= */
(function App() {

  /* ── 状態 ── */
  let currentIdx  = -1;    // 再生中のカードインデックス（-1 = 未選択）
  let isSpeaking  = false;
  let autoTimer   = null;
  let voices      = [];
  let doneSet     = new Set(); // 再生済みカードインデックス

  /* ── DOM ── */
  const areaEl       = document.getElementById('sentence-area');
  const progFill     = document.getElementById('progress-fill');
  const progLabel    = document.getElementById('progress-label');
  const toolbar      = document.getElementById('toolbar');
  const nowText      = document.getElementById('nowPlayingText');
  const speedRange   = document.getElementById('speedRange');
  const speedValEl   = document.getElementById('speedVal');
  const delayRange   = document.getElementById('delayRange');
  const delayValEl   = document.getElementById('delayVal');
  const voiceSelect  = document.getElementById('voiceSelect');
  const autoToggle   = document.getElementById('autoToggle');
  const btnStop      = document.getElementById('btnStop');
  const btnReplay    = document.getElementById('btnReplay');
  const popup        = document.getElementById('word-popup');
  const popupWord    = document.getElementById('popup-word');
  const playIcon     = 'fas fa-play';
  const pauseIcon    = 'fas fa-pause';

  function updatePlayButton(playing) {
    const iconEl = btnStop.querySelector('i');
    if (!iconEl) return;
    iconEl.className = playing ? pauseIcon : playIcon;
    btnStop.setAttribute('aria-label', playing ? '停止' : '再生');
  }
  const popupPhon    = document.getElementById('popup-phonetic');
  const popupPos     = document.getElementById('popup-pos');
  const popupMean    = document.getElementById('popup-meaning');
  const popupEx      = document.getElementById('popup-example');
  const popupClose   = document.getElementById('popup-close');

  /* =============================================
     3-1. カード生成
     ============================================= */
  function buildCards() {
    areaEl.innerHTML = '';
    SENTENCES.forEach((s, i) => {
      const card = document.createElement('article');
      card.className = 'sentence-card';
      card.id = `card-${i}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `文 ${s.id}: クリックして再生`);

      // 番号バッジ
      const numEl = document.createElement('div');
      numEl.className = 'card-num';
      numEl.textContent = s.id;
      card.appendChild(numEl);

      // 英文（単語スパン化）
      const enEl = document.createElement('p');
      enEl.className = 'sentence-en';
      enEl.innerHTML = tokenize(s.en);
      card.appendChild(enEl);

      // 和訳
      const jaEl = document.createElement('p');
      jaEl.className = 'sentence-ja';
      jaEl.textContent = s.ja;
      card.appendChild(jaEl);

      // EQ バー（再生中インジケーター）
      const eqEl = document.createElement('div');
      eqEl.className = 'card-eq';
      eqEl.innerHTML = '<span class="eq-dot"></span><span class="eq-dot"></span><span class="eq-dot"></span>';
      card.appendChild(eqEl);

      // カードクリック → 再生
      card.addEventListener('click', (e) => {
        // 単語クリックは別ハンドラなのでここでは文全体再生
        if (e.target.classList.contains('word-span')) return;
        playSentence(i);
      });

      // キーボード（Enter / Space）でも再生
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playSentence(i);
        }
      });

      areaEl.appendChild(card);
    });

    // 単語クリックイベント
    areaEl.querySelectorAll('.word-span').forEach(span => {
      span.addEventListener('click', (e) => {
        e.stopPropagation(); // カードの再生を発火させない
        showWordPopup(span.dataset.word);
      });
    });

    updateProgress();
  }

  /* テキスト → 単語スパン */
  function tokenize(text) {
    return text.replace(/[a-zA-Z']+|[.,!?;:]/g, (m, offset) => {
      if (/^[.,!?;:]$/.test(m)) return m;
      const key = m.toLowerCase().replace(/'/g, '');
      const has = DICT[key] !== undefined;
      return `<span class="word-span${has ? ' known' : ''}" data-word="${m}" data-start="${offset}" title="${has ? 'クリックで意味表示' : ''}">${m}</span>`;
    });
  }

  /* =============================================
     3-2. 再生ロジック
     ============================================= */
  function playSentence(idx) {
    clearTimeout(autoTimer);
    speechSynthesis.cancel();
    isSpeaking = false;

    // 前のアクティブカードをリセット
    const prevActive = areaEl.querySelector('.sentence-card.active');
    if (prevActive) prevActive.classList.remove('active');

    currentIdx = idx;
    const card = document.getElementById(`card-${idx}`);
    if (!card) return;

    card.classList.add('active');
    scrollToCard(card);
    setToolbarPlaying(true, SENTENCES[idx].en);
    btnStop.disabled   = false;
    btnReplay.disabled = false;
    updatePlayButton(true);

    const text  = SENTENCES[idx].en;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate  = parseFloat(speedRange.value);
    utter.pitch = 1.0;
    utter.lang  = 'en-US';

    const vi = parseInt(voiceSelect.value, 10);
    if (!isNaN(vi) && voices[vi]) utter.voice = voices[vi];

    // 単語ハイライト
    utter.addEventListener('boundary', (e) => {
      if (e.name === 'word') highlightWord(idx, e.charIndex, e.charLength);
    });

    utter.addEventListener('end', () => {
      isSpeaking = false;
      clearHighlights();
      doneSet.add(idx);
      updateProgress();

      // アクティブ解除 & 完了マーク
      card.classList.remove('active');
      card.classList.add('done');

      setToolbarPlaying(false);

      if (autoToggle.checked) {
        const next = idx + 1;
        if (next < SENTENCES.length) {
          const ms = parseFloat(delayRange.value) * 1000;
          autoTimer = setTimeout(() => playSentence(next), ms);
        } else {
          showAllDoneBanner();
        }
      }
    });

    utter.addEventListener('error', () => {
      isSpeaking = false;
      clearHighlights();
      setToolbarPlaying(false);
    });

    isSpeaking = true;
    speechSynthesis.speak(utter);
  }

  /* ── スムーズスクロール ── */
  function scrollToCard(card) {
    const top = card.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ── 単語ハイライト ── */
  function highlightWord(cardIdx, charIndex, charLength) {
    clearHighlights();
    const card = document.getElementById(`card-${cardIdx}`);
    if (!card) return;
    const sentence = SENTENCES[cardIdx].en;
    const fragment = sentence.substring(charIndex, charIndex + charLength).toLowerCase().replace(/[^a-z]/g, '');
    const span = Array.from(card.querySelectorAll('.word-span')).find(span => {
      const start = parseInt(span.dataset.start, 10);
      if (Number.isNaN(start)) return false;
      const word = span.dataset.word.toLowerCase().replace(/[^a-z]/g, '');
      return word === fragment && start === charIndex;
    });
    if (span) span.classList.add('hl');
  }

  function clearHighlights() {
    areaEl.querySelectorAll('.word-span.hl').forEach(s => s.classList.remove('hl'));
  }

  /* ── ツールバー再生状態 ── */
  function setToolbarPlaying(playing, text = '') {
    updatePlayButton(playing);
    if (playing) {
      toolbar.classList.add('playing');
      nowText.textContent = text.length > 36 ? text.slice(0, 33) + '…' : text;
    } else {
      toolbar.classList.remove('playing');
      nowText.textContent = '— 再生終了 —';
    }
  }

  /* ── 進捗更新 ── */
  function updateProgress() {
    const pct = (doneSet.size / SENTENCES.length) * 100;
    progFill.style.width    = pct + '%';
    progLabel.textContent   = `${doneSet.size} / ${SENTENCES.length}`;
  }

  /* ── 完了バナー ── */
  function showAllDoneBanner() {
    if (document.getElementById('done-banner')) return;
    const b = document.createElement('div');
    b.id = 'done-banner';
    b.style.cssText = `
      position: fixed; bottom: calc(var(--toolbar-h) + 16px); left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #112e44, #183d30);
      border: 1px solid #9cd2c4; border-radius: 50px;
      padding: 0.7rem 2rem; color: #9cd2c4;
      font-family: 'Cinzel',serif; font-size: 0.9rem; font-weight: 600;
      box-shadow: 0 8px 30px rgba(0,0,0,0.5); z-index: 150;
      letter-spacing: 0.08em; white-space: nowrap;
      animation: popin 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
    `;
    b.textContent = '❄️ 全文学習完了！ すばらしい！';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 5000);
  }

  /* =============================================
     3-3. 音声リスト読み込み
     ============================================= */
  function loadVoices() {
    voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
    voiceSelect.innerHTML = '';
    if (voices.length === 0) {
      voiceSelect.innerHTML = '<option>（英語音声なし）</option>';
      return;
    }
    voices.forEach((v, i) => {
      const opt     = document.createElement('option');
      opt.value     = i;
      opt.textContent = `${v.name.slice(0, 22)} (${v.lang})`;
      if (v.lang === 'en-US' && !voiceSelect.value) opt.selected = true;
      voiceSelect.appendChild(opt);
    });
  }

  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    loadVoices();
  }

  /* =============================================
     3-4. 単語ポップアップ
     ============================================= */
  function showWordPopup(word) {
    const key  = word.toLowerCase().replace(/[^a-z]/g, '');
    const info = DICT[key];

    popupWord.textContent = word;

    if (info) {
      popupPhon.textContent = info.phonetic || '';
      popupPos.textContent  = info.pos       || '';
      popupMean.textContent = info.meaning   || '';
      popupEx.textContent   = info.example ? `例文: "${info.example}"` : '';
    } else {
      popupPhon.textContent = '';
      popupPos.textContent  = '未登録';
      popupMean.textContent = 'この単語は辞書に登録されていません。';
      popupEx.textContent   = '';
    }

    popup.classList.remove('hidden');

    // 単語だけ読み上げ（メイン再生中でなければ）
    if (!isSpeaking && typeof speechSynthesis !== 'undefined') {
      const u   = new SpeechSynthesisUtterance(word);
      u.lang    = 'en-US';
      u.rate    = 0.8;
      const vi  = parseInt(voiceSelect.value, 10);
      if (!isNaN(vi) && voices[vi]) u.voice = voices[vi];
      speechSynthesis.speak(u);
    }
  }

  popupClose.addEventListener('click', () => popup.classList.add('hidden'));
  popup.addEventListener('click', e => { if (e.target === popup) popup.classList.add('hidden'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') popup.classList.add('hidden'); });

  /* =============================================
     3-5. ツールバーコントロール
     ============================================= */

  /* 速度 */
  speedRange.addEventListener('input', () => {
    speedValEl.textContent = parseFloat(speedRange.value).toFixed(1) + 'x';
  });

  /* 待機時間 */
  delayRange.addEventListener('input', () => {
    delayValEl.textContent = parseFloat(delayRange.value).toFixed(1) + '秒';
  });

  /* 自動進行 */
  autoToggle.addEventListener('change', () => {
    if (!autoToggle.checked) clearTimeout(autoTimer);
  });

  /* 停止 */
  btnStop.addEventListener('click', () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      clearTimeout(autoTimer);
      isSpeaking = false;
      setToolbarPlaying(false);

      const activeCard = areaEl.querySelector('.sentence-card.active');
      if (activeCard) activeCard.classList.remove('active');

      clearHighlights();
      btnReplay.disabled = true;
      currentIdx = -1;
    } else {
      const targetIdx = currentIdx >= 0 ? currentIdx : 0;
      playSentence(targetIdx);
    }
  });

  /* 再再生 */
  btnReplay.addEventListener('click', () => {
    const idx = currentIdx >= 0 ? currentIdx : 0;
    // done クラスを除去して再生
    const card = document.getElementById(`card-${idx}`);
    if (card) card.classList.remove('done');
    doneSet.delete(idx);
    updateProgress();
    playSentence(idx);
  });

  /* =============================================
     3-6. キーボードショートカット
     ============================================= */
  document.addEventListener('keydown', e => {
    if (!popup.classList.contains('hidden')) return; // ポップアップ中は無視
    // Space → 停止
    if (e.code === 'Space' && isSpeaking) {
      e.preventDefault();
      btnStop.click();
    }
  });

  /* =============================================
     3-6. 設定パネル
     ============================================= */
  const btnSettings = document.getElementById('btnSettings');
  const settingsPanel = document.getElementById('settings-panel');

  btnSettings.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle('hidden');
  });

  // パネル外クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!settingsPanel.classList.contains('hidden')) {
      if (!settingsPanel.contains(e.target) && !btnSettings.contains(e.target)) {
        settingsPanel.classList.add('hidden');
      }
    }
  });

  // パネル内クリックで閉じない
  settingsPanel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  /* =============================================
     3-7. 初期化
     ============================================= */
  buildCards();

})(); // App 終了
