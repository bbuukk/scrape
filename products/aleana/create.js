const products = [
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "білий флок",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "граніт",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "оливковий",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "теракот",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "фрезія",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "50*18см",
      color: "білий флок",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "граніт",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "40*18см",
      color: "оливковий",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "50*18см",
      color: "сизо блакитний",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "50*18см",
      color: "теракот",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "50*18см",
      color: "фіолетовий",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "50*18см",
      color: "фрезія",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "білий флок",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "граніт",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "какао",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "оливковий",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "сизо блакитний",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "теракот",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "фіолетовий",
    },
  },
  {
    name: "Вазон Глорія балконний",
    characteristics: {
      size: "60*18см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Квадро" низький',
    characteristics: {
      size: "16*16*15.5см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Квадро" низький',
    characteristics: {
      size: "16*16*15.5см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Сфера"',
    characteristics: {
      size: "д10",
      color: "бурштин",
    },
  },
  {
    name: 'Вазон "Сфера"',
    characteristics: {
      size: "д10",
      color: "малиновий прозорий",
    },
  },
  {
    name: 'Вазон "Сфера"',
    characteristics: {
      size: "д10",
      color: "прозорий",
    },
  },
  {
    name: 'Вазон "Сфера"',
    characteristics: {
      size: "д10",
      color: "прозорий біла-роза",
    },
  },
  {
    name: "Вазон Дама з підставкою",
    characteristics: {
      size: "12*12*11см",
      color: "теракот",
    },
  },
  {
    name: "Вазон Дама з підставкою",
    characteristics: {
      size: "16*16*14см",
      color: "теракот",
    },
  },
  {
    name: "Вазон Дама підставкою",
    characteristics: {
      size: "24*24*21см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "13*11.2см",
      color: "біла роза-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "15.7*13см",
      color: "біла роза-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "13*11.2см",
      color: "какао-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "15.7*13см",
      color: "какао-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "13.*11.2см",
      color: "оливково-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "16*13*13см",
      color: "оливково-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "16*13*13см",
      color: "фіолетово-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "13*11.2см",
      color: "фрезія-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "17.9*14.7см",
      color: "біла роза-білий",
    },
  },
  {
    name: "Вазон Алєана з подвійним дном  ",
    characteristics: {
      size: "17.9*14.7см",
      color: "какао-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "17.9*14.7см",
      color: "оливково-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "17.9*14.7см",
      color: "фрезія-білий",
    },
  },
  {
    name: 'Вазон "Ібіс" з подвійним дном',
    characteristics: {
      size: "16*13*13см",
      color: "фрезія-білий",
    },
  },
  {
    name: "Вазон Ібіс з подвійним дном",
    characteristics: {
      size: "60*18см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "24*22*22см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "12*11*11см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "12*11*11см",
      color: "абрикос",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "12*11*11см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "16*15*15см",
      color: "фрезія",
    },
  },
  {
    name: "Вазон Алєана круглий ",
    characteristics: {
      size: "16*15см",
      color: "білий",
    },
  },
  {
    name: "Вазон Алєана круглий ",
    characteristics: {
      size: "16*15см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "20*18см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "20*18см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "20*18см",
      color: "оливковий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "20*18см",
      color: "фіолетовий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "24*22см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "7*6см",
      color: "абрикос",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "7*6см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "7*6см",
      color: "оливковий",
    },
  },
  {
    name: 'Вазон "Матільда" круглий',
    characteristics: {
      size: "7*6см",
      color: "світло зелений",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "д12 12*11см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "16*14.5см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "д12 12*11см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "д16 16*14.5см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "Д16 16*14.5см",
      color: "сизоблакитний",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "16*14.5см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "д12 12*11см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "20*18см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Ф\'южин" зі вставкою',
    characteristics: {
      size: "20*18см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Флора" зі штирем',
    characteristics: {
      size: "д16",
      color: "бронзовий",
    },
  },
  {
    name: 'Вазон "Флора" зі штирем',
    characteristics: {
      size: "д16",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Флора" зі штирем',
    characteristics: {
      size: "д16",
      color: "темно-коричневий",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "19*16*16*см",
      color: "ультразелений",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "19*16*16*см",
      color: "фіолетовий прозорий",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "13*15.5см",
      color: "зелений прозорий",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "13*15.5см",
      color: "прозорий",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "13*15.5см",
      color: "малиновий прозорий",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "13*15.5см",
      color: "ультразелений",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "16*13*13см",
      color: "фіолетовий прозорий",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей ',
    characteristics: {
      size: "19*16*16см",
      color: "малиновій прозорий",
    },
  },
  {
    name: 'Вазон "Деко" зі вставкою',
    characteristics: {
      size: "13*12.5см",
      color: "прозорий",
    },
  },
  {
    name: 'Вазон "Деко" зі вставкою',
    characteristics: {
      size: "13*12.5см",
      color: "салатовий прозорий",
    },
  },
  {
    name: 'Вазон "Деко" зі вставкою',
    characteristics: {
      size: "13*12.5см",
      color: "фіолетовий прозорий",
    },
  },
  {
    name: 'Вазон "Деко" зі вставкою',
    characteristics: {
      size: "16*15.5см",
      color: "прозорий",
    },
  },
  {
    name: 'Вазон "Деко" зі вставкою',
    characteristics: {
      size: "16*15.5см",
      color: "салатовий прозорий",
    },
  },
  {
    name: 'Вазон "Деко" зі вставкою',
    characteristics: {
      size: "16*15.5см",
      color: "фіолетовий прозорий",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "білий флок",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "бронзовий",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "світло-зелений",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "сизо-блакитний",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "фіолетовий",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "11*10.2см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "14.5*14см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "14.5*14см",
      color: "сизо-блакитний",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "14.5*14см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "14.5*14см",
      color: "фрезія",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "18.5*18см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Глорія" з підставкою',
    characteristics: {
      size: "18.5*18см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Дама" балконний з підставкою',
    characteristics: {
      size: "50*18см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Дама" балконний з підставкою',
    characteristics: {
      size: "50*18см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: "12*12см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: "20*20см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: "20*20см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: "24*24см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: "24*24см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: "24*24см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: " 8*8см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Дама" балконний',
    characteristics: {
      size: " 8*8см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "12*11см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "12*11см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "12*11см",
      color: "темно-коричневий",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "16*15см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "16*15см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "16*15см",
      color: "темно-коричневий",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "20*18см",
      color: "біла роза",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "20*18см",
      color: "какао",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "20*18см",
      color: "темно-коричневий",
    },
  },
  {
    name: 'Вазон "Ротанг" з підставкою',
    characteristics: {
      size: "20*18см",
      color: "темно-коричневий",
    },
  },
  {
    name: 'Вазон "Тетра" з підставкою',
    characteristics: {
      size: "10*8см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Тетра" з підставкою',
    characteristics: {
      size: "10*8см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Тетра" з підставкою',
    characteristics: {
      size: "14*11см",
      color: "білий",
    },
  },
  {
    name: 'Вазон "Тетра" з підставкою',
    characteristics: {
      size: "14*11см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Тетра" з підставкою',
    characteristics: {
      size: "17*13см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Тетра" з підставкою',
    characteristics: {
      size: "17*13см",
      color: "теракот",
    },
  },
  {
    name: "Вазон круглий",
    characteristics: {
      size: " 25.0*20см",
      color: "теракот",
    },
  },
  {
    name: 'Вазон "Ніка" для орхідей',
    characteristics: {
      size: "16*19",
      color: "бурштиновий",
    },
  },
];
