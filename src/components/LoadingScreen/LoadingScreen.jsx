import React, { useState, useEffect } from "react";
import "./LoadingScreen.scss";
import { useProgress } from "@react-three/drei";
import { playBackgroundMusic, playSound } from "../../utils/audioSystem.js";
import { useExperienceStore } from "../../stores/experienceStore.js";

const LoadingScreen = () => {
  const { progress } = useProgress();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const { setIsExperienceReady, isExperienceLoading } = useExperienceStore();

  const handleReveal = () => {
    setIsRevealed(true);
    playBackgroundMusic();
    playSound("backgroundAmbience");
    playSound("thumpHover");
    setIsExperienceReady();
  };

  const handleAnimationFinished = () => {
    setIsAnimationFinished(true);
  };

  if (isAnimationFinished) {
    return null;
  }

  const showEnterButton =
    !isExperienceLoading && progress >= 100 && !isRevealed;

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
            Slowly Drag or Scroll to Navigate
          </div>

          {!isRevealed && !showEnterButton && (
            <div className="loading-bar-container">
              <div
                className="loading-bar"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
              <div className="percentage">
                {Math.round(Math.min(progress, 100))}%
              </div>
            </div>
          )}

          {showEnterButton && (
            <button className="loading-screen-button" onClick={handleReveal}>
              &nbsp; &nbsp; &nbsp; Enter World &nbsp; &nbsp; &nbsp;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
