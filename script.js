const imageViewer = document.querySelector('#image-viewer');
const viewerImage = imageViewer.querySelector('img');
const viewerCaption = imageViewer.querySelector('figcaption');
const viewerCount = imageViewer.querySelector('.viewer-count');
const viewerPrev = imageViewer.querySelector('.viewer-prev');
const viewerNext = imageViewer.querySelector('.viewer-next');
let activeGallery = [];
let activePhoto = 0;
let activeCaption = '';

const showViewerPhoto = (index) => {
  activePhoto = (index + activeGallery.length) % activeGallery.length;
  const source = activeGallery[activePhoto];
  viewerImage.src = source;
  viewerImage.alt = source.includes('Library_Youth_Explorer')
    ? `Library Youth Explorer photo ${activePhoto + 1}`
    : source.split('/').pop().replace(/\.[^.]+$/, '').replaceAll('_', ' ');
  viewerCaption.textContent = activeGallery.length > 1
    ? `${activeCaption} · ${activePhoto + 1} of ${activeGallery.length}`
    : activeCaption;
  const hasGallery = activeGallery.length > 1;
  viewerPrev.hidden = !hasGallery;
  viewerNext.hidden = !hasGallery;
  viewerCount.textContent = hasGallery ? `${activePhoto + 1} / ${activeGallery.length}` : '';
};

document.querySelectorAll('.highlight-image, .internship-gallery').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (typeof imageViewer.showModal !== 'function') return;
    event.preventDefault();
    const image = link.querySelector('img');
    activeGallery = link.dataset.gallery?.split(',') || [link.href];
    activeCaption = link.closest('.highlight-card, .experience-card')?.querySelector('h3')?.textContent || image.alt;
    showViewerPhoto(0);
    imageViewer.showModal();
  });
});

viewerPrev.addEventListener('click', () => showViewerPhoto(activePhoto - 1));
viewerNext.addEventListener('click', () => showViewerPhoto(activePhoto + 1));
imageViewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && activeGallery.length > 1) showViewerPhoto(activePhoto - 1);
  if (event.key === 'ArrowRight' && activeGallery.length > 1) showViewerPhoto(activePhoto + 1);
});

imageViewer.querySelector('.viewer-close').addEventListener('click', () => imageViewer.close());
imageViewer.addEventListener('click', (event) => {
  if (event.target === imageViewer) imageViewer.close();
});
imageViewer.addEventListener('close', () => {
  viewerImage.removeAttribute('src');
  viewerImage.alt = '';
  viewerCaption.textContent = '';
  viewerCount.textContent = '';
  activeGallery = [];
  activeCaption = '';
});
