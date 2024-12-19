import React from "react";

const OCRResultDisplay = ({ scannedText, brailleText, onSendToBraille, isSending }) => {
  return (
    <>
      {scannedText && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg w-full">
          <h3 className="text-lg font-bold">Scanned Text:</h3>
          <p className="mt-2 whitespace-pre-wrap">{scannedText}</p>
          <button
            onClick={onSendToBraille}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!brailleText || isSending}
          >
            {isSending ? "Sending..." : "Send to Braille Display"}
          </button>
        </div>
      )}
      {/* {brailleText && (
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg w-full">
          <h3 className="text-lg font-bold">Braille Conversion:</h3>
          <p className="mt-2 whitespace-pre-wrap text-lg">{brailleText}</p>
          
        </div>
      )} */}
    </>
  );
};

export default OCRResultDisplay;
