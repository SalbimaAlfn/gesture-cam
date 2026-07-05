const HAND_CONNECTIONS = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],

  // Index
  [0, 5], [5, 6], [6, 7], [7, 8],

  // Middle
  [5, 9], [9, 10], [10, 11], [11, 12],

  // Ring
  [9, 13], [13, 14], [14, 15], [15, 16],

  // Pinky
  [13, 17], [17, 18], [18, 19], [19, 20],

  // Palm
  [0, 17],
];

export default function drawHands(ctx, landmarks, width, height) {
  ctx.save();

  // Because the camera is mirrored
  ctx.translate(width, 0);
  ctx.scale(-1, 1);

  // Draw connections
  ctx.strokeStyle = "#00FF66";
  ctx.lineWidth = 4;

  HAND_CONNECTIONS.forEach(([start, end]) => {
    const p1 = landmarks[start];
    const p2 = landmarks[end];

    ctx.beginPath();
    ctx.moveTo(p1.x * width, p1.y * height);
    ctx.lineTo(p2.x * width, p2.y * height);
    ctx.stroke();
  });

  // Draw joints
  ctx.fillStyle = "#FF3333";

  landmarks.forEach((point) => {
    ctx.beginPath();

    ctx.arc(
      point.x * width,
      point.y * height,
      5,
      0,
      Math.PI * 2
    );

    ctx.fill();
  });

  ctx.restore();
}