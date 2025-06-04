let activeImageIndex = 1;
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const activeImageText = document.getElementById('activeImage');

const sites = {
    1: {
        space: "https://sep.is-a.dev",
        enter: "https://sep.is-a.dev"
    },
    2: {
        space: "https://sep.is-a.dev",
        enter: "https://sep.is-a.dev"
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') {
        toggleImage();
    }
    
    if (event.code === 'Space') {
        event.preventDefault();
        window.open(sites[activeImageIndex].space, '_blank');
    }
    
    if (event.key === 'Enter') {
        event.preventDefault();
        window.open(sites[activeImageIndex].enter, '_blank');
    }
});

function toggleImage() {
    if (activeImageIndex === 1) {
        image1.style.opacity = 0;
        image2.style.opacity = 1;
        activeImageIndex = 2;
        activeImageText.textContent = "Aktif Resim: Resim 2";
    } else {
        image1.style.opacity = 1;
        image2.style.opacity = 0;
        activeImageIndex = 1;
        activeImageText.textContent = "Aktif Resim: Resim 1";
    }
}