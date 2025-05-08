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

const layers = [
  document.getElementById('layer1'),
  document.getElementById('layer2'),
  document.getElementById('layer3')
];

let currentIndex = 1; // ortadaki
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
    slideImages();
    kararka();
    secimmenu();
  }

  if (key === 'escape') {
    const overlay = document.getElementById("karaaa");
    if (overlay) overlay.style.display = "none";
    document.getElementById("imagecontainer").classList.remove("activemenu");
    if (overlay) overlay.style.display = "none";
    document.getElementById("newImage").classList.remove("slide-in");
    if (overlay) overlay.style.display = "none";
    document.getElementById("mainImage").classList.remove("slide-left");

   }
});
