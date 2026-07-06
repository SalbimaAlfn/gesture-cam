let frozenFrame = null;

export default function freeze({ ctx, canvas }) {
  if (!frozenFrame) {
    frozenFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  ctx.putImageData(frozenFrame, 0, 0);
}

export function resetFreeze() {
  frozenFrame = null;
}