const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Кількість контурів
const NUM_LINES = 5; 

let lines = [];

// Функція для створення нового контуру
function createLine() {
    return {
        points: [{ 
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height 
        }],
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 2, // Випадкова швидкість від 2 до 4
        maxLength: 100 // Довжина сліду
    };
}

// Створюємо кілька контурів
for (let i = 0; i < NUM_LINES; i++) {
    lines.push(createLine());
}

function draw() {
    ctx.fillStyle = "rgba(13, 17, 23, 0.05)"; // Прозорий фон для згасання сліду
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 70%)`; // Випадковий колір
        ctx.lineWidth = 2;

        line.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });

        ctx.stroke();

        // Оновлення позиції
        let lastPoint = line.points[line.points.length - 1];
        let newPoint = {
            x: lastPoint.x + Math.cos(line.angle) * line.speed,
            y: lastPoint.y + Math.sin(line.angle) * line.speed
        };

        // Обмеження руху в межах екрану
        if (newPoint.x < 0 || newPoint.x > canvas.width || newPoint.y < 0 || newPoint.y > canvas.height) {
            line.angle = Math.random() * Math.PI * 2; // Змінюємо напрямок руху
        } else {
            line.points.push(newPoint);
        }

        // Видалення старих точок для ефекту згасання
        if (line.points.length > line.maxLength) line.points.shift();
    });

    requestAnimationFrame(draw);
}

draw();
