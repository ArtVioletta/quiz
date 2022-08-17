/*all answer options*/

const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

/* all our options*/

const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question");

const numberOfQuestion = document.getElementById(
    "number-of-questions"
  ) /*номер вопроса*/,
  numberOfAllQuestions = document.getElementById(
    "number-of-all-questions"
  ); /*кол-во всех вопросов*/

let indexOfQuestion, //индекс текущего вопроса
  indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById("answers-tracker"); //обертка для трекера
const btnNext = document.getElementById("btn-next"); //кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById("correct-answer"), // кол-во правильных ответов
  numberOfAllQuestions2 = document.getElementById(
    "number-of-all-questions-2"
  ) /*кол-во всех вопросов(в модальном окне)*/,
  btnTryAgain = document.getElementById("btn-try-again"); // кнопка начать викторину заново

const questions = [
  {
    question: "Сколько на данный момент существует языков программирования?",
    options: ["Около 200", "Около 500", "Чуть более 1000", "Более 8000"],
    rightAnswer: 3, //правильный ответ
  },
  {
    question: "Является ли язык программирования С++ объектно-ориентированным?",
    options: ["Да", "Нет", "Может быть", "Не знаю"],
    rightAnswer: 0,
  },
  {
    question: "Столица Польши?",
    options: ["Люблин", "Краков", "Варшава", "Гданськ"],
    rightAnswer: 2,
  },
];

numberOfAllQuestions.innerHTML = questions.length; //кол-во вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; //сам вопрос
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfAllQuestions.innerHTML = indexOfPage + 1; //установка номера текущей страницы
  indexOfPage++; //увеличение индкса страницы
};

let completedAnswers = []; //массив для заданныз вопросов

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; //якорь для проверки одинаковых вопросов

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

//удаление всех классов со всех ответов
const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Вам нужно выбрать один из вариантов ответа");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
