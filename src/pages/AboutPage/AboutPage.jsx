import React from "react";
import Page from "../Page";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <>
      <Page
        requireDarkRoom={true}
        panelContent={{
          title: "About Us",
          quote: "Revolutionizing architecture for the AI future.",
          content: [
            "At Daniels Design & Dev, we believe architecture is more than just form—it’s an experience. Our studio exists to bridge the gap between design and technology, helping architects bring their visions to life through stunning visuals and interactive digital experiences. Whether it’s minimalist conceptual renderings, immersive real-time environments, or parametric design solutions, we craft every project with precision, emotion, and a deep respect for spatial storytelling.",
          ],
        }}
        imageSrc={"/images/about.webp"}
      />
    </>
  );
};

export default AboutPage;
