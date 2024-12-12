const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const socket = io();

// Drawing logic
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;

    const { offsetX, offsetY } = event;

    const drawData = {
        x: offsetX,
        y: offsetY,
    };

    socket.emit('draw_event', drawData);

    drawOnCanvas(drawData);
}

socket.on('draw_event', (data) => drawOnCanvas(data));

function drawOnCanvas({ x, y }) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fill();
}
