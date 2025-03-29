const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class RandomShape {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 10;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.angle = Math.random() * Math.PI * 2;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x, this.y + this.size * 2);
        ctx.closePath();
        ctx.stroke();
    }
}

const shapes = [];
for (let i = 0; i < 10; i++) {
    shapes.push(new RandomShape());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
        shape.update();
        shape.draw();
    });
    requestAnimationFrame(animate);
}
animate();
