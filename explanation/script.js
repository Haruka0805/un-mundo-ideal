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