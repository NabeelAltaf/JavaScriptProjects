// Bring all of the elements in DOM hierarchy

const video = document.getElementById('video'); // Video Player
const play = document.getElementById('play'); // Play button
const stop = document.getElementById('stop'); // Stop button
const progress = document.getElementById('progress'); // Progress Bar
const timestamp = document.getElementById('timestamp'); // timestamp

// Functions

// 1 - Togglevideo - Play or pause video
    // if the video is playing, then pause
    // if the video is paused, then play
function toggleVideo () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// 2 - updateIcon - Toggle between play or pause icons
    // If video is playing, then show pause icon
    // If video is paused, then show play icon
function updateIcon(){
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>'
    }
}

// 3 - updateProgress - update the position of the progress bar and timestamp
function updateProgress() {
    // Update slider
    progress.value = video.currentTime/video.duration*100;

    // Update timestamp
    // Rounding down to minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    // Rounding down to the seconds 
    let seconds = Math.floor(video.currentTime % 60);

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    // Display timestamp
    timestamp.innerHTML = `${minutes}:${seconds}`;
}

// 4 - StopVideo - Stop video playback and reset time to zero
function stopVideo () {
    video.pause();
    video.currentTime = 0;
}

// 5 - setProgress - Update Video Playback Time based on change in progress bar
function setProgress () {
    video.currentTime = progress.value * video.duration / 100;
}

// Event Listeners
// 1 - Video Element - Click to play or pause video
video.addEventListener('click', toggleVideo);

// 2 - Video Element - Toggle to pause from play
video.addEventListener('pause', updateIcon);

// 3 - Video Element - Toggle to play from pause
video.addEventListener('play', updateIcon);

// 4 - Video Element - Update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

// 5 - Play Button - Click to play or pause video
play.addEventListener('click', toggleVideo);

// 6 - Stop Button - Click to reset video and pause
stop.addEventListener('click', stopVideo);

// 7 - Progress Bar - Change position to time of playback
progress.addEventListener('change', setProgress);