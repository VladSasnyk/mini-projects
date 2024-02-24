const questions = [
    {
        question: "Що таке HTML?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Як звільнити пам'ять в JavaScript?",
        options: ["freeMemory()", "clearMemory()", "deleteMemory()"],
        answer: "clearMemory()"
    },
    {
        question: "Якого року випущений CSS?",
        options: ["1996", "1998", "2000"],
        answer: "1996"
    },
    {
        question: "Що таке CSS?",
        options: ["Counter Strike: Source", "Computer Style Sheets", "Creative Style System"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Які основні типи даних в JavaScript?",
        options: ["String, Boolean, Number, Object, Array", "Text, Boolean, Integer, Object, Collection", "Chars, TrueFalse, Integers, Objects, Lists"],
        answer: "String, Boolean, Number, Object, Array"
    },
    {
        question: "Як створити елемент списку в HTML?",
        options: ["<ol>", "<li>", "<ul>", "<dl>"],
        answer: "<ul>"
    },
    {
        question: "Що таке DOM?",
        options: ["Document Object Model", "Data Object Model", "Design Object Model"],
        answer: "Document Object Model"
    },
    {
        question: "Як визначити змінну в JavaScript?",
        options: ["let", "variable", "var", "v"],
        answer: "let"
    },
    {
        question: "Які основні типи селекторів в CSS?",
        options: ["Class, ID, Tag", "Element, Attribute, Value", "Parent, Child, Sibling"],
        answer: "Class, ID, Tag"
    },
    {
        question: "Що означає абревіатура AJAX?",
        options: ["Asynchronous JavaScript and XML", "Advanced JavaScript and XML", "Asynchronous JavaScript and XHTML"],
        answer: "Asynchronous JavaScript and XML"
    }
];

const checkAnswerButton = document.querySelector('.checkButton');
const testsButton = document.querySelector('.tests__button')

let currentQuestion = 0;
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('resultTest');

function loadQuestion() {
    checkAnswerButton.style.display = 'flex';
    const currentQuestionData = questions[currentQuestion];
    questionElement.textContent = currentQuestionData.question;

    optionsElement.innerHTML = "";
    currentQuestionData.options.forEach((option, index) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = option;
        input.id = `option${index}`;

        const label = document.createElement('label');
        label.textContent = option;
        label.setAttribute('for', `option${index}`);

        optionsElement.appendChild(input);
        optionsElement.appendChild(label);
    });
}
let trueAnswers = 0;


function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;

        if (userAnswer === questions[currentQuestion].answer) {
            resultElement.textContent = "Правильно!";
            trueAnswers++;
        } else {
            resultElement.textContent = "Неправильно. Правильний варіант: " + questions[currentQuestion].answer;
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            resultElement.textContent = `Тест завершено, правильних відповідей: ${trueAnswers} / 10`;
            optionsElement.innerHTML = "";
            questionElement.textContent = "";
            currentQuestion = 0;
            trueAnswers = 0;
            checkAnswerButton.style.display = 'none';
        }
    } else {
        resultElement.textContent = "Виберіть варіант відповіді";
    }
}

checkAnswerButton.addEventListener('click',checkAnswer);
testsButton.addEventListener('click',loadQuestion);






