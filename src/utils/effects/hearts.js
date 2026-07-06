let particles = [];
const MAX_PARTICLES = 24;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeartParticle(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: randomBetween(10, 20),
    speed: randomBetween(1.2, 2.4),
    alpha: 1,
    drift: randomBetween(-0.8, 0.8),
  };
}

export default function hearts({ ctx, canvas }) {
  if (particles.length < MAX_PARTICLES) {
    particles.push(createHeartParticle(canvas));
  }

  particles = particles.filter((particle) => particle.alpha > 0.02);

  particles.forEach((particle) => {
    particle.y -= particle.speed;
    particle.x += particle.drift;
    particle.alpha -= 0.012;

    ctx.save();
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = "#ff5e7a";
    ctx.font = `${particle.size}px serif`;
    ctx.fillText("♥", particle.x, particle.y);
    ctx.restore();
  });
}
