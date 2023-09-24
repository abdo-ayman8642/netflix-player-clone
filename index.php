<?php

if (isset($_GET['video_url'])) {
  $video_url = 'https://moviesta-data.com/index.php?video=Movies/Kingdom.of.Heaven.2005%5BMovieSta%5D.mp4&token=1695556513'; //base64_decode($_GET['video_url']);
  $continue  = @$_GET['continue'];
  $intro = @$_GET['intro'];
  $end = @$_GET['end'];
  $next_url  = @$_GET['next_url'];
  $poster = @$_GET['poster'];
  $show_title = @$_GET['show_title'];
  $episode_title = @$_GET['episode_title'];
  $post_id = @$_GET['post_id'];
} else {
  exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title> <?= $show_title ?></title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet">
</head>

<body>



  <div id="popup" class="popup box">
    <div class="popup-content modal">
      <span id="closePopup" class="close"></span>
      <h2 class="modal__title">Continue Watching?</h2>
      <p class="box__info">Do you want to watch from last point</p>
      <button class="action-button" id="continue-yes">Yes</button>
      <button class="action-button" id="continue-no">No</button>
    </div>

  </div>
  <div id="overlay" class="overlay"></div>
  <div class="video-container">
    <!-- <video src="bbb.mp4"></video> -->



    <div class="icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
        <path d="M7 11.5L12 6l1.41 1.41L9.83 11H20v2H9.83l3.58 3.59L12 18l-5-5.5z" />
      </svg>
    </div>

    <video id="myVideo" poster="<?= $poster ?>" autoplay src="<?= $video_url; ?>"></video>

    <input type="hidden" value="<?= $intro ?>" style="display: none;" id="intro-time" />
    <input type="hidden" value="<?= $end ?>" style="display: none;" id="end-time" />
    <input type="hidden" value="<?= $continue ?>" style="display: none;" id="current-time" />
    <input type="hidden" value="<?= $next_url ?>" style="display: none;" id="next-episdon" />
    <div class="controls-container">
      <div class="help_buttons_container">
        <button id="skipIntroButton">Skip Intro</button>
        <button id="goNextButton">Go Next</button>
      </div>

      <div class="progress-controls">

        <div class="progress-bar">
          <div class="watched-bar"></div>
          <div class="playhead"></div>
          <div id="hover-time"></div>
        </div>
        <div class="time-remaining">00:00</div>
      </div>
      <div class="controls">
        <button class="play-pause">
          <svg class="playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg class="paused" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        <button class="rewind">
          <svg viewBox="0 0 24 24">
            <path fill="#ffffff" d="M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14Z" />
          </svg>
        </button>
        <button class="fast-forward">
          <svg viewBox="0 0 24 24">
            <path fill="#ffffff" d="M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14M11.5,3C14.15,3 16.55,4 18.4,5.6L21,3V10H14L16.62,7.38C15.23,6.22 13.46,5.5 11.5,5.5C7.96,5.5 4.95,7.81 3.9,11L1.53,10.22C2.92,6.03 6.85,3 11.5,3Z" />
          </svg>
        </button>
        <button class="volume">
          <svg class="full-volume" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <svg class="muted" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        </button>
        <input type="range" id="volume-bar" min="0" max="1" step="0.1" />
        <p class="time">

          <span id="time-text">00:00:00/00:00:00</span>
        </p>
        <p class="title">
          <span class="series"><?= $show_title ?></span>
          <span class="episode"><?= $episode_title ?></span>
        </p>

        <button class="next">
          <svg viewBox="0 0 24 24">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
        <button class="episodes">
          <svg viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </button>

        <button class="full-screen">
          <svg class="maximize" viewBox="0 0 24 24">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
          <svg class="minimize" viewBox="0 0 24 24">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <script src="app.js"></script>
  <script>
    /*
        setInterval(function() {
          console.log(video.currentTime);


          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://moviesta-plus.com/currentVideo', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // Handle the response if needed
              // console.log(xhr.responseText);
            }
          };

          var postData = 'current=' + encodeURIComponent(video.currentTime) + '&video=' + encodeURIComponent(<?php echo $post_id; ?>);
          xhr.send(postData);

        }, 5000);
        */
  </script>
</body>

</html>