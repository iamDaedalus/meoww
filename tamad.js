function tamad() {
  const tamadpiktur = document.querySelectorAll("img.lazy-load");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Add blur effect while the image is loading
          img.classList.add("blur-effect");

          // Replace the placeholder with the actual image source
          img.src = img.dataset.src;

          // When the image is fully loaded, remove the blur
          img.onload = () => {
            img.classList.remove("blur-effect");
            img.classList.remove("lazy-load");
          };

          observer.unobserve(img);
        }
      });
    },
    { threshold: 0.000001 }
  );

  tamadpiktur.forEach((Image) => {
    observer.observe(Image);
  });
}
