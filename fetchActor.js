async function fetchActor(id, mediaType) {
  const endpoint = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  const actorProfile = data.cast.map((meow) => {
    return {
      actorImage: meow.profile_path
        ? `https://image.tmdb.org/t/p/w500${meow.profile_path}`
        : "https://banner2.cleanpng.com/20180325/wae/kisspng-business-google-account-organization-service-avatar-5ab752c6a54db0.2719189215219637186771.jpg",
      actorName: meow.name,
      actorChar: meow.character,
    };
  });

  return actorProfile;
}
