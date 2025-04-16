export const isApplePlatform = () => {
  if (typeof navigator === "undefined") return false;

  return (
    // iOS detection
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // Modern iPad detection (iOS 13+)
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1) ||
    // macOS detection
    (/Mac/.test(navigator.userAgent) &&
      !/iPad|iPhone|iPod/.test(navigator.userAgent))
  );
};

export const getAudioFileExtension = () => (isApplePlatform() ? "mp3" : "ogg");
