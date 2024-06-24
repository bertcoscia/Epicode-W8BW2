document.addEventListener("DOMContentLoaded", function () {
  const cl = function (cl) {
    console.log(cl);
  };

  const imgAlbum = document.getElementById("imgAlbum");
  const albumName = document.getElementById("titoloAlbum");
  const imgArtist = document.getElementById("imgArtist");
  const artistName = document.getElementById("nomeArtistaAlbum");
  const albumYear = document.getElementById("albumYear");
  const numberSongsAlbum = document.getElementById("numberSongs");
  const albumLength = document.getElementById("albumLength");
  const elencoBraniAlbum = document.querySelector(".elencoBraniAlbum");
  const imgFooter = document.querySelector(".player-cover");
  const playerTitle = document.querySelector(".player-title");
  const playerArtist = document.querySelector(".player-artist");
  const imgAlbumMobile = document.getElementById("imgAlbumMobile");
  const mobilePlayerTitle = document.getElementById("mobilePlayerTitle");
  const currentTimeLabel = document.getElementById("current-time");
  const totalTimeLabel = document.getElementById("total-time");
  const progressBar = document.getElementById("songBar");

  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById("play-pause");
  const mobilePlayPauseButton = document.getElementById("mobile-play-pause");
  let currentTrack = null;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const serverURL = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;

  fetch(serverURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (album) {
      albumName.innerText = album.title;
      artistName.innerText = album.artist.name;

      imgAlbum.src = album.cover_big;
      imgArtist.src = album.artist.picture_xl;
      artistName.innerText = album.artist.name;
      numberSongsAlbum.innerText = `${album.nb_tracks} brani`;
      albumYear.innerText = album.release_date.substring(0, 4);
      albumLength.innerText = `${Math.floor(album.duration / 60)} min ${album.duration % 60} sec.`;
      imgAlbumMobile.src = album.cover_big;

      cl(album);

      const tracklist = album.tracks.data;
      tracklist.forEach((canzone, index) => {
        const songContainer = document.createElement("div");
        songContainer.className = "container pt-3 ps-3";

        const songContainerRow = document.createElement("div");
        songContainerRow.className = "row d-flex align-items-center";

        const albumNumberSong = document.createElement("div");
        albumNumberSong.className = "col-1 text-center textColor";
        albumNumberSong.innerText = index + 1;

        const songDetails = document.createElement("div");
        songDetails.className = "col-11 col-md-6";
        const songName = document.createElement("p");
        songName.className = "mb-0";
        songName.innerText = canzone.title;
        const artistName = document.createElement("small");
        artistName.className = "textColor";
        artistName.innerText = canzone.artist.name;
        songDetails.append(songName, artistName);

        const riproduzioni = document.createElement("div");
        riproduzioni.className = "d-none d-md-block col-md-3 text-end textColor";
        riproduzioni.innerText = canzone.rank.toLocaleString();

        const durata = document.createElement("div");
        durata.className = "d-none d-md-block col-md-2 text-center ps-3 textColor";
        durata.innerText = `${Math.floor(canzone.duration / 60)}:${(canzone.duration % 60).toString().padStart(2, "0")}`;

        songContainerRow.append(albumNumberSong, songDetails, riproduzioni, durata);
        cl(canzone);
        songContainer.appendChild(songContainerRow);
        elencoBraniAlbum.appendChild(songContainer);

        songContainerRow.addEventListener("click", function () {
          playTrack(canzone);
        });
      });
    });

  function playTrack(track) {
    if (currentTrack === track) {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerHTML = getPauseIcon("black");
        mobilePlayPauseButton.innerHTML = getPauseIcon("white");
      } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = getPlayIcon("black");
        mobilePlayPauseButton.innerHTML = getPlayIcon("white");
      }
    } else {
      currentTrack = track;
      audioPlayer.src = track.preview;
      audioPlayer.play();
      playPauseButton.innerHTML = getPauseIcon("black");
      mobilePlayPauseButton.innerHTML = getPauseIcon("white");
      updatePlayerUI(track);
    }
  }

  function updatePlayerUI(track) {
    imgFooter.src = track.album.cover_big;
    imgAlbumMobile.src = track.album.cover_big;
    playerTitle.textContent = track.title;
    mobilePlayerTitle.textContent = track.title;
    playerArtist.textContent = track.artist.name;
    document.querySelector("footer").style.display = "flex";
    totalTimeLabel.textContent = "0:30"; // Durata della preview
  }

  playPauseButton.parentElement.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseButton.innerHTML = getPauseIcon("black");
      mobilePlayPauseButton.innerHTML = getPauseIcon("white");
    } else {
      audioPlayer.pause();
      playPauseButton.innerHTML = getPlayIcon("black");
      mobilePlayPauseButton.innerHTML = getPlayIcon("white");
    }
  });

  mobilePlayPauseButton.parentElement.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseButton.innerHTML = getPauseIcon("black");
      mobilePlayPauseButton.innerHTML = getPauseIcon("white");
    } else {
      audioPlayer.pause();
      playPauseButton.innerHTML = getPlayIcon("black");
      mobilePlayPauseButton.innerHTML = getPlayIcon("white");
    }
  });

  audioPlayer.addEventListener("timeupdate", function () {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 30; // Durata in secondi della preview
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeLabel.textContent = formatTime(currentTime);
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  function getPlayIcon(color) {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-play-fill" viewBox="2 2 12 12">` +
      '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>' +
      "</svg>"
    );
  }

  function getPauseIcon(color) {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-pause-fill" viewBox="2 2 12 12">` +
      '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>' +
      "</svg>"
    );
  }

  const activities = document.getElementById("activities");
  const hideActivitiesBtn = document.getElementById("hideActivitiesBtn");
  const showActivitiesBtn = document.getElementById("showActivitiesBtn");

  hideActivitiesBtn.addEventListener("click", () => {
    activities.classList.remove("d-lg-block");
  });

  showActivitiesBtn.addEventListener("click", () => {
    activities.classList.toggle("d-lg-block");
  });
});
