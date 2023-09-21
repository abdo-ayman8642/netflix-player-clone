// Constants -----------------------------------------------------------------------------------------------------------------
const CURRENT_TIME = 467;
const INTRO_TIME = [100, 280];
const INTO_NEXT_SHOW = 1000;

const videoContainer = document.querySelector(".video-container");
const video = document.querySelector(".video-container video");
video.volume = 0.5;
const volumeBar = document.getElementById("volume-bar");

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

const progressBar = document.querySelector(
  ".video-container .progress-controls .progress-bar"
);
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

const toggleMute = () => {
  video.muted = !video.muted;
  if (video.muted) {
    fullVolumeButton.style.display = "none";
    mutedButton.style.display = "";
  } else {
    fullVolumeButton.style.display = "";
    mutedButton.style.display = "none";
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
  showIntoNextButton.style.display = "block";
};

//Event Listeners ----------------------------------------------------------------------------------------------------------

// check if video is inturubtted
window.addEventListener("DOMContentLoaded", () => {
  CURRENT_TIME && showPopup();
});

closePopupButton.addEventListener("click", function () {
  closePopup();
});
noButton.addEventListener("click", () => {
  closePopup();
  video.play();
});
yesButton.addEventListener("click", () => {
  closePopup();
  video.currentTime = CURRENT_TIME - 30;
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
    rangeVolume.stepUp(1);
    video.volume += video.volume != 1 ? 0.1 : 0;
  }
  if (event.code === "ArrowDown") {
    rangeVolume.stepDown(1);
    video.volume -= video.volume != 0 ? 0.1 : 0;
  }

  displayControls();
});

document.addEventListener("mousemove", () => {
  displayControls();
});

video.addEventListener("timeupdate", () => {
  watchedBar.style.width = (video.currentTime / video.duration) * 100 + "%";

  const totalSecondsRemaining = video.duration - video.currentTime;

  const time = new Date(null);
  time.setSeconds(totalSecondsRemaining);
  let hours = null;

  //choose when we display skip intro button
  if (INTRO_TIME[0] && INTRO_TIME[1]) {
    if (
      video.currentTime >= INTRO_TIME[0] &&
      video.currentTime <= INTRO_TIME[1]
    )
      showSkipIntro();
    else closeSkipIntro();
  }

  //choose when we display into next button
  if (INTO_NEXT_SHOW) {
    if (video.currentTime >= INTO_NEXT_SHOW) showIntoNext();
  }

  if (totalSecondsRemaining >= 3600) {
    hours = time.getHours().toString().padStart("2", "0");
  }

  let minutes = time.getMinutes().toString().padStart("2", "0");
  let seconds = time.getSeconds().toString().padStart("2", "0");

  timeLeft.textContent = `${hours ? hours : "00"}:${minutes}:${seconds}`;
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
  video.currentTime = INTRO_TIME[1] - 2;
  closeSkipIntro();
});
