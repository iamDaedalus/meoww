const iframePlayer = document.querySelector(".iframePlayer");
const iframeSelect = document.getElementById("iframeSelect");
const iframeIframe = document.getElementById("iframeIframe");
const closePlayer = document.getElementById("closePlayer");
iframeIframe.setAttribute(
  "allow",
  "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
);
iframeIframe.setAttribute("allowfullscreen", "");

closePlayer.addEventListener("click", () => {
  iframePlayer.classList.remove("iframePlayerActive");
  iframeIframe.src = "";
});

function sourcePlayer(id, mediaType, season, episode) {
  console.log(id, mediaType, season, episode);

  const servers = [
    {
      name: "Server 2",
      movieLink: `https://embed.su/embed/movie/${id}`,
      tvLink: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Main",
      movieLink: `https://vidsrc.xyz/embed/movie/${id}`,
      tvLink: `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
    {
      name: "Server 1",
      movieLink: `https://vidsrc.cc/v2/embed/movie/${id}`,
      tvLink: `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 3",
      movieLink: `https://vidbinge.dev/embed/movie/${id}`,
      tvLink: `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`,
    },

    {
      name: "Server 4",
      movieLink: `https://vidlink.pro/movie/${id}`,
      tvLink: `https://vidlink.pro/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 5",
      movieLink: `https://www.primewire.tf/embed/movie?tmdb=${id}`,
      tvLink: `https://www.primewire.tf/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
  ];

  // Clear existing options
  iframeSelect.innerHTML = "";

  // Add new options
  servers.forEach((server) => {
    const sourceOption = document.createElement("option");
    sourceOption.innerText = server.name;

    if (mediaType === "tv") {
      sourceOption.value = server.tvLink;
    } else if (mediaType === "movie") {
      sourceOption.value = server.movieLink;
    } else {
      console.log("Error: Invalid mediaType");
      return;
    }

    iframeSelect.appendChild(sourceOption);
  });

  iframeIframe.src = iframeSelect.value;

  iframeSelect.addEventListener("change", () => {
    iframeIframe.src = iframeSelect.value;
    console.log("Source changed to:", iframeIframe.src);
  });
}
