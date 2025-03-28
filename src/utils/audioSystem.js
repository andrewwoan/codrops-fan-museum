import { Howl, Howler } from "howler";

const sounds = {
  backgroundMusic: new Howl({
    src: ["/audio/music/background_music.ogg"],
    loop: true,
    volume: 0.8,
  }),
  backgroundAmbience: new Howl({
    src: ["/audio/sfx/background_ambience.ogg"],
    loop: true,
    volume: 0.9,
  }),

  thumpHover: new Howl({
    src: ["/audio/sfx/thump_hover.ogg"],
    loop: false,
    volume: 1.1,
  }),
};

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
