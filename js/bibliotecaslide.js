document.querySelectorAll('.carousel').forEach(carousel => {
  const slider = carousel.querySelector('.carousel-slider');
  const leftBtn = carousel.querySelector('.nav-left');
  const rightBtn = carousel.querySelector('.nav-right');

  // Scroll com botões
  leftBtn.addEventListener('click', () => {
    slider.scrollLeft -= 220;
  });
  rightBtn.addEventListener('click', () => {
    slider.scrollLeft += 220;
  });

  // Swipe touch
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("touchend", () => {
    isDown = false;
  });

});