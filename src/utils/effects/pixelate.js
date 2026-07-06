let pixelateCanvas = null;
let pixelateCtx = null;

export default function pixelate({ ctx, canvas }) {
  const scale = 0.08;

  if (!pixelateCanvas) {
    pixelateCanvas = document.createElement("canvas");
    pixelateCtx = pixelateCanvas.getContext("2d");
  }

  pixelateCanvas.width = Math.max(1, Math.round(canvas.width * scale));
  pixelateCanvas.height = Math.max(1, Math.round(canvas.height * scale));

  pixelateCtx.clearRect(0, 0, pixelateCanvas.width, pixelateCanvas.height);
  pixelateCtx.imageSmoothingEnabled = false;
  pixelateCtx.drawImage(canvas, 0, 0, pixelateCanvas.width, pixelateCanvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    pixelateCanvas,
    0,
    0,
    pixelateCanvas.width,
    pixelateCanvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  ctx.imageSmoothingEnabled = true;
}