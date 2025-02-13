document.getElementById("cars").addEventListener("change", function() {
    var sayacDiv = document.getElementById("sayacDiv");
    var discordDiv = document.getElementById("discordDiv");
    var spotifyDiv = document.getElementById("spotifyDiv");
    var lastfmDiv = document.getElementById("lastfmDiv");
    var creditsDiv = document.getElementById("creditsDiv");

    sayacDiv.style.display = "none";
    discordDiv.style.display = "none";
    lastfmDiv.style.display = "none";
    spotifyDiv.style.display = "none";
    creditsDiv.style.display = "none";

    if (this.value === "sayac") {
      sayacDiv.style.display = "block";
    } else if (this.value === "discord") {
      discordDiv.style.display = "block";
    } else if (this.value === "spotify") {
      spotifyDiv.style.display = "block";
    }else if (this.value === "lastfm") {
      lastfmDiv.style.display = "block";
    }else if (this.value === "credits") {
      creditsDiv.style.display = "block";
    }
  });