export const getRandomDelay = () => Math.floor(Math.random() * 3000) + 2500;

export const getRandomImage = (images: string[]) =>
  images[Math.floor(Math.random() * images.length)];
