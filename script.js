const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const seekSlider = document.getElementById('seekSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const playbackRateSelector = document.getElementById('playbackRate');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Stop functionality
stopBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    playPauseBtn.textContent = 'Play';
});

// Rewind 10 seconds
rewindBtn.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
});

// Forward 10 seconds
forwardBtn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

// Mute/Unmute functionality
muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
});

// Volume control
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

// Update seek slider
video.addEventListener('timeupdate', () => {
    const value = (100 / video.duration) * video.currentTime;
    seekSlider.value = value;
    updateCurrentTimeDisplay();
});

// Seek functionality
seekSlider.addEventListener('input', () => {
    const time = video.duration * (seekSlider.value / 100);
    video.currentTime = time;
});

// Update current time display
function updateCurrentTimeDisplay() {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update total time display
video.addEventListener('loadedmetadata', () => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration % 60);
    totalTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

// Playback speed control
playbackRateSelector.addEventListener('change', () => {
    video.playbackRate = playbackRateSelector.value;
});

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});