const isPlural = (num : number ) => Math.abs(num) !== 1;
const simplePlural = (word: string) => `${word}s`;
export const pluralizeWord = (num: number, word: string, plural = simplePlural) =>
  isPlural(num) ? plural(word) : word;

export const pluralize = (str: string) => {
  const words = str.split(' ');
  if (words.length > 0) {
    words[0] = pluralizeWord(2, words[0]); // Assuming we want to pluralize the first word
  }
  return words.join(' ');
};
