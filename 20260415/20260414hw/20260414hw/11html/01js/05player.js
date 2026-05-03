"use strict";
let _ytb = false;
let _lang4voice = 'eng'
let _goOn = true;
let _saveRed = true;
//for windows users, _ytb = true;
const _winLocHref = window.location.href
let _doWaitAndGo2nextLine = false
if (_winLocHref.includes("13chihiro")
  || _winLocHref.includes("25rapunz")
  || _winLocHref.includes("23hp3")
  || _winLocHref.includes("25chr2")
  || _winLocHref.includes("25chr2")
  || _winLocHref.includes("19poyWorld")
) {
  _doWaitAndGo2nextLine = true
}
if (_winLocHref.includes("private/var/containers/Bundle/Application/")) {
  _ytb = false;
} else if (_winLocHref.includes("sato.fm.senshu-u")) {
  _ytb = true;
} else if (_winLocHref.includes("localhost")) {
  _ytb = true;
} else if (_winLocHref.includes("13chihiro")
  || _winLocHref.includes("25rapunz")
  || _winLocHref.includes("23hp3")
  || _winLocHref.includes("25chr2")
) {
  _ytb = false;
}


// グローバル変数としてウィンドウの参照を保持しておく
let _dictWindow = null


// DOMの構築を待たずに、即座にリスナーを登録
window.addEventListener('keydown', (e) => {
  checkKeyCode2(e.key);
}, { capture: true }); // captureをtrueにすると、イベントの伝播の早い段階でキャッチできる

function checkKeyCode2(key) {
  console.log("DOMに関係なく実行:", key);
}

let _cnt4exeRepHanni = 10000
let _cnt4repEachLine = 0
let _firstRed = true
let _pbRate = 1
let _prevSec = 0
let _sGo2title, _lenTitles;
let _currIndCnt = 0;
let _isOuterVideoOn = 0;
let _secCntStart = -1
let _clockSecStart = -1

//let _milsec2normal = 9000
let _tm4go2nl = -1
let _tm4GouseiRep
let _prevHilite = -1
const date = new Date()
date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000)
const _expires = 'expires=' + date.toUTCString()
const _viewportHeight = window.innerHeight
const _viewportWidth = window.innerWidth
let _prevButton, _prevBgColor
let _mode4np = 'natural'
let _lineCnt0x
let _videoSize = 0

if (true) {
  let bodyContent = document.body.innerHTML.replace(/\s*\+\s*/g, '+')
  bodyContent = bodyContent.replace(/\s+\?/g, '?');
  bodyContent = bodyContent.replace(/¿\s+/g, '¿');
  bodyContent = bodyContent.replace(/¡\s+/g, '¡');
  bodyContent = bodyContent.replace(/\s+,/g, ',');
  bodyContent = bodyContent.replace(/\s+\./g, '.');
  document.body.innerHTML = bodyContent;
  setKanjiLang2Abc(bodyContent)
}
if (_lang4dic.includes('kor')) {
  const styleTag = document.createElement('style');
  styleTag.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap');
        .subtitle {
            font-family: 'Gowun Batang', serif;
            line-height: 1.6;
            word-break: keep-all;
        }
    `;
  document.head.appendChild(styleTag);
  const elements = document.querySelectorAll('ruby')
  elements.forEach(element => {
    element.style.fontSize = '1.6rem'
  })
  const elements2 = document.querySelectorAll('i')
  elements2.forEach(element => {
    element.style.fontSize = '1.6rem'
  })
} else if (_lang4dic.includes('tha')
  || _lang4dic.includes('ara')
  || _lang4dic.includes('heb')
  || _lang4dic.includes('hin')
) {
  const elements = document.querySelectorAll('ruby')
  elements.forEach(element => {
    element.style.fontSize = '1.6rem'
  })
  const elements2 = document.querySelectorAll('i')
  elements2.forEach(element => {
    element.style.fontSize = '1.6rem'
  })
} else if (_lang4dic.includes('cn')) {
  const elements = document.querySelectorAll('ruby')
  elements.forEach(element => {
    element.style.fontSize = '1.4rem'
  })
  const elements2 = document.querySelectorAll('i')
  elements2.forEach(element => {
    element.style.fontSize = '1.4rem'
  })
}

const _subtitleLen = document.getElementsByClassName('subtitle').length
const _protocol = window.location.protocol
let _repHanni = 'sameMov'
const parts = location.href.split('/');


// 2. 配列の「後ろから2番目」の要素を取得する
// （一番最後 parts.length - 1 が '16cn.html' になります）

const _targetDir = parts[parts.length - 2];
const _fileName = parts[parts.length - 1].replace('.html', '')
const _audVidFolder = "../../12mp4/" + parts[parts.length - 2] + "/"

//<button class="redX ctrBtnX" title="赤色行再生" onClick="resetLoopSecAndPlay()">3⮐</button><br></br>

let ctrButtons = `
<button class="ctrBtnX" id="go2wd9" title="単語リストへ移動(Word)" onClick="go2wordX9(this)">W01</button>
<button class="ctrBtnX" onClick="toggleElements()">表示</button>
<button class="ctrBtnX" title="合成音声を再生" onClick="playGouseiOto()">🎵</button>
<button class="redX ctrBtnX" title="再生・ポーズ切り替え" onClick="togglePlayback()">1 ▶</button>
<button class="redX ctrBtnX" title="赤色行再生" onClick="go2l01openNewWindow()">3⮐</button><br>
<button class="ctrBtnX" title="xxx">xxx</button>
<button class="ctrBtnX" title="xxx">xxx</button>
<button class="ctrBtnX" title="xxx">xxx</button>
<button class="ctrBtnX" title="xxx">xxx</button>
<button id="xRate" class="ctrBtnX" title="外部・遅" onClick="openSmallYtb()">＊</button>
`
const div = document.createElement('div')
div.id = 'ctrDiv'
div.innerHTML = ctrButtons.replace(/\n/g, '')
document.body.appendChild(div)


buttonX += `
<select id="selectX" class="main-button" 
  onMousedown="pauseAndGoOnSet()"
 onChange="go2html(this)">
<option value="index.html")>未使用</option>
</select>

<select id="repHanni" class="main-button"
 onMousedown="pauseAndGoOnSet()"
 onChange="onHanniSelected(this)">
<option value="sameMov")>リピート</option>
<option value="999")>無し</option>
<option value="2")>2行</option>
<option value="3")>3行</option>
<option value="4")>4行</option>
<option value="5")>5行</option>
</select>

<select id="go2gemini" class="main-button" 
  onMousedown="pauseAndGoOnSet()"
 onChange="go2gemini(this)">
 <option>他</option>
<option>↓サイト↓</option> 
<option>？</option>
<option>Gglクラス</option>
<option>歌詞</option>
<option>字幕</option>
<option>gemini</option>
<option>notebookLM</option>
<option>gAIstudio</option>
<option>↓プロンプト↓</option>
 <option>単語</option>
  <option>語源</option>
  <option>英検</option>
  <option>追加</option>
  <option>1.前後</option>
  <option>2.本体</option>
  <option>文法</option>
  <option>発音</option>
 <option>試験</option>
 <option>聞取</option>
<option>↓行移動↓</option> 
<option>1</option>
<option>100</option>
<option>200</option>
<option>300</option>
<option>400</option>
<option>500</option>
<option>600</option>
<option>700</option>
<option>800</option>
<option>900</option>
<option>1000</option>
<option>1100</option>
<option>1200</option>
</select>
`

bottomBtn.innerHTML = buttonX.replace(/\n/g, '')
let _tm4hiLite = -1

let _currHilitedLineCnt

// 1. ピンチズーム（2本指での拡大縮小）を禁止
// touchmoveイベントが発生した際、指が2本以上あればその操作をキャンセルします。
document.addEventListener(
  'touchmove',
  function (event) {
    if (event.touches.length >= 2) {
      event.preventDefault()
    }
  },
  { passive: false }
)

// 2. ダブルタップによるズームを禁止
// 最後のタップから1000ms以内に次のタップが来たらキャンセルします。
var lastTouchEnd = 0
document.addEventListener(
  'touchend',
  function (event) {
    var now = new Date().getTime()
    if (now - lastTouchEnd <= 1000) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false
)

document
  .getElementById('info')
  .insertAdjacentHTML(
    'afterend',
    '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>'
  )

let _repHanniSelf = document.getElementById('repHanni')


function toggleElements() {
  // rtとsubの両方を取得
  const elements = document.querySelectorAll('rt, sub');

  elements.forEach(el => {
    // 現在の状態を確認して反転させる
    if (el.style.display === 'none') {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
  //  setTimeout("checkVisible()", 300)
}

function pauseAndGoOnSet() {
  pauseMovAud()
  _goOn = false
  clearTimeoutAll()
  clearTimeout(_tm4go2nl)
  setTimeout("_goOn=true", 500)
}

function dispTitle() {
  const flashMessage = document.createElement('div');
  flashMessage.textContent = document.title

  // 2. スタイルの設定
  Object.assign(flashMessage.style, {
    position: 'fixed',
    bottom: '20px',
    right: 'auto',
    left: '30px',
    backgroundColor: 'chocolate',
    color: 'white',
    fontSize: '1.6rem',
    zIndex: '9999',
    lineHeight: '1'
  });

  // 3. 画面に追加
  document.body.appendChild(flashMessage);

  // 4. 5秒後に削除
  setTimeout(() => {
    flashMessage.remove(); // 完全に消す場合はremove、非表示なら display='none'
  }, 3000);
}

function getFilenameBySplitPop() {
  const path = window.location.pathname
  // 例: "/dir/file.html" の場合
  // path.split('/') は ["", "dir", "file.html"] となる
  const parts = path.split('/')
  // pop() で配列の最後の要素 ("file.html") を取り出す
  const filename = parts.pop()
  return filename
}

function openSmallYtb() {
//  if (_ytb && _protocol.includes('http:') == false) {
if (false){
    clearTimeoutAll()
    clearTimeout(_tm4hiLite)
    const options = getWindowOpt()
    const ytbLink =
      'https://www.youtube.com/watch?v=' + _videoId + '&t=' + _startX + 's'
    window.open(ytbLink, 'w4ytb', options)
    _isOuterVideoOn = 1;
    _lineCnt0x = '01'
    saveCookielineCnt0x()
    //debug    
    const elementX = document.getElementById(_lineCnt0x)
    prevHilite2normal()
    click_lineCnt0x(elementX)
    pauseMovAud()
    setTimeout("scrollX(0)", 1000)
  } else {
    setPlaybackRateSlower()
  }
}

function waitAndGo2nextLine(bareText) {
  bareText = bareText
    .replace(/<div class="trans"[^<]*?<\/div>/g, '')
    .replace(/<sub>.*?<\/sub>/g, "")
    .replace(/<.*?>/g, "")
  //let waitSec = parseInt((bareText.length + 50) * 1000 / 12);
  let waitSec = parseInt((bareText.length + 50) * 1000 / 8);
  if (_fileName.includes("jap")
    || _fileName.includes("cn")
    || _fileName.includes("kor")
  ) {
    waitSec *= 1.8
  }
  const exec = "_cnt4repEachLine+=1;_saveRed=false;go2nextLine();"
  clearTimeout(_tm4go2nl)
  if (
    bareText.includes("♪") == false) {
    _tm4go2nl = setTimeout(exec, waitSec)
  }
}

function resetLoopSecAndPlay() {
  const tempX2 = zeroPudded(_currHilitedLineCnt)
  const buff = document.getElementById('o' + tempX2).parentNode.innerHTML
  waitAndGo2nextLine(buff)
  click_lineCnt0x()
}


function setAnchorAndPlay() {
  alert('444 setAnchorAndPlay')
  cancelGousei()
  _lineCnt0x = _currHilitedLineCnt
  saveCookielineCnt0x()
  setlineCnt0x(_lineCnt0x)
  setRed2BtnAndPrevButton()
  if (_mode4np != 'natural') {
    click_lineCnt0x()
    _mode4np = 'natural'
  }
}

function removeBox(lZeroCnt) {
  const elemX = document.getElementById(lZeroCnt)
  elemX.parentNode.classList.remove('box')
}

function click_lineCnt0x() {
  //debug, _end
  cancelGousei()
  prevHilite2normal()
  if (_lineCnt0x == undefined) {
    _lineCnt0x = '01'
  } else if (_lineCnt0x > _subtitleLen) {
    _lineCnt0x = '01'
  }
  if (_currHilitedLineCnt == undefined) {
    _currHilitedLineCnt = 1
  }
  const L_lineCnt0x = 'L' + _lineCnt0x
  const elemX = document.getElementById(L_lineCnt0x)
  elemX.click()
  const exec = "removeBox('" + L_lineCnt0x + "')"
  setTimeout(exec, 9000)
  checkVisible(elemX)
  if (_isOuterVideoOn) {
    clearTimeout(_tm4hiLite)
    _clockSecStart = parseInt(elemX.parentElement.getAttribute('data-timestamp'))
    _secCntStart = Date.now()
    _tm4hiLite = setTimeout(fhilitesubtitles, 10)
  }
  document.body.focus();
}

function exeRep() {
  _cnt4repEachLine = 0
  click_lineCnt0x();
}


function playGouseiOto() {
  clearTimeoutAll()
  clearTimeout(_tm4go2nl)
  _mode4np = 'gousei'
  setlineCnt0x(_currHilitedLineCnt)
  const elemX = addOL2lineNumb(_currHilitedLineCnt)
  elemX.click()
  //  setRed2BtnAndPrevButton()
  pauseMovAud()
  setTimeout('pauseMovAud()', 100)
}
function addOL2lineNumb(tempX) {
  let exeAbcNumb = 'L' + _lineCnt0x
  if (_mode4np != 'natural') {
    exeAbcNumb = 'o' + _lineCnt0x
  }
  const element = document.getElementById(exeAbcNumb)
  return element
}

function setlineCnt0x(tempX) {
  _lineCnt0x = zeroPudded(tempX)
  saveCookielineCnt0x()
}

function transX() {
  setlineCnt0x(_currHilitedLineCnt)
  setRed2BtnAndPrevButton()
  const elemX = document.getElementById('t' + _lineCnt0x)
  elemX.click()
}


function zeroPudded(tempX) {
  tempX = parseInt(tempX)
  if (tempX < 10) {
    tempX = '0' + tempX
  }
  return tempX
}

function go2prevLine() {
  if (_cnt4repEachLine > 0) {
    _cnt4repEachLine -= 1
  }

  prevHilite2normal()
  if (_currHilitedLineCnt > 1) {
    clickAndRemoveRedButtonColor(_currHilitedLineCnt, -1)
  }
  const tempX2 = zeroPudded(_currHilitedLineCnt)
  const prevX = document.getElementById('L' + tempX2).parentNode
  prevX.nextElementSibling.classList.remove('box')

}



function go2nextLine() {
  if (_cnt4repEachLine > 0) {
    _cnt4repEachLine -= 1
  }
  let tempX = parseInt(_currHilitedLineCnt)
  if (tempX < _subtitleLen) {
    tempX = parseInt(_currHilitedLineCnt)
  } else {
    go2l01openNewWindow()
  }
  clickAndRemoveRedButtonColor(tempX, 1)
  prevHilite2normal()
  const tempX2 = zeroPudded(_currHilitedLineCnt)
  const prevX = document.getElementById('L' + tempX2).parentNode
  prevX.previousElementSibling.classList.remove('box')
}

function setRed2BtnAndPrevButton() {
  const self = document.getElementById('L' + _lineCnt0x)
  setPrevButton(self)
  self.style.backgroundColor = 'red'
  self.parentNode.classList.add('box')
}

function clickAndRemoveRedButtonColor(lineNumb, cntX) {
  let tempX = parseInt(lineNumb) + cntX
  _currHilitedLineCnt = tempX
  setlineCnt0x(tempX)
  const elemX = addOL2lineNumb(_currHilitedLineCnt)
  elemX.click()
  prevHilite2normal()
  const parentX = elemX.parentNode
  parentX.classList.add('box')
  if (_mode4np == 'gousei') {
    _prevHilite = parentX.previousElementSibling.previousElementSibling
  } else {
    _prevHilite = parentX.previousElementSibling
  }
}

function prevHilite2normal() {
  if (_prevHilite != -1) {
    _prevHilite.classList.remove('box')
  }
}

function go2quizLineCnt(self) {
  _goOn = false
  prevHilite2normal()
  const lnId = self.innerText
  const elementX = document.getElementById(lnId)
  _lineCnt0x = lnId.replace('L', '')
  saveCookielineCnt0x()
  //delete next function
  //  go2lineXX(elementX)
  const wdId = lnId.replace('L', 'W')
  const element3 = document.getElementById('go2wd9')
  element3.innerText = wdId
  click_lineCnt0x()
  _tm4hiLite = setTimeout(fhilitesubtitles, 100)
  playMovAud();
}

function go2wordX9(self) {
  _cnt4repEachLine = 0
  prevHilite2normal()
  let origId = self.innerText
  let lnId = origId.replace('W', 'L')
  pauseMovAud()
  clearTimeoutAll()
  clearTimeout(_tm4go2nl)
  const element2 = document.getElementById(self.innerText)
  element2.scrollIntoView({
    behavior: 'instant'
  })
  element2.style.backgroundColor = 'red'
}

function openHtml(htmlName) {
  window.open(htmlName + '.html', '_self')
}

function clearTimeoutAll() {
  clearTimeout(_tm4hiLite)
  clearTimeout(_tm4GouseiRep)
}

function exeQuizLink(self, urlX) {
  setPrevButton(self)
  self.style.backgroundColor = 'red'
  _goOn = false
  pauseMovAud()
  clearTimeoutAll()
  clearTimeout(_tm4go2nl)
  cancelGousei()
  window.open(urlX, '_self')
}


function setKanjiLang2Abc(buff) {
  _lang4voice = _lang4dic
  if (buff.includes('class="韓国語"')) {
    _lang4voice = 'kor'
  } else if (buff.includes('class="中国語"')) {
    _lang4voice = 'cn'
  } else if (buff.includes('class="スペイン語"')) {
    _lang4voice = 'spa'
  } else if (buff.includes('class="フランス語"')) {
    _lang4voice = 'fre'
  } else if (buff.includes('class="ドイツ語"')) {
    _lang4voice = 'ger'
  } else if (buff.includes('class="イタリア語"')) {
    _lang4voice = 'ita'
  } else if (buff.includes('class="英語"')) {
    _lang4voice = 'eng'
  }
}

function makeQuizLink(buffX, hanni, hanniMinus) {
  buffX = encodeURIComponent(buffX)
  const hanniX = (hanni - hanniMinus + 1) + '~' + hanni
  const titleX = encodeURIComponent(document.title)
  const baseX = 'http://sato.fm.senshu-u.ac.jp/zkiku/2026/11html/10quiz/'
  //  const baseX = '../10quiz/'

  const urlX =
    baseX +
    'index.html?langX=' +
    _lang4voice +
    '&titleX=' +
    titleX +
    '&hanniX=' +
    hanniX +
    '&buffX=' +
    buffX
  const buttonX =
    '<button class="quiz2" onClick=exeQuizLink(this,"' +
    urlX +
    '")>' +
    '試験' +
    hanniX +
    '</button>'
  return buttonX
}


function writeWdList() {
  let checkedList = ';'
  let cntX = 0
  let buffX2 = ''
  let buffX = ''
  let cnt4subt = 0
  let isFirst = 1
  let urlX
  let reallyFirst = 1
  const hanniMinus = 25
  let cntPlus1;
  document.querySelectorAll('.subtitle').forEach(function (line) {
    cnt4subt += 1
    let cnt4subt2 = cnt4subt
    if (cnt4subt < 10) {
      cnt4subt2 = '0' + cnt4subt
    }
    let line2html = line.innerHTML
      .replace(/<ruby>/g, '\n<ruby>')
      .replace(/\+/g, '\n')
      .replace(/<i>/g, '\n<i>')

    let buff = line2html.split('\n')
    if (reallyFirst && isFirst) {
      reallyFirst = 0
      buffX += '<button  class="quiz1"  onClick=go2quizLineCnt(this) id="W01">L01</button>'
      isFirst = 0
    }
    const regex = /<rt>(.*?)<\/rt>/i
    const regKakko = /\((.*?)\)/
    buff.forEach(function (line2) {
      if (line2.includes('<sub>')) {
        if (isFirst) {
          buffX +=
            '<button  class="quiz1" onClick=go2quizLineCnt(this) id="W' +
            cnt4subt2 +
            '">L' +
            cnt4subt2 +
            '</button> '
          isFirst = 0
        }
        line2 = line2
          .split('</sub>')[0]
          .replace('<i>', '')
          .replace('</i>', '')
          .replace(/<ruby.*?>/g, '')
          .replace(/<\/ruby>/g, '')
          .replace(/'/g, '’')
        let wordSense = line2.split('<sub>')
        let bareWord = wordSense[0]
          .replace('¿', '')
          .replace('¡', '')
          .toLowerCase()
          .replace(/<rt[^<]*?<\/rt>/g, '')
          .replace(/<i.*?>/g, '')
          .trim()
          .replace(/\s/g, '_')
        //for korean
        //        let sense = wordSense[1].replace(/[.?!,\/]/g, '')
        let sense2 = wordSense[1].replace(/[.?!,]/g, '')
        let match = line2.match(regex)
        if (match) {
          sense2 += '<small>' + match[1] + '</small>'
        }
        let sense = sense2
        let word = bareWord
        let sense4quiz = sense2
        let hatsuon = "";
        if (_lang4dic.includes("eng")) {
          ;
        } else if (_lang4dic.includes("jap")) {
          word = sense2.replace(/<[^>]+>/g, '').replace(/\(.+\)/, '')
          sense4quiz = bareWord
          match = sense2.match(regKakko)
          if (match) {
            hatsuon = match[1]
          }
          sense = hatsuon + " " + bareWord
          word = (word + '/').split('/')[0]
        }
        //        sense4quiz = sense4quiz.replace(/<[^>]+>/g, '')
        let wordSpell = word.replace(/_/g, ' ').replace(/\(.+\)/, ' ')
        if (!checkedList.includes(';' + word + ';')) {
          cntPlus1 = cntX + 1
          buffX +=
            '<sub>' + cntPlus1 + '</sub>' +
            '<button class="quiz1" onClick=\'speak2("' +
            word +
            '",this,0)\'>' +
            wordSpell +
            '</button>' +
            sense +
            '&nbsp;\n'
          buffX2 += word + ': ' + sense4quiz + '\n'
          checkedList += word + ';'

          if (
            cntPlus1 % hanniMinus == 0 &&
            !_path.includes('31wholeNW/index.html') &&
            !_path.includes('11students/index.html') &&
            !_path.includes('BEng')
          ) {
            urlX = makeQuizLink(buffX2, cntPlus1, hanniMinus)
            buffX += '<br>\n' + urlX + '\n<hr>\n'
            buffX2 = ''
            isFirst = 1
          }
          cntX += 1
        }
      }
    })
  })
  if (buffX2.length > 0) {
    urlX = makeQuizLink(buffX2, cntPlus1, cntPlus1 % hanniMinus)
    buffX += '<br>\n' + urlX + '\n<hr>\n'
  }
  //    console.log(buffX)
  document.getElementById('wordList').innerHTML = buffX
}



function enlargeVideo() {
  _videoSize += 1
  _videoSize = _videoSize % 8
  const isiPhone = /iPhone/i.test(navigator.userAgent);
  let divX = 4
  if (isiPhone) {
    divX = 2.5
  }
  const baseSize = parseInt(window.innerWidth / divX)
  let heightX = baseSize * _videoSize
  let widthX = parseInt(heightX * 1.333)

  if (widthX > window.innerWidth || heightX > window.innerHeight - 90) {
    _videoSize = 1
    heightX = baseSize * _videoSize
    widthX = parseInt(heightX * 1.333)
  }

  if (_ytb) {
    document.getElementById('player').style.height = heightX + 'px'
    document.getElementById('player').style.width = widthX + 'px'
  } else {
    _player.style.height = heightX + 'px'
    _player.style.width = widthX + 'px'
  }


  let plusX = 0
  if (isiPhone) {
    plusX = 35
  }

  _vcontStyle.height = heightX + 'px'
  _vcontStyle.width = widthX + 'px'
  _vcontStyle.bottom = 80 + plusX - _videoSize * 15 + 'px'
}

function setPrevButtonCore(self) {
  if (self != undefined) {
    _prevButton = self
    _prevBgColor = self.style.backgroundColor
  }
}

function setPrevButton4dic(self) {
  if (_prevButton != undefined && _prevButton.style.backgroundColor != 'red') {
    _prevButton.style.backgroundColor = _prevBgColor
  }
  setPrevButtonCore(self)
}

function setPrevButton(self) {
  if (_prevButton != undefined) {
    _prevButton.style.backgroundColor = _prevBgColor
  }
  setPrevButtonCore(self)
}

function dictX(self, lang) {
  const word = self.childNodes[0].nodeValue.replace(/[.,?!'\-]/g, '')
  setPrevButton4dic(self)
  self.style.fontStyle = 'italic'
  self.style.backgroundColor = 'green'
  setTimeout('pauseMovAud()', 100)
  clearTimeoutAll()
  clearTimeout(_tm4go2nl)
  _cnt4repEachLine = 0

  //  if (_protocol.includes('http:') == false) {
  if (_ytb) {
    dictX3(word, lang)
  } else {
    dictX3(word, lang)
  }
}

function launchApp(urlScheme) {
  // 1. Create a hidden iframe
  const iframe = document.createElement('iframe');

  // 2. Hide it completely from view and screen readers
  iframe.style.display = 'none';
  iframe.setAttribute('aria-hidden', 'true');

  // 3. Set the source to your Mac OS URL scheme
  iframe.src = urlScheme;

  // 4. Append to body to trigger the request
  document.body.appendChild(iframe);

  // 5. Clean up by removing the iframe after a short delay
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 500);
}


function lookUp(term) {
  // iOSネイティブ側に "lookup" という名前のハンドラで単語を飛ばす
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.lookup) {
    window.webkit.messageHandlers.lookup.postMessage(term);
  } else {
    //    console.log("この環境では内蔵辞書を呼び出せません。");
    const url = "dict://" + term;
    launchApp(url)
  }
}


function dictX2(word, lang) {
  const escLemma = encodeURI(word.toLowerCase())
  const monokaki = 'mkdictionaries:///'
  let url = monokaki + '?category='
  let isLookUp = false
  if (lang.includes('engetymo')
    || lang.includes('eng')
  ) {
    url = "https://www.etymonline.com/search?q=" + escLemma
  } else if (lang.includes('eng')) {
    url += 'en-ja'
  } else if (lang.includes('tag')) {
    url = "https://www.tagalog.com/dictionary/?embedded_search_keyword=" + escLemma;
  } else if (lang.includes('lit')) {
    url = 'https://en.wiktionary.org/wiki/' + escLemma;
    alert('859 lit: ' + url)

  } else if (lang.includes('tur')
    || lang.includes('hun')
    || lang.includes('cat')
    || lang.includes('cze')
    || lang.includes('slk')
    || lang.includes('pol')
    || lang.includes('swe')
    || lang.includes('dan')
    || lang.includes('nor')
    || lang.includes('dut')
    || lang.includes('ukr')
    || lang.includes('hin')
    || lang.includes('fin')
    || lang.includes('hun')
    || lang.includes('tur')
    || lang.includes('can')
    || lang.includes('ara')
    || lang.includes('gre')
    || lang.includes('ind')
    || lang.includes('heb')
    || lang.includes('vie')


  ) {
    isLookUp = true
  } else if (lang.includes('spa')) {
    url += 'es-ja'
  } else if (lang.includes('ita')) {
    url += 'it-ja'
  } else if (lang.includes('fre')) {
    url += 'fr-ja'
  } else if (lang.includes('ger')) {
    url += 'de-ja'
  } else if (lang == 'cn') {
    url += 'cn-ja'
  } else if (lang.includes('por')) {
    url += 'pt-ja'
  } else if (lang.includes('kor')) {
    url += 'kr-ja'
  } else if (lang.includes('rus')) {
    url += 'ru-ja'
  } else if (lang.includes('tha')) {
    url += 'th-ja'
  }
  if (!lang.includes('tag')) {
    url += '&text=' + escLemma
  }
  if (isLookUp) {
    lookUp(word)
  } else if (lang.includes('tag')
    || lang.includes('lit')
    || lang.includes('engetymo')
  ) {
    window.open(url, '_blank')
  } else {
    const iframe = document.createElement('iframe')
    iframe.name = 'dictFrame'
    iframe.style.width = '100%'
    iframe.style.height = '5px'
    document.body.appendChild(iframe)
    window.open(url, 'dictFrame')
  }
}

function dictX3(escLemma, lang) {
  let url = 'https://en.wiktionary.org/wiki/'
  if (lang.includes('engetymo')) {
    url = "https://www.etymonline.com/search?q=" + escLemma
  } else if (lang.includes('eng')) {
    //	        url = "http://dictionary.goo.ne.jp/srch/ej/" + escLemma + "/m0u/";
    url = 'https://eow.alc.co.jp/search?q=' + escLemma
//    url = 'https://kotobank.jp/search?t=ej&q=' + escLemma
  } else if (lang.includes('kor')) {
    url = 'https://korean.dict.naver.com/kojadict/#/search?range=word&query='
    url += escLemma
  } else if (lang.includes('fre')) {
    //            url = "https://kotobank.jp/frjaword/" + escLemma;
    url = 'https://kotobank.jp/search?t=fj&q=' + escLemma
  } else if (lang.includes('spa')) {
    url = 'https://kotobank.jp/search?t=sj&q=' + escLemma
  } else if (lang.includes('ita')) {
    //            url = "https://kotobank.jp/itjaword/" + escLemma;
    url = 'https://kotobank.jp/search?t=ij&q=' + escLemma
  } else if (lang.includes('ger')) {
    //            url = "https://kotobank.jp/dejaword/" + escLemma;
    url = 'https://kotobank.jp/search?t=dj&q=' + escLemma
  } else if (lang.includes('cn')) {
    //            url = "http://www.ctrans.org/search.php?word=" + escLemma + "&opts=fw&optext=中国語前方一致";
    //            url = "https://kotobank.jp/zhjaword/" + escLemma;
    url = 'https://kotobank.jp/search?t=zj&q=' + escLemma
  } else if (lang.includes('por')) {
    //            url = "https://kotobank.jp/ptjaword/" + escLemma;
    url = 'https://kotobank.jp/search?t=pj&q=' + escLemma
  } else if (lang.includes('rus')) {
    //            url = "https://kotobank.jp/rujaword/" + escLemma;
    url = 'https://kotobank.jp/search?t=rj&q=' + escLemma
  } else if (lang.includes('jap')) {
    //            url = "https://kotobank.jp/rujaword/" + escLemma;
    //            url = "https://kotobank.jp/search?t=rj&q=" + escLemma;
    url = 'https://kotobank.jp/search?t=ja&q=' + escLemma
  } else {
    url += escLemma
  }

  // 既にタブが開いていれば、一度閉じる
  if (_dictWindow && !_dictWindow.closed) {
    _dictWindow.close();
  }

  // 新しく開き直すことで、確実に前面のタブとして表示させる
  _dictWindow = window.open(url, '_dictX3')
}

function onHanniSelected(self) {
  if (/^[0-9]+$/.test(self.value)) {
    _cnt4exeRepHanni = self.value
  } else {
    _cnt4exeRepHanni = 999
  }
  saveCookierepHanni(self.value)
}

function go2title(self) {
  saveCookieSec(9999)
  saveCookielineCnt0x()
  let folderName = self.value + "/" + _fileName + ".html"
  if (folderName.includes('51rClips') == false) {
    if (_fileName.search(/^\d\dr$/) == 0) {
      folderName = self.value + "/" + "index.html"
    }
  }
  window.open("../" + folderName, '_self')
}

function go2html(self) {
  window.open(self.value, '_self')
}

function go2l01openNewWindow() {
  let nextIdx
  if (_repHanniSelf.value == "nextLang") {
    nextIdx = (_selectX.selectedIndex + 1) % _selectX.length
    if (_selectX[nextIdx].value.includes("help")) {
      nextIdx = (_selectX.selectedIndex + 2) % _selectX.length
    }
    sessionStorage.setItem('lineCnt0x', '');
    window.open(_selectX[nextIdx].value, '_self')
  } else if (_repHanniSelf.value == "nextMov") {
    _lineCnt0x = '01'
    saveCookielineCnt0x()
    //    sessionStorage.setItem('lineCnt0x', '01');
    _currIndCnt += 1;
    // 次のインデックスを選択する

    _sGo2title.selectedIndex = _currIndCnt % _lenTitles;
    const event = new Event('change', { bubbles: true });
    _sGo2title.dispatchEvent(event);
  } else {
    click_lineCnt0x()
    setTimeout("scrollX(0)", 1000)
  }
}

function cancelGousei() {
  speechSynthesis.cancel()
  clearTimeout(_tm4GouseiRep)
}


function togglePlayback() {
  if (_goOn) {
    clearTimeoutAll()
    clearTimeout(_tm4go2nl)
    cancelGousei()
    _mode4np = 'natural'
    if (_ytb) {
      if (player.getPlayerState() == -1) {
      } else if (player.getPlayerState() != 1) {
        playMovAud()
        fhilitesubtitles()
      } else {
        pauseMovAud()
      }
    } else {
      if (_player.paused) {
        playMovAud()
        fhilitesubtitles()
      } else {
        pauseMovAud()
      }
    }
  } else {
    _goOn = true
  }
}

function playMovAud() {
  if (_ytb) {
    player.playVideo()
  } else {
    _player.play()
  }
  _audiX.play()
}

function pauseMovAud() {
  if (_ytb) {
    player.pauseVideo()
  } else {
    _player.pause()
  }

  _audiX.pause()
}

function saveCookieSec(secX) {
  document.cookie = 'timeSec=' + secX + ';' + _expires + ';path=/'
}

function saveCookielineCnt0x() {
  document.cookie =
    _targetDir + '=' + _lineCnt0x + ';' + _expires + ';path=/'
  sessionStorage.setItem('lineCnt0x', _lineCnt0x);

}

function saveCookierepHanni(repHanni) {
  document.cookie = 'repHanni=' + repHanni + ';' + _expires + ';path=/'
}

function initX() {
  //   toggleElements()
  if (
    _lineCnt0x == null ||
    _lineCnt0x == 'undefined' ||
    _lineCnt0x == undefined ||
    _lineCnt0x.length < 1
  ) {
    ;
  } else {
    //    pauseMovAud()
  }
  if (_ytb == false) {
    _vcontStyle.bottom = 80 + 30 - _videoSize * 15 + 'px'
  }

}

function modSec(sec) {
  sec = parseInt(sec * 3600 / 3600 - _modSec4aud)
  return (sec)
  if (_lang4dic.includes("kor")) {
    _modSec4aud = 2()
    sec = parseInt(sec * 3600 / 3600.25 - _modSec4aud)
  } else if (_lang4dic.includes("ger")) {
    _modSec4aud = 1
    sec = parseInt(sec * 3600 / 3600 - _modSec4aud)
  } else if (_lang4dic.includes("cn")) {
    _modSec4aud = 1
    sec = parseInt(sec * 3602 / 3600 - _modSec4aud)
  } else if (_lang4dic.includes("ita")) {
    _modSec4aud = 2
    _modSec4video = -2
    sec = parseInt(sec * 3600 / 3600 - _modSec4aud)
  } else if (_lang4dic.includes("ger")) {
    _modSec4aud = 0
    sec = parseInt(sec * 3600 / 3600 - _modSec4aud)
  } else if (_lang4dic.includes("eng")) {
    _modSec4aud = -2
    _modSec4video = 2
    sec = parseInt(sec * 3600 / 3600 - _modSec4aud)
  } else if (_lang4dic.includes("fre")) {
    _modSec4aud = 0.2
    sec = parseInt(sec * 3601 / 3600 - _modSec4aud)
  } else {
    _modSec4aud = 1
    sec = parseInt(sec - _modSec4aud)
  }
  return (sec)
}

function seek2sec(sec) {
  sec = parseInt(sec)
  let sec2 = modSec(sec)
  if (_ytb) {
    player.seekTo(sec2, true)
  } else {
    if (_winLocHref.includes("25rapunz")
      && _lang4dic.includes('eng') == false) {
      const sec3 = parseInt((sec2 + _modSec4video) * 3603 / 3600)
      _player.currentTime = sec3
    } else {
      _player.currentTime = sec + parseInt(_modSec4video)
    }
  }
  if (_winLocHref.includes("25rapunz")
    && _lang4dic.includes('eng')) {
    _audiX.currentTime = parseInt(sec2 * 3603 / 3600)
  } else {
    _audiX.currentTime = sec2

  }
}

function replaceOLofElemLine(idX) {
  if (idX != undefined) {
    if (idX.length < 1) {
      alert('22: ' + idX.length)
    } else {
      _lineCnt0x = idX.replace('L', '').replace('o', '')
    }
  }
}

function getWindowOpt() {
  const WINDOW_WIDTH = 500
  const WINDOW_HEIGHT = 400

  // 利用可能な画面サイズを取得
  const screenW = window.screen.availWidth
  const screenH = window.screen.availHeight

  // 右下に配置するための座標を計算
  const leftPos = screenW - WINDOW_WIDTH
  const topPos = screenH - WINDOW_HEIGHT

  // window.open のオプション文字列を作成
  const options = `width=${WINDOW_WIDTH},height=${WINDOW_HEIGHT},left=${leftPos},top=${topPos},menubar=no,toolbar=no,scrollbars=no,status=no`
  return options
}

function clickBtn2seekSec(seconds, self) {
  pauseMovAud()
  if (self.style.backgroundColor != "red") {
    _cnt4repEachLine = 0
  }
  //  seconds -= 0.1
  _lineCnt0x = self.innerText
  _currHilitedLineCnt = self.innerText
  prevHilite2normal()
  cancelGousei()
  _mode4np = 'natural'
  clearTimeoutAll()
  saveCookieSec(seconds)
  saveCookielineCnt0x()
  seek2sec(seconds)
  if (_saveRed) {
    setRed2BtnAndPrevButton()
  }
  _saveRed = true
  const elemX = self.parentNode
  elemX.classList.add('box')
  _prevHilite = elemX.previousElementSibling
  document.body.focus()
  _tm4hiLite = setTimeout(fhilitesubtitles, 100)
  playMovAud();
}

function resetPlaybackRate() {
  _pbRate = 1
  setRate()
  document.getElementById('xRate').innerText = "1"
}

function setPlaybackRateSlower() {
  _pbRate -= 0.1
  if (_mode4np != 'gousei') {
    if (_pbRate < 0.6) {
      _pbRate = 1
    }
  } else if (_pbRate < 0.2) {
    _pbRate = 1
  }
  setRate()
  document.getElementById('xRate').innerText = _pbRate.toFixed(1);
}

function fhilitesubtitles() {
  let playerXcurrTime
  if (_ytb) {

    if (_protocol.includes('http:') == false) {
//debug  for outer video      
//    if (true){
      if (_isOuterVideoOn) {
        const addSec = (Date.now() - _secCntStart) / 1000
        playerXcurrTime = parseInt(_clockSecStart + addSec + _modSec4video)
      }
    } else {
      playerXcurrTime = parseInt(player.getCurrentTime())
    }
  } else {
    playerXcurrTime = parseInt(_player.currentTime)
  }

  if (playerXcurrTime > _endX) {
    go2l01openNewWindow()
  }
  if (playerXcurrTime != _prevSec) {
    const subtitles = document.querySelectorAll('.subtitle')
    subtitles.forEach(function (subtitle) {
      let subttlCurrSec = parseInt(subtitle.getAttribute('data-timestamp'))
      subttlCurrSec = modSec(subttlCurrSec)
      let end = subttlCurrSec + 4
      if (!isNaN(_prevSec) && playerXcurrTime == subttlCurrSec) {
        if (_firstRed) {
          _lineCnt0x = subtitle.children[0].innerText
          setlineCnt0x(_lineCnt0x)
          setRed2BtnAndPrevButton()
          _firstRed = false
        }
        _cnt4repEachLine += 1
        if (_cnt4repEachLine > _cnt4exeRepHanni) {
          exeRep()
        }
        _prevSec = playerXcurrTime
        _currHilitedLineCnt = subtitle.children[0].innerText
        if (_doWaitAndGo2nextLine) {
          waitAndGo2nextLine(subtitle.innerHTML)
        }
        prevHilite2normal()
        subtitle.classList.add('box')
        _prevHilite = subtitle
        checkVisible(subtitle)
      }
    })
  }
  clearTimeout(_tm4hiLite)
  _tm4hiLite = setTimeout(fhilitesubtitles, 300)
}

function scrollX(scrollPosition) {
  window.scrollBy({
    top: scrollPosition,
    behavior: 'smooth'
  })
  //debug
  //    const tempX = zeroPudded(_currHilitedLineCnt)
  //    const elemX = document.getElementById('L' + tempX)
  //    checkVisible(elemX)
}

function checkVisible(self) {
  if (self == "") {
    self = document.getElementById(L_lineCnt0x)
  }

  const elementRect = self.getBoundingClientRect()
  const topPosition = elementRect.top

  if (_viewportHeight < 480) {
    if (topPosition >= _viewportHeight / 3 || topPosition <= -10) {
      const scrollPosition = topPosition - 0
      scrollX(scrollPosition)
    }
  } else {
    //250 = video height + ctrl height
    if (topPosition >= _viewportHeight - 250 || topPosition <= 10) {
      //            const scrollPosition = topPosition - _viewportHeight / 4;
      const scrollPosition = topPosition - 150
      scrollX(scrollPosition)
    }
  }
}

function speak2(bareText, self, repCnt) {
  _goOn = false
  setPrevButton(self)
  self.style.backgroundColor = 'green'
  pauseMovAud()

  if (isNativeApp()) {
    swiftSpeak(bareText, repCnt, _lang4dic)
    _goOn = false
  } else {
    speak(bareText, repCnt, _lang4dic)
  }

}

function getLangCode(tempLang4dic) {
  let langCode

  //document.body.inner
  if (tempLang4dic.includes('eng')) {
    langCode = 'en-US'
  } else if (tempLang4dic.includes('kor')) {
    langCode = 'ko-KR'
  } else if (tempLang4dic.includes('fre')) {
    langCode = 'fr-FR'
  } else if (tempLang4dic.includes('spa')) {
    langCode = 'es-MX'
  } else if (tempLang4dic.includes('ita')) {
    langCode = 'it-IT'
  } else if (tempLang4dic.includes('ger')) {
    langCode = 'de-DE'
  } else if (tempLang4dic.includes('cn')) {
    langCode = 'zh-TW'
  } else if (tempLang4dic.includes('por')) {
    langCode = 'pt-BR'
  } else if (tempLang4dic.includes('rus')) {
    langCode = 'ru-RU'
  } else if (tempLang4dic.includes('jap')) {
    langCode = 'ja-JP'
  }
  return langCode
}

function getVoiceX(tempVoice) {
  let voiceX
  if (tempVoice.includes('eng')) {
    voiceX = 'Samantha'
  } else if (tempVoice.includes('kor')) {
    if (
      _userAgent.includes('safari') &&
      !_userAgent.includes('chrome') &&
      !_userAgent.includes('android')
    ) {
      voiceX = 'Yuna'
    } else {
      voiceX = 'Yuna (韓国語（韓国）)'
    }
  } else if (tempVoice.includes('fre')) {
    voiceX = 'Thomas'
  } else if (tempVoice.includes('spa')) {
    voiceX = 'Paulina'
  } else if (tempVoice.includes('ita')) {
    voiceX = 'Alice'
  } else if (tempVoice.includes('ger')) {
    if (
      _userAgent.includes('safari') &&
      !_userAgent.includes('chrome') &&
      !_userAgent.includes('android')
    ) {
      voiceX = 'Anna'
    } else if (navigator.brave && typeof navigator.brave.isBrave) {
      voiceX = 'Anna'
    } else {
      //            voiceX =  "Martin";
      voiceX = 'Google Deutsch'
    }
  } else if (tempVoice.includes('cn')) {
    voiceX = 'Meijia'
  } else if (tempVoice.includes('por')) {
    //        utterance.lang = "pt-BR";
    voiceX = 'Luciana'
  } else if (tempVoice.includes('rus')) {
    voiceX = 'Milena'
  } else if (tempVoice.includes('jap')) {
    voiceX = 'Kyoko'
  }
  return voiceX
}


function isNativeApp() {
  // Swift側で config.userContentController.add(..., name: "speak")
  // と設定した名前があるかを確認します
  return (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.speak // Swiftで登録したハンドラ名
  );
}

function swiftSpeak(text, repCnt, origLang) {
  let tempVoice = _lang4voice
  if (origLang == undefined) {
    tempVoice = _lang4dic
  }
  const langCode = getLangCode(tempVoice)
  if (window.webkit && window.webkit.messageHandlers.speak) {
    window.webkit.messageHandlers.speak.postMessage({
      "text": text,
      "lang": langCode
    });
  }
  if (_mode4np != 'natural' && repCnt > 0) {
    _tm4GouseiRep = setTimeout('go2nextLine()', 5500)
    //    _tm4GouseiRep =  setTimeout('playGouseiOto(), 5500)
  }
}

function speak(bareText, repCnt, origLang) {
  let tempVoice = _lang4voice
  if (origLang == undefined) {
    tempVoice = _lang4dic
  }
  _cnt4repEachLine = 0
  _mode4np = 'gousei'
  const utterance = new SpeechSynthesisUtterance(bareText)
  const voices = speechSynthesis.getVoices()
  let voiceX
  if (_osX.includes('iOS') || _osX.includes('macOS')) {
    const voiceTemp = getVoiceX(tempVoice)
    voiceX = voices.find(voice => voice.name === voiceTemp)
    utterance.rate = _pbRate * 0.65
  } else {
    const langCode = getLangCode(_lang4dic)
    voiceX = voices.find(voice => voice.lang === langCode)
    utterance.rate = _pbRate * 0.65
  }
  if (voiceX != undefined) {
    speechSynthesis.cancel()
    utterance.voice = voiceX
  } else {
    const langCode = getLangCode(_lang4dic)
    utterance.lang = langCode
  }
  if (_mode4np != 'natural' && repCnt > 0) {
    _tm4GouseiRep = setTimeout('go2nextLine()', 5500)
  }
  speechSynthesis.speak(utterance)
}


async function callGemini() {
  // ※あなたのAPIキーを入れてください
  const API_KEY = "AIzaSyBBqgHdJLTqCP-A95mA4NxwUPLJ7qFxtYs"; // あなたのキー

  // 動くことが確認できたモデルを指定
  const MODEL_NAME = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "こんにちは！これで通信成功ですね？" }]
        }]
      })
    });

    const data = await response.json();

    // API側のエラーチェック
    if (data.error) {
      console.error("APIエラー:", data.error.message);
      return;
    }

    // ▼▼ ここが修正ポイント！ candidates で正しく取り出します ▼▼
    if (data.candidates && data.candidates.length > 0) {
      // を付けてリストの1番目を取り出す
      const reply = `${data.candidates[0].content.parts[0].text}`;
      console.log("Geminiの回答:", reply);
    } else {
      console.error("回答データが見つかりませんでした:", data);
    }

  } catch (error) {
    console.error("通信エラー:", error);
  }
}

//callGemini();



async function askGemini(prompt) {
  const API_KEY = ""; // あなたのキー
  const MODEL_NAME = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    // API側のエラーチェック
    if (data.error) {
      console.error("APIエラー:", data.error.message);
      return;
    }

    // ▼▼ ここが修正ポイント！ candidates で正しく取り出します ▼▼
    if (data.candidates && data.candidates.length > 0) {
      // を付けてリストの1番目を取り出す
      const reply = `${data.candidates[0].content.parts[0].text}`;
      console.log("Geminiの回答:", reply);
    } else {
      console.error("回答データが見つかりませんでした:", data);
    }

  } catch (error) {
    console.error("通信エラー:", error);
  }
}

function go2gemini(selectElement) {
  const label = selectElement.options[selectElement.selectedIndex].text;
  let targetX = '_self'
  if(_ytb){
      targetX = '_blank'
  }
  if (label.includes("？")) {
    window.open("http://sato.fm.senshu-u.ac.jp/zkiku/2026/11html/01js/08help.html", targetX)
    return (1)
  } else if (label.includes("Gglクラス")) {
    window.open("https://classroom.google.com/u/0/w/ODAyMDA3MDI2MDY0/t/all", targetX)
        return (1)
  } else if (label.includes("歌詞")) {
    window.open("https://lyricstranslate.com/en/tangled-original-soundtrack-lyrics.html", targetX)
        return (1)
  } else if (label.includes("字幕")) {
    window.open("https://www.opensubtitles.org/ja/search/sublanguageid-eng/idmovie-53450", targetX)
        return (1) 
  } else if (label.includes("gemini")) {
   window.open("https://gemini.google.com/app?hl=ja", targetX)
        return (1)
  } else if (label.includes("notebookLM")) {
    window.open("https://notebooklm.google.com/", targetX)
        return (1)
  } else if (label.includes("gAIstudio")) {
    window.open("https://aistudio.google.com/generate-speech", targetX)
        return (1)             
  }else if (label > 99) {
    let skip2lnCnt = parseInt(label)
    if (skip2lnCnt < _subtitleLen) {
      _lineCnt0x = skip2lnCnt
    } else {
      _lineCnt0x = _subtitleLen
    }
//    setTimeout("scrollX(0)", 1000)
scrollX(0)
    saveCookielineCnt0x()
    click_lineCnt0x()
    _cnt4exeRepHanni = 999    
    return (1)                    
  } else {
    let buff = getBodyClean()
    //debug
    let promptText
    if (label.includes("前後")) {
        promptText = `# 単語リスト作成
&lt;!DOCTYPE html&gt;
&lt;html lang="ja"&gt;
&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;title&gt;
[ここにタイトルを挿入]
&lt;/title&gt;
&lt;link rel="stylesheet" href="http://sato.fm.senshu-u.ac.jp/zkiku/2026/11html/01js/09style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="video-container"&gt;
&lt;video id="player"&gt;
&lt;/div&gt;

[ここに本体を挿入]

&lt;div id="bottomBtn"&gt;
&lt;/div&gt;
&lt;h1 id="words"&gt;単語リスト&lt;/h1&gt;
&lt;div id="wordList"&gt;
&lt;/div&gt;
&lt;div id="info"&gt;

[ここに詳しい情報を挿入]

&lt;/div&gt;
&lt;script&gt;
var _startX = 0;
var _endX = 7200;
var _videoId = "xxxxxx";
var _lang4dic = "eng";
const _modSec4aud = 0
const _modSec4video = 0
var _yt2local = true
&lt;/script&gt;
&lt;script src="http://sato.fm.senshu-u.ac.jp/zkiku/2026/11html/01js/06titleList.js"&gt;&lt;/script&gt;
&lt;script src="http://sato.fm.senshu-u.ac.jp/zkiku/2026/11html/01js/05player.js"&gt;&lt;/script&gt;
&lt;/body&gt;`
  }else if (label.includes("本体")) {
   promptText = bodyClean4lang(buff)
  }else{
    buff = buff.replace(/\n*\d+/g, " ")
    if (label.includes("単語")) {
      promptText = `# 単語リスト作成
* (i)の言語Xの単語を抜き出して、一覧表を作成する。
* まず、単語を基本形に戻し、**基本形**を処理対象とする。
* 言語Xが韓国語や日本語の場合には、単語を形態素に分けて、その形態素の**基本形**を処理する。例：밤엔は、밤と엔に分節して処理する。形態素が助詞や冠詞や語尾の場合にも(1,2,3)の処理を行う。
* 表の項目：**(1) 基本形の綴り字、(2)基本形の意味、(3)基本形の発音**
* 元の単語が、その形態素の基本形と異なる場合には、**(1)その単語の綴り字、(2)その単語の意味、(3)その単語の発音**と、(ii)の2つを別項目として同じ表の中に作成する。
(i)
  `
    } else if (label.includes("文法")) {
      promptText = `# 文法ポイント抽出
(i) (v)の言語Xの文から、文法ポイントを抜き出して、説明する。
(ii) 文法ポイントとは、助詞や前置詞や接続詞などの機能語や、動詞の活用形や時制などの文法的特徴を指す。
(iii) 説明項目：**(1) 文法ポイントの名称、(2) 文法ポイントの説明、(3) 文法ポイントを含む例文**
(iv) 例文は、元の文からその文法ポイントを含む部分を抜き出して作成する。
(v)
  `

    } else if (label.includes("語源")) {
      promptText = `# 単語リスト作成
* (i)の言語Xの単語を、英単語と関連のあるものをすべて抜き出して、一覧表を作成する。
* 表の項目：(1) 英単語、(2)英単語の意味、(3)言語Xの単語の基本形、(4)言語Xの単語の基本形の意味、(5)言語Xの単語の基本形の発音
* 言語Xの単語が、複数の英単語と関連する場合には、すべての関連する英単語を、**別項目として追加**して、(1,2,3,4,5)も入力する。
* 語源的に関連のない単語は削除する。
* 固有名詞を除いて、語頭の文字を不必要に大文字で表記しない。
(i)
`
    } else if (label.includes("英検")) {
      promptText = `# 単語リスト作成
* (i)から英検準1級レベル以上の英単語をを抜き出して、一覧表を作成する。
* 抜き出した英単語を基本形に戻し、**基本形**を処理対象とする。
* 表の項目：**(1) 基本形の綴り字、(2)基本形の意味、(3)基本形の発音IPA**
* 単語試験実施ボタンを追加する。
* 選択肢は3つ。
* 1回の試験は５問出題。
* 再試験では、誤答の単語と見出題の単語を優先的に出題する。
* 選択肢には単語の意味を表示する。
* １問解答するごとに、正解表示と採点を行う。 
(i) `
    } else if (label.includes("追加")) {
      promptText = `
* 各項目の左端に合成音声再生ボタンを追加する。
* 合成音声で発音を再生する機能を追加する。
* できるだけ高音質の合成音声を使用する。
* 音声聞き取り試験を作成する。
* 選択肢は3つ。
* 1回の試験は５問出題。
* 再試験では、誤答の単語と見出題の単語を優先的に出題する。
* 選択肢には単語の意味を表示する。
* １問解答するごとに、正解表示と採点を行う。   
`
    }
    promptText = promptText + "\n\n" + buff
  }

    const returnBtn = `<button onclick='alert("CLOSE_WINDOW");'>&nbsp;&nbsp;&nbsp;&nbsp;←&nbsp;&nbsp;&nbsp;&nbsp;</button>`
    const promptHtml = promptText.replace(/\n/g, "<br>\n")
    const promptEsc = encodeURI(promptHtml)
    const copyBtn = `<button value="${promptEsc}" onClick=copyTxt(this)>コピー</button>`
    open4prompt(label, returnBtn + copyBtn + promptHtml, targetX)
}
}

async function copyTxt(self) {
  const plainTxt = decodeURI(self.value)
  try {
    await navigator.clipboard.writeText(plainTxt);
  } catch (error) {
    alert("コピーに失敗しました: " + error);
  }
}

function open4prompt(titleX, promptText, targetX) {
  const newWindow = window.open('', targetX);
  newWindow.focus()
  if (newWindow) {
    newWindow.document.body.innerHTML =
      '<html><head><title>' + titleX + '</title></head><body>' 
      + promptText

  }
  newWindow.document.body.style.backgroundColor = "grey"
  newWindow.focus()
}

function getBodyClean() {
  const htmlX = document.getElementsByTagName('body')[0].innerHTML
  let bodyX
  if (_ytb) {
    bodyX = htmlX.split("</iframe>")[1].split('<div id="bottomBtn"')[0]
  } else {
    bodyX = htmlX.split('</video>')[1].split('<div id="bottomBtn"')[0]
  }
  bodyX = getBareText3(bodyX)
  return (bodyX)
}

function bodyClean4lang(bodyX) {
  if (_lang4dic.includes('cn')) {
    bodyX = bodyX.replace(/ /g, '')
  } else if (_lang4dic.includes('kor')) {
    bodyX = bodyX.replace(/\+/g, '').replace(/ /g, '')
  } else if (_lang4dic.includes('jap')) {
    bodyX = bodyX.replace(/\+/g, '').replace(/ /g, '')
  }
  let promptText = `
# 多言語学習用HTML生成プロンプト
あなたはプログラミングと **言語X** 学習に精通したアシスタントです。以下の仕様に従い、(i)のデータを処理して静的なHTMLファイルのみを、リンクなどは付けずに、プレーンテキストとして生成してください。
## htmlのヘッダーやフッターは不要。CSSも不要。
## &lt;div class="subtitle"&gt;でセリフとタイムスタンプの出力のみを行う。
## コードブロック形式にて出力する。


### 3. 構成と置換ルール
* **置換:** (i)の文字列から判断して、文中の「言語X」を、その言語名に置換してください。

### 4. タイムスタンプと字幕ブロック
* **単位変換:** \`01:02:03\` などの形式は \`3723\` のように秒単位の数値に変換してください。
* **小数点以下2桁以降は削除してください。（例：\`02:01:01,830\` → \`72061.8\`）。
* セリフが (...) で囲まれているト書き行（音楽や効果音の説明など）を、タイムスタンプを含めて完全に除外する。
* **HTML構造:** 各セリフを以下の形式で出力してください。
\`\`\`html
&lt;div class="subtitle" data-timestamp="XXX"&gt;
&lt;button class="play-button"&gt;ZZZ&lt;/button&gt;
[セリフ本文]
&lt;/div&gt;
`

  if (_lang4dic.includes('jap') == false) {
    promptText += `[日本語訳]
`
  }


  promptText += `
\`\`\`
* \`XXX\`：計算後の開始秒数。
* \`ZZZ\`：SRTの行番号。
* \`[日本語訳]\`：\`&lt;/div&gt;\` の直後に実際の改行コードを入れ、言語Xの翻訳を記述してください。「～の日本語訳」といった説明文は不要です。
* \`[日本語訳]の記述形式\`：&lt;div class="trans"&gt;[日本語訳]&lt;/div&gt;のようにdivタグを使用する。

`
  const targetLang = '韓国語'
  //中国語　韓国語 英語 フランス語 スペイン語
  if (_lang4dic.includes('jap')) {
    promptText += `
### 6. 単語・形態素のマークアップ規約
* セリフ内の日本語の各単語を以下のルールで加工してください。
* 分書: 日本語の単語の間に半角スペースを入れて分書する。
* 単語ごとに &lt;sub&gt; 対応する${targetLang}の単語と発音を付加する
* 基本マークアップ: &lt;ruby&gt;漢字&lt;rt&gt;日本語のカタカナ発音&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;
&lt;ruby class="${targetLang}"&gt;${targetLang}単語&lt;/ruby&gt;/発音&lt;/sub&gt;
* 平仮名には、カタカナの発音を付けない。
* 記号の扱い: / の前後にスペースを入れない。
* 空の &lt;sub&gt;&lt;/sub&gt; は削除する。
* 既出の単語でも、繰り返し、同じ処理を行う。
* &lt;/ruby&gt;の直後の改行を削除する
* &lt;sub&gt;の直前の改行を削除する
* &lt;sub&gt;の直後の改行を削除する
`

  } else if (_lang4dic.includes('eng')) {
    promptText += `
#### 6. 歌詞の加工ルール（英語歌詞部分）
* **単語:** 2文字以上の英単語は &lt;ruby&gt;単語&lt;/ruby&gt; で括る。
* 英検２級レベル以上の単語には、&lt;/ruby&gt;の直後に &lt;sub&gt;日本語の意味&lt;/sub&gt; を付与する。
* **熟語:** 熟語は &lt;ruby&gt;熟語&lt;/ruby&gt;&lt;sub&gt;日本語の意味&lt;/sub&gt; で括る。
* **共通:** * / の前後にはスペースを入れない。
* 中身が空の &lt;sub&gt;&lt;/sub&gt; はすべて削除する。`


  } else if (_lang4dic.includes('eng')) {
    promptText += `
#### 6. 歌詞の加工ルール（英語歌詞部分）
* 英単語の語源と関連するドイツ語やフランス語の単語がある場合には、それらの単語のすべてに対して、繰り返し、次の形式で英単語の直後に追加する。
* フランス語語源の場合：
&lt;sub&gt;仏:&lt;ruby class="fre"&gt;フランス語/フランス語の発音&lt;/ruby&gt;(フランス語の意味)&lt;/sub&gt;
* ドイツ語語源の場合：
&lt;sub&gt;独:&lt;ruby class="ger"&gt;ドイツ語/ドイツ語の発音&lt;/ruby&gt;(ドイツ語の意味)&lt;/sub&gt;
* 2文字以上の英単語：
&lt;ruby class="engetymo"&gt;...&lt;/ruby&gt;
*「英語」と「ドイツ語」は共に西ゲルマン語群に属するため、多くの基本語彙が共通の語源（同根語：Cognates）を持っているが、**そのすべての基本語彙を処理**する。
* 既出の単語も、省略せずに、繰り返し処理をする
`


  } else if (_lang4dic.includes('kor')) {
    promptText += `
* すべての **\`&lt;sub&gt;\`** タグの直前の改行を **削除** する。

### 6. 単語・形態素のマークアップ規約
* 徹底した形態素分割と結合: セリフ内の各単語を、意味を持つ最小単位（名詞、助詞、語幹、語尾、接辞など）に分解し、それらをすべて + で隙間なく結合してください。
* 結合の対象: 
    - 「名詞 + 助詞」（例：나+는）
    - 「語幹 + 語尾」（例：가+고）
    - 「名詞 + 接辞（のように、たち等）」（例：나+같이、사람+들）
    - 「複合語の構成要素」（例：눈+물）
* スペース（分かち書き）の扱い: 
    - 元の文にスペースがある箇所のみ、出力でもスペースを維持し、+ で結合しないでください。
    - 逆に、スペースがない一続きの文字列（1単語）内にある要素は、必ずすべて + で繋いでください。
* 基本マークアップ: &lt;ruby&gt;形態素&lt;rt&gt;カタカナ発音&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;意味/[原形]&lt;/sub&gt;
* 出力例: 
    - なごり惜しいが（아쉬움가득하지만）→ &lt;ruby&gt;아쉬움&lt;rt&gt;アシウム&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;名残惜しさ&lt;/sub&gt;+&lt;ruby&gt;가득&lt;rt&gt;カドゥク&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;いっぱい&lt;/sub&gt;+&lt;ruby&gt;하&lt;rt&gt;ハ&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;だ&lt;/sub&gt;+&lt;ruby&gt;지만&lt;rt&gt;ジマン&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;が&lt;/sub&gt;
    - 窓越しに（창문넘어）→ &lt;ruby&gt;창문&lt;rt&gt;チャンムン&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;窓&lt;/sub&gt;+&lt;ruby&gt;넘어&lt;rt&gt;ノモ&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;越しに&lt;/sub&gt;

* 活用・変化の処理: 原形や基本形と異なる場合のみ、&lt;sub&gt; 内に &lt;ruby class="modern-ruby"&gt;原形&lt;/ruby&gt; を記述してください（例：&lt;sub&gt;意味/&lt;ruby class="modern-ruby"&gt;原形&lt;/ruby&gt;&lt;/sub&gt;）。
* 記号の扱い: / の前後にスペースを入れない。
* 空の &lt;sub&gt;&lt;/sub&gt; は削除する。
* 熟語の処理: 熟語は &lt;ruby&gt;熟語&lt;/ruby&gt;&lt;sub&gt;意味&lt;/sub&gt; で括る。
* 結合例: 「夢を（꿈을）」の場合
&lt;ruby&gt;꿈&lt;rt&gt;クム&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;夢&lt;/sub&gt; + &lt;ruby&gt;을&lt;rt&gt;ウル&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;を&lt;/sub&gt;
* 形態素に対応する漢字がある場合ののみ、漢字の先頭に"/🇰🇷"を付けて、&lt;/sub&gt;の直前に挿入する。
* 形態素に対応する漢字がない場合には、&lt;/sub&gt;の直前に挿入しない。
* 既出の単語でも、繰り返し、同じ処理を行う。

`

  } else if (_lang4dic.includes('cn')) {
    promptText += `
### 6. 単語・形態素のマークアップ規約
* 文を単語に分節する。
* 1文字ごとではなく、形態素単位で分節して、処理を行う。
* &lt;ruby&gt;の構造は「&lt;ruby&gt;単語&lt;rt&gt;カタカナの発音&lt;/rt&gt;&lt;/ruby&gt;」としてください。
* 繁体字中国語と簡体字中国語が異なる文字の場合には、&lt;sub&gt;の構造は「&lt;sub&gt;意味/ピンインの発音/&lt;ruby class="modern-ruby"&gt;簡体字中国語&lt;/ruby&gt;&lt;/sub&gt;」としてください。
* 繁体字中国語と簡体字中国語が同じ文字の場合には、&lt;sub&gt;の構造は「&lt;sub&gt;意味/ピンインの発音&lt;/sub&gt;」としてください。
* ソースコードの可読性を高めるため、&lt;ruby&gt;の直前と&lt;/sub&gt;の直後、およびセリフの終わり（&lt;/div&gt;の直前）には**実際の改行コード**を挿入する
`

  } else {
    promptText += `
### 6. 単語・熟語の加工（マークアップ）
セリフ内の各単語・熟語を以下のルールで処理してください。
* **単語の基本形:**
\`&lt;ruby&gt;単語&lt;rt&gt;カタカナ発音&lt;/rt&gt;&lt;/ruby&gt;&lt;sub&gt;意味/&lt;ruby class="modern-ruby"&gt;原形&lt;/ruby&gt;&lt;/sub&gt;\`
* 単語が活用・変化しており、原形と異なる場合のみ &lt;sub&gt;タグ内に\`&lt;ruby class="modern-ruby"&gt;原形&lt;/ruby&gt;\` を追加記述してください。
* 名詞や形容詞も活用・変化しており、基本形と異なる場合は &lt;sub&gt;タグ内に\`&lt;ruby class="modern-ruby"&gt;基本形&lt;/ruby&gt;\` を追加記述してください。
* **基本形** の語源が、ラテン語やゲルマン語由来の単語で、英語の語彙と繋がりがある場合には、 **その英単語とその意味** を\`/&lt;ruby class="engetymo-ruby"&gt;英単語&lt;/ruby&gt;(意味)\`の形式で、&lt;/sub&gt;\の直前に追加する。
* 2語が1語に縮約した語は、基本形には2語を追加記述してください。
* 空の \`&lt;sub&gt;&lt;/sub&gt;\` は削除してください。
* **熟語の処理:**
熟語は \`&lt;ruby&gt;熟語&lt;/ruby&gt;&lt;sub&gt;日本語の意味&lt;/sub&gt;\` で括ってください。
* "/"の前後のスペースを削除する。
* 既出の単語でも、繰り返し、同じ処理を行う。

`

  }
  promptText += `
### 7. ソースコードの可読性（改行コードの挿入）
1. &lt;ruby&gt; が &lt;sub&gt; 内に含まれない場合、&lt;ruby&gt; の直前に改行
2. すべての \`&lt;/sub&gt;\` タグの直後
3. セリフの終わり（\`&lt;/div&gt;\` の直前）
4. \`&lt;/div&gt;\` タグの直後
5. &lt;/ruby&gt;の直後に&lt;sub&gt;が続かない場合には、&lt;/ruby&gt;の直後に改行


### 8. 次の位置の改行コードの削除
* \`&lt;sub&gt;\`の直前の改行コード
* \`&lt;/ruby&gt;\`の直後の改行コード
* **最重要**: &lt;/ruby&gt;\\n&lt;sub&gt;は、**改行を削除**して、&lt;/ruby&gt;&lt;sub&gt;にすべて変換する。


(i)
${bodyX} 

`
 return (promptText)
}

function getBareText(self) {
  let parent = self.parentNode
  bareText4transSpeak(parent, self)
}

function getBareText2(buff) {
  buff = buff.replace(/<b.*?<\/b>/g, '').replace(/\+/g, '')
    .replace(/<span class="play-button".*?<\/span>/, '')
    .replace(`<span class="lyric-text">`, '')
    .replace('</span>', '')
    .replace(/<rt[^<]*?<\/rt>/g, '')
    .replace(/<sub.*?>[^>]*?<\/sub>/g, '')
    .replace(/<u>/g, '')
    .replace(/<\/u>/g, '')
    .replace(/<i>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/<ruby.*?>/g, '')
    .replace(/<\/ruby>/g, '')
    .replace(/\s+/g, ' ')
  if (_lang4dic.includes('kor')
    || _lang4dic.includes('jap')

  ) {
    buff = buff.replace(/\-/g, '').replace(/\+/g, '')
  }
  //  console.log(buff)
  return (buff)
}



function getBareText3(buff) {
  buff = buff.replace(/<b [^>]+><\/b>/g, '')
    .replace(/<small>/g, '')
    .replace(/<\/small>/g, '')
    .replace(/<div class="trans"[^<]*?<\/div>/g, '')
    .replace(/<rt[^<]*?<\/rt>/g, '')
    .replace(/<ruby[^>]*?>/g, '')
    .replace(/<\/ruby>/g, '')
    .replace(/<sub[^<]*?<\/sub>/g, ' ')
    .replace(/<span [^>]+>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<button class="play-button"[^>]+>.+<\/button>/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/<\/div>[^<]*?<div class="subtitle[^>]+data-timestamp="/g, '\n')
    .replace(/<i [^>]+>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/<\/div>.+/, '')
    .replace(/\">/g, '')
    .replace(/^\s+/, '')
  //  console.log(buff)
  return (buff)
}
function bareText4transSpeak(self, childX) {
  checkVisible(self)
  pauseMovAud()
  clearTimeoutAll()
  clearTimeout(_tm4go2nl)
  let bareText = getBareText2(self.innerHTML)
  //音
  if (childX.id.includes('o')) {
    replaceOLofElemLine(childX.id)
    speak(bareText, 100)
  } else {
    let targetLang = 'ja'
    const escBuff = encodeURI(bareText)
    if (_lang4dic.includes('jap')) {
      targetLang = 'en'
    }
    let url =
      'https://translate.google.com/#view=home&op=translate&sl=auto&tl=' +
      targetLang +
      '&text='
    url += escBuff
    window.open(url, '_self')
  }
}

function getOS() {
  const userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null
  if (/iPad|Macintosh/.test(userAgent) && 'ontouchend' in document) {
    os = 'iOS'
    _iPadOS = true
  } else if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'macOS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (/Linux/.test(platform)) {
    os = 'Linux'
  }
  return os
}

async function detectBrave() {
  try {
    if (navigator.brave && (await navigator.brave.isBrave())) {
      _isBrave = true
    }
  } catch (error) { }
}

function getNumbLang() {
  let lang = _lang4dic.replace(/\d/g, '')
  let numbLang = 'index'
  if (lang.includes('kor')) {
    numbLang = 17 + lang
  } else if (lang.includes('fre')) {
    numbLang = 14 + lang
  } else if (lang.includes('spa')) {
    numbLang = 12 + lang
  } else if (lang.includes('ita')) {
    numbLang = 13 + lang
  } else if (lang.includes('ger')) {
    numbLang = 15 + lang
  } else if (lang.includes('cn')) {
    numbLang = 16 + lang
  } else if (lang.includes('por')) {
    numbLang = 16 + lang + 2
  } else if (lang.includes('rus')) {
    numbLang = 14 + lang
  } else if (lang.includes('jap')) {
    numbLang = 18 + lang
  } else if (lang.includes('ara')) {
    numbLang = 19 + lang
  }
  return numbLang
}


// 両方準備できたかチェックする関数
function checkLocalAudMovBothReady() {
  //  initLocalAudMovPlayer();
  if (readyStatus.video && readyStatus.audio) {
    initLocalAudMovPlayer();
  }
}

function initLocalAudMovPlayer() {
  _videoSize = 0
  enlargeVideo()
  click_lineCnt0x()
  _tm4hiLite = setTimeout(fhilitesubtitles, 10)
  if (true) {
    ;
  } else if (_fileName.includes("kor")) {
    _pbRate = 0.8
  } else if (_fileName.includes("cn")) {
    _pbRate = 0.8
  } else if (_fileName.includes("index")) {
    _pbRate = 1
  } else if (_fileName.includes("jap")) {
    _pbRate = 1
  } else {
    _pbRate = 0.85
  }
  setRate()
  playMovAud()

}

function setRate() {
  if (_ytb) {
    player.setPlaybackRate(_pbRate);
  } else {
    _player.playbackRate = _pbRate;

  }
  _audiX.playbackRate = _pbRate;
}

function bigSeek(sec) {
  sec = _player.currentTime + sec
  clearTimeout(_tm4go2nl)
  _cnt4repEachLine = 0
  seek2sec(sec)
  playMovAud()
  fhilitesubtitles()
}

function checkKeyCode2(keycode) {
  let targetX
  let elemX
  let currSec = 100
  switch (keycode) {
    case "ArrowLeft":
      bigSeek(-60)
      break
    case ",":
      bigSeek(-60)
      break
    case "ArrowRight":
      bigSeek(60)
      break
    case ".":
      bigSeek(60)
      break
    case ";":
      bigSeek(-300)
      break
    case "ArrowUp":
      bigSeek(-300)
      break
    case "ArrowDown":
      bigSeek(300)
      break
    case "/":
      bigSeek(300)
      break

    case "6":
      _lineCnt0x = '01'
      saveCookielineCnt0x()
      const elementX = document.getElementById(_lineCnt0x)
      prevHilite2normal()
      //  _goOn = false
      click_lineCnt0x()

      break;
    case "7":
      // 次のインデックス番号を計算
      saveCookieSec(9999)
      _currIndCnt += 1;
      // 次のインデックスを選択する
      _sGo2title.selectedIndex = _currIndCnt % _lenTitles;
      const event = new Event('change', { bubbles: true });
      _sGo2title.dispatchEvent(event);
      break

    case "8":
      const nextIdx = (_selectX.selectedIndex + 1) % _selectX.length
      window.open(_selectX[nextIdx].value, '_self')
      break;
    case "9":
      break

    case "1":
      togglePlayback()
      break
    case "2":
      go2prevLine()
      break
    case "3":
      //      resetLoopSecAndPlay()
      go2l01openNewWindow()
      break
    case "4":
      go2nextLine()
      break
    case "5":
      toggleElements()
      break
    case "z":
      openHtml('11cze')
      break
    case "l":
      openHtml('13pol')
      break
    case "x":
      openHtml('12slk')
      break
    case "w":
      openHtml('19swe')
      break
    case "y":
      openHtml('19ice')
      break
    case "d":
      openHtml('17dut')
      break
    case "n":
      openHtml('17dan')
      break
    case "m":
      openHtml('19nor')
      break
    case "v":
      openHtml('18vie')
      break
    case "h":
      openHtml('12hun')
      break
    case "t":
      openHtml('17tha')
      break
    case "u":
      openHtml('18cat')
      break
    case "q":
      openHtml('16por2')
      break
    case "j":
      openHtml('18jap')
      break
    case "g":
      openHtml('15ger')
      break
    case "e":
      if (!location.hostname.includes("localhost")) {
        openHtml('index')
      }
    case "d":
      openHtml('index')
      break
    case "f":
      openHtml('14fre')
      break
    case "p":
      openHtml('14rus')
      break
    case "s":
      openHtml('12spa')
      break
    case "t":
      openHtml('17tha')
      break
    case "i":
      openHtml('13ita')
      break
    case "b":
      openHtml('16cn')
      break
    case "k":
      openHtml('17kor')
      break
    case "h":
      openHtml('http://sato.fm.senshu-u.ac.jp/zkiku/202508/15TED/31help')
      break
  }
}



let _isBrave = false
detectBrave()

let _iPadOS = false
const _osX = getOS()

const _userAgent = navigator.userAgent.toLowerCase()
const platform = navigator.platform.toLowerCase()
if (platform.includes('win') || _userAgent.includes('windows')) {
  window.speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices()
  }
}

// Chromeの判定（EdgeやOperaを除外）
const _isChrome =
  _userAgent.indexOf('chrome') !== -1 &&
  _userAgent.indexOf('edge') === -1 &&
  _userAgent.indexOf('edg') === -1 &&
  _userAgent.indexOf('opr') === -1

// Safariの判定（ChromeやEdgeを除外）
const _isSafari = () => {
  const ua = window.navigator.userAgent.toLowerCase()

  // 1. 以前のiPad（OS 12以前など）のUAに含まれる文字列を確認
  if (ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1) {
    // 2. iPadOS（OS 13以降）はMacと同じUAになるため、タッチポイントで判定
    // iPadはマルチタッチ対応だが、Mac（通常のSafari）は0（非対応）
    if (
      'ontouchend' in document ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)
    ) {
      return true
    }
  }
  return false
}

const _isFirefox = /Firefox|FxiOS/i.test(_userAgent)


// 全てのrubyタグを取得
const rubyElements = document.querySelectorAll('ruby');

// forEachで各rubyタグに対して処理を行う
rubyElements.forEach((ruby) => {
  ruby.addEventListener('click', (event) => {
    // 1. 親要素へのイベント伝播（バブリング）をストップ
    event.stopPropagation();

    // 2. class属性の値を取得（classX）
    let classX = ruby.className;
    if (classX == "") {
      classX = _lang4dic
    } else if (classX == "modern-ruby") {
      classX = _lang4dic
    } else if (classX.includes('韓国語')) {
      classX = 'kor'
    } else if (classX.includes('中国語')) {
      classX = 'cn'
    } else if (classX.includes('スペイン語')) {
      classX = 'spa'
    } else if (classX.includes('フランス語')) {
      classX = 'fre'
    } else if (classX.includes('ドイツ語')) {
      classX = 'ger'
    } else if (classX.includes('イタリア語')) {
      classX = 'ita'
    } else if (classX.includes('英語')) {
      classX = 'eng'
    }

    // 3. 関数dict(this, classX)を呼び出し
    // ※dict関数は別途定義されている前提です
    dictX(ruby, classX);
  });
});


const buttons = document.querySelectorAll('button')
buttons.forEach(buttonX => {
  buttonX.addEventListener('click', event => {
    event.stopPropagation()
  })
})

const listX = document.getElementById('go2title')
let kesu = String(window.location)
for (const optX of listX.options) {
  if (kesu.includes(optX.value)) {
    optX.selected = true
    break
  }
}

let btnCnt = 0
document.querySelectorAll('.play-button').forEach(function (button) {
  //  let btnCnt = button.innerText
  btnCnt += 1
  let btnCnt2 = btnCnt
  if (btnCnt < 10) {
    btnCnt2 = '0' + btnCnt
  }

  button.innerText = btnCnt2
  button.setAttribute('id', 'L' + btnCnt2)

  button.insertAdjacentHTML(
    'afterend',
    '<b  onClick="getBareText(this)" ' + 'id="t' + btnCnt2 + '"></b>'
  )
  let otoBuff = '<b onClick="getBareText(this)" ' + 'id="o' + btnCnt2 + '"></b>'
  button.insertAdjacentHTML('afterend', otoBuff)

  button.addEventListener('click', function () {
    let start = parseFloat(this.parentElement.getAttribute('data-start'))
    if (isNaN(start)) {
      start = parseFloat(this.parentElement.getAttribute('data-timestamp'))
    }
    clickBtn2seekSec(start, this)
  })
})

const boldsX = document.querySelectorAll('b')
boldsX.forEach(boldX => {
  boldX.addEventListener('click', event => {
    event.stopPropagation()
  })
})

const selectElement = document.querySelector('select');
selectElement.addEventListener('click', (event) => {
  event.stopPropagation();
});

let _numbLang = getNumbLang()

document.body.addEventListener('click', () => {
  togglePlayback()
})

/////



let player

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '130',
    width: '213',
    videoId: _videoId,
    playerVars: { start: _startX, controls: 0, autoplay: 1 },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  })
}

function onPlayerReady(event) {
  event.target.playVideo()
  clearTimeoutAll()
  _tm4hiLite = setTimeout(fhilitesubtitles, 10)
  setTimeout("scrollX(0)", 200)
  const elementX = document.getElementById(_lineCnt0x)
  click_lineCnt0x(elementX)
  //  initX()
}
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    clearTimeoutAll()
    _tm4hiLite = setTimeout(fhilitesubtitles, 10)
  } else if (event.data == YT.PlayerState.ENDED) {
    go2l01openNewWindow()
  }
}


//////




// id="go2title"の要素を定数_sGo2titleに代入
_sGo2title = document.getElementById('go2title');
// 選択中のインデックス番号を変数_currIndCntに代入
_currIndCnt = _sGo2title.selectedIndex;
_lenTitles = _sGo2title.options.length
const params = new URLSearchParams(window.location.search);
let lineCnt = params.get('lineCnt');
if (lineCnt !== null) {
  // 数値に変換（10進数）
  _lineCnt0x = zeroPudded(lineCnt)
} else {
  _lineCnt0x = sessionStorage.getItem('lineCnt0x');
}

const cookies = document.cookie.split(';')

let tempX = ''
// 配列をループして、目的のCookieを探す
for (let i = 0; i < cookies.length; i++) {
  let cookie = cookies[i].trim() // 前後の空白を削除
  // Cookieのキーが指定された名前と一致するかチェック
  if (cookie.startsWith(_targetDir + '=')) {

    if (_lineCnt0x == null || _lineCnt0x == "") {
      tempX = cookie.substring(_targetDir.length + 1)

      if (tempX.length > 1) {
        _lineCnt0x = tempX
      } else {
        _lineCnt0x = '01'
      }
      sessionStorage.setItem('lineCnt0x', _lineCnt0x);
    }

  } else if (cookie.startsWith('repHanni=')) {
    let tempX2 = cookie.substring('repHanni'.length + 1)
    if (tempX2.length > 0) {
      for (const optX of _repHanniSelf.options) {
        if (tempX2 == optX.value) {
          optX.selected = true
          _cnt4exeRepHanni = optX.textContent
          break
        }
      }
    }
  } else if (cookie.startsWith('timeSec=')) {
    let tempX3 = cookie.substring('timeSec'.length + 1)
    if (tempX3.length > 1) {
      _cnt4repEachLine = 0
    }
  }
}


dispTitle()

document.addEventListener('DOMContentLoaded', () => {
  initX()
  // ここでボタンにイベントを登録したり、要素を取得したりします
});

const _player = document.getElementById('player')
const movName = _fileName.replace("index", "11eng") + ".mp4"
const _path = window.location.pathname

if (!_ytb && window._yt2local != undefined) {
  // 属性とプロパティを一括設定
  Object.assign(_player, {
    src: _audVidFolder + movName,
    type: "video/mp4",
    controls: true,
    autoplay: true,
    loop: false,
    playsInline: true // JavaScriptではキャメルケース
  });
  _player.play()
} else {
  const locHost = window.location.host
  if (false && _path.includes('/Library/WebServer/Documents/')) {
//  if (_ytb && _path.includes('/Library/WebServer/Documents/')) {
    const path2 = _path.replace(
      '/Library/WebServer/Documents/',
      '/localhost/'
    )
    const exec = 'http:/' + path2
    window.open(exec, '_self')
  } else if (locHost.includes('127.0.0.1')) {
    //for windows vs code live server, lionking
    const locX = locHost.replace(
      '127.0.0.1',
      'localhost')
    if (locHost.includes('127.0.0.1')) {
      alert('l.2215: ' + locHost + ': ' + locX)
    }
    const exec2 = 'http://' + locX + _path
    window.open(exec2, '_self')
  }
  if (_ytb) {
    let tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    let firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }
}

// 1. 要素の作成
const audio = document.createElement('audio');

// 2. 属性の一括設定
Object.assign(audio, {
  id: "audiX",
  src: "../../12mp4/61zero.m4a",
  controls: true,
  autoplay: true // 'autostart' は古い属性のため、標準の 'autoplay' を使用
});

// 3. ページ内の特定の場所（例：body）に追加
document.body.appendChild(audio);

///////


const _audiX = document.getElementById('audiX')
const _vcontStyle = document.getElementsByClassName('video-container')[0].style
_player.addEventListener('canplay', () => {
  _tm4hiLite = setTimeout(fhilitesubtitles, 10)
});

_player.addEventListener('ended', () => {
  go2l01openNewWindow()
});

// 準備完了状態を管理するオブジェクト
const readyStatus = {
  video: false,
  audio: false
};
if (_ytb == false) {

  // 動画の準備完了（readyState 3以上相当）イベント
  _player.addEventListener('canplaythrough', () => {
    if (!readyStatus.video) {
      readyStatus.video = true;
      checkLocalAudMovBothReady();
    }
  }, { once: true }); // 1回だけ実行

  // 音声の準備完了イベント
  _audiX.addEventListener('canplaythrough', () => {
    if (!readyStatus.audio) {
      readyStatus.audio = true;
      checkLocalAudMovBothReady();
    }
  }, { once: true });

  if (_player.readyState >= 3) readyStatus.video = true;
  if (_audiX.readyState >= 3) readyStatus.audio = true;
  checkLocalAudMovBothReady();
}

const _selectX = document.getElementById("selectX");
let additionalLanguages = []
if (_targetDir.includes("12wwmlBegin")) {
  additionalLanguages = [
    { value: "16por2.html", text: "ポ" },
    { value: "17dut.html", text: "🇳🇱" },
    { value: "17dan.html", text: "🇩🇰" },
    { value: "19swe.html", text: "🇸🇪" },
    { value: "19nor.html", text: "🇳🇴" },
    { value: "19ice.html", text: "🇮🇸" },
    { value: "14rus.html", text: "🇷🇺" },
    { value: "14ukr.html", text: "󠁥🇺🇦" },
    { value: "11cze.html", text: "󠁥🇨🇿" },
    { value: "12slk.html", text: "󠁥🇸🇰" },
    { value: "13pol.html", text: "󠁥🇵🇱" },
    { value: "12ind.html", text: "󠁥🇮🇩" },
    { value: "15tag.html", text: "󠁥🇵🇭" },
    { value: "17tha.html", text: "🇹🇭" },
    { value: "18vie.html", text: "🇻🇳" },
    { value: "16hin.html", text: "󠁥🇮🇳" },
    { value: "12lit.html", text: "󠁥🇱🇹" },
    { value: "11fin.html", text: "󠁥🇫🇮" },
    { value: "12hun.html", text: "󠁥🇭🇺" },
    { value: "16tur.html", text: "󠁥🇹🇷" },
    { value: "12ara.html", text: "󠁥🇪🇬" },
    { value: "12heb.html", text: "󠁥🇮🇱" },
    { value: "15can.html", text: "󠁥🇭🇰" },
    { value: "15gre.html", text: "󠁥🇬🇷" },
    { value: "18cat.html", text: "🏴󠁥󠁳󠁣󠁴󠁿" },
    { value: "http://sato.fm.senshu-u.ac.jp/zkiku/202508/15TED/31help.html", text: "？" }
  ];
} else if (_targetDir.includes("11istLight")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" },
    { value: "17tha.html", text: "🇹🇭" },
    { value: "18vie.html", text: "🇻🇳" }
  ];
} else if (_targetDir.includes("14wnWorld")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" },
    { value: "18tha.html", text: "🇹🇭" },
    { value: "18vie.html", text: "🇻🇳" }
  ];
} else if (_targetDir.includes("15someday")) {
  additionalLanguages = [
    { value: "16por2.html", text: "ポ" }
  ];
} else if (_targetDir.includes("16cirOfLife")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" }
  ];
} else if (_targetDir.includes("17moana")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" },
    { value: "18tha.html", text: "🇹🇭" },
    { value: "18vie.html", text: "🇻🇳" },
    { value: "11eng2.html", text: "英2" }
  ];
} else if (_targetDir.includes("18bab")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" }
  ];
} else if (_targetDir.includes("19poyWorld")) {
  additionalLanguages = [
    { value: "16por2.html", text: "ポ" }
  ];
} else if (_targetDir.includes("20poyWorldLg")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" }
  ];

} else if (_targetDir.includes("21cyftlTonight")) {
  additionalLanguages = [
    { value: "14rus.html", text: "🇷🇺" },
    { value: "16por2.html", text: "ポ" },
    { value: "18tha.html", text: "🇹🇭" }

  ];

} else if (_targetDir.includes("23hp3")) {
  additionalLanguages = [
    { value: "13cat.html", text: "🏴󠁥󠁳󠁣󠁴󠁿" },
    { value: "14rus.html", text: "🇷🇺" },
    { value: "11cze.html", text: "󠁥🇨🇿" },
    { value: "12slk.html", text: "󠁥🇸🇰" },
    { value: "13pol.html", text: "󠁥🇵🇱" },
    { value: "16tur.html", text: "トル" }

  ];
} else if (_targetDir.includes("61BEng")) {
  _selectX.innerHTML = '';
  additionalLanguages = [
    { value: "11lionKing.html", text: "11lionKing" },
    { value: "12ichiro.html", text: "12ichiro" },
    { value: "13grit.html", text: "13grit" },
    { value: "14stockmkt.html", text: "14stockmkt" },
    { value: "21jobs.html", text: "21jobs" },
    { value: "22jobs.html", text: "22jobs" }
  ];
} else if (true) {
  _selectX.innerHTML = '';
  additionalLanguages = [
    { value: "11eng.html", text: "11eng" },
    { value: "21r.html", text: "21r" },
    { value: "22r.html", text: "22r" },
    { value: "23r.html", text: "23r" },
    { value: "24r.html", text: "24r" },
    { value: "25r.html", text: "25r" },
    { value: "26r.html", text: "26r" },
    { value: "27r.html", text: "27r" },
    { value: "28r.html", text: "28r" },
    { value: "32r.html", text: "32r" },
    { value: "33r.html", text: "33r" },
    { value: "34r.html", text: "󠁥34r" },
    { value: "35r.html", text: "󠁥35r" },
    { value: "36r.html", text: "󠁥36r" },
    { value: "41kor.html", text: "󠁥韓1" },    
    { value: "42kor.html", text: "󠁥韓2" },    
    { value: "43kor.html", text: "󠁥韓3" },    
    { value: "44kor.html", text: "󠁥韓4" },    
    { value: "45kor.html", text: "󠁥韓5" },    
    { value: "46kor.html", text: "󠁥韓6" },    
    { value: "47kor.html", text: "󠁥韓7" },    
    { value: "48kor.html", text: "󠁥韓8" }   
  ];
}

if (additionalLanguages != []) {
  additionalLanguages.forEach(lang => {
    const opt = document.createElement("option");
    opt.value = lang.value;
    opt.textContent = lang.text;
    _selectX.appendChild(opt);
  });
}

let langX = ''
for (const optX of _selectX.options) {
  if (_fileName.includes(optX.value.replace(".html", ""))) {
    optX.selected = true
    langX = optX.value
    break
  }
}

document.body.setAttribute('tabindex', '-1');

//if (!_lang4dic.includes('jap')) {
writeWdList()
//}

