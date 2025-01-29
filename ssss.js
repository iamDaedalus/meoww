const searchBar = document.getElementById("searchInput");
const searchResultContainer = document.querySelector(".searchResultContainer");
const resultsContainer = document.getElementById("results");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showResultsContainer() {
  searchBar.classList.add("active");
  searchResultContainer.classList.add("active");
  document.body.style.overflow = "hidden";
}
function hideResultsContainer() {
  if (searchBar.value.trim() === "") {
    searchBar.classList.remove("active");
    searchResultContainer.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

searchBar.addEventListener("input", () => {
  if (searchBar.value.trim() !== "") {
    showResultsContainer();
  } else {
    hideResultsContainer();
  }
});

searchBar.addEventListener("focus", showResultsContainer);

searchBar.addEventListener("blur", () => {
  setTimeout(() => {
    hideResultsContainer();
  }, 50);
});

let currentPage = 1;
let currentQuery = "";

async function fetchMovies(query, page = 1) {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function displayResults(query, page = 1) {
  const data = await fetchMovies(query, page);
  resultsContainer.innerHTML = ""; // Clear previous results

  if (data.results && data.results.length > 0) {
    data.results.forEach((movie) => {
      if (movie.poster_path) {
        const card = document.createElement("div");
        card.className = "searchCard";
        card.innerHTML = `
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h4>${movie.title}</h4>
            `;
        resultsContainer.appendChild(card);
      }
    });

    // Enable/disable pagination buttons
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page >= data.total_pages;
  } else {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

// Event listener for search input
searchInput.addEventListener("input", async (e) => {
  currentQuery = e.target.value.trim();
  currentPage = 1;
  if (currentQuery) {
    await displayResults(currentQuery, currentPage);
  } else {
    resultsContainer.innerHTML = ""; // Clear results when input is empty
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
});

// Pagination buttons
prevBtn.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    await displayResults(currentQuery, currentPage);
  }
});

nextBtn.addEventListener("click", async () => {
  currentPage++;
  await displayResults(currentQuery, currentPage);
});
