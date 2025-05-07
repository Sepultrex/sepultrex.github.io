function slideImages() {
    document.getElementById("mainImage").classList.add("slide-left");
    setTimeout(function() {
        document.getElementById("newImage").classList.add("slide-in");
    }, 100);
}

function kararka() {
    var overlay = document.createElement('div');
    overlay.id = 'karaaa';

    document.body.appendChild(overlay);

    overlay.style.display = 'block';

    overlay.onclick = function() {
        overlay.style.display = 'none';
    };
}

const layers = [
  document.getElementById('layer1'),
  document.getElementById('layer2'),
  document.getElementById('layer3')
];

let currentIndex = 1; // ortadaki
layers[currentIndex].classList.add('active');

document.addEventListener('keydown', (e) => {
  if (e.key === 'w' || e.key === 'W') {
    if (currentIndex > 0) {
      layers[currentIndex].classList.remove('active');
      currentIndex--;
      layers[currentIndex].classList.add('active');
    }
  } else if (e.key === 's' || e.key === 'S') {
    if (currentIndex < layers.length - 1) {
      layers[currentIndex].classList.remove('active');
      currentIndex++;
      layers[currentIndex].classList.add('active');
    }
  }
});

function secimmenu() {
  document.getElementById("imagecontainer").classList.add("activemenu");
}