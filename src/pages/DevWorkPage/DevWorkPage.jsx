import React from "react";
import Page from "../Page";
import "./DevWorkPage.scss";

const DevWorkPage = () => {
  return (
    <>
      <Page
        requireDarkRoom={true}
        panelContent={{
          title: "Development Work",
          quote:
            "Transforming visionary designs into seamless digital realities.",
          content: [
            "Our development side is where innovation meets execution, transforming creative concepts into interactive, functional, and technically sound digital experiences. While our design team focuses on the aesthetics and emotional depth of architecture, our development team ensures that these visions are translated seamlessly into interactive and dynamic experiences.",
            "From parametric modeling tools to custom-built interactive platforms, we empower architects with the ability to explore their designs beyond static imagery. Leveraging the latest in WebGL, Three.js, Unreal Engine, and Blender, we create digital environments that architects can navigate, manipulate, and refine in real time.",
            "By integrating optimized rendering engines, efficient asset management systems, and real-time lighting calculations, we ensure that every interactive experience is as fluid and responsive as it is visually compelling. We also pioneer the use of cloud-based architectural collaboration tools, enabling real-time feedback and iterative design refinement with stakeholders across the globe.",
            "With expertise in computational design scripting, BIM integrations, and procedural generation, we build custom digital tools that allow architects to generate, analyze, and refine complex forms with precision. By bridging the gap between design artistry and digital efficiency, we transform abstract concepts into tangible, interactive experiences that elevate the architectural process.",
          ],
        }}
        imageSrc={"/images/dev.webp"}
      />
    </>
  );
};

export default DevWorkPage;
