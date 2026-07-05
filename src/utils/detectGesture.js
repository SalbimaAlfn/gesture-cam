export default function detectGesture(landmarks) {
  if (!landmarks || landmarks.length !== 21) {
    return "none";
  }

  // Finger tips
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  // Finger joints
  const thumbIP = landmarks[3];
  const indexPIP = landmarks[6];
  const middlePIP = landmarks[10];
  const ringPIP = landmarks[14];
  const pinkyPIP = landmarks[18];

  // Finger states
  const thumbUp = thumbTip.y < thumbIP.y;

  const indexUp = indexTip.y < indexPIP.y;
  const middleUp = middleTip.y < middlePIP.y;
  const ringUp = ringTip.y < ringPIP.y;
  const pinkyUp = pinkyTip.y < pinkyPIP.y;

  // ✌ Peace
  if (
    indexUp &&
    middleUp &&
    !ringUp &&
    !pinkyUp
  ) {
    return "peace";
  }

  // 👍 Thumbs Up
  if (
    thumbUp &&
    !indexUp &&
    !middleUp &&
    !ringUp &&
    !pinkyUp
  ) {
    return "thumbsUp";
  }

  return "none";
}