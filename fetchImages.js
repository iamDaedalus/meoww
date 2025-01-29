async function fetchImages(id, mediaType, returnType) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/images?api_key=${apiKey}`
  );
  const data = await response.json();
  const normal = data.backdrops.find((meow) => meow.iso_639_1 === null);
  const normalUrl = normal
    ? `https://image.tmdb.org/t/p/original/${normal.file_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";
  const poster = data.posters.find((meow) => meow.iso_639_1 === "en");
  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500/${poster.file_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-VLNDBGMO8xZGWlbLfDKXa2RCqhljShc38FN-h7tFSTRnBAdqvf-5m6GQp3dxhQozWbRAe7d2AHlBae3sII-p0w9tDHVY1_nvg45mAs6K9b-fNnmvGFyhOcTqxzuYxNEW1MoEbHdeNvNoTM4QG3XCe5S_QBhSLfjSXnl9EIL4Kns3t0B175ymTH6d/s1600/QQQ.jpg";

  const english = data.backdrops.find((meow) => meow.iso_639_1 === "en");
  const englishUrl = english
    ? `https://image.tmdb.org/t/p/w500/${english.file_path}`
    : normalUrl ||
      posterUrl ||
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";
  const englishLogo = data.logos.find((meow) => meow.iso_639_1 === "en");
  const englishLogoUrl = englishLogo
    ? `https://image.tmdb.org/t/p/w500/${englishLogo.file_path}`
    : "https://i.ibb.co/dL0NRX0/NO-LOGO-IMAGE-AVAILABLE.png";

  if (returnType === "englishBackdrop") {
    return englishUrl;
  } else if (returnType === "englishLogo") {
    return englishLogoUrl;
  } else if (returnType === "defaultBackdrop") {
    return normalUrl;
  } else if (returnType === "posterImage") {
    return posterUrl;
  }
}
