// request 2d drawing access to the canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// create an empty array to hold circles
var circles = [ ];


// this function gets run every 10ms to draw a new frame and update the state of the game
function draw()
{
    // clear the whole screen before drawing a new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ext.each will call drawCircle once for each object in the circle array
    Ext.each(circles, drawCircle);
}

function drawCircle(circle)
{
    // set the fill color to red
    ctx.fillStyle="#FF0000";
    
    // draw a circle and fill it in
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, true);
    ctx.closePath();
    
    ctx.fill();
    
    // update ball's position
    circle.x = circle.x + circle.dx;
    circle.y = circle.y + circle.dy;
    
    
    // check if ball is in contact with right or left edge
    if(circle.x >= canvas.width - circle.r || circle.x <= circle.r)
    {
        // flip the sign on dx to change direction between left/right
        circle.dx = circle.dx * -1;
    }
    
    // check if ball is in contact with right or left edge
    if(circle.y >= canvas.height - circle.r || circle.y <= circle.r)
    {
        // flip the sign on dy to change direction between up/down
        circle.dy = circle.dy * -1;
    }   
}


// listen for keyboard presses
Ext.getBody().on('keydown', function(ev) {
    //alert('key press: '+ev.keyCode);
    
    if(ev.keyCode == 32) // space bar
    {
        circles.push({
            r: 15
            ,x: 50
            ,y: 50
            ,dx: Math.random() * 10 - 5
            ,dy: Math.random() * 10 - 5
        });
        
        //console.log(circles);
    }
});


// start running the draw function every 10ms
setInterval(draw, 10); // 1000ms / 10ms = 100 frames per second​​​