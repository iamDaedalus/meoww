const searchBar = document.querySelector(".searchBar");
const searchResultContainer = document.querySelector(".searchResultContainer");
const resultsContainer = document.getElementById("results");
const typeText = document.getElementById("typeText");
const vanmob = document.querySelector(".vanmob");
const searchBarContainer = document.querySelector(".searchBarContainer");


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

let currentPage = 1;

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

async function searchFetch(query, page = 1) {
  resultsContainer.innerHTML = "";
  const endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}&page=${page}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  resultsContainer.innerHTML = "";

  data.results.forEach(async (meow) => {
    if (meow.adult === false && meow.vote_average >= 5) {
      displaySearch(meow);
    }
  });

  tamad();
}

function displaySearch(data, index) {
  const searchCard = document.createElement("div");
  searchCard.className = "searchCard";
  const searchCardImage = document.createElement("img");
  searchCardImage.className = "searchCardImage";
  searchCardImage.classList.add("lazy-load");
  searchCardImage.dataset.src = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-VLNDBGMO8xZGWlbLfDKXa2RCqhljShc38FN-h7tFSTRnBAdqvf-5m6GQp3dxhQozWbRAe7d2AHlBae3sII-p0w9tDHVY1_nvg45mAs6K9b-fNnmvGFyhOcTqxzuYxNEW1MoEbHdeNvNoTM4QG3XCe5S_QBhSLfjSXnl9EIL4Kns3t0B175ymTH6d/s1600/QQQ.jpg";

  searchCard.style.animationDelay = `${index * 0.1}s`;
  searchCard.appendChild(searchCardImage);
  resultsContainer.appendChild(searchCard);

  searchCard.addEventListener("click", async () => {
    modal.classList.add("active");
    const meoww = await fetchShows(data.id, data.media_type);
    modalFunction(meoww);
  });
}

let debounceTimeout;
searchBar.addEventListener("input", (e) => {
  const typed = e.target.value;
  typeText.innerText = typed;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    searchFetch(typed, currentPage);
  }, 500);
});



vanmob.addEventListener("click", () => {
  searchBarContainer.classList.toggle("show");
});
