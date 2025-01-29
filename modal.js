const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalRuntime = document.getElementById("modalRuntime");
const modalGenre = document.getElementById("modalGenre");
const modalOverviewBtn = document.getElementById("modalOverviewBtn");
const modalEpisodeBtn = document.getElementById("modalEpisodeBtn");
const modalTrailerBtn = document.getElementById("modalTrailerBtn");
const modalOverview = document.getElementById("modalOverview");
const modalPlay = document.querySelector(".modalPlay");
const modalWrapper = document.querySelector(".modalWrapper");
async function modalFunction(data) {
  document.body.style.overflow = "hidden";
  modalPoster.dataset.src = data.poster;
  modalPoster.classList.add("lazy-load");
  modalPoster.style.border = "none";
  modalTitle.innerText = data.title;
  modalYear.innerText = data.year;
  modalRuntime.innerText = data.run;
  modalGenre.innerText = data.genre;

  modalOverviewBtn.classList.add("activeButton");
  modalOverview.innerHTML = `
  <p class="modalOverviewText">${data.overview}</p>
  <div class="swiper-container" id="castContainer">
   <div class="swiper-wrapper" id="castWrapper"></div>
   </div>
  `;
  actorFunction(data);

  modalOverviewBtn.addEventListener("click", () => {
    modalOverviewBtn.classList.add("activeButton");
    modalTrailerBtn.classList.remove("activeButton");
    modalEpisodeBtn.classList.remove("activeButton");
    modalOverview.innerHTML = `
  <p  class="modalOverviewText">${data.overview}</p>
   <div class="swiper-container" id="castContainer">
   <div class="swiper-wrapper" id="castWrapper"></div>
   </div>
  `;
    actorFunction(data);
    swiperModal();
    tamad();
  });

  modalTrailerBtn.addEventListener("click", () => {
    modalOverviewBtn.classList.remove("activeButton");
    modalTrailerBtn.classList.add("activeButton");
    modalEpisodeBtn.classList.remove("activeButton");
    modalOverview.innerHTML = `
     <iframe class="modalTrailer" src="${data.trailer}"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>></iframe>
    `;
  });

  if (data.mediaType === "tv") {
    modalEpisodeBtn.style.display = "block";
    modalEpisodeBtn.addEventListener("click", () => {
      // Handle active button styling
      modalOverviewBtn.classList.remove("activeButton");
      modalTrailerBtn.classList.remove("activeButton");
      modalEpisodeBtn.classList.add("activeButton");

      // Clear modal overview content
      modalOverview.innerHTML = "";

      // Create season dropdown
      const seasonDropdown = document.createElement("select");
      seasonDropdown.className = "seasonDropdown";

      let defaultSeasonNumber = data.season[0].season_number; // Default to the first season

      // Populate season dropdown
      data.season.forEach((season) => {
        const option = document.createElement("option");
        option.value = season.season_number;
        option.textContent = season.name;

        // Check if "Season 1" exists and set it as default
        if (season.name === "Season 1") {
          option.selected = true;
          defaultSeasonNumber = season.season_number;
        }

        seasonDropdown.appendChild(option);
      });

      // Create episode container
      const episodeContainer = document.createElement("div");
      episodeContainer.className = "episodeContainer";

      // Function to fetch and display episodes
      const loadEpisodes = async (seasonNumber) => {
        episodeContainer.innerHTML = ""; // Clear episode container
        try {
          const episodeData = await fetchSeason(data.id, seasonNumber);
          episodeData.forEach((episode) => {
            const episodeSlide = document.createElement("div");
            episodeSlide.className = "episodeSlide";
            episodeSlide.innerHTML = `
            <div class="episodeImageContainer">
             <span class="modalPlay material-symbols-rounded"> play_arrow </span>
              <img class="lazy-load" data-src="${episode.episodeImage}" alt="${episode.episodeName}" />
            </div>
            <div class="episodeNameContainer">
              <h2>E${episode.episodeNumber}. ${episode.episodeName}</h2>
              <p>${episode.episodeOverview}</p>
            </div>
          `;
            episodeContainer.appendChild(episodeSlide);

            episodeSlide.addEventListener("click", () => {
              iframePlayer.classList.add("iframePlayerActive");
              sourcePlayer(data.id, "tv", seasonNumber, episode.episodeNumber);
            });
          });

          // Reinitialize lazy loading if needed
          tamad();
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      };

      // Load episodes for the default season
      loadEpisodes(defaultSeasonNumber);

      // Add event listener for dropdown change
      seasonDropdown.addEventListener("change", (event) => {
        loadEpisodes(event.target.value);
      });

      // Append elements to modal overview
      modalOverview.appendChild(seasonDropdown);
      modalOverview.appendChild(episodeContainer);
    });
  }

  swiperModal();
  tamad();
  closeModalFunction();
}

function closeModalFunction() {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    modalPoster.src = "";
    modalTitle.innerText = "Title";
    modalOverview.innerHTML = "";
    modalYear.innerText = "Year";
    modalRuntime.innerText = "Runtime";
    modalGenre.innerText = "Genre";
    modalOverviewBtn.classList.remove("activeButton");
    modalTrailerBtn.classList.remove("activeButton");
    modalEpisodeBtn.classList.remove("activeButton");
    modalEpisodeBtn.style.display = "none";
  });
}

function actorFunction(data) {
  const castWrapper = document.getElementById("castWrapper");
  data.actor.forEach((meow) => {
    const castimageContainer = document.createElement("div");
    castimageContainer.className = "castimageContainer";
    castimageContainer.classList.add("swiper-slide");
    const castimage = document.createElement("img");
    castimage.className = "castimage";
    castimage.classList.add("lazy-load");
    castimage.dataset.src = meow.actorImage;
    const castName = document.createElement("p");
    castName.className = "castName";
    castName.innerText = `${meow.actorName} as ${meow.actorChar}`;
    castimageContainer.appendChild(castimage);
    castimageContainer.appendChild(castName);

    castWrapper.appendChild(castimageContainer);
  });

  modalPlay.addEventListener("click", () => {
    iframePlayer.classList.add("iframePlayerActive");
    sourcePlayer(data.id, data.mediaType, "1", "1");
  });
}

function swiperModal() {
  console.log("swiper");
  new Swiper(".swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 10,
    // breakpoints: {
    //   320: {
    //     slidesPerView: 2.7,
    //     spaceBetween: 10,
    //   },
    //   428: {
    //     slidesPerView: 3,
    //     spaceBetween: 10,
    //   },
    //   768: {
    //     // For tablets
    //     slidesPerView: 5,
    //     spaceBetween: 12,
    //   },
    //   1024: {
    //     // For desktops
    //     slidesPerView: 5.5,
    //     spaceBetween: 15,
    //   },
    // },
  });
}
