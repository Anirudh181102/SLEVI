import React, { useState } from "react";
import Tesseract from "tesseract.js";
import punjabiToBraille from "./brailleMapping";

const FileUploadPunjabiOCR = () => {
  const [image, setImage] = useState(null);
  const [scannedText, setScannedText] = useState("");
  const [brailleText, setBrailleText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setScannedText("");
      setBrailleText("");
    }
  };

  const performOCR = () => {
    if (image) {
      setIsLoading(true);
      Tesseract.recognize(image, "pan", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          setScannedText(text);
          convertToBraille(text);
        })
        .catch((err) => {
          console.error("OCR Error:", err);
          setScannedText("Failed to extract text.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const convertToBraille = (text) => {
    const braille = text
      .split("")
      .map((char) => punjabiToBraille[char] || char)
      .join(" ");
    setBrailleText(braille);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setScannedText("");
    setBrailleText("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-[70%] mx-auto">
      {!image ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      ) : (
        <div className="relative w-full h-64">
          <img
            src={image}
            alt="Uploaded"
            className="object-contain w-full h-full rounded-lg"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white"
          >
            &times;
          </button>
        </div>
      )}

      {image && (
        <button
          onClick={performOCR}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Scanning..." : "Scan Image for Punjabi Text"}
        </button>
      )}

      {scannedText && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg w-full">
          <h3 className="text-lg font-bold">Scanned Text:</h3>
          <p className="mt-2 whitespace-pre-wrap">{scannedText}</p>
        </div>
      )}

      {brailleText && (
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg w-full">
          <h3 className="text-lg font-bold">Braille Conversion:</h3>
          <p className="mt-2 whitespace-pre-wrap text-lg">{brailleText}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadPunjabiOCR;
