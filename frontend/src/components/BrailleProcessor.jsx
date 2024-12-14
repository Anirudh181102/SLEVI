import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import OCRResultDisplay from "./OCRResultDisplay";
import { performOCR } from "../utils/ocrUtils";
import { convertToBraille } from "../utils/brailleUtils";

const BrailleProcessor = () => {
  const [image, setImage] = useState(null);
  const [scannedText, setScannedText] = useState("");
  const [brailleText, setBrailleText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set the image URL
      setScannedText(""); // Reset text fields
      setBrailleText("");
      // Do not revoke the URL here; it will make the image inaccessible.
      // URL.revokeObjectURL(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setScannedText("");
    setBrailleText("");
  };

  const handleOCR = async () => {
    if (image) {
      setIsLoading(true);
      try {
        const text = await performOCR(image);
        setScannedText(text);
        const braille = convertToBraille(text);
        console.log("Converted Braille data:", braille);
        setBrailleText(braille);
      } catch (err) {
        console.error("OCR Error:", err);
        setScannedText("Failed to extract text.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sendBrailleToArduino = async () => {
    if (!brailleText || !Array.isArray(brailleText)) {
      console.error("Braille text is empty or not in the correct format. Cannot send to Arduino.");
      return;
    }
  
    try {
      // Validate Braille data
      for (let i = 0; i < brailleText.length; i++) {
        if (!Array.isArray(brailleText[i]) || brailleText[i].some(row => !Array.isArray(row) || row.some(char => typeof char !== 'number'))) {
          console.error(`Invalid Braille data at index from frontend ${i}`);
          console.log("Invalid data:", brailleText[i]);
          return;
        }
      }
  
      console.log("braille text variable", brailleText);
  
      // Log the Braille data before sending
      console.log("Sending Braille data to backend:", JSON.stringify({ brailleArray: brailleText }));

      const response = await fetch("http://localhost:5000/send-braille", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brailleArray: brailleText }), // Send as array of arrays
      });
  
      if (response.ok) {
        console.log("Braille data sent to Arduino successfully!");
      } else {
        console.error("Failed to send Braille data:", await response.text());
      }
    } catch (err) {
      console.error("Error sending Braille data to Arduino:", err);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-[70%] mx-auto">
      <ImageUploader
        image={image}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
      />

      {image && (
        <button
          onClick={handleOCR}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Scanning..." : "Scan Image for Punjabi Text"}
        </button>
      )}

      <OCRResultDisplay
        scannedText={scannedText}
        brailleText={brailleText}
        onSendToBraille={sendBrailleToArduino}
        isSending={isSending}
      />
    </div>
  );
};

export default BrailleProcessor;
