import punjabiToBraille from "./brailleMapping";

export const convertToBraille = (text) => {
  return text
    .split("")
    .map((char) => {
      const brailleChar = punjabiToBraille[char];
      
      // Log the character and its Braille representation
      console.log(`Converting character: ${char}, Braille representation:`, brailleChar);
      
      // If the character does not have a corresponding Braille representation, skip it
      if (!brailleChar) {
        console.error(`No Braille representation for character: ${char}`);
        return null;
      }
      
      // If the Braille data is in a string format, convert it to an array
      if (typeof brailleChar === 'string') {
        const converted = brailleChar.split("").map(bit => {
          const num = parseInt(bit, 10);
          if (isNaN(num)) {
            console.error(`Invalid bit value: ${bit} for character: ${char}`);
          }
          return num;
        }); // Convert string of 1s and 0s into an array of numbers
        console.log(`Converted string to array:`, converted);
        return converted;
      }
      
      // If it is already in an array, return it
      return brailleChar;
    })
    .filter(char => char !== null); // Filter out any null values
};
