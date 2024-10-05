let currentQuestionIndex = 0;

const questions = [
    {
        question: "How many planets are in our Solar System?",
        answers: [
            { text: "8", correct: true, detail: "Yes! There are 8 planets orbiting our Sun." },
            { text: "9", correct: false, detail: "No, that's incorrect! The 9th planet was reclassified." }
        ],
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: [
            { text: "Earth", correct: false, detail: "Oops! Earth is our home, but not the largest." },
            { text: "Jupiter", correct: true, detail: "Correct! Jupiter is the giant of our Solar System!" }
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true, detail: "Correct! Mars is often called the Red Planet." },
            { text: "Venus", correct: false, detail: "Not quite! Venus is known as the Morning Star." }
        ],
    },
];

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question1");
    questionElement.innerHTML = `<p>${currentQuestion.question}</p>`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.onclick = () => checkAnswer(answer);
        questionElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const feedback = document.getElementById("quiz-feedback");

    feedback.innerText = selectedAnswer.correct ?
        "Great job! " + selectedAnswer.detail :
        "Oops! " + selectedAnswer.detail;

    if (selectedAnswer.correct) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                feedback.innerText = ""; // Clear feedback
                showQuestion(); // Show next question
            }, 2000); // Wait 2 seconds before showing next question
        } else {
            feedback.innerText = "You've completed the quiz! You're a space genius!";
        }
    }
}

window.onload = function () {
    const welcomeMessage = document.getElementById("welcome");
    const mainContent = document.getElementById("mainContent");

    setTimeout(() => {
        welcomeMessage.style.transform = "translateY(-100%)";
        welcomeMessage.style.opacity = 0;
        mainContent.style.transform = "translateY(-100vh)";
        mainContent.style.opacity = 1;
        showQuestion(); // Show the first question on load
    }, 3000);
};
const funFacts = [
    "The Milky Way galaxy is about 100,000 light-years across! 🌌",
    "There are more stars in the universe than grains of sand on all of Earth's beaches! 🌠",
    "One day on Venus is longer than one year on Venus! 🪐",
];

function showFunFact() {
    const factIndex = Math.floor(Math.random() * funFacts.length);
    document.getElementById("fun-fact-text").innerText = funFacts[factIndex];
}

function clearCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function saveCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvas.toDataURL();
    link.click();
}
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;

// Function to start drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath(); // Start a new path for drawing
    ctx.moveTo(getMousePos(canvas, e).x, getMousePos(canvas, e).y); // Move to mouse position
});

// Function to draw on the canvas
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.lineTo(getMousePos(canvas, e).x, getMousePos(canvas, e).y); // Draw line to mouse position
        ctx.strokeStyle = brushColor; // Set the brush color
        ctx.lineWidth = brushSize; // Set the brush size
        ctx.stroke(); // Render the path on the canvas
    }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save canvas image
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Get mouse position relative to the canvas
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Update brush color and size based on user input
document.getElementById('colorPicker').addEventListener('input', (e) => {
    brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('change', (e) => {
    brushSize = e.target.value;
});
function drawPlanet(planet) {
    clearCanvas(); // Clear the canvas before drawing a new planet
    ctx.fillStyle = brushColor; // Set the color for the planet
    ctx.beginPath(); // Start a new path

    // Draw planets with different styles
    switch (planet) {
        case 'Gliese 581g':
            ctx.arc(300, 200, 50, 0, Math.PI * 2); // Draw a circle for Gliese 581g
            ctx.fill(); // Fill the planet color
            ctx.fillStyle = 'green'; // Change color for rings
            ctx.beginPath();
            ctx.arc(300, 200, 70, 0, Math.PI * 2); // Draw rings
            ctx.stroke();
            break;

        case 'WASP-12b':
            ctx.arc(300, 200, 50, 0, Math.PI * 2); // Draw a circle for WASP-12b
            ctx.fill(); // Fill the planet color
            ctx.fillStyle = 'red'; // Change color for rings
            ctx.beginPath();
            ctx.arc(300, 200, 70, 0, Math.PI * 2); // Draw rings
            ctx.stroke();
            break;

        case 'Kepler-22b':
            ctx.arc(300, 200, 50, 0, Math.PI * 2); // Draw a circle for Kepler-22b
            ctx.fill(); // Fill the planet color
            ctx.fillStyle = 'blue'; // Change color for rings
            ctx.beginPath();
            ctx.arc(300, 200, 70, 0, Math.PI * 2); // Draw rings
            ctx.stroke();
            break;

        default:
            alert('Planet not found!');
            break;
    }

    ctx.fillStyle = brushColor; // Reset to original brush color for further drawing
}
function toggleFullscreen() {
    const canvasContainer = document.querySelector('.canvas-container');
    if (!document.fullscreenElement) {
        canvasContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}
