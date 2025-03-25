import React from "react";
import Page from "../Page";
import "./DesignWorkPage.scss";

const DesignWorkPage = () => {
  return (
    <>
      <Page
        requireDarkRoom={false}
        panelContent={{
          title: "Design Work",
          quote: "The best design is more than beautiful, it's meaningful.",
          content: [
            "At Daniels, design is more than just an aesthetic pursuit—it’s an experiential dialogue between form and feeling. Our ethos revolves around the interplay of light, materiality, and negative space, curating environments that breathe, evolve, and evoke emotion. With a refined design language rooted in simplicity and precision, we specialize in architectural renderings, interactive visualizations, and immersive digital experiences that allow architects to explore their designs before they are built. We approach every project with the belief that space is not just occupied but experienced and that even the subtlest design elements can shape how one feels within a structure.",
            "By leveraging the latest in 3D modeling, real-time rendering, and computational design, we craft digital narratives that articulate architectural intent with clarity. Our work spans high-fidelity concept visualizations, virtual walkthroughs, and parametric design solutions—helping architects refine their visions with both efficiency and artistry. For us, technology should serve design, not overshadow it. By carefully integrating material textures, natural lighting simulations, and spatial acoustics, we create immersive environments that resonate with the human senses.",
            "Our signature aesthetic blends modernist restraint with poetic sensitivity, balancing stark minimalism with warmth and tactility. Whether working on a monolithic concrete retreat or an airy glass pavilion, we ensure that each visualization honors the integrity of the space—allowing architects to refine not just how their buildings will look, but how they will feel. This commitment to spatial awareness, emotion-driven design, and digital craftsmanship has made us an invaluable partner in the world of contemporary architecture.",
            "At our core, we believe great architecture is not just about structures—it’s about the moments they create. Through a symphony of design principles, digital precision, and artistic intuition, we continue to push the boundaries of architectural storytelling, helping architects not just imagine spaces—but experience them before they exist.",
          ],
        }}
        imageSrc={"/images/design.webp"}
      />
    </>
  );
};

export default DesignWorkPage;
