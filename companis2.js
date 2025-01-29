const companies = [
  {
    networkId: "142877",
    networkName: "Shudder",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Shudder_2017.svg",
    networkType: "movie",
  },
  {
    networkId: "213",
    networkName: "Netflix",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
    networkType: "tv",
  },
  {
    networkId: "174",
    networkName: "AMC",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amc_logo.svg",
    networkType: "tv",
  },
  {
    networkId: "521",
    networkName: "DreamWorks",
    logoLink:
      "https://seeklogo.com/images/D/dreamworks-animation-logo-E627C12B3A-seeklogo.com.png",
    networkType: "movie",
  },
  {
    networkId: "153734",
    networkName: "Tubi",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tubi_logo_2024_black.svg",
    networkType: "movie",
  },
  {
    networkId: "420",
    networkName: "Marvel Studios",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Marvel_Studios_2016_logo.svg",
    networkType: "movie",
  },
  {
    networkId: "6219",
    networkName: "MGM+",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/MGM%2B_logo.svg",
    networkType: "tv",
  },

  {
    networkId: "2552",
    networkName: "Apple TV+",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg",
    networkType: "tv",
  },
  {
    networkId: "3353",
    networkName: "Peacock",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/NBCUniversal_Peacock_Logo.svg",
    networkType: "tv",
  },
  {
    networkId: "149142",
    networkName: "Peacock",
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Vivamax_logo.png",
    networkType: "movie",
  },
];

async function companiesLoop() {
  const companiesContainer = document.getElementById("companiesContainer");

  for (const company of companies) {
    const networkSection = document.createElement("div");
    networkSection.className = "networkSection";

    const companyLogo = document.createElement("img");
    companyLogo.className = "logoCompanyImg";
    companyLogo.classList.add("lazy-load");
    companyLogo.dataset.src = company.logoLink;
    companyLogo.alt = company.networkName || company.networkName;

    // const companyTitle = document.createElement("h1");
    // companyTitle.className = "companyTitle";
    // companyTitle.innerText = company.networkName;

    networkSection.appendChild(companyLogo);
    companiesContainer.appendChild(networkSection);

    const arf = await fetchCompanies(company.networkId, company.networkType);

    const swiperContainer = document.createElement("div");
    swiperContainer.className = "swiperContainer";

    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    arf.results.forEach((meow) => {
      if (meow.vote_average != 0) {
        const swiperSlide = document.createElement("div");
        swiperSlide.className = "companySlide swiper-slide";

        swiperSlide.innerHTML = `
        <div class="movieCardContainer">
      <img class="backdropImg lazy-load" data-src="https://image.tmdb.org/t/p/w500/${
        meow.poster_path
      }"/>
        </div>
       <div class="movieCardTitle">
      <h4 class="cardTitle">${meow.name || meow.title}</h4>
      <p class="cardYear">${
        (meow.release_date || meow.first_air_date)?.split("-")[0]
      }</p>
    </div>

    <div class="movie-tooltip" id="movie-tooltip">
    <div class="tooltipContent">


    <div class="tooltipWrapper">
    <h3>${meow.name || meow.title} (${
          (meow.release_date || meow.first_air_date)?.split("-")[0]
        })</h3>
    <p class="tooltipOverview">${meow.overview}</p>

   
    <button class="movie-tooltip-button">
    <span class="material-symbols-rounded">
play_arrow
</span></button>
    
    </div>





    <div class="tooltipImageContainer">
    <img class="tooltipImage lazy-load" data-src="https://image.tmdb.org/t/p/w500/${
      meow.backdrop_path
    }"/>
    </div>
    <div  class="tooltipBlank"></div>
    
    </div>
     </div>
      `;
        const movieDetails = swiperSlide.querySelector(".movie-tooltip");

        const popperInstance = Popper.createPopper(swiperSlide, movieDetails, {
          placement: "top", // Position the tooltip above the card
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport", // Prevents dropdowns from exceeding boundaries
              },
            },
            {
              name: "eventListeners",
              options: {
                scroll: false, // Disable scroll event updates
                resize: true, // Allow resize updates
              },
            },
          ],
        });

        swiperSlide.addEventListener("mouseenter", () => {
          movieDetails.classList.add("visible");
          popperInstance.update(); // Update position of the tooltip
        });

        swiperSlide.addEventListener("mouseleave", () => {
          movieDetails.classList.remove("visible");
        });

        swiperWrapper.appendChild(swiperSlide);

        const tooltipButton = swiperSlide.querySelector(
          ".movie-tooltip-button"
        );
        tooltipButton.addEventListener("click", () => {
          iframePlayer.classList.add("iframePlayerActive");
          sourcePlayer(meow.id, company.networkType, "1", "1");
        });

        const backdropImg = swiperSlide.querySelector(".backdropImg");
        backdropImg.addEventListener("click", async () => {
          modal.classList.add("active");
          const meoww = await fetchShows(meow.id, company.networkType);
          modalFunction(meoww);
          adLink();
        });
      }
    });

    swiperContainer.appendChild(swiperWrapper);
    networkSection.appendChild(swiperContainer);

    new Swiper(swiperContainer, {
      slidesPerView: "auto",
      spaceBetween: 15,
      // grid: {
      //   rows: 2, // Number of rows
      //   fill: "row", // Direction to fill slides ('row' or 'column')
      // },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2.7,
          spaceBetween: 10,
        },
        428: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          // For tablets
          slidesPerView: 5,
          spaceBetween: 12,
        },
        1024: {
          // For desktops
          slidesPerView: 7,
          spaceBetween: 15,
        },
      },
    });
  }
  tamad();
}

async function fetchCompanies(networkId, networkType) {
  const endpoint = `https://api.themoviedb.org/3/discover/${networkType}?api_key=${apiKey}&${
    networkType === "movie" ? "with_companies" : "with_networks"
  }=${networkId}`;

  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
