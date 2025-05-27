export const getRandomBio = () =>
  'Passionate team player with a strong drive for results and continuous improvement.';

export const getPerformanceHistory = () =>
  Array.from({ length: 5 }, (_, i) => ({
    year: 2020 + i,
    rating: Math.floor(Math.random() * 5) + 1,
  })); 