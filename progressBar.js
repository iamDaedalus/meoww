function initializeProgressBars() {
  document.querySelectorAll(".circular-progress").forEach((progressBar) => {
    const ratingValue = parseFloat(progressBar.getAttribute("data-rating"));
    const progressColor = progressBar.getAttribute("data-progress-color");
    const bgColor = progressBar.getAttribute("data-bg-color");

    // Set the background based on the rating instantly
    progressBar.style.background = `conic-gradient(
                    ${progressColor} ${ratingValue * 36}deg,
                    ${bgColor} ${ratingValue * 36}deg
                )`;
  });
}
