import React, { useState } from "react";

import "./LoadingScreen.scss";

import { useProgress } from "@react-three/drei";

import { playBackgroundMusic, playSound } from "../../utils/audioSystem.js";
import { useExperienceStore } from "../../utils/experienceStore.js";

const LoadingScreen = () => {
  const { progress } = useProgress();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const { setIsExperienceReady } = useExperienceStore();

  const handleReveal = () => {
    setIsRevealed(true);
    playBackgroundMusic();
    playSound("backgroundAmbience");
    setIsExperienceReady();
  };

  const handleAnimationFinished = () => {
    setIsAnimationFinished(true);
  };

  if (isAnimationFinished) {
    return null;
  }

  return (
    <>
      <div className="loading-screen">
        <div
          className={`background-top-half ${isRevealed ? "revealed" : ""}`}
          onTransitionEnd={handleAnimationFinished}
        ></div>
        <div
          className={`background-bottom-half ${isRevealed ? "revealed" : ""}`}
        ></div>
        <div className="loading-screen-info-container">
          <div
            className={`instructions-container ${isRevealed ? "revealed" : ""}`}
          >
            Drag/Scroll Up/Down to Navigate
          </div>
          {progress < 100 ? (
            <div className="loading-bar-container">
              <div
                className="loading-bar"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="percentage">{Math.round(progress)}%</div>
            </div>
          ) : !isRevealed ? (
            <button onClick={handleReveal}>
              &nbsp; &nbsp; &nbsp; Enter World &nbsp; &nbsp; &nbsp;
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
