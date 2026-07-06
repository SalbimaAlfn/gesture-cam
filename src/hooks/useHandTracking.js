import { useEffect, useRef, useState } from "react";
import { createHandLandmarker } from "../services/mediapipe";
import gestureManager from "../services/gestureManager";
import applyEffect from "../utils/applyEffect";
import detectGesture from "../utils/detectGesture";
import drawHands from "../utils/drawHands";

const INITIAL_TRACKING_STATE = {
  handDetected: false,
  gesture: "none",
  effect: "None",
  fps: 0,
  confidence: 0,
};

function getEffectName(gesture) {
  switch (gesture) {
    case "peace": return "Blur";
    case "thumbsUp": return "Grayscale";
    case "ok": return "Pixelate";
    case "fist": return "Freeze";
    case "rock": return "Neon";
    case "heart": return "Hearts";
    case "wave": return "Mirror";
    case "point": return "Spotlight";
    default: return "None";
  }
}

export default function useHandTracking({ videoRef, canvasRef, isReady }) {
  const [trackingState, setTrackingState] = useState(INITIAL_TRACKING_STATE);
  const trackingRef = useRef(INITIAL_TRACKING_STATE);
  const mirrorModeRef = useRef(true);
  const previousLandmarksRef = useRef(null);
  const lastWaveToggleRef = useRef(0);

  useEffect(() => {
    if (!isReady) {
      return undefined;
    }

    let animationId = 0;
    let detector = null;
    let frameCount = 0;
    let fpsTimer = performance.now();

    async function initialize() {
      detector = await createHandLandmarker();
      render();
    }

    function updateTracking(nextState) {
      const previousState = trackingRef.current;
      const sameState =
        previousState.handDetected === nextState.handDetected &&
        previousState.gesture === nextState.gesture &&
        previousState.effect === nextState.effect &&
        previousState.fps === nextState.fps &&
        previousState.confidence === nextState.confidence;

      if (sameState) {
        return;
      }

      trackingRef.current = nextState;
      setTrackingState(nextState);
    }

    function render() {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {
        animationId = requestAnimationFrame(render);
        return;
      }

      if (video.readyState < 2) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      if (mirrorModeRef.current) {
        ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      const nextState = { ...trackingRef.current };
      nextState.handDetected = false;
      nextState.gesture = "none";
      nextState.effect = "None";
      nextState.confidence = 0;

      if (detector) {
        try {
          const results = detector.detectForVideo(video, performance.now());

          if (results.landmarks?.length) {
            const landmarks = results.landmarks[0];
            const rawGesture = detectGesture(landmarks, previousLandmarksRef.current);
            const now = performance.now();

            if (rawGesture === "wave" && now - lastWaveToggleRef.current > 450) {
              mirrorModeRef.current = !mirrorModeRef.current;
              lastWaveToggleRef.current = now;
            }

            const gesture = gestureManager.update(rawGesture);
            const frame = {
              ctx,
              canvas,
              video,
              landmarks,
              mirrorMode: mirrorModeRef.current,
            };

            applyEffect(frame, gesture);
            drawHands(ctx, landmarks, canvas.width, canvas.height, mirrorModeRef.current);

            nextState.handDetected = true;
            nextState.gesture = gesture;
            nextState.effect = getEffectName(gesture);
            nextState.confidence = gesture === "none" ? 0 : 100;
            previousLandmarksRef.current = landmarks;
          }
        } catch (error) {
          console.warn("Hand detection failed", error);
        }
      }

      frameCount += 1;
      const now = performance.now();

      if (now - fpsTimer >= 250) {
        nextState.fps = Math.round((frameCount * 1000) / (now - fpsTimer));
        frameCount = 0;
        fpsTimer = now;
      }

      updateTracking(nextState);
      animationId = requestAnimationFrame(render);
    }

    initialize();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, isReady, videoRef]);

  return trackingState;
}