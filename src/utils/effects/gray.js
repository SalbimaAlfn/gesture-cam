let offscreenCanvas = null;
let offscreenCtx = null;

export default function gray({ ctx, canvas }) {
  if (!offscreenCanvas) {
    offscreenCanvas = document.createElement("canvas");
    offscreenCtx = offscreenCanvas.getContext("2d");
  }

  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;

  offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  offscreenCtx.filter = "grayscale(100%)";
  offscreenCtx.drawImage(canvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
  offscreenCtx.filter = "none";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(offscreenCanvas, 0, 0);
}