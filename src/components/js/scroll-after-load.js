export const scrollAfterLoad = height => {
  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
};
