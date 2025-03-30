import { Howl, Howler } from "howler";

const isApplePlatform =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1) ||
    (/Mac/.test(navigator.userAgent) &&
      !/iPad|iPhone|iPod/.test(navigator.userAgent)));

const getFileExtension = () => (isApplePlatform ? "mp3" : "ogg");

const sounds = {
  backgroundMusic: new Howl({
    src: [`/audio/music/background_music.${getFileExtension()}`],
    loop: true,
    volume: 0.8,
  }),
  backgroundAmbience: new Howl({
    src: [`/audio/sfx/background_ambience.${getFileExtension()}`],
    loop: true,
    volume: 0.9,
  }),
  thumpHover: new Howl({
    src: [`/audio/sfx/thump_hover.${getFileExtension()}`],
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
