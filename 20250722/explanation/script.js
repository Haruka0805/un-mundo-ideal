function setupGlow(audioId, lineId) {
    const audio = document.getElementById(audioId);
    const line = document.getElementById(lineId).querySelector('span');

    audio.addEventListener('play', () => {
      line.classList.add('glow-text');
    });

    audio.addEventListener('ended', () => {
      line.classList.remove('glow-text');
    });
  }

  setupGlow('audio1', 'line1');
  setupGlow('audio2', 'line2');
  setupGlow('audio3', 'line3');
  setupGlow('audio4', 'line4');
  function enableLineClick(audioId, lineBoxClass) {
  const audio = document.getElementById(audioId);
  const boxes = document.getElementsByClassName(lineBoxClass);

  Array.from(boxes).forEach(box => {
    box.addEventListener('click', () => {
      if (!audio.paused) {
        audio.currentTime = 0;
      }
      audio.play();
    });
  });
}

// 各line-boxにイベント付与（line-boxはすべて同じクラスなので1対1で対応）
enableLineClick('audio1', 'line-box');
enableLineClick('audio2', 'line-box');
enableLineClick('audio3', 'line-box');
enableLineClick('audio4', 'line-box');