
export const BUN = 'bun';
export const MAIN = 'main';
export const SAUCE = 'sauce';
export const category = [
  {
    name: BUN,
    title: 'Булочки',
  },
  {
    name: MAIN,
    title: 'Начинки',
  },
  {
    name: SAUCE,
    title: 'Соусы',
  },
];
export const serverConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const ItemTypes = {
  CARD: 'card',
  SORT: 'sort'
}

export const historyOrderLimit = 5

