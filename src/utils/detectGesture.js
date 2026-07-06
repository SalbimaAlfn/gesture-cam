function isFingerExtended(landmarks, tipIndex, pipIndex) {
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  return tip.y < pip.y;
}

function isThumbAndIndexClose(landmarks) {
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  return Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y) < 0.05;
}

function detectPeace(landmarks) {
  const indexUp = isFingerExtended(landmarks, 8, 6);
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  return indexUp && middleUp && !ringUp && !pinkyUp;
}

function detectThumbsUp(landmarks) {
  const thumbUp = isFingerExtended(landmarks, 4, 3);
  const indexUp = isFingerExtended(landmarks, 8, 6);
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  return thumbUp && !indexUp && !middleUp && !ringUp && !pinkyUp;
}

function detectOk(landmarks) {
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  return isThumbAndIndexClose(landmarks) && middleUp && ringUp && pinkyUp;
}

function detectFist(landmarks) {
  const thumbUp = isFingerExtended(landmarks, 4, 3);
  const indexUp = isFingerExtended(landmarks, 8, 6);
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  return !thumbUp && !indexUp && !middleUp && !ringUp && !pinkyUp;
}

function detectRock(landmarks) {
  const indexUp = isFingerExtended(landmarks, 8, 6);
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  const thumbUp = isFingerExtended(landmarks, 4, 3);
  return indexUp && pinkyUp && !middleUp && !ringUp && !thumbUp;
}

function detectHeart(landmarks) {
  const thumbUp = isFingerExtended(landmarks, 4, 3);
  const indexUp = isFingerExtended(landmarks, 8, 6);
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  const thumbIndexClose = isThumbAndIndexClose(landmarks);
  return thumbUp && indexUp && middleUp && !ringUp && !pinkyUp && thumbIndexClose;
}

function detectPoint(landmarks) {
  const indexUp = isFingerExtended(landmarks, 8, 6);
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  const thumbUp = isFingerExtended(landmarks, 4, 3);
  return indexUp && !middleUp && !ringUp && !pinkyUp && !thumbUp;
}

function detectWave(landmarks, previousLandmarks) {
  if (!previousLandmarks) {
    return false;
  }

  const indexTip = landmarks[8];
  const previousIndexTip = previousLandmarks[8];
  const middleUp = isFingerExtended(landmarks, 12, 10);
  const ringUp = isFingerExtended(landmarks, 16, 14);
  const pinkyUp = isFingerExtended(landmarks, 20, 18);
  const thumbUp = isFingerExtended(landmarks, 4, 3);
  const indexUp = isFingerExtended(landmarks, 8, 6);

  const movedHorizontally = Math.abs(indexTip.x - previousIndexTip.x) > 0.12;
  const stayedLevel = Math.abs(indexTip.y - previousIndexTip.y) < 0.08;

  return indexUp && !middleUp && !ringUp && !pinkyUp && !thumbUp && movedHorizontally && stayedLevel;
}

export default function detectGesture(landmarks, previousLandmarks) {
  if (!landmarks || landmarks.length !== 21) {
    return "none";
  }

  if (detectPeace(landmarks)) return "peace";
  if (detectThumbsUp(landmarks)) return "thumbsUp";
  if (detectOk(landmarks)) return "ok";
  if (detectFist(landmarks)) return "fist";
  if (detectRock(landmarks)) return "rock";
  if (detectHeart(landmarks)) return "heart";
  if (detectWave(landmarks, previousLandmarks)) return "wave";
  if (detectPoint(landmarks)) return "point";

  return "none";
}