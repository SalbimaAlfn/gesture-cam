let spotlightRadius = 80;
let spotlightDirection = 1;

export default function spotlight({ ctx, canvas }) {
  spotlightRadius += 0.8 * spotlightDirection;
  if (spotlightRadius > 170 || spotlightRadius < 70) {
    spotlightDirection *= -1;
  }

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.5,
    10,
    canvas.width * 0.5,
    canvas.height * 0.5,
    spotlightRadius
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 0.18)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.5, canvas.height * 0.5, spotlightRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
