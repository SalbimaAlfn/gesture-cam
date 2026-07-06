import { HAND_CONNECTIONS } from "../drawHands";

export default function neon({ ctx, canvas, landmarks }) {
  if (!landmarks?.length) {
    return;
  }

  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  ctx.strokeStyle = "#22d3ee";
  ctx.shadowBlur = 16;
  ctx.shadowColor = "#22d3ee";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  HAND_CONNECTIONS.forEach(([start, end]) => {
    const p1 = landmarks[start];
    const p2 = landmarks[end];
    ctx.beginPath();
    ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
    ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
    ctx.stroke();
  });

  ctx.fillStyle = "#60a5fa";
  landmarks.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x * canvas.width, point.y * canvas.height, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}
