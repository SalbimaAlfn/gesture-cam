export default function applyEffect(ctx, canvas, video, gesture) {
  switch (gesture) {
    case "peace":
      drawBlur(ctx, canvas, video);
      break;

    case "thumbsUp":
      drawGray(ctx, canvas);
      break;

    default:
      break;
  }
}

function drawBlur(ctx, canvas, video) {
  ctx.save();

  ctx.filter = "blur(15px)";

  ctx.scale(-1, 1);

  ctx.drawImage(
    video,
    -canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  ctx.restore();

  ctx.filter = "none";
}

function drawGray(ctx, canvas) {
  const image = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const pixels = image.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const gray =
      pixels[i] * 0.299 +
      pixels[i + 1] * 0.587 +
      pixels[i + 2] * 0.114;

    pixels[i] = gray;
    pixels[i + 1] = gray;
    pixels[i + 2] = gray;
  }

  ctx.putImageData(image, 0, 0);
}