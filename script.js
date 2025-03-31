const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext("2d");

const x1 = 25;
const y1 = 200;
const x2 = 500;
const y2 = 25;

ctx.strokeStyle = 'rgb(255, 151, 160)';
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

const percent = 75;
const x = (x2 * percent + x1 * (100 - percent)) / 100;
const y = (y2 * percent + y1 * (100 - percent)) / 100;

ctx.beginPath();
ctx.arc(x, y, 10, 0, Math.PI * 2);
ctx.stroke();
