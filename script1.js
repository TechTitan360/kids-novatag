document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("mainContent");
    const welcome = document.getElementById("welcome");

    // Smooth transition from welcome message to main content
    setTimeout(() => {
        welcome.style.opacity = '0';
        setTimeout(() => {
            welcome.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 500);
    }, 3000);

    // Initialize canvas and its event listeners
    initializeCanvas();
    showQuestion(); // Start the quiz right away
});

let currentFactIndex = 0;
let autoFactsInterval = null;

const funFacts = [
    "The hottest exoplanet ever discovered is over 4,000 degrees Fahrenheit! 🔥",
    "Some exoplanets are made almost entirely of diamond! 💎✨",
    "The first exoplanet was discovered in 1992, and we've found thousands since! 🪐",
    "There are more stars in the universe than grains of sand on all Earth's beaches! 🌌",
    "The Milky Way galaxy is about 100,000 light-years across! 🚀",
    "Did you know some planets have more than 60 moons? Saturn has 83 confirmed moons! 🌕",
    "A day on Venus is longer than a year on Venus! 🌠",
    "Jupiter is so big that more than 1,300 Earths could fit inside it! 🌍🪐",
    "Neutron stars are so dense that a sugar-cube-sized piece of one would weigh a billion tons! 🌟",
    "Space is completely silent because there is no air for sound to travel through! 🤫",
    "If you could fly to Pluto in an airplane, it would take over 800 years! ✈️🪐",
    "Mars has the tallest volcano in the Solar System—Olympus Mons, which is three times taller than Mount Everest! ⛰️",
    "Saturn's rings are made mostly of ice and rock, some pieces as small as pebbles, others as big as cars! 🚀",
    "There is a planet called WASP-12b that is so close to its star, it completes one orbit in just one Earth day! 🌞",
    "A year on Neptune lasts 165 Earth years! 🌀",
    "One day on Mercury lasts as long as 59 days on Earth! 🌏",
    "The Sun is 4.6 billion years old and will shine for another 5 billion years! ☀️",
    "Astronauts grow up to 2 inches taller while they are in space! 🚀",
    "It takes light only 8 minutes to travel from the Sun to Earth! 🌞🌍",
    "The footprints left by astronauts on the Moon will stay there for millions of years because there is no wind to blow them away! 🌕👣",
    "There are planets called 'rogue planets' that do not orbit any star, they just float through space! 🌌🪐",
    "Uranus is the only planet that spins on its side! 🌀",
    "Venus is the hottest planet in the Solar System, even hotter than Mercury! 🌡️",
    "Some stars are over 100 times bigger than our Sun! 🌟☀️",
    "On some exoplanets, it rains molten glass sideways at thousands of miles per hour! 🌧️💎🔥"
];

function showFunFact() {
    const factIndex = Math.floor(Math.random() * funFacts.length);
    document.getElementById("fun-fact-text").innerText = funFacts[factIndex];
}


// Event listeners for previous and next buttons
document.getElementById("next-fact").addEventListener("click", nextFunFact);
document.getElementById("prev-fact").addEventListener("click", prevFunFact);

// Initialize the first fun fact on page load
document.addEventListener("DOMContentLoaded", () => {
    showFunFact(currentFactIndex);
    toggleAutoFacts(); // Start the auto fun facts by default
});


// Function to simulate exploring a planet
function explorePlanet(planet) {
    alert(`Exploring ${planet}! 🌠 What will we find there?`);
}

// Canvas Drawing Functionality
function initializeCanvas() {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;

    // Event listeners for drawing on canvas
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        draw(e.offsetX, e.offsetY);
    });

    canvas.addEventListener("mouseup", () => {
        drawing = false;
        ctx.beginPath();
    });

    canvas.addEventListener("mousemove", (e) => {
        if (drawing) {
            draw(e.offsetX, e.offsetY);
        }
    });

    // Draw function
    function draw(x, y) {
        ctx.lineWidth = document.getElementById("brushSize").value;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("colorPicker").value;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Clear canvas
    document.querySelector(".bin-button").addEventListener("click", clearCanvas);
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Save canvas as image
    document.querySelector(".bookmarkBtn").addEventListener("click", saveCanvas);
    function saveCanvas() {
        const link = document.createElement("a");
        link.download = "my-exoplanet.png";
        link.href = canvas.toDataURL();
        link.click();
    }

    // Toggle fullscreen mode
    document.querySelector(".fullscreen-button").addEventListener("click", toggleFullscreen);
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Space Quiz Functionality
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

// Function to display a quiz question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question1");
    questionElement.innerHTML = `<p>${currentQuestion.question}</p>`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.className = "answer-button";
        button.innerText = answer.text;
        button.onclick = () => checkAnswer(answer);
        questionElement.appendChild(button);
    });
}

// Function to check quiz answers and move to the next question
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

// Function to draw a specific planet on the canvas
function drawPlanet(planet) {
    alert(`Drawing your version of ${planet}! 🎨`);
}

document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("mainContent");
    const welcome = document.getElementById("welcome");
    const body = document.body; // Reference to the body element

    // Add class to hide scrollbar
    body.classList.add('no-scroll');

    // Smooth transition from welcome message to main content
    setTimeout(() => {
        welcome.style.opacity = '0';
        setTimeout(() => {
            welcome.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            // Remove class to allow scrolling once main content is shown
            body.classList.remove('no-scroll');
        }, 500);
    }, 3000);

    // Initialize the first fun fact on page load
    showFunFact(currentFactIndex);
    toggleAutoFacts(); // Start the auto fun facts by default
});
