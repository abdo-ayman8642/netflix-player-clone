// Constants -----------------------------------------------------------------------------------------------------------------

//time is in seconds
const CURRENT_TIME = document.querySelector("#current-time").value; //1521.854574; //00:010:00;
const INTRO_TIME = document.querySelector("#intro-time").value; //278.33638; // 00:03:00; // array where first element is beggining of intro and second element is end of intro ex: [100, 280]
const INTO_NEXT_SHOW = document.querySelector("#end-time").value; //3084.684934;
const NEXT_EPISDON_LINK = document.querySelector("#next-episdon").value;

const videoContainer = document.querySelector(".video-container");
const video = document.querySelector(".video-container video");
video.volume = 0.5;
const volumeBar = document.getElementById("volume-bar");
volumeBar.value = 0.5;
const timeText = document.getElementById("time-text");
const controlsContainer = document.querySelector(
  ".video-container .controls-container"
);

const playPauseButton = document.querySelector(
  ".video-container .controls button.play-pause"
);
const rewindButton = document.querySelector(
  ".video-container .controls button.rewind"
);
const fastForwardButton = document.querySelector(
  ".video-container .controls button.fast-forward"
);
const volumeButton = document.querySelector(
  ".video-container .controls button.volume"
);
const fullScreenButton = document.querySelector(
  ".video-container .controls button.full-screen"
);
const backButton = document.querySelector(".icon-container");
const playButton = playPauseButton.querySelector(".playing");
const pauseButton = playPauseButton.querySelector(".paused");
const fullVolumeButton = volumeButton.querySelector(".full-volume");
const mutedButton = volumeButton.querySelector(".muted");
const maximizeButton = fullScreenButton.querySelector(".maximize");
const minimizeButton = fullScreenButton.querySelector(".minimize");
const rangeVolume = document.querySelector("#volume-bar");
const skipIntroButton = document.querySelector("#skipIntroButton");
const goNextButton = document.querySelector("#goNextButton");

const progressControl = document.querySelector(
  ".video-container .progress-controls "
);

const progressBar = document.querySelector(
  ".video-container .progress-controls .progress-bar"
);
const hoverTime = document.getElementById("hover-time");
const watchedBar = document.querySelector(
  ".video-container .progress-controls .progress-bar .watched-bar"
);
const timeLeft = document.querySelector(
  ".video-container .progress-controls .time-remaining"
);

let controlsTimeout;
controlsContainer.style.opacity = "0";
watchedBar.style.width = "0px";
pauseButton.style.display = "none";
minimizeButton.style.display = "none";

const showPopupButton = document.getElementById("showPopup");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("closePopup");
const overlay = document.getElementById("overlay");
const noButton = document.getElementById("continue-no");
const yesButton = document.getElementById("continue-yes");

// Functions--------------------------------------------------------------------------------------------------------------------

const showPopup = () => {
  video.pause();
  playButton.style.display = "";
  pauseButton.style.display = "none";
  popup.style.display = "block";
  overlay.style.display = "block";
};

const closePopup = () => {
  popup.style.display = "none";
  overlay.style.display = "none";
};

const displayControls = () => {
  controlsContainer.style.opacity = "1";
  backButton.style.opacity = "1";
  document.body.style.cursor = "initial";
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = "0";
    backButton.style.opacity = "0";
    document.body.style.cursor = "none";
  }, 5000);
};

const playPause = () => {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "";
  } else {
    video.pause();
    playButton.style.display = "";
    pauseButton.style.display = "none";
  }
};

const volumeOn = () => {
  fullVolumeButton.style.display = "";
  mutedButton.style.display = "none";
};

const volumeOff = () => {
  fullVolumeButton.style.display = "none";
  mutedButton.style.display = "";
};

const toggleMute = () => {
  video.muted = !video.muted;
  if (video.muted) {
    volumeOff();
  } else {
    volumeOn();
  }
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const closeSkipIntro = () => {
  skipIntroButton.style.display = "none";
};

const showSkipIntro = () => {
  skipIntroButton.style.display = "block";
};

const showIntoNext = () => {
  goNextButton.style.display = "block";
};
const closeIntoNext = () => {
  goNextButton.style.display = "none";
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function padZero(num) {
  return (num < 10 ? "0" : "") + num;
}

//Event Listeners ----------------------------------------------------------------------------------------------------------

// check if video is inturubtted
window.addEventListener("DOMContentLoaded", () => {
  CURRENT_TIME && showPopup();
  if (CURRENT_TIME == 0) {
    closePopup();

    playButton.style.display = "none";
    pauseButton.style.display = "";
    videoContainer.requestFullscreen();
  }
});

closePopupButton.addEventListener("click", function () {
  closePopup();
});
noButton.addEventListener("click", () => {
  closePopup();
  video.play();
  playButton.style.display = "none";
  pauseButton.style.display = "";
});
yesButton.addEventListener("click", () => {
  closePopup();
  video.currentTime = CURRENT_TIME - 30;
  playButton.style.display = "none";
  pauseButton.style.display = "";
});
overlay.addEventListener("click", function () {
  closePopup();
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    maximizeButton.style.display = "";
    minimizeButton.style.display = "none";
  } else {
    maximizeButton.style.display = "none";
    minimizeButton.style.display = "";
  }
});

// window.addEventListener("beforeunload", (e) => {

//   alert("Are you sure you want to close this window?");
//   // set the current time where video is inturubted
//   e.returnValue = "";
// });

backButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default action (scrolling)
    if (video.paused) {
      video.play();
      playButton.style.display = "none";
      pauseButton.style.display = "";
    } else {
      video.pause();
      playButton.style.display = "";
      pauseButton.style.display = "none";
    }
  }

  if (event.code === "KeyM") {
    toggleMute();
  }

  if (event.code === "KeyF") {
    toggleFullScreen();
  }

  if (event.code === "ArrowRight") {
    video.currentTime += 10;
  }
  if (event.code === "ArrowLeft") {
    video.currentTime -= 10;
  }
  if (event.code === "ArrowUp") {
    if (rangeVolume.value == 1) return;
    rangeVolume.stepUp(1);
    video.volume += 0.1;
    rangeVolume.value != 0 && volumeOn();
  }
  if (event.code === "ArrowDown") {
    if (rangeVolume.value == 0) return;
    rangeVolume.stepDown(1);
    video.volume -= 0.1;
    rangeVolume.value == 0 && volumeOff();
  }

  displayControls();
});

document.addEventListener("mousemove", () => {
  displayControls();
});

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  watchedBar.style.width = (currentTime / video.duration) * 100 + "%";

  const totalSecondsRemaining = video.duration - currentTime;
  const formatedRemainingtime = `${padZero(
    Math.floor(totalSecondsRemaining / 3600)
  )}:${padZero(Math.floor((totalSecondsRemaining % 3600) / 60))}:${padZero(
    Math.floor(totalSecondsRemaining % 60)
  )}`;

  const formatedDuration = `${padZero(
    Math.floor(video.duration / 3600)
  )}:${padZero(Math.floor((video.duration % 3600) / 60))}:${padZero(
    Math.floor(video.duration % 60)
  )}`;

  //choose when we display skip intro button
  //if we are in the intro show this button
  if (INTRO_TIME >= video.currentTime) showSkipIntro();
  else closeSkipIntro();

  //choose when we display into next button
  if (INTO_NEXT_SHOW) {
    if (video.currentTime >= INTO_NEXT_SHOW) showIntoNext();
    else closeIntoNext();
  }

  // Format the time as HH:MM:SS
  const formattedTime = `${padZero(Math.floor(currentTime / 3600))}:${padZero(
    Math.floor((currentTime % 3600) / 60)
  )}:${padZero(Math.floor(currentTime % 60))}`;

  timeLeft.textContent = `${formatedRemainingtime}`;
  timeText.textContent = `${formattedTime}/${formatedDuration}`;
});

progressBar.addEventListener("click", (event) => {
  const pos =
    (event.pageX -
      (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) /
    progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

playPauseButton.addEventListener("click", playPause);

rewindButton.addEventListener("click", () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener("click", () => {
  video.currentTime += 10;
});

volumeBar.addEventListener("input", function () {
  if (volumeBar.value > 0) volumeOn();
  else volumeOff();
  video.volume = volumeBar.value;
});

// Toggle play/pause on video click
video.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "";
  } else {
    video.pause();
    playButton.style.display = "";
    pauseButton.style.display = "none";
  }
});

volumeButton.addEventListener("click", toggleMute);

fullScreenButton.addEventListener("click", toggleFullScreen);

skipIntroButton.addEventListener("click", (e) => {
  e.preventDefault();
  video.currentTime = INTRO_TIME; // go to end of intro and continue watching
  playButton.style.display = "none";
  pauseButton.style.display = "";
  closeSkipIntro();
});

goNextButton.addEventListener("click", (e) => {
  e.preventDefault();
  // we do our logic here for navigating to the next video
  goNextButton.style.display = "none"; // hide the  button
  window.location.href = NEXT_EPISDON_LINK;
});

progressBar.addEventListener("mousemove", (e) => {
  const { offsetX, target } = e;
  const { offsetWidth } = target;
  const hoverTimeWidth = hoverTime.offsetWidth;
  const currentTime = (offsetX / offsetWidth) * video.duration;

  hoverTime.style.left = `${offsetX - hoverTimeWidth / 2}px`;
  hoverTime.style.display = "block";
  hoverTime.textContent = `${padZero(Math.floor(currentTime / 3600))}:${padZero(
    Math.floor((currentTime % 3600) / 60)
  )}:${padZero(Math.floor(currentTime % 60))}`; //formatTime(currentTime);
});

progressBar.addEventListener("mouseout", () => {
  hoverTime.style.display = "none";
});
