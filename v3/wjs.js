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
        <p>💙🦐</p>
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

function setupWindowControls() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    @keyframes taskbarBounce {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    /* Make windows draggable by their title bar */
    .window.draggable {
      cursor: grab;
    }
      .window.draggable:active {
      cursor: grabbing;
  `;
  document.head.appendChild(styleElement);

  window.setupWindowControl = function (
    containerSelector,
    taskbarIconSelector,
    activeIconSrc,
    inactiveIconSrc,
    options = {}
  ) {
    const containerElement = document.querySelector(containerSelector);
    if (!containerElement) return;

    const windowElement = containerElement.querySelector(".window");
    const taskbarIcon = document.querySelector(taskbarIconSelector);

    if (!windowElement || !taskbarIcon) return;

    const defaultOptions = {
      startVisible: true,
      draggable: false,
      steamLaunch: false,
      steamUrl: "steam://open/main",
      spotifyLaunch: false,
      spotifyUrl: "https://open.spotify.com",
      redirectDelay: 2000,
    };

    const settings = { ...defaultOptions, ...options };

    const activeIcon = activeIconSrc || taskbarIcon.src;
    const inactiveIcon = inactiveIconSrc || taskbarIcon.src;

    function updateTaskbarIcon(isWindowOpen) {
      let existingGlow = taskbarIcon.parentNode.querySelector(".taskbar-glow");

      if (isWindowOpen) {
        taskbarIcon.src = activeIcon;

        if (!existingGlow) {
          const glowElement = document.createElement("div");
          glowElement.className = "taskbar-glow";

          taskbarIcon.insertAdjacentElement("afterend", glowElement);
          glowElement.style.bottom = "0px";
          glowElement.style.left = taskbarIcon.offsetLeft + "px";
          glowElement.style.width = taskbarIcon.offsetWidth + "px";
        } else if (existingGlow.classList.contains("taskbar-glow-remove")) {
          existingGlow.classList.remove("taskbar-glow-remove");
        }
      } else {
        taskbarIcon.src = inactiveIcon;

        if (existingGlow) {
          existingGlow.classList.add("taskbar-glow-remove");

          setTimeout(() => {
            if (existingGlow.parentNode) {
              existingGlow.remove();
            }
          }, 300);
        }
      }
    }

    function addClickAnimation() {
      taskbarIcon.style.animation = "taskbarBounce 0.3s";

      setTimeout(() => {
        taskbarIcon.style.animation = "";
      }, 300);
    }

    function launchExternalApp(url) {
      windowElement.style.display = "block";
      windowElement.style.zIndex = "999";
      windowElement.classList.add("window-appear");
      updateTaskbarIcon(true);

      setTimeout(() => {
        window.location.href = url;
      }, settings.redirectDelay);
    }

    function launchSteam() {
      launchExternalApp(settings.steamUrl);
    }

    function launchSpotify() {
      launchExternalApp(settings.spotifyUrl);
    }

    function toggleWindow() {
      addClickAnimation();

      if (settings.steamLaunch) {
        launchSteam();
        return;
      }

      if (settings.spotifyLaunch) {
        launchSpotify();
        return;
      }

      const allWindows = document.querySelectorAll(".window");
      allWindows.forEach((win) => {
        win.style.zIndex = "1";
      });

      if (windowElement.style.display === "none") {
        windowElement.style.display = "block";
        windowElement.style.zIndex = "999";
        windowElement.classList.add("window-appear");
        setTimeout(() => {
          windowElement.classList.remove("window-appear");
        }, 500);

        updateTaskbarIcon(true);
      } else {
        windowElement.style.zIndex = "999";
      }
    }

    function closeWindow() {
      windowElement.classList.add("window-disappear");
      setTimeout(() => {
        windowElement.style.display = "none";
        windowElement.classList.remove("window-disappear");

        updateTaskbarIcon(false);
      }, 300);
    }

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
      closeButton.addEventListener("click", closeWindow);
    }

    if (minimizeButton) {
      minimizeButton.addEventListener("click", closeWindow);
    }

    let isMaximized = false;
    if (maximizeButton) {
      maximizeButton.addEventListener("click", function () {
        if (!isMaximized) {
          windowElement.dataset.oldWidth = windowElement.style.width || "470px";
          windowElement.dataset.oldHeight =
            windowElement.style.height || "auto";
          windowElement.dataset.oldLeft = windowElement.style.left || "100px";
          windowElement.dataset.oldTop = windowElement.style.top || "100px";

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

    if (taskbarIcon) {
      taskbarIcon.addEventListener("click", toggleWindow);
      taskbarIcon.style.cursor = "pointer";
    }

    windowElement.addEventListener("click", function () {
      const allWindows = document.querySelectorAll(".window");
      allWindows.forEach((win) => {
        win.style.zIndex = "1";
      });
      this.style.zIndex = "999";
    });

    if (settings.draggable) {
      windowElement.classList.add("draggable");

      const titleBar =
        windowElement.querySelector(".window-title-bar") ||
        windowElement.firstElementChild;

      if (titleBar) {
        let isDragging = false;
        let offsetX, offsetY;

        titleBar.addEventListener("mousedown", function (e) {
          isDragging = true;
          offsetX = e.clientX - windowElement.getBoundingClientRect().left;
          offsetY = e.clientY - windowElement.getBoundingClientRect().top;

          const allWindows = document.querySelectorAll(".window");
          allWindows.forEach((win) => {
            win.style.zIndex = "1";
          });
          windowElement.style.zIndex = "999";
        });

        document.addEventListener("mousemove", function (e) {
          if (isDragging) {
            windowElement.style.left = e.clientX - offsetX + "px";
            windowElement.style.top = e.clientY - offsetY + "px";
          }
        });

        document.addEventListener("mouseup", function () {
          isDragging = false;
        });
      }
    }

    const shouldBeVisible = settings.startVisible;
    windowElement.style.display = shouldBeVisible ? "block" : "none";
    windowElement.style.zIndex = shouldBeVisible ? "999" : "1";

    updateTaskbarIcon(shouldBeVisible);

    return {
      open: function () {
        windowElement.style.display = "block";
        windowElement.style.zIndex = "999";
        updateTaskbarIcon(true);
      },
      close: closeWindow,
      toggle: toggleWindow,
      launchSteam: launchSteam,
      launchSpotify: launchSpotify,
    };
  };
}

document.addEventListener("DOMContentLoaded", function () {
  setupWindowControls();

  window.visitorCountControl = setupWindowControl(
    ".sayacdivi",
    "img.taskbar-window[src='img/taskbar/pgcTB.png']",
    "img/taskbar/pgcTB.png",
    "img/taskbar/pgc.png",
    {
      startVisible: true,
      draggable: false,
    }
  );

  window.visitorCountControl = setupWindowControl(
    ".hideodiv",
    "img.taskbar-window[src='img/taskbar/hideoTB.png']",
    "img/taskbar/hideoTB.png",
    "img/taskbar/hideo.png",
    {
      startVisible: true,
      draggable: true,
    }
  );

  window.steamWindowControl = setupWindowControl(
    ".steamacilio",
    "img.taskbar-window[src='img/taskbar/steamTB.png']",
    "img/taskbar/steamTB.png",
    "img/taskbar/steam.png",
    {
      startVisible: false,
      steamLaunch: true,
      steamUrl: "steam://openurl/https://steamcommunity.com/id/ceoofsinop",
      redirectDelay: 2000,
    }
  );

  window.spotifyWindowControl = setupWindowControl(
    ".spotifyacilio",
    "img.taskbar-window[src='img/taskbar/spotifyTB.png']",
    "img/taskbar/spotifyTB.png",
    "img/taskbar/spotify.png",
    {
      startVisible: false,
      spotifyLaunch: true,
      spotifyUrl: "spotify:user:xr3b4ocme24xp1b5cocgarfjw",
      redirectDelay: 2000,
    }
  );
});

const quotes = [
  `“Why are we still here? Just to suffer? Every night, I can feel my leg… and my arm… even my fingers. The body I’ve lost… the comrades I’ve lost… won’t stop hurting… It’s like they’re all still there. You feel it, too, don’t you?” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“I won't scatter your sorrow to the heartless sea. I will always be with you.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“Stories allow you to experience places you could never go - the past, the future, or distant worlds. You can become a different ethnicity or gender. Even when you're reading all by yourself, you're sharing those stories as they unfold before you with countless people whom you've never met. We are alone, but we are connected.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“Rather than the hopeless loneliness I felt inside crowds of the living, I chose to converse with the dead, whom I could never reach. Rather than the living people who would not understand me, I chose the dead who shared the same understanding as me.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“We live in the era of the search engine. Gone is the era of finding things on your own. If you want to find something, you can use your computer or phone to easily google it. You can find popular restaurants, movies, novels, and fashion anywhere in the world with no challenge. Ours is now a life of passive acquisition. But the joy of finding is gone, as is the catharsis of going to great trouble in searching for something and finding it.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“I believe that creating things is only possible through connections with other people, and works, and history, and all kinds of other things. Then, that newly created work will give someone else a push and move the world forward. I want to keep on doing that as long as I live.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“Separated by distance and time, their letters are sometimes romantic, sometimes regretful, sometimes confessional, and sometimes scolding. Through their discrepancies and similarities, the past and present of the broken couple intertwine with the passing seasons like brocaded embroidery on woven fabric.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“If you spend your time chasing butterflies, they'll fly away. If you spend your time making a beautiful garden, the butterflies will come to you. And if they don't come, you still have your beautiful garden.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“wish I had a dad like that,” I thought. “No, I want to become a dad like that!” I had lost my own father by then, and my family unit had shrunk to three.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“I don’t want to surrender myself in the perpendicular space between fool and genius; I want to put myself on the same plane as them both.” <br><br><b><i> ― Hideo Kojima </i></b>`,
  `“God knows I'm not perfect, either. I've made tons of stupid mistakes, and later I regretted them. And I've done it over and over again, thousands of times; a cycle of hollow joy and vicious self-hatred. But even so, every time I learned something about myself” <br><br><b><i> ― Misato Katsuragi  </i></b>`,
  `“I musn't run away.” <br><br><b><i> ― Shinji Ikari, (Neon Genesis Evangelion Episode 3) </i></b>`,
  `“Are you afraid of other people? I know that by keeping others at a distance you avoid a betrayal of your trust, but you must endure the loneliness. Man can never completely erase this sadness, because all men are fundamentally alone. Pain is something man must carry in his heart, and since the heart feels pain so easily, some believe that life is pain.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“What's wrong with running away from reality if it sucks?!” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“Those who hate themselves, cannot love or trust others.” <br><br><b><i> ― Rei Ayanami (Neon Genesis Evangelion Episode 26)  </i></b>`,
  `“One cannot turn back the clock but one can move it forward.<br><br><b><i> ― Gendo Ikari (Neon Genesis Evangelion, Ep. 22, 23:55) </i></b>`,
  `“Who is this? This is me. Who am I? What am I? What am I? What am I? What am I?” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“It is my destiny to live forever, though my survival will bring final destruction to the human race. However, it is possible for me to be killed, and whether I live or die makes no great difference. In truth, death may be the only absolute freedom there is.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“I'm often told that those who don't like themselves set high expectations for themselves, but ı think people who say that don't really understand how painful it is.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“At school, your tests only have one right answer and you might get zero or half points if you put the wrong answer. But in what we call ''the real world'', things aren't so black and white, so you should think about things for yourself and express them in words or pictures. This is how you comminicate with people, with other people.” <br><br><b><i> ― Hideaki Anno </i></b>`,
  `“As long as the Sun, the Moon, and the Earth exist, everything will be all right.” <br><br><b><i> ― Yui Ikari (End of Evangelion) </i></b>`,
  `“Part of growing up means finding a way to interact with others while distancing pain.”<br><br><b><i> ― Misato Katsuragi (Neon Genesis Evangelion Episode 3)  </i></b>`,
  `“Only an idiot fights when he knows he can’t win.”<br><br><b><i> ― Kensuke Aida (Neon Genesis Evangelion Episode 4)  </i></b>`,
  `“There are as many truths as there are people.”<br><br><b><i> ― Ryoji Kaji (Neon Genesis Evangelion Episode 26)  </i></b>`,
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById("quote-container").innerHTML = `<p>${randomQuote}</p>`;
