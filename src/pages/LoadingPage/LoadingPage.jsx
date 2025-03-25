import React, { useState, useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import "./LoadingPage.scss";
import { useExperienceStore } from "../../stores/experienceStore";

const LoadingScreen = () => {
  const { progress } = useProgress();
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const progressText = useRef(null);
  const progressBar = useRef(null);
  const loadingScreenRef = useRef(null);
  const messageRef = useRef(null);
  const { setIsExperienceReady } = useExperienceStore();
  const [onlyOnce, setOnlyOnce] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress === 100 && !onlyOnce) {
      setOnlyOnce(true);
      setIsExperienceReady(true);

      const tl = gsap.timeline();

      tl.to(
        progressText.current,
        {
          opacity: 0,
          duration: 1.5,
          delay: 0.7,
          ease: "power2.out",
        },
        "fadeOut"
      )
        .to(
          progressBar.current,
          {
            opacity: 0,
            duration: 1.5,
            delay: 0.7,
            ease: "power2.out",
          },
          "fadeOut"
        )
        .to(messageRef.current, {
          opacity: 1,
          duration: 0.7,
          y: "-100%",
          ease: "power2.out",
        })
        .to(messageRef.current, {
          opacity: 0,
          duration: 1.5,
          delay: 1,
          y: "-200%",
          ease: "power2.out",
        })
        .to(
          topHalfRef.current,
          {
            y: "-100%",
            duration: 1.25,
            ease: "power2.out",
          },
          "-=0.75"
        )
        .to(
          bottomHalfRef.current,
          {
            y: "100%",
            duration: 1.25,
            ease: "power2.out",
            onComplete: () => {
              setIsVisible(false);
            },
          },
          "<"
        );
    }
  }, [progress]);

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={loadingScreenRef} className="loading-screen">
      <div ref={topHalfRef} className="background-top-half"></div>
      <div ref={bottomHalfRef} className="background-bottom-half"></div>
      <div className="loading-screen-info-container">
        <div ref={messageRef} className="intro-message-container">
          welcome.
        </div>
        <div className="loading-bar-container">
          <div
            ref={progressBar}
            className="loading-bar"
            style={{ width: `${progress}%` }}
          ></div>
          <div ref={progressText} className="percentage">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
