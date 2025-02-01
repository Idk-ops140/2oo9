// videoPlayer.js
const videoPlayer = document.getElementById('videoPlayer');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const timeDisplay = document.getElementById('timeDisplay');

// Toggle fullscreen mode
fullscreenBtn.addEventListener('click', () => {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  } else if (videoPlayer.mozRequestFullScreen) { // Firefox
    videoPlayer.mozRequestFullScreen();
  } else if (videoPlayer.webkitRequestFullscreen) { // Chrome, Safari
    videoPlayer.webkitRequestFullscreen();
  } else if (videoPlayer.msRequestFullscreen) { // IE/Edge
    videoPlayer.msRequestFullscreen();
  }
});

// Update time display
setInterval(() => {
  const minutes = Math.floor(videoPlayer.currentTime / 60);
  const seconds = Math.floor(videoPlayer.currentTime % 60);
  timeDisplay.textContent = `Current Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}, 1000);

// Load captions file
function loadCaptions() {
  const file = document.getElementById('captionFile').files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const captions = event.target.result;
    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.label = 'English';
    track.src = URL.createObjectURL(new Blob([captions], { type: 'text/vtt' }));
    videoPlayer.appendChild(track);
  };

  reader.readAsText(file);
}
