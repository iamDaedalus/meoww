function tvSection() {
  const genreWrapper = document.getElementById("genreWrapper");
  const genreMovieContainer = document.getElementById("genreMovieContainer");
  // const meowMovie = document.querySelector(".meow-movie");
  // vanmob.addEventListener("click", () => {
  //   meowMovie.classList.toggle("space");
  // });

  const genres = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ];

  let currentPage = 1;
  let isLoading = false;
  let selectedGenres = [];

  // Render genre checkboxes
  genres.forEach((genre) => {
    const genreSlide = document.createElement("div");
    genreSlide.className = "swiper-slide genreSlide";

    const genreLabel = document.createElement("label");
    const genreCheckbox = document.createElement("input");
    genreCheckbox.type = "checkbox";
    genreCheckbox.value = genre.id;
    genreCheckbox.id = "genre_" + genre.id;

    genreLabel.innerText = genre.name;
    genreLabel.setAttribute("for", genreCheckbox.id);
    genreCheckbox.addEventListener("change", () => {
      genreLabel.classList.toggle("checked", genreCheckbox.checked);
      updateMoviesBySelectedGenres();
    });

    genreSlide.appendChild(genreLabel);
    genreSlide.appendChild(genreCheckbox);
    genreWrapper.appendChild(genreSlide);
  });

  new Swiper(".genreContainer", {
    slidesPerView: 6,
    loop: false,
    centeredSlides: false,
    spaceBetween: 10,
    mousewheel: false,
    breakpoints: {
      320: {
        slidesPerView: 3,
      },
      768: {
        // For tablets
        slidesPerView: 4,
      },
      1024: {
        // For desktops
        slidesPerView: 6,
      },
    },
  });

  function updateMoviesBySelectedGenres() {
    selectedGenres = [];
    document
      .querySelectorAll("#genreWrapper input:checked")
      .forEach((checkbox) => {
        selectedGenres.push(checkbox.value);
      });

    currentPage = 1;
    genreMovieContainer.innerHTML = ""; // Clear existing movies

    if (selectedGenres.length === 0) {
      fetchPopularMovies();
    } else {
      fetchMoviesByGenre(selectedGenres.join(","));
    }
  }

  async function fetchMoviesByGenre(genreQuery) {
    if (isLoading) return;
    isLoading = true;

    const endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreQuery}&page=${currentPage}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (currentPage === 1 && data.results.length === 0) {
      genreMovieContainer.innerHTML =
        "<p>No movies found for the selected genres.</p>";
    }

    data.results.forEach((movie) => {
      if (movie.adult === false && movie.vote_average >= 5) {
        displayMovies(movie);
      }
    });

    isLoading = false;
    currentPage++;

    tamad();
  }

  async function fetchPopularMovies() {
    if (isLoading) return;
    isLoading = true;

    const endpoint = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    data.results.forEach((movie) => {
      if (movie.adult === false && movie.vote_average >= 5) {
        displayMovies(movie);
      }
    });

    isLoading = false;
    currentPage++;
    tamad();
  }

  function displayMovies(movie, index) {
    const movieCard = document.createElement("div");
    movieCard.className = "genreCard";

    const movieCardContainer = document.createElement("div");
    movieCardContainer.className = "movieCardContainer";
    movieCardContainer.innerHTML = `
    <img data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movieImage lazy-load" alt="${movie.title}"/>
    `;

    const movieCardTitle = document.createElement("div");
    movieCardTitle.className = "movieCardTitle";
    movieCardTitle.innerHTML = `
<h4 class="cardTitle">${movie.name}</h4>
<p class="cardYear">${movie.first_air_date?.split("-")[0]}</p>
`;

    movieCard.appendChild(movieCardContainer);
    movieCard.appendChild(movieCardTitle);

    // Add animation delay based on the index
    movieCard.style.animationDelay = `${index * 0.1}s`;

    genreMovieContainer.appendChild(movieCard);

    movieCard.addEventListener("click", async () => {
      modal.classList.add("active");
      const meoww = await fetchShows(movie.id, "tv");
      modalFunction(meoww);
    });
  }

  // Infinite Scroll
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200 &&
      !isLoading
    ) {
      if (selectedGenres.length === 0) {
        fetchPopularMovies();
      } else {
        fetchMoviesByGenre(selectedGenres.join(","));
      }
    }
  });

  // Initial fetch
  fetchPopularMovies();
}
