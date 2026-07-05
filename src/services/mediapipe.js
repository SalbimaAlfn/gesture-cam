import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";

let handLandmarker = null;

export async function createHandLandmarker() {
  if (handLandmarker) {
    return handLandmarker;
  }

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/models/hand_landmarker.task",
    },

    runningMode: "VIDEO",

    numHands: 1,

    minHandDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  });

  return handLandmarker;
}