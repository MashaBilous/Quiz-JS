const questions = [
  {
    question: "Which English king died in 1066, leaving no heir to the throne?",
    optionA: "Artur II",
    optionB: "Karl I",
    optionC: "Victor V",
    optionD: "Edward the Confessor",
    correctOption: "optionD",
  },

  {
    question:
      "The United Nations was formed in 1945, what organization did it replace?",
    optionA: "Warn Songress",
    optionB: "The League of Nations",
    optionC: "National congress",
    optionD: "United Nations",
    correctOption: "optionB",
  },

  {
    question:
      "Which famous Queen spent a lot of her childhood at Hertford Castle?",
    optionA: "Queen Mariia I",
    optionB: "Queen Elizabeth I",
    optionC: "Queen Victoriia I",
    optionD: "Queen Elizabeth II",
    correctOption: "optionD",
  },

  {
    question:
      "In which European country was there a civil war between 1946 and 1949?",
    optionA: "Russia",
    optionB: "Italy",
    optionC: "Greece",
    optionD: "Spain",
    correctOption: "optionC",
  },

  {
    question: "Which new British military force was established in 1918?",
    optionA: "NMA",
    optionB: "COI",
    optionC: "ASA",
    optionD: "RAF",
    correctOption: "optionD",
  },

  {
    question: "Queen Elizabeth II’s grandfather was which monarch?",
    optionA: "George V",
    optionB: "Karl V",
    optionC: "Edward II",
    optionD: "Artur I",
    correctOption: "optionA",
  },

  {
    question:
      "Which country was the first to give women the right to vote, in 1893?",
    optionA: "USA",
    optionB: "Spain",
    optionC: "New Zealand",
    optionD: "Greece",
    correctOption: "optionC",
  },

  {
    question: "Which country is the largest in the world ?",
    optionA: "Russia",
    optionB: "Canada",
    optionC: "Africa",
    optionD: "Egypt",
    correctOption: "optionA",
  },

  {
    question: "Where is the world tallest building located ?",
    optionA: "Africa",
    optionB: "California",
    optionC: "Dubai",
    optionD: "Italy",
    correctOption: "optionC",
  },

  {
    question: "The longest river in the United Kingdom is ?",
    optionA: "River Severn",
    optionB: "River Mersey",
    optionC: "River Trent",
    optionD: "River Tweed",
    correctOption: "optionA",
  },

  {
    question: "Which national team won the football World cup in 2018 ?",
    optionA: "England",
    optionB: "Brazil",
    optionC: "Germany",
    optionD: "France",
    correctOption: "optionD",
  },

  {
    question: "Los Angeles is also known as ?",
    optionA: "Angels City",
    optionB: "Shining city",
    optionC: "City of Angels",
    optionD: "Lost Angels",
    correctOption: "optionC",
  },

  {
    question: "What is the capital of Germany ?",
    optionA: "Georgia",
    optionB: "Missouri",
    optionC: "Oklahoma",
    optionD: "Berlin",
    correctOption: "optionD",
  },

  {
    question: "Who discovered penicillin?",
    optionA: "Alexander Fleming",
    optionB: "Steven Marc",
    optionC: "Olga Bert",
    optionD: "Anna Curyu",
    correctOption: "optionA",
  },

  {
    question: " What year did the Titanic sink?",
    optionA: "1948",
    optionB: "1835",
    optionC: "1912",
    optionD: "1998",
    correctOption: "optionC",
  },
];

let tenChoosenQuestions = [];

function questionsForGame() {
  while (tenChoosenQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!tenChoosenQuestions.includes(random)) {
      tenChoosenQuestions.push(random);
    }
  }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

function NextQuestion(index) {
  questionsForGame();
  const currentQuestion = tenChoosenQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = tenChoosenQuestions[indexNumber];
  const currentQuestionAnswer = currentQuestion.correctOption;
  const options = document.getElementsByName("option");
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      correctOption = option.labels[0].id;
    }
  });

  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = "green";
      playerScore++;
      indexNumber++;
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++;
      indexNumber++;
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
    localStorage.setItem("playerScore", playerScore);
    console.log(localStorage.getItem("playerScore"));
  });
}

function goToNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  setTimeout(() => {
    if (indexNumber <= 9) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  const playerGrade = (playerScore / 10) * 100;

  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("remarks").style.color = remarkColor;
  document.getElementById("grade-percentage").innerHTML = playerGrade;
  document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  tenChoosenQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

function goToMyChoice() {
  document.getElementById("option-modal").style.display = "none";
}

// localStorage.setItem("playerScore", playerScore);
// console.log(localStorage.getItem("playerScore"));
