import "./HUD.css";

export default function HUD({
  cameraReady = false,
  tracking,
}) {
  return (
    <div className="hud">
      <div className="hud-header">
        <h2>GestureCam AI</h2>
      </div>

      <div className="hud-body">
        <div className="hud-item">
          <span>📷 Camera</span>
          <span className={cameraReady ? "green" : "red"}>
            {cameraReady ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="hud-item">
          <span>🖐 Hand</span>
          <span className={tracking.handDetected ? "green" : "red"}>
            {tracking.handDetected ? "Detected" : "Not Found"}
          </span>
        </div>

        <div className="hud-item">
          <span>✋ Gesture</span>
          <span>{tracking.gesture}</span>
        </div>

        <div className="hud-item">
          <span>✨ Effect</span>
          <span>{tracking.effect}</span>
        </div>

        <div className="hud-item">
          <span>⚡ FPS</span>
          <span>{tracking.fps}</span>
        </div>
      </div>
    </div>
  );
}