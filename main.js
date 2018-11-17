function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function random() {
  return Math.random();
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//cube
// c.fillStyle = '#459876';
// c.fillRect(100,100,100,100);
// c.fillStyle = 'rgb(40, 120, 150)';
// c.fillRect(600,300,100,100);
// c.fillStyle = 'tomato';
// c.fillRect(400,100,100,100);

//line
// c.beginPath();
// c.moveTo(50, 400);
// c.lineTo(300,100);
// c.lineTo(300,300);
// c.strokeStyle = '#458963';
// c.stroke();

//arc
// c.beginPath();
// c.arc(300, 400, 80, 0, 6.28, false)
// c.strokeStyle = 'black';
// c.stroke();

// for (let i = 0; i < 1000; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 20, 0, 6.28, false)
//   c.strokeStyle = getRandomColor();
//   c.stroke();
// }

//arc move
var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('resize', (e)=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

canvas.addEventListener('mousemove', (e)=>{
  mouse.x = e.layerX;
  mouse.y = e.layerY;
})

function Circle(x, y, dx, dy, radius, maxRadius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.maxRadius = maxRadius;
  this.minRadius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill()
  };

  this.update = function() {
    this.draw();
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x+= this.dx;
    this.y+= this.dy;
    if (mouse.x - this.x < 30 && mouse.x - this.x > -30 && mouse.y - this.y < 30 && mouse.y - this.y > -30) {
      if (this.radius < this.maxRadius) {
        this.radius += 4;
      }
    }else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
  };
}

var circelArray = [];
for (let i = 0; i < 800; i++) {
  var radius = random() * 15 + 1;
  var maxRadius = 50;
  var color = getRandomColor();
  var x = random() * (innerWidth - radius * 2) + radius;
  var y = random() * (innerHeight - radius * 2) + radius;
  var dx = (random() - 0.5) * 10;
  var dy = (random() - 0.5) * 10;
  circelArray.push(new Circle(x, y, dx, dy, radius, maxRadius, color));
}

function animateArc() {
  requestAnimationFrame(animateArc);
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < circelArray.length; i++) {
    circelArray[i].update()
  }
}

animateArc()
















