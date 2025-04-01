const COLOR_GREEN = 'rgb(34, 133, 49)';
const COLOR_RED = 'rgb(133, 51, 34)';
const COLOR_YELLOW = 'rgb(222,189,56)';
const POINT_SIZE = 10;

const $canvasWrapper = document.getElementById('canvas-wrapper');
const $canvas = document.getElementById('canvas');
const canvasWidth = $canvasWrapper.clientWidth;
const canvasHeight = $canvasWrapper.clientHeight;
$canvas.width = canvasWidth;
$canvas.height = canvasHeight;

const ctx = $canvas.getContext('2d');

const getPointByPercent = (point1, point2, percent) => {
    const x = (point2.x * percent + point1.x * (100 - percent)) / 100;
    const y = (point2.y * percent + point1.y * (100 - percent)) / 100;

    return { x, y };
}

const getRandomPoint = (width, height) => {
    return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
    };
};

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
    setLineWidth(1);
    setColor(COLOR_GREEN);

    drawLine(point1, point2);
    drawLine(point2, point3);

    setColor(COLOR_YELLOW);

    drawCircle(point1, POINT_SIZE);
    drawCircle(point2, POINT_SIZE);
    drawCircle(point3, POINT_SIZE);

    setLineWidth(3);
    setColor(COLOR_RED);

    let oldPoint = point1;
    for (let i = 0; i <= 100; i++) {
        const point12 = getPointByPercent(point1, point2, i);
        const point23 = getPointByPercent(point2, point3, i);
        const currentPoint = getPointByPercent(point12, point23, i);

        drawLine(oldPoint, currentPoint);

        oldPoint = currentPoint;
    }
};

const points = [
    getRandomPoint(canvasWidth, canvasHeight),
    getRandomPoint(canvasWidth, canvasHeight),
    getRandomPoint(canvasWidth, canvasHeight),
];
let draggingPointIndex = -1;
let dragStartDelta = null;

drawBezierCurve(...points);

$canvas.addEventListener('mousedown', (e) => {
    draggingPointIndex = points.findIndex((point) => {
        return (
            Math.abs(point.x - e.offsetX) <= POINT_SIZE &&
            Math.abs(point.y - e.offsetY) <= POINT_SIZE
        );
    });
    if (draggingPointIndex === -1) {
        return;
    }

    dragStartDelta = {
        x: e.offsetX - points[draggingPointIndex].x,
        y: e.offsetY - points[draggingPointIndex].y,
    };
});

$canvas.addEventListener('mousemove', (e) => {
    if (draggingPointIndex === -1) {
        return;
    }

    points[draggingPointIndex] = {
        x: e.offsetX + dragStartDelta.x,
        y: e.offsetY + dragStartDelta.y,
    };

    clear();
    drawBezierCurve(...points);
});

$canvas.addEventListener('mouseup', () => {
    draggingPointIndex = -1;
});
