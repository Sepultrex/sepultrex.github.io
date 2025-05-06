function slideImages() {
    document.getElementById("mainImage").classList.add("slide-left");
    setTimeout(function() {
        document.getElementById("newImage").classList.add("slide-in");
    }, 100);
}

function kararka() {
    var overlay = document.createElement('div');
    overlay.id = 'overlay';

    document.body.appendChild(overlay);

    overlay.style.display = 'block';

    overlay.onclick = function() {
        overlay.style.display = 'none';
    };
}