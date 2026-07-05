import { useEffect, useRef, useState } from "react";

export default function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let stream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        setIsReady(true);
      } catch (error) {
        console.error(error);
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    isReady,
  };
}