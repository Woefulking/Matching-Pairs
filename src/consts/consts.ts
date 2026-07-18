//Difficulties params
export const GAME_DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 60,
    pairsCount: 4,
    coins: 30,
    cardWidth: '160px',
  },
  medium: {
    label: 'Medium',
    time: 45,
    pairsCount: 6,
    coins: 60,
    cardWidth: '150px',
  },
  hard: {
    label: 'Hard',
    time: 30,
    pairsCount: 8,
    coins: 90,
    cardWidth: '130px',
  },
} as const;

//Letters for logo
export const LOGO_WORDS = [
  [
    './src/assets/letters/P.png',
    './src/assets/letters/i.png',
    './src/assets/letters/x.png',
    './src/assets/letters/e.png',
    './src/assets/letters/l.png',
  ],
  [
    './src/assets/letters/P.png',
    './src/assets/letters/a.png',
    './src/assets/letters/i.png',
    './src/assets/letters/r.png',
    './src/assets/letters/s.png',
  ],
] as const;

//Game Themes
export const GAME_THEMES = {
  fruits: {
    label: 'Fruits',
    preview: 'Прикольные фрукты',
    price: 0,
    frontImage: './src/assets/themes/fruits/frontImage.png',
    backImage: './src/assets/themes/fruits/backImage.png',
    cards: [
      { id: 1, img: './src/assets/themes/fruits/apple.png', name: 'apple' },
      { id: 2, img: './src/assets/themes/fruits/banana.png', name: 'banana' },
      { id: 3, img: './src/assets/themes/fruits/cherry.png', name: 'cherry' },
      { id: 4, img: './src/assets/themes/fruits/coconut.png', name: 'coconut' },
      { id: 5, img: './src/assets/themes/fruits/grape.png', name: 'grape' },
      { id: 6, img: './src/assets/themes/fruits/pear.png', name: 'pear' },
      { id: 7, img: './src/assets/themes/fruits/pomegranate.png', name: 'pomegranate' },
      { id: 8, img: './src/assets/themes/fruits/strawberry.png', name: 'strawberry' },
    ],
  },
  space: {
    label: 'Space',
    preview: 'Космос',
    price: 90,
    frontImage: './src/assets/themes/space/frontImage.png',
    backImage: './src/assets/themes/space/backImage.png',
    cards: [
      { id: 1, img: './src/assets/themes/space/ufo.png', name: 'ufo' },
      { id: 2, img: './src/assets/themes/space/yellow.png', name: 'yellow' },
      { id: 3, img: './src/assets/themes/space/blue.png', name: 'blue' },
      { id: 4, img: './src/assets/themes/space/astronaut.png', name: 'astronaut' },
      { id: 5, img: './src/assets/themes/space/alien.png', name: 'alien' },
      { id: 6, img: './src/assets/themes/space/red.png', name: 'red' },
      { id: 7, img: './src/assets/themes/space/black.png', name: 'black' },
      { id: 8, img: './src/assets/themes/space/galaxy.png', name: 'galaxy' },
    ],
  },
  ocean: {
    label: 'Ocean',
    preview: 'Рыбы',
    price: 120,
    frontImage: './src/assets/themes/ocean/frontImage.png',
    backImage: './src/assets/themes/ocean/backImage.png',
    cards: [
      { id: 1, img: './src/assets/themes/ocean/clamp.png', name: 'clamp' },
      { id: 2, img: './src/assets/themes/ocean/clown.png', name: 'clown' },
      { id: 3, img: './src/assets/themes/ocean/crab.png', name: 'crab' },
      { id: 4, img: './src/assets/themes/ocean/jelly.png', name: 'jelly' },
      { id: 5, img: './src/assets/themes/ocean/octopus.png', name: 'octopus' },
      { id: 6, img: './src/assets/themes/ocean/shark.png', name: 'shark' },
      { id: 7, img: './src/assets/themes/ocean/star.png', name: 'star' },
      { id: 8, img: './src/assets/themes/ocean/tortle.png', name: 'tortle' },
    ],
  },
} as const;
