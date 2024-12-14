import Tesseract from "tesseract.js";

export const performOCR = (image, language = "pan") => {
  return Tesseract.recognize(image, language, {
    logger: (info) => console.log(info),
  }).then(({ data: { text } }) => text);
};
