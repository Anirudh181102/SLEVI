import React from "react";

// Import images
import AnirudhImage from "../images/Anirudh.jpg";
import ManasImage from "../images/Manas.jpg"; 
import YashImage from "../images/Yash.jpg";
import AyushiImage from "../images/Ayushi.jpg";

function Contact() {
  const teamMembers = [
    {
      name: "Anirudh Agarwal",
      rollNo: "102153036",
      contactNo: "xxxxx",
      image: AnirudhImage, // Referencing the imported image
    },
    {
      name: "Manas Mishra",
      rollNo: "102103367",
      contactNo: "xxxxx",
      image: ManasImage, // Referencing the imported image
    },
    {
      name: "Yash Sharma",
      rollNo: "102103363",
      contactNo: "xxxxx",
      image: YashImage, // Referencing the imported image
    },
    {
      name: "Ayushi Verma",
      rollNo: "102103360",
      contactNo: "xxxxx",
      image: AyushiImage, // Referencing the imported image
    },
  ];

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl text-gray-200 mb-4">Contact Us</h1>
      <p className="text-gray-400 leading-7 mb-10">
        We are a passionate team dedicated to making education accessible for everyone. Feel free to reach out to us for more information about SLEVI or any collaboration opportunities.
      </p>
      <div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-6">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded shadow-md w-60"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="text-lg text-gray-200 font-bold">{member.name}</p>
              <p className="text-gray-400">
                <strong>Roll No:</strong> {member.rollNo}
              </p>
              <p className="text-gray-400">
                <strong>Contact No:</strong> {member.contactNo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
