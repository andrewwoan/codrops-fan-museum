// utils/audioSystem.js
import { Howl, Howler } from "howler";

// Create sound instances
const sounds = {
  backgroundMusic: new Howl({
    src: ["/audio/music/background_music.ogg"],
    loop: true,
    volume: 0.7,
  }),
  backgroundAmbience: new Howl({
    src: ["/audio/sfx/background_ambience.ogg"],
    loop: true,
    volume: 0.8,
  }),

  thumpHover: new Howl({
    src: ["/audio/sfx/thump_hover.ogg"],
    loop: false,
    volume: 1.0,
  }),
};

// Audio control functions
export const playSound = (soundId) => {
  sounds[soundId]?.play();
};

export const playBackgroundMusic = () => {
  sounds.backgroundMusic.play();
};

export const stopBackgroundMusic = () => {
  sounds.backgroundMusic.stop();
};

export const pauseBackgroundMusic = () => {
  sounds.backgroundMusic.pause();
};

export { sounds, Howler };
