const express = require("express");
const { SerialPort } = require("serialport");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow requests from your React app

// Configure the serial port (update 'COM6' with your Arduino port)
const port = new SerialPort({
  path: "COM6", // Update to match your Arduino's port
  baudRate: 9600,
});

// Endpoint to receive Braille text and send to Arduino
app.post("/send-braille", (req, res) => {
  const { brailleArray } = req.body;

  // Log the received Braille data
  console.log("Received Braille data:", JSON.stringify(brailleArray));

  // Validate the incoming Braille array
  if (!brailleArray || !Array.isArray(brailleArray)) {
    console.error("Invalid Braille array received:", brailleArray);
    return res.status(400).send("Invalid Braille array");
  }

  let index = 0;

  // Function to send each Braille character sequentially
  function sendNextCharacter() {
    if (index >= brailleArray.length) {
      console.log("All Braille characters sent successfully.");
      return res.status(200).send("Braille text sent successfully");
    }

    // Validate the current character
    if (!Array.isArray(brailleArray[index])) {
      console.error(`Invalid character data at index ${index}:`, brailleArray[index]);
      return res.status(400).send(`Invalid Braille data at index from server ${index}`);
    }

    // Convert the current character to a string
    const flatArray = brailleArray[index].flat().join("");

    console.log(`Sending Braille character [${index + 1}/${brailleArray.length}]:`, flatArray);

    port.write(flatArray, (err) => {
      if (err) {
        console.error("Error writing to serial port:", err);
        return res.status(500).send("Failed to send Braille data");
      }
      console.log(`Character sent successfully: ${flatArray}`);
      index++;
      setTimeout(sendNextCharacter, 1000);
    });
  }

  // Start sending the Braille data
  sendNextCharacter();
});

port.on("error", (err) => {
  console.error("Serial Port Error:", err.message);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
