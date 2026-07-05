import { useEffect } from "react";
import { createHandLandmarker } from "../services/mediapipe";
import drawHands from "../utils/drawHands";
import detectGesture from "../utils/detectGesture";
import applyEffect from "../utils/applyEffect";

export default function useHandTracking({
  videoRef,
  canvasRef,
  isReady,
}) {
  useEffect(() => {
    if (!isReady) return;

    let animationId;
    let detector;

    async function initialize() {
      detector = await createHandLandmarker();

      render();
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

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw mirrored camera
      ctx.save();

      ctx.scale(-1, 1);

      ctx.drawImage(
        video,
        -canvas.width,
        0,
        canvas.width,
        canvas.height
      );

      ctx.restore();

      // Hand detection
      const results = detector.detectForVideo(
        video,
        performance.now()
      );

if (results.landmarks.length > 0) {

  const landmarks = results.landmarks[0];

  drawHands(
    ctx,
    landmarks,
    canvas.width,
    canvas.height
  );

const gesture = detectGesture(landmarks);

applyEffect(
  ctx,
  canvas,
  video,
  gesture
);
  if (gesture !== "none") {
    console.log("Gesture:", gesture);
  }
}

      animationId = requestAnimationFrame(render);
    }

    initialize();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [videoRef, canvasRef, isReady]);
}