    function hideLoadingText() {
      document.getElementById('loading-text').style.display = 'none';
    }

const introOverlay = document.getElementById("intro-overlay");
const introVideo = document.getElementById("intro-video");

introVideo.muted = true;
introVideo.play().catch((error) => {
  console.log("Autoplay was prevented:", error);
});

function hideIntroOverlay() {
  introOverlay.classList.add("hidden");

  function onTransitionEnd() {
    introOverlay.style.display = "none";
    introOverlay.removeEventListener("transitionend", onTransitionEnd);
  }

  introOverlay.addEventListener("transitionend", onTransitionEnd);

  setTimeout(() => {
    introOverlay.style.display = "none";
    introOverlay.classList.remove("hidden");
  }, 600);
}

setTimeout(() => {
  hideIntroOverlay();
  newGame.showModal();
}, 5500);

function setupWindowControl(buttonFunction, containerSelector, windowClass) {
  window[buttonFunction] = function () {
    const containerElement = document.querySelector(containerSelector);
    const windowElement = containerElement.querySelector(".window");

    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach((win) => {
      win.style.zIndex = "1";
    });

    if (windowElement.style.display === "none") {
      positionWindowRandomly(windowElement);
      windowElement.style.display = "block";
      windowElement.style.zIndex = "999";
      windowElement.classList.add("window-appear");
      setTimeout(() => {
        windowElement.classList.remove("window-appear");
      }, 500);
    } else {
      windowElement.classList.add("window-disappear");
      setTimeout(() => {
        windowElement.style.display = "none";
        windowElement.classList.remove("window-disappear");
      }, 300);
    }
  };

  function positionWindowRandomly(windowElement) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const windowWidth = windowElement.offsetWidth || 400;
    const windowHeight = windowElement.offsetHeight || 300;

    const maxWidth = viewportWidth * 0.7;
    const maxHeight = viewportHeight * 0.7;

    const maxX = Math.max(0, viewportWidth - windowWidth);
    const maxY = Math.max(0, viewportHeight - windowHeight);

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    windowElement.style.left = randomX + "px";
    windowElement.style.top = randomY + "px";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const containerElement = document.querySelector(containerSelector);
    const windowElement = containerElement.querySelector(".window");
    const titleBar = containerElement.querySelector(".title-bar");

    windowElement.style.display = "none";

    let isDragging = false;
    let offsetX, offsetY;

    const closeButton = containerElement.querySelector(
      "button[aria-label='Close']"
    );
    const minimizeButton = containerElement.querySelector(
      "button[aria-label='Minimize']"
    );
    const maximizeButton = containerElement.querySelector(
      "button[aria-label='Maximize']"
    );

    if (closeButton) {
      closeButton.addEventListener("click", function () {
        windowElement.classList.add("window-disappear");
        setTimeout(() => {
          windowElement.style.display = "none";
          windowElement.classList.remove("window-disappear");
        }, 300);
      });
    }

    if (minimizeButton) {
      minimizeButton.addEventListener("click", function () {
        windowElement.classList.add("window-disappear");
        setTimeout(() => {
          windowElement.style.display = "none";
          windowElement.classList.remove("window-disappear");
        }, 300);
      });
    }

    let isMaximized = false;
    if (maximizeButton) {
      maximizeButton.addEventListener("click", function () {
        if (!isMaximized) {
          windowElement.dataset.oldWidth = windowElement.style.width || "400px";
          windowElement.dataset.oldHeight =
            windowElement.style.height || "auto";
          windowElement.dataset.oldLeft = windowElement.style.left || "150px";
          windowElement.dataset.oldTop = windowElement.style.top || "45px";

          windowElement.style.width = "90%";
          windowElement.style.height = "80vh";
          windowElement.style.left = "5%";
          windowElement.style.top = "10vh";
        } else {
          windowElement.style.width = windowElement.dataset.oldWidth;
          windowElement.style.height = windowElement.dataset.oldHeight;
          windowElement.style.left = windowElement.dataset.oldLeft;
          windowElement.style.top = windowElement.dataset.oldTop;
        }
        isMaximized = !isMaximized;
      });
    }

    if (titleBar) {
      titleBar.addEventListener("mousedown", function (e) {
        isDragging = true;

        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;

        titleBar.style.cursor = "grabbing";

        const allWindows = document.querySelectorAll(".window");
        allWindows.forEach((win) => {
          win.style.zIndex = "1";
        });
        windowElement.style.zIndex = "999";
      });

      document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        const maxX = window.innerWidth - windowElement.offsetWidth;
        const maxY = window.innerHeight - windowElement.offsetHeight;

        windowElement.style.left = Math.max(0, Math.min(maxX, newLeft)) + "px";
        windowElement.style.top = Math.max(0, Math.min(maxY, newTop)) + "px";

        if (windowClass) {
          windowElement.classList.remove(windowClass);
        }
      });

      document.addEventListener("mouseup", function () {
        isDragging = false;
        titleBar.style.cursor = "grab";
      });
    }

    windowElement.style.position = "absolute";

    windowElement.addEventListener("click", function () {
      const allWindows = document.querySelectorAll(".window");
      allWindows.forEach((win) => {
        win.style.zIndex = "1";
      });
      windowElement.style.zIndex = "999";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(
    ".kimbu-container, .social-container, .services-container"
  );

  containers.forEach((container) => {
    const tabs = container.querySelectorAll('[role="tab"]');

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabpanelId = this.getAttribute("aria-controls");

        container.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
          panel.hidden = true;
        });

        document.getElementById(tabpanelId).hidden = false;

        tabs.forEach((t) => {
          t.setAttribute("aria-selected", "false");
        });

        this.setAttribute("aria-selected", "true");
      });
    });
  });

  const styleElement = document.createElement("style");
  styleElement.textContent = `
    .window-appear {
      animation: windowAppear 0.4s forwards;
    }
    
    .window-disappear {
      animation: windowDisappear 0.3s forwards;
    }
    
    @keyframes windowAppear {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes windowDisappear {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.9); }
    }
  `;
  document.head.appendChild(styleElement);
});

setupWindowControl("myFunction", ".kimbu-container", "kimbu");
setupWindowControl("myFunction2", ".social-container", "social");
setupWindowControl("myFunction3", ".services-container", "services");

function updateTimeAndDate() {
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const dateString = `${day}/${month}/${year}`;

  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}
updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);

document
  .getElementById("serviceSelect")
  .addEventListener("change", function () {
    var discordDiv = document.getElementById("discordDiv");
    var steamDiv = document.getElementById("steamDiv");

    discordDiv.style.display = "none";
    steamDiv.style.display = "none";

    if (this.value === "discord") {
      discordDiv.style.display = "block";
    } else if (this.value === "steam") {
      steamDiv.style.display = "block";
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const sayacDiv = document.querySelector(".sayacdivi");

  sayacDiv.style.position = "absolute";
  sayacDiv.style.zIndex = "9";

  const titleBar = document.querySelector(".title-bar");

  titleBar.style.cursor = "grab";

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  titleBar.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    titleBar.style.cursor = "grabbing";

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach((win) => {
      win.style.zIndex = "1";
    });
    sayacDiv.style.zIndex = "999";
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    sayacDiv.style.top = sayacDiv.offsetTop - pos2 + "px";
    sayacDiv.style.left = sayacDiv.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    titleBar.style.cursor = "grab";
  }

  if (!sayacDiv.style.top) {
    sayacDiv.style.top = "100px";
  }
  if (!sayacDiv.style.left) {
    sayacDiv.style.left = "100px";
  }

  sayacDiv.addEventListener("click", function () {
    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach((win) => {
      win.style.zIndex = "1";
    });
    sayacDiv.style.zIndex = "999";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hiddenWindow = document.createElement("div");
  hiddenWindow.className = "secret-container";
  hiddenWindow.style.position = "fixed";
  hiddenWindow.style.top = "50%";
  hiddenWindow.style.left = "50%";
  hiddenWindow.style.transform = "translate(-50%, -50%)";
  hiddenWindow.style.zIndex = "9999";
  hiddenWindow.style.display = "none";

  hiddenWindow.innerHTML = `
    <div class="window active" style="max-width: 300px">
      <div class="title-bar">
        <div class="title-bar-text">(^///^)</div>
        <div class="title-bar-controls">
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body has-space">
        <p>💙🦐💙🦐💙🦐💙🦐</p>
      </div>
    </div>
  `;

  document.body.appendChild(hiddenWindow);

  const closeButton = hiddenWindow.querySelector("button[aria-label='Close']");

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      hiddenWindow.querySelector(".window").classList.add("window-disappear");
      setTimeout(() => {
        hiddenWindow.style.display = "none";
        hiddenWindow
          .querySelector(".window")
          .classList.remove("window-disappear");
      }, 300);
    });
  }

  const secretCode = ["s", "h", "r", "i", "m", "p"];
  let userInput = [];
  let lastKeyTime = Date.now();
  const maxTimeGap = 300;

  document.addEventListener("keydown", function (e) {
    const currentTime = Date.now();
    const key = e.key.toLowerCase();

    if (currentTime - lastKeyTime > maxTimeGap) {
      userInput = [];
    }

    lastKeyTime = currentTime;

    userInput.push(key);

    if (userInput.length > secretCode.length) {
      userInput = userInput.slice(userInput.length - secretCode.length);
    }

    if (userInput.join("") === secretCode.join("")) {
      hiddenWindow.style.display = "block";
      hiddenWindow.querySelector(".window").classList.add("window-appear");
      setTimeout(() => {
        hiddenWindow.querySelector(".window").classList.remove("window-appear");
      }, 500);

      const allWindows = document.querySelectorAll(".window");
      allWindows.forEach((win) => {
        win.style.zIndex = "1";
      });
      hiddenWindow.querySelector(".window").style.zIndex = "999";

      userInput = [];
    }
  });

  hiddenWindow.querySelector(".window").addEventListener("click", function () {
    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach((win) => {
      win.style.zIndex = "1";
    });
    this.style.zIndex = "999";
  });
});

function openSpotifyApp() {
  const spotifyUri = "spotify:user:xr3b4ocme24xp1b5cocgarfjw";

  window.location.href = spotifyUri;
}

function opensteamapp() {
  window.open("steam://openurl/https://steamcommunity.com/id/ceoofsinop");
}
