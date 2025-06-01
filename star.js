function createStar() {
  const star = document.createElement("div");
  star.className = "star";

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const startRadius = Math.random() * 80 + 30;
  const angle = Math.random() * Math.PI * 2;
  const startX = centerX + Math.cos(angle) * startRadius;
  const startY = centerY + Math.sin(angle) * startRadius;

  star.style.left = startX + "px";
  star.style.top = startY + "px";

  const distance = Math.random() * 1000 + 600;
  const endX = centerX + Math.cos(angle) * distance;
  const endY = centerY + Math.sin(angle) * distance;

  const rotationAngle = (angle * 180) / Math.PI + 90;
  star.style.transform = `rotate(${rotationAngle}deg)`;

  document.getElementById("backgroundContainer").appendChild(star);

  setTimeout(() => {
    star.classList.add("moving");
    star.style.transform = `translate(${endX - startX}px, ${
      endY - startY
    }px) rotate(${rotationAngle}deg)`;
    star.style.transition = "transform 2.5s ease-out";
  }, 10);

  setTimeout(() => {
    if (star.parentNode) {
      star.parentNode.removeChild(star);
    }
  }, 3000);
}

setInterval(createStar, 80);

for (let i = 0; i < 25; i++) {
  setTimeout(() => createStar(), i * 40);
}

document.querySelectorAll(".lightsaber-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "translateY(-2px)";
    }, 100);

    console.log("*Lightsaber ignition sound*");
  });
});

const deathStar = document.querySelector('.death-star');

function moveDeathStarRandomly() {
  const deathStarWidth = deathStar.offsetWidth;
  const deathStarHeight = deathStar.offsetHeight;

  const maxX = window.innerWidth - deathStarWidth;
  const maxY = window.innerHeight - deathStarHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  deathStar.style.left = `${x}px`;
  deathStar.style.top = `${y}px`;
}

moveDeathStarRandomly();
setInterval(moveDeathStarRandomly, 2000);
