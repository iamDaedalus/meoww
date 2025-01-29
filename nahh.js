function nah(data) {
  const title = data.title || data.name;
  const tagline = data.tagline || "";
  const overview = data.overview || "";
  const genreName = data.genres?.[0]?.name || "Unknown Genre";
  const vote = data.vote_average || "";
  const season = data.seasons || "";
  const yearReleased =
    (data.release_date || data.first_air_date)?.split("-")[0] || "Unknown";

  const runtimeInMinutes = data.runtime;
  const runtime = runtimeInMinutes
    ? `${Math.floor(runtimeInMinutes / 60)}h ${runtimeInMinutes % 60}m`
    : `S${data.number_of_seasons}E${data.number_of_episodes}`;

  return {
    title,
    tagline,
    overview,
    genreName,
    yearReleased,
    runtime,
    vote,
    season,
  };
}
