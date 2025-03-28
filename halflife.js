const introOverlay = document.getElementById('intro-overlay');
const introVideo = document.getElementById('intro-video');

introVideo.muted = true;
introVideo.play().catch(error => {
    console.log('Autoplay was prevented:', error);
});

function hideIntroOverlay() {
    introOverlay.classList.add('hidden');
    
    function onTransitionEnd() {
        introOverlay.style.display = 'none';
        introOverlay.removeEventListener('transitionend', onTransitionEnd);
    }
    
    introOverlay.addEventListener('transitionend', onTransitionEnd);
    
    setTimeout(() => {
        introOverlay.style.display = 'none';
        introOverlay.classList.remove('hidden');
    }, 600);
}

setTimeout(() => {
    hideIntroOverlay();
    newGame.showModal();
}, 2000);


document.getElementById("cars").addEventListener("change", function () {
  var sayacDiv = document.getElementById("sayacDiv");
  var discordDiv = document.getElementById("discordDiv");
  var steamDiv = document.getElementById("steamDiv");
  var spotifyDiv = document.getElementById("spotifyDiv");
  var lastfmDiv = document.getElementById("lastfmDiv");
  var creditsDiv = document.getElementById("creditsDiv");

  sayacDiv.style.display = "none";
  discordDiv.style.display = "none";
  steamDiv.style.display = "none";
  lastfmDiv.style.display = "none";
  spotifyDiv.style.display = "none";
  creditsDiv.style.display = "none";

  if (this.value === "sayac") {
    sayacDiv.style.display = "block";
  } else if (this.value === "discord") {
    discordDiv.style.display = "block";
  } else if (this.value === "steam") {
    steamDiv.style.display = "block";
  } else if (this.value === "spotify") {
    spotifyDiv.style.display = "block";
  } else if (this.value === "lastfm") {
    lastfmDiv.style.display = "block";
  } else if (this.value === "credits") {
    creditsDiv.style.display = "block";
  }
});
// l