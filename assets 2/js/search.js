const apiKey = "283b2ef6c5msha650b13812608b0p174f2fjsn2d49a13a9160";

document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.querySelector(".nextBtn");

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      location.reload();
    });
  }
});

document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  hideStaticCards();
  searchDeezer(query);
});

document.getElementById("search-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const query = event.target.value;
    hideStaticCards();
    searchDeezer(query);
  }
});

function hideStaticCards() {
  document.querySelectorAll(".static-card").forEach(card => {
    card.style.display = "none";
  });

  const browseAll = document.getElementById("browse-all");
  if (browseAll) {
    browseAll.style.display = "none";
  }
}

function searchDeezer(query) {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => console.error("Error:", error));
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");

  /* resultsDiv.style.display = "flex";
  resultsDiv.style.flexWrap = "wrap"; */
  resultsDiv.innerHTML = "";

  const tracks = data.data;

  if (tracks.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  const artistInfo = document.createElement("div");
  const songsInfo = document.createElement("div");

  artistInfo.id = "artist-info";
  songsInfo.id = "songs-info";

  artistInfo.classList.add("artist-info", "me-md-5");
  songsInfo.classList.add("songs-info");

  artistInfo.style.flex = "1";
  songsInfo.style.flex = "2";
  songsInfo.style.display = "flex";
  songsInfo.style.flexDirection = "column";
  songsInfo.style.flexWrap = "nowrap";
  songsInfo.style.marginLeft = "0%";

  const artist = tracks[0].artist;

  artistInfo.innerHTML = `
  <a href = "./artist.html?id=${artist.id}" class="col-12">
    <h2 style="color: white; text-align: center; margin-left: 1%;">Artist</h2>
    <div class="artist-card card border border-0 text-center" style="background-color: transparent;">
      <img src="${artist.picture_xl}" class="card-img-top rounded-circle" alt="${artist.name}">
      <div class="card-body">
        <div class="artist-header">
          <h5 class="card-title" style="color: white;">${artist.name}</h5>
        </div>
      </div>
    </div>
    </a>
  `;

  const songsTitle = document.createElement("h2");
  songsTitle.style.color = "white";
  songsTitle.style.textAlign = "center";
  songsTitle.style.marginLeft = "0";
  songsTitle.textContent = "Songs";
  songsInfo.appendChild(songsTitle);

  tracks.forEach(track => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-card", "card", "mb-3");
    songDiv.style.maxWidth = "540px";
    songDiv.style.marginLeft = "0";
    songDiv.style.backgroundColor = "transparent";
    songDiv.innerHTML = `
      <div class="row g-0 border border-0 d-flex align-items-center">
        <div class="col-md-4 position-relative">
          <img src="${track.album.cover_medium}" class="img-fluid rounded-start" alt="${track.title}" onclick=window.location.assign("./album.html?id=${track.album.id}")>
          <span class="play-button">&#9658;</span>
        </div>
        <a href="./album.html?id=${track.album.id}" class="col-md-8">
        <div class="border border-0">
          <div class="card-body ml-5 border border-0">
            <h5 class="card-title" style="color: white;">${track.title}</h5>
            <small class="card-text" style="color: white;">${track.album.title}</small>
          </div>
        </div>
        </a>
      </div>
    `;
    songsInfo.appendChild(songDiv);
  });

  resultsDiv.appendChild(artistInfo);
  resultsDiv.appendChild(songsInfo);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.querySelectorAll(".static-card").forEach(card => {
  card.style.backgroundColor = getRandomColor();
});

const activities = document.getElementById("activities");
const hideActivitiesBtn = document.getElementById("hideActivitiesBtn");
const showActivitiesBtn = document.getElementById("showActivitiesBtn");

hideActivitiesBtn.addEventListener("click", () => {
  activities.classList.remove("d-lg-block");
});

showActivitiesBtn.addEventListener("click", () => {
  activities.classList.toggle("d-lg-block");
});
