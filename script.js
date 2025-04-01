const colorGreen = 'rgb(34, 133, 49)';
const colorRed = 'rgb(133, 51, 34)';

const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');

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

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

drawCircle = (point, radius) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.stroke();
};

const drawBezierCurve = (point1, point2, point3) => {
    setColor(colorGreen);
    setLineWidth(1);
    drawLine(point1, point2);
    drawLine(point2, point3);

    setColor(colorRed);
    setLineWidth(3);

    let oldPoint = point1;
    for (let i = 0; i <= 100; i++) {
        const point12 = getPointByPercent(point1, point2, i);
        const point23 = getPointByPercent(point2, point3, i);
        const currentPoint = getPointByPercent(point12, point23, i);

        drawLine(oldPoint, currentPoint);
        oldPoint = currentPoint;
    }
};

let selectedPoints = [];

$canvas.addEventListener('click', (e) => {
    if (selectedPoints.length < 3) {
        const point = { x: e.offsetX, y: e.offsetY };
        selectedPoints.push(point);

        setColor(colorRed);
        setLineWidth(3);
        drawCircle(point, 10);

        if (selectedPoints.length === 3) {
            clear();
            drawBezierCurve(...selectedPoints);
        }
    } else if (selectedPoints.length === 3) {
        clear();
        selectedPoints = [];
    }
});
