import React, { useState, useEffect, useRef } from "react";
import "./LoadingScreen.scss";
import { playBackgroundMusic, playSound } from "../../utils/audioSystem.js";
import { useExperienceStore } from "../../stores/experienceStore.js";

const LoadingScreen = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [hasCompletedAnimation, setHasCompletedAnimation] = useState(false); // New state
  const animationRef = useRef(null);

  const {
    setIsExperienceReady,
    isExperienceLoading,
    loadedChunks,
    totalChunks,
  } = useExperienceStore();

  const loadingProgress = Math.round((loadedChunks / totalChunks) * 100);

  // Smoothly animate the displayed progress number
  useEffect(() => {
    if (loadingProgress > displayedProgress || !hasCompletedAnimation) {
      const animate = () => {
        setDisplayedProgress((prev) => {
          const step = Math.ceil((loadingProgress - prev) * 0.1);
          const newValue = prev + step;

          if (newValue >= loadingProgress) {
            const finalValue = Math.min(loadingProgress, 100);
            if (finalValue === 100) {
              setHasCompletedAnimation(true);
            }
            return finalValue;
          }
          animationRef.current = requestAnimationFrame(animate);
          return newValue;
        });
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loadingProgress, hasCompletedAnimation]);

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

  // Only show button if BOTH conditions are met:
  // 1. Loading is technically complete (loadedChunks >= totalChunks)
  // 2. The animation has visually reached 100%
  // Without visual jump to 100 it'd show the enter button when it's done loading.
  // I want it to go to 100 THEN show the enter button not jump to it when it's done.
  const showEnterButton =
    !isExperienceLoading &&
    loadedChunks >= totalChunks &&
    hasCompletedAnimation &&
    !isRevealed;

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
                style={{ width: `${Math.min(displayedProgress, 100)}%` }}
              ></div>
              <div className="percentage">
                {Math.min(displayedProgress, 100)}%
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
