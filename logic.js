var canvas = document.getElementById( "canvas" );

var canvasContext = canvas.getContext("2d");


var cords;
var angle;
var resize;
var depth;
var startingRay;
var updated;

var angle_ = 1;
var resize_ = 0.5;
var startingRay_ = 200;

const smallestRadius = 3;
canvasContext.fillStyle = 'white';
canvasContext.fillRect(0,0, canvas.width, canvas.height);

run();

setInterval(updateCords, 700);
setInterval(drawFractal,100);

function updateInputs()
{
    angle_ = parseFloat(document.getElementById("angle").value);
    
    resize_ = document.getElementById("resize").value;
    
    startingRay_ = document.getElementById("radius").value;
    
    updated = true;
}

function updateCords()
{
    if(!updated)
        return;
    
   /* cords = [];
    angle = angle_;
    resize = resize_;
    depth = 10;
    startingRay = startingRay_;
    */
    run();
    clear();
    updated = false;
      
}



function run()
{
    cords = [];
    angle = angle_;
    console.log(angle == angle_);
    resize = resize_;
    depth = 10;
    startingRay = startingRay_;
    
    
    for(let i = 0; i < depth + 1; i++)
        cords.push([]);
    dfs(new Point(canvas.width/2,canvas.height/2), 1.5708, depth, startingRay);
}

function drawCircle(centerX,centerY,radius, color)
{
    canvasContext.beginPath();
    canvasContext.fillStyle = color;
    canvasContext.arc(centerX,centerY, radius, 0, 2 * Math.PI);
    canvasContext.fill()
}

function randomiseColor()
{
    //console.log( float2color(Math.random()));
    return '#' + float2color(Math.random()) + float2color(Math.random()) + float2color(Math.random());
}

function float2color( percentage ) 
{
    var color_part_dec = 255 * percentage;
    var color_part_hex = Number(parseInt( color_part_dec , 10)).toString(16);
    return color_part_hex;
}

function Point (x, y)
{
    this.x = x;
    this.y = y;
    return this;
}

function clear()
{
    canvasContext.rect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle = "white";
    canvasContext.fill();
}

function drawFractal()
{
    
    for(let i = 0; i <= depth; i++)
    {
        
        for( let j = 0; j < cords[i].length ; j++)
            {
               drawCircle(cords[i][j].x,cords[i][j].y,parseInt(startingRay * Math.pow(resize,(depth - i))) ,randomiseColor());
            }        
    }
            
        
}

function rotate(p,angle)
{
    var x = p.x;
    var y = p.y;
    p.x = x * Math.cos(angle) - y * Math.sin(angle);
    p.y = y * Math.cos(angle) - x * Math.sin(angle);
    return p;
}


function translate(r,angle,point)
{
    var p = rotate(new Point(r,0),angle);
    p.x += point.x;
    p.y += point.y;
    return p;
}
function left(point, direction, r)
{
    
    return translate(r,direction - angle,point);
}

function right(point, direction, r)
{   
    return translate(r,direction + angle,point);
}


function dfs(point, direction, depth, r)
{
    if(depth == -1 || r < smallestRadius)
        return;
    cords[depth].push(point);
    
    dfs(left(point,direction,r),direction - angle, depth - 1, r * resize);
    console.log((r * resize) + " : " + direction);
    
    dfs(right(point,direction,r),direction + angle, depth - 1, r * resize);
       
}

