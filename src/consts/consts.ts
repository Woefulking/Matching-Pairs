//Параметры сложности
export const GAME_DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 90,
    coins: 30,
  },
  medium: {
    label: 'Medium',
    time: 60,
    coins: 60,
  },
  hard: {
    label: 'Hard',
    time: 30,
    coins: 90,
  },
} as const;

//Игровые темы
export const GAME_THEMES = {
  fruits: {
    label: 'Fruits',
    preview: 'Прикольные фрукты',
    price: 0,
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
} as const;
