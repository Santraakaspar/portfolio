const canvas = document.getElementById("mesh");
const ctx = canvas.getContext("2d");
const points = [];

function resize() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createPoints() {
  points.length = 0;
  const count = Math.max(34, Math.floor(window.innerWidth / 34));
  for (let i = 0; i < count; i += 1) {
    points.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: 1.5 + Math.random() * 2.5
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  points.forEach((point, index) => {
    point.x += point.vx;
    point.y += point.vy;
    if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

    ctx.beginPath();
    ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
    ctx.fillStyle = index % 3 === 0 ? "rgba(223, 91, 70, 0.38)" : "rgba(15, 139, 141, 0.32)";
    ctx.fill();

    for (let j = index + 1; j < points.length; j += 1) {
      const other = points[j];
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      if (distance < 140) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(23, 32, 51, ${0.1 - distance / 1800})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  resize();
  createPoints();
});

resize();
createPoints();
draw();
