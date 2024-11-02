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
