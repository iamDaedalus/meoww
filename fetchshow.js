async function fetchShows(id, mediaType) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`
  );
  const data = await response.json();

  const formattedData = nah(data);

  const actor = await fetchActor(id, mediaType);

  const backdrop = await fetchImages(id, mediaType, "defaultBackdrop");

  const en = await fetchImages(id, mediaType, "englishBackdrop");

  const logo = await fetchImages(id, mediaType, "englishLogo");

  const poster = await fetchImages(id, mediaType, "posterImage");

  const trailerUrl = await fetchTrailer(id, mediaType);
  return {
    data,
    id,
    title: formattedData.title,
    tagline: formattedData.tagline,
    overview: formattedData.overview,
    genre: formattedData.genreName,
    year: formattedData.yearReleased,
    run: formattedData.runtime,
    vote: formattedData.vote,
    season: formattedData.season,
    backdrop,
    poster,
    logo,
    trailer: trailerUrl,
    mediaType,
    english: en,
    actor: actor,
  };
}
