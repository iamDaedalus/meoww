async function fetchTrailer(id, mediaType) {
  try {
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer
      ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`
      : `https://www.youtube.com/embed/xvFZjo5PgG0?si=3ucZG5-81DePDvtrD`;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return "Error fetching trailer";
  }
}
