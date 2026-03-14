// Lightweight lightbox for photo gallery
(function () {
  const photos = Array.from(document.querySelectorAll('.gallery-thumb'));
  let current = 0;

  // Build lightbox DOM
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = `
    <div id="lb-backdrop"></div>
    <button id="lb-close" aria-label="Close">&#x2715;</button>
    <button id="lb-prev" aria-label="Previous">&#x2039;</button>
    <img id="lb-img" src="" alt="Gallery photo" />
    <button id="lb-next" aria-label="Next">&#x203A;</button>
    <div id="lb-counter"></div>
  `;
  document.body.appendChild(overlay);

  const lbImg = document.getElementById('lb-img');
  const lbCounter = document.getElementById('lb-counter');

  function show(index) {
    current = (index + photos.length) % photos.length;
    lbImg.src = photos[current].dataset.full;
    lbImg.alt = photos[current].alt;
    lbCounter.textContent = `${current + 1} / ${photos.length}`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open on thumbnail click
  photos.forEach((thumb, i) => {
    thumb.addEventListener('click', () => show(i));
    thumb.style.cursor = 'pointer';
  });

  document.getElementById('lb-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    show(current - 1);
  });

  document.getElementById('lb-next').addEventListener('click', (e) => {
    e.stopPropagation();
    show(current + 1);
  });

  document.getElementById('lb-close').addEventListener('click', hide);
  document.getElementById('lb-backdrop').addEventListener('click', hide);

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Escape') hide();
  });
})();
