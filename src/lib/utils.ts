import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isPlural = (num: number) => Math.abs(num) !== 1;
const simplePlural = (word: string) => `${word}s`;

export const pluralizeWord = (
  num: number,
  word: string,
  plural = simplePlural
) => {
  if (isPlural(num)) {
    if (word.endsWith("s")) {
      return word; // Do nothing if word ends with 's'
    } else {
      return plural(word);
    }
  } else {
    return word;
  }
};

export const pluralize = (str: string) => {
  const words = str.split(" ");
  if (words.length > 0) {
    words[0] = pluralizeWord(2, words[0]); // Assuming we want to pluralize the first word
  }
  return words.join(" ");
};

export function getMenuComposition(menu: {
  id: number;
  code: string | null;
  name: string;
  description: string | null;
  menu_food: {
    food: {
      id: number;
      name: string;
    } | null;
    food_types: {
      id: number;
      title: string;
    } | null;
    quantity: number;
  }[];
  price: number;
  image: string | null;
  stripe_price_id: string | null;
}) {
  if (menu.menu_food.length === 0) {
    return "";
  }

  const composition = menu.menu_food
    .map((item) => {
      const name = item.food ? item.food.name : item.food_types?.title;
      return (
        item.quantity + " " + pluralizeWord(item.quantity, name!.toLowerCase())
      );
    })
    .reduce((acc, curr) => acc + ", " + curr);

  return composition;
}
