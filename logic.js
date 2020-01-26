const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let cords;
let colors;
let angle = 0.75;
let resize = 0.5;
let depth;
let startingRay = 200;
let updated;
let id;
const COLOR_ARRAY_LENGTH = 1024;
const smallestRadius = 3;
canvasContext.fillStyle = 'white';
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
generateColorArray();
updateCords();

function generateColorArray() {
    colors = Array.from({length: COLOR_ARRAY_LENGTH}, () => randomiseColor())
}
function restartColors() {
    generateColorArray();
    updateCords();
}
function updateInputs() {
    angle = parseFloat(document.getElementById("angle").value);
    resize = document.getElementById("resize").value;
    updateCords();
}
function updateNumberInput() {
    angle = parseFloat(document.getElementById("angle_slider").value);
    resize = document.getElementById("resize_slider").value;
    document.getElementById("angle").value = angle
    document.getElementById("resize").value = resize
    updateInputs();
}
function updateCords() {
    run();
    clear();
    drawFractal();
}

function run() {
    cords = [];
    id = 0;
    depth = 10;
    for (let i = 0; i < depth + 1; i++)
        cords.push([]);
    dfs(new Point(canvas.width / 2, canvas.height * 2 / 3), 1.5708, depth, startingRay);
}

function drawCircle(centerX, centerY, radius, color) {
    canvasContext.beginPath();
    canvasContext.fillStyle = color;
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    canvasContext.fill()
}

function randomiseColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function float2color(percentage) {
    var color_part_dec = 255 * percentage;
    var color_part_hex = Number(parseInt(color_part_dec, 10)).toString(16);
    return color_part_hex;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.id = id++;
    return this;
}

function clear() {
    canvasContext.rect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "white";
    canvasContext.fill();
}
function getColor(counter) {
    return colors[counter % COLOR_ARRAY_LENGTH];
}
function drawFractal() {
    
    for (let i = 0; i <= depth; i++) {
        for (let j = 0; j < cords[i].length; j++) {
            drawCircle(cords[i][j].x, cords[i][j].y, parseInt(startingRay * Math.pow(resize, (depth - i))), getColor(cords[i][j].id));
        }
    }
}

function rotate(p, angle) {
    var x = p.x;
    var y = p.y;
    p.x = x * Math.cos(angle) - y * Math.sin(angle);
    p.y = y * Math.cos(angle) - x * Math.sin(angle);
    return p;
}

function translate(r, angle, point) {
    var p = rotate(new Point(r, 0), angle);
    p.x += point.x;
    p.y += point.y;
    return p;
}

function left(point, direction, r) {
    return translate(r, direction - angle, point);
}

function right(point, direction, r) {
    return translate(r, direction + angle, point);
}

function dfs(point, direction, depth, r) {
    if (depth == -1 || r < smallestRadius)
        return;
    cords[depth].push(point);
    dfs(left(point, direction, r), direction - angle, depth - 1, r * resize);
    dfs(right(point, direction, r), direction + angle, depth - 1, r * resize);
}

