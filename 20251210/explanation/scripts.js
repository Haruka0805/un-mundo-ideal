
    const lyrics = [
      { id: 'line1', time: 32 },
      { id: 'line2', time: 35 },
      { id: 'line3', time: 39 },
      { id: 'line4', time: 44 }
    ];

    let player;
    let checkInterval;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '120',
        width: '200',
        videoId: 'l1aWufb4AxY',
        playerVars: {
          autoplay: 1,
          controls: 1,
          start: 30
        },
        events: {
          onStateChange: onPlayerStateChange
        }
      });
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.PLAYING) {
        syncLyrics();
      } else {
        clearInterval(checkInterval);
      }
    }

    function syncLyrics() {
      clearInterval(checkInterval);
      checkInterval = setInterval(() => {
        const currentTime = Math.floor(player.getCurrentTime());

        let currentLine = null;
        for (let i = 0; i < lyrics.length; i++) {
          if (
            currentTime >= lyrics[i].time &&
            (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
          ) {
            currentLine = lyrics[i].id;
            break;
          }
        }

        document.querySelectorAll('.lyric-text').forEach((text) => {
          text.classList.remove('highlight');
        });

    checkRep(currentTime);


        if (currentLine) {
          const el = document.getElementById(currentLine);
          const lyricSpan = el.querySelector('.lyric-text');
          if (lyricSpan) {
            lyricSpan.classList.add('highlight');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 300);
    }

    function seekTo(time) {
      if (player) {
        player.seekTo(time, true);
        player.playVideo();
      }
    }

 function checkRep(currentTime){
     if (currentTime > 50){
         seekTo(31);
     }
 }

function togglePlayback() {
    if (player.getPlayerState() != 1){
        player.playVideo();
    } else {
        player.pauseVideo();
        clearTimeout(_tm4hiLite);
    }
}
  function go2html(self){
      window.open(self.value, "_self");
}



let buttonX = `
<select id="selectX" class="main-button" onChange=go2html(this)>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/00/13haruka/52umekomi.html">🇲🇽</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/index.html")>🇺🇸</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/16russian.html">🇷🇺</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/14ita.html">🇮🇹</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/17thai.html">🇹🇭</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/18viet.html">🇻🇳</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/19ara.html">🕌</option>
<option value="http://sato.fm.senshu-u.ac.jp/zkiku/2025/31wholeNW/21kor.html">🇰🇷</option>
<option value="explanation.html">🎵</option>
</select>
<button onclick="togglePlayback()" id="playPauseButton" class="main-button">&nbsp;⏯&nbsp;</button>
`;
bottomBtn.innerHTML = buttonX.replace(/\n/g, "");

