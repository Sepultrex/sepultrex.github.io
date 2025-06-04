function slideImages() {
  document.getElementById("mainImage").classList.add("slide-left");
  setTimeout(function() {
      document.getElementById("newImage").classList.add("slide-in");
  }, 100);
}

function kararka() {
  let overlay = document.getElementById('karaaa');
  if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'karaaa';
      document.body.appendChild(overlay);
  }
  overlay.style.display = 'block';
  overlay.onclick = () => overlay.style.display = 'none';
}

function secimmenu() {
  document.getElementById("imagecontainer").classList.add("activemenu");
}

function showGifAndRedirect(targetUrl) {
  let gifOverlay = document.getElementById('gifOverlay');
  if (!gifOverlay) {
      gifOverlay = document.createElement('div');
      gifOverlay.id = 'gifOverlay';
      
      const gifElement = document.createElement('img');
      gifElement.src = 'img/0508.gif';
      gifElement.alt = 'Loading';
      gifElement.id = 'loadingGif';
      
      gifOverlay.appendChild(gifElement);
      document.body.appendChild(gifOverlay);
  }
  
  gifOverlay.style.display = 'flex';
  
  setTimeout(() => {
      window.location.href = targetUrl;
  }, 3000);
}

function cho1() {
  if (isLayerActive()) {
      showGifAndRedirect('aboutme');
  }
}

function cho2() {
  if (isLayerActive()) {
      showGifAndRedirect('social');
  }
}

function cho3() {
  if (isLayerActive()) {
      showGifAndRedirect('idc');
  }
}

function isLayerActive() {
  return document.getElementById("imagecontainer").classList.contains("activemenu");
}

const layers = [
document.getElementById('layer1'),
document.getElementById('layer2'),
document.getElementById('layer3')
];

let currentIndex = 1;
layers[currentIndex].classList.add('active');

document.addEventListener('keydown', (e) => {
const key = e.key.toLowerCase();

if (key === 'w') {
  if (currentIndex > 0) {
    layers[currentIndex].classList.remove('active');
    currentIndex--;
    layers[currentIndex].classList.add('active');
  }
} else if (key === 's') {
  if (currentIndex < layers.length - 1) {
    layers[currentIndex].classList.remove('active');
    currentIndex++;
    layers[currentIndex].classList.add('active');
  }
}

if (key === 'enter' || key === ' ') {
  if (isLayerActive()) {
      if (currentIndex === 0) {
          showGifAndRedirect('aboutme');
      } else if (currentIndex === 1) {
          showGifAndRedirect('social');
      } else if (currentIndex === 2) {
          showGifAndRedirect('idc');
      }
  } else {
      slideImages();
      kararka();
      secimmenu();
  }
}

if (key === 'escape') {
  const overlay = document.getElementById("karaaa");
  if (overlay) overlay.style.display = "none";
  document.getElementById("imagecontainer").classList.remove("activemenu");
  if (overlay) overlay.style.display = "none";
  document.getElementById("newImage").classList.remove("slide-in");
  if (overlay) overlay.style.display = "none";
  document.getElementById("mainImage").classList.remove("slide-left");
  
  const gifOverlay = document.getElementById("gifOverlay");
  if (gifOverlay) gifOverlay.style.display = "none";
 }
});