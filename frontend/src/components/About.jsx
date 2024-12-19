import React from "react";

function About() {
  return (
    <div className="text-center p-4">
      <h1 className="text-3xl text-gray-200 mb-4">About SLEVI</h1>
      <p className="mt-2 text-gray-400 leading-7">
        **SLEVI** (Smart Learning for Visually Impaired) is an innovative Braille display kit designed to assist visually impaired individuals in learning the Braille language effectively. Our primary focus is to address the lack of resources available for regional languages, starting with Punjabi.
      </p>
      <p className="mt-4 text-gray-400 leading-7">
        The kit integrates cutting-edge technology with accessible learning methods. By utilizing Optical Character Recognition (OCR) through Google Tesseract, we convert images containing Punjabi text into Braille. The Braille is then displayed on a tactile output device powered by Arduino, making the learning experience interactive and efficient.
      </p>
      {/* <p className="mt-4 text-gray-700 leading-7">
        In addition to the tactile Braille display, SLEVI includes features like text-to-speech conversion, enabling users to hear the text while interacting with it in Braille. This dual-mode learning approach enhances comprehension and provides an inclusive education experience.
      </p> */}
      <p className="mt-4 text-gray-400 leading-7">
        Our ultimate goal is to empower visually impaired individuals with the tools they need to become independent learners, bridging the gap in educational opportunities for those who rely on regional languages. With SLEVI, we aim to create a more inclusive world where education is accessible to everyone, regardless of their abilities.
      </p>
    </div>
  );
}

export default About;
