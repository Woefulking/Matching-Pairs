export const GAME_DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 30,
    pairsCount: 4,
    coins: 20,
  },
  medium: {
    label: 'Medium',
    time: 50,
    pairsCount: 6,
    coins: 50,
  },
  hard: {
    label: 'Hard',
    time: 80,
    pairsCount: 8,
    coins: 100,
  },
} as const;

export const GAME_THEMES = {
  fruits: {
    label: 'Fruits',
    price: 0,
    frontImage: 'assets/themes/fruits/frontImage.png',
    backImage: '/assets/themes/fruits/backImage.png',
    deck: '/assets/themes/fruits/deck.png',
    cards: [
      { id: 1, img: '/assets/themes/fruits/apple.png', name: 'apple' },
      { id: 2, img: '/assets/themes/fruits/banana.png', name: 'banana' },
      { id: 3, img: '/assets/themes/fruits/cherry.png', name: 'cherry' },
      { id: 4, img: '/assets/themes/fruits/coconut.png', name: 'coconut' },
      { id: 5, img: '/assets/themes/fruits/grape.png', name: 'grape' },
      { id: 6, img: '/assets/themes/fruits/pear.png', name: 'pear' },
      { id: 7, img: '/assets/themes/fruits/pomegranate.png', name: 'pomegranate' },
      { id: 8, img: '/assets/themes/fruits/strawberry.png', name: 'strawberry' },
    ],
  },
  ocean: {
    label: 'Ocean',
    price: 150,
    frontImage: '/assets/themes/ocean/frontImage.png',
    backImage: '/assets/themes/ocean/backImage.png',
    deck: '/assets/themes/ocean/deck.png',
    cards: [
      { id: 1, img: '/assets/themes/ocean/clamp.png', name: 'clamp' },
      { id: 2, img: '/assets/themes/ocean/clown.png', name: 'clown' },
      { id: 3, img: '/assets/themes/ocean/crab.png', name: 'crab' },
      { id: 4, img: '/assets/themes/ocean/jelly.png', name: 'jelly' },
      { id: 5, img: '/assets/themes/ocean/octopus.png', name: 'octopus' },
      { id: 6, img: '/assets/themes/ocean/shark.png', name: 'shark' },
      { id: 7, img: '/assets/themes/ocean/star.png', name: 'star' },
      { id: 8, img: '/assets/themes/ocean/tortle.png', name: 'tortle' },
    ],
  },
  space: {
    label: 'Space',
    price: 400,
    frontImage: '/assets/themes/space/frontImage.png',
    backImage: '/assets/themes/space/backImage.png',
    deck: '/assets/themes/space/deck.png',
    cards: [
      { id: 1, img: '/assets/themes/space/ufo.png', name: 'ufo' },
      { id: 2, img: '/assets/themes/space/yellow.png', name: 'yellow' },
      { id: 3, img: '/assets/themes/space/blue.png', name: 'blue' },
      { id: 4, img: '/assets/themes/space/astronaut.png', name: 'astronaut' },
      { id: 5, img: '/assets/themes/space/alien.png', name: 'alien' },
      { id: 6, img: '/assets/themes/space/red.png', name: 'red' },
      { id: 7, img: '/assets/themes/space/black.png', name: 'black' },
      { id: 8, img: '/assets/themes/space/galaxy.png', name: 'galaxy' },
    ],
  },
  egypt: {
    label: 'Egypt',
    price: 1000,
    frontImage: '/assets/themes/egypt/frontImage.png',
    backImage: '/assets/themes/egypt/backImage.png',
    deck: '/assets/themes/egypt/deck.png',
    cards: [
      { id: 1, img: '/assets/themes/egypt/camel.png', name: 'camel' },
      { id: 2, img: '/assets/themes/egypt/horus.png', name: 'horus' },
      { id: 3, img: '/assets/themes/egypt/palm.png', name: 'palm' },
      { id: 4, img: '/assets/themes/egypt/pharaon.png', name: 'pharaon' },
      { id: 5, img: '/assets/themes/egypt/pyramid.png', name: 'pyramid' },
      { id: 6, img: '/assets/themes/egypt/scarab.png', name: 'scarab' },
      { id: 7, img: '/assets/themes/egypt/idk.png', name: 'black' },
      { id: 8, img: '/assets/themes/egypt/cactus.png', name: 'galaxy' },
    ],
  },
} as const;

export const LOGO_WORDS = [
  [
    '/assets/letters/P.png',
    '/assets/letters/i.png',
    '/assets/letters/x.png',
    '/assets/letters/e.png',
    '/assets/letters/l.png',
  ],
  [
    '/assets/letters/P.png',
    '/assets/letters/a.png',
    '/assets/letters/i.png',
    '/assets/letters/r.png',
    '/assets/letters/s.png',
  ],
] as const;

export const BACKGROUND_CARDS_COUNT = 60;
export const ALL_THEMES = Object.entries(GAME_THEMES);
export const ALL_BACK_IMAGES = Object.values(GAME_THEMES).map((theme) => theme.backImage);
