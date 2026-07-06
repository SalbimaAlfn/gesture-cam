export default function mirror({ ctx, canvas }) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#111827";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
