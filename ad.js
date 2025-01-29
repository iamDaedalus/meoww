let canOpenAd = true;

function adLink() {
  if (!canOpenAd) {
    return;
  }

  const moneTag1 = "https://luglawhaulsano.net/4/8414807";

  window.open(moneTag1, "_blank");

  canOpenAd = false;
  setTimeout(() => {
    canOpenAd = true;
  }, 20000);
}
