// Get canvas element and context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

// Set up stick figure
const stickFigureImage = new Image();
      stickFigureImage.src = 'images/b.png';
      let stickFigureX = 10;
      let stickFigureY = 10;
// resize function
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}
// canvas click function
canvas.addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    particlesArray.push(new Particle());
})
// canvas mousemove function
canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    particlesArray.push(new Particle());
})

// particle class
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
       this.x += this.speedX;
       this.y += this.speedY;
       if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
       ctx.fillStyle = this.color;
       ctx.beginPath();
       ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
       ctx.fill();
       
    }
}

// particles loop
function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}
// animate particles
function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}
animate();


// animate birds
function draw() {
    ctx.drawImage(stickFigureImage, stickFigureX, stickFigureY);
    stickFigureX += 6;
    if (stickFigureX > canvas.width) {
  stickFigureX = -stickFigureImage.width;
}
requestAnimationFrame(draw);
}
// Start animation
draw();