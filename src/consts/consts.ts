//Параметры сложности
export const GAME_DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 90,
    pairsCount: 4,
    coins: 30,
  },
  medium: {
    label: 'Medium',
    time: 60,
    pairsCount: 6,
    coins: 60,
  },
  hard: {
    label: 'Hard',
    time: 30,
    pairsCount: 8,
    coins: 90,
  },
} as const;

//Игровые темы
export const GAME_THEMES = {
  fruits: {
    label: 'Fruits',
    preview: 'Прикольные фрукты',
    price: 0,
    frontImage: './src/assets/themes/ocean/frontImage.png',
    backImage: './src/assets/themes/ocean/backImage.png',
    cards: [
      { id: 1, img: '🍎', name: 'apple' },
      { id: 2, img: '🍌', name: 'banana' },
      { id: 3, img: '🍇', name: 'grape' },
      { id: 4, img: '🍒', name: 'cherry' },
      { id: 5, img: '🍓', name: 'strawberry' },
      { id: 6, img: '🍉', name: 'watermelon' },
      { id: 7, img: '🍊', name: 'orange' },
    ],
  },
  space: {
    label: 'Space',
    preview: 'Космос',
    price: 90,
    frontImage: './src/assets/themes/ocean/frontImage.png',
    backImage: './src/assets/themes/ocean/backImage.png',
    cards: [
      { id: 1, img: '1', name: 'apple' },
      { id: 2, img: '2', name: 'banana' },
      { id: 3, img: '3', name: 'grape' },
      { id: 4, img: '4', name: 'cherry' },
      { id: 5, img: '5', name: 'strawberry' },
      { id: 6, img: '6', name: 'watermelon' },
      { id: 7, img: '7', name: 'orange' },
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
