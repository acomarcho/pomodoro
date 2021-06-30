const playButton = document.querySelector(".btn-start");
const pauseButton = document.querySelector(".btn-pause");
const stopButton = document.querySelector(".btn-stop");

const workForm = document.querySelector("#work");
const restForm = document.querySelector("#rest");

const timerInfo = document.querySelector(".timer-info");

const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const ring = new Audio("../audio/start-sound.wav");
const tick = new Audio("../audio/tick.wav");

const soundButton = document.querySelector(".btn-sound");

let duration = 0;

/*
  CONDITIONS:
  0 = paused
  1 = playing
  CURRENT MODE:
  0 = work
  1 = rest
*/

let paused = true;
let currentMode = 0;
let updateInterval;

let tickSound = true;

soundButton.addEventListener("click", function () {
  const icon = soundButton.querySelector("i");
  icon.classList.toggle("fa-volume-up");
  icon.classList.toggle("fa-volume-mute");
  tickSound = !tickSound;
});

playButton.addEventListener("click", function () {
  if (currentMode === 0 && paused) {
    if (duration === 0) {
      const val = Math.floor(parseInt(workForm.value));
      if (!isNaN(val) && val > 0) {
        // Start timer for work!
        duration = val * 60;
        setTimerText();
        updateInterval = setInterval(updateTimer, 1000);
        paused = false;
        timerInfo.textContent = "Focus on your work!";
        ring.play();
      }
    } else {
      updateInterval = setInterval(updateTimer, 1000);
      paused = false;
      timerInfo.textContent = "Focus on your work!";
    }
  } else if (currentMode === 1 && paused) {
    if (duration === 0) {
      const val = Math.floor(parseInt(restForm.value));
      if (!isNaN(val) && val > 0) {
        // Start timer for rest!
        duration = val * 60;
        setTimerText();
        updateInterval = setInterval(updateTimer, 1000);
        paused = false;
        timerInfo.textContent = "Have a nice break!";
        ring.play();
      }
    } else {
      updateInterval = setInterval(updateTimer, 1000);
      paused = false;
      timerInfo.textContent = "Have a nice break!";
    }
  }
});

pauseButton.addEventListener("click", function () {
  if (!paused) {
    paused = true;
    clearInterval(updateInterval);
    if (currentMode === 0) {
      timerInfo.textContent = "Work session paused.";
    } else {
      timerInfo.textContent = "Rest session paused.";
    }
  }
});

stopButton.addEventListener("click", function () {
  if (!paused) {
    paused = true;
    clearInterval(updateInterval);
  }
  if (currentMode === 0) {
    currentMode = 1;
    timerInfo.textContent =
      "Work session over! Start resting by clicking on the play button.";
  } else {
    currentMode = 0;
    timerInfo.textContent =
      "Rest session over! Start working by clicking on the play button.";
  }
  duration = 0;
  setTimerText();
  updateColor();
});

function formatNumber(num) {
  if (0 <= num && num <= 9) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

function setTimerText() {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  minutes.textContent = formatNumber(mins);
  seconds.textContent = formatNumber(secs);
}

function updateTimer() {
  duration--;
  setTimerText();

  if (tickSound) {
    tick.play();
  }

  if (duration === 0) {
    if (currentMode === 0) {
      currentMode = 1;
      timerInfo.textContent =
        "Work session over! Start resting by clicking on the play button.";
    } else {
      currentMode = 0;
      timerInfo.textContent =
        "Rest session over! Start working by clicking on the play button.";
    }
    ring.play();
    paused = true;
    clearInterval(updateInterval);
    updateColor();
  }
}

function updateColor() {
  const timerBoxes = document.querySelectorAll(".timer-box");
  const underlines = document.querySelectorAll(".underline");
  const btns = document.querySelectorAll(".btn");

  console.log("called");

  if (currentMode === 0) {
    timerBoxes.forEach(function (item) {
      item.classList.remove("rest-bg");
    });
    underlines.forEach(function (item) {
      item.classList.remove("rest-bg");
    });
    btns.forEach(function (item) {
      item.classList.remove("rest-bg");
    });
  } else {
    timerBoxes.forEach(function (item) {
      item.classList.add("rest-bg");
    });
    underlines.forEach(function (item) {
      item.classList.add("rest-bg");
    });
    btns.forEach(function (item) {
      item.classList.add("rest-bg");
    });
  }
}
