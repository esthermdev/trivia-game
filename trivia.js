// Create global varialbes to access DOM objects
const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score')
let count = 0;
let currentQuestion = null;

// Function to get trivia question
function getTriviaQuestion() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Code to fetch random trivia will go here
            const index = Math.floor(Math.random() * questions.length); // get a random number
            const question = questions[index]; // use the random number as an index to get a random question from the array of questions

            if (index > questions.length) { // handle potential errors
                reject('An error occured while fetching the trivia question')
            } else {
                resolve(question); // resolve the promise
            }

        }, 1000); // Delay 1 second
    })
}

function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question;
    answerDiv.value = "";
    feedbackDiv.textContent = "";
}

document.getElementById('questionBtn').addEventListener('click', () => {
    getTriviaQuestion().then((question) => {
        currentQuestion = question;
        displayQuestion(question);
    })
    .catch((error) => console.log(error));
});

document.getElementById('answerBtn').addEventListener('click', () => {
    userAnswer = answerDiv.value.trim().toLowerCase();
    let feedbackMessage;
    if (currentQuestion && userAnswer === currentQuestion.answer.toLowerCase()) {
        feedbackDiv.style.color = 'green';
        feedbackMessage = 'You are correct!';
        count += 1;
    } else {
        feedbackDiv.style.color = 'red';
        feedbackMessage = 'You are wrong. Try again.';
        count = 0;
    }
    feedbackDiv.textContent = feedbackMessage;
    scoreDiv.textContent = `Score: ${count}`
    
    answerDiv.value = '';
    
    getTriviaQuestion().then((question) => {
        currentQuestion = question;
        displayQuestion(question);
    })
    .catch((error) => console.log(error));
})