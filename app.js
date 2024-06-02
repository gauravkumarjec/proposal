const questions = [
    { text: 'Do you like surprises?', yes: 'Great! Here’s another question.', no: 'Oh, come on! It’s fun!' },
    { text: 'Do you believe in love at first sight?', yes: 'That’s sweet! One more question.', no: 'Really? Let’s see if I can change your mind.' },
    { text: 'Can you keep a secret?', yes: 'Perfect! Last question.', no: 'Don’t worry, this one’s not a secret.' },
    { text: 'Will You be my Girl-Friend ?', yes: 'Yay! I\'m so happy! 💍❤️', no: 'Oh no! I\'ll try harder. 😢' }
];
let currentQuestion = 0;

function nextQuestion(answer) {
    const message = document.getElementById('message');
    const question = questions[currentQuestion];

    if (currentQuestion === questions.length - 1) {
        message.innerHTML = `<p>${question[answer ? 'yes' : 'no']}</p>`;
        message.classList.remove('hidden');
        message.classList.add(answer ? 'message-yes' : 'message-no');
        document.getElementById('question-container').classList.add('hidden');
        if (answer) showConfetti();
        return;
    }

    currentQuestion++;
    document.getElementById('question-header').innerText = question[answer ? 'yes' : 'no'];
    document.getElementById('question-text').innerText = questions[currentQuestion].text;

    if (currentQuestion === questions.length - 1) {
        document.querySelector('.yes-button').innerText = 'Yes';
        document.querySelector('.no-button').innerText = 'No';
    }
}




function showConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    canvas.classList.remove('hidden');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        const colors = ['#ff6f61', '#ff9a9e', '#fad0c4', '#28a745', '#ffc107'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 5,
            speedX: Math.random() * 5 - 2.5,
            speedY: Math.random() * 5 - 2.5,
            color: color
        };
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                particles[i] = createParticle();
            }
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }

    animate();
}


