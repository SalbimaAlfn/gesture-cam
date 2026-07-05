import "./Camera.css";
import HUD from "../HUD/HUD";
import useCamera from "../../hooks/useCamera";
import useHandTracking from "../../hooks/useHandTracking";

export default function Camera() {

    const {
        videoRef,
        canvasRef,
        isReady
    } = useCamera();

    const tracking = useHandTracking({
    videoRef,
    canvasRef,
    isReady
});

    return (
  <div
    style={{
      position: "relative",
      width: "fit-content",
      margin: "0 auto",
    }}
  >
    <HUD
    cameraReady={isReady}
    tracking={tracking}
/>

    <video
      ref={videoRef}
      style={{ display: "none" }}
      playsInline
      muted
    />

    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "15px",
      }}
    />
  </div>
);
}