import "./Camera.css";

import useCamera from "../../hooks/useCamera";
import useHandTracking from "../../hooks/useHandTracking";

export default function Camera() {

    const {
        videoRef,
        canvasRef,
        isReady
    } = useCamera();

    useHandTracking({
        videoRef,
        canvasRef,
        isReady
    });

    return (
        <div className="camera-container">

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="hidden-video"
            />

            <canvas
                ref={canvasRef}
                className="camera-canvas"
            />

        </div>
    );
}