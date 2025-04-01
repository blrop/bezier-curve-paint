const colorGreen = 'rgb(34, 133, 49)';
const colorRed = 'rgb(133, 51, 34)';

const point1 = { x: 150, y: 555 };
const point2 = { x: 405, y: 60 };
const point3 = { x: 1100, y: 160 };

const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');

// $canvas.addEventListener('click', (e) => {
//     console.log(e.offsetX, e.offsetY);
// });

const getPointByPercent = (point1, point2, percent) => {
    const x = (point2.x * percent + point1.x * (100 - percent)) / 100;
    const y = (point2.y * percent + point1.y * (100 - percent)) / 100;

    return { x, y };
}

const setColor = (color) => {
    ctx.strokeStyle = color;
};

const drawLine = (point1, point2) => {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
};

const setLineWidth = (width) => {
    ctx.lineWidth = width;
};

drawCircle = (point, radius) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.stroke();
};

const p1 = { x: 25, y: 200 };
const p2 = { x: 500, y: 25 };

setLineWidth(3);

setColor(colorGreen);
drawLine(point1, point2);
drawLine(point2, point3);

setColor(colorRed);

let oldPoint = point1;
for (let i = 0; i <= 100; i++) {
    const point12 = getPointByPercent(point1, point2, i);
    const point23 = getPointByPercent(point2, point3, i);
    const currentPoint = getPointByPercent(point12, point23, i);

    drawLine(oldPoint, currentPoint);
    oldPoint = currentPoint;
}
