//variables
// const paper = document.querySelector(".paper");
// const rock = document.querySelector(".rock");
// const scissors = document.querySelector(".scissors");
const ruleSection = document.querySelector(".rules-sec");
const ruleContainer = document.querySelector(".rule-container");
const closePopup = document.querySelector(".close-popup");
const restartGame = document.querySelector(".restart-game");
const score = document.querySelector(".cou");
const gameArr = document.querySelectorAll(".single-icon");
const gameIcons = document.querySelector(".game-icones");
const gameStart = document.querySelector(".game-start");
const playerChoise = document.querySelector(".player-choice");
const houseChoise = document.querySelector(".house-choice");
const playerWrap = document.querySelector(".player-wrap");
const houseWrap = document.querySelector(".house-wrap");
const scorePop = document.querySelector(".score-pop");

//Restart game
restartGame.addEventListener("click", () => {
  window.location.reload();
});

//Showing up rules on click
const ruleShow = () => {
  ruleSection.addEventListener("click", () => {
    ruleContainer.style.display = "flex";
  });
  closePopup.addEventListener("click", () => {
    ruleContainer.style.display = "none";
  });
};

ruleShow();

//Choose a card, hide the others and start the game
let handPicked = false;
let handClasses = ["paper", "rock", "scissors"];
let iconsHandIndex = Math.floor(Math.random() * handClasses.length);
let houseChoiseClass = `${handClasses[iconsHandIndex]}` + "-choice";
// let playerChoiseScissors = playerChoise.classList.contains("scissors-choice");
// let playerChoisePaper = playerChoise.classList.contains("paper-choice");
// let playerChoiseRock = playerChoise.classList.contains("rock-choice");
let scissors = "scissors-choice";
let paper = "paper-choice";
let rock = "rock-choice";
let scoreCount = 0;

const createIcon = (item) => {
  let img = document.createElement("img");
  img.src = `images/icon-${item}.svg`;
  playerChoise.classList.add(`${item}-choice`);
  playerWrap.appendChild(img);
};

const createIconHouse = (item) => {
  let img = document.createElement("img");
  img.src = `images/icon-${item}.svg`;
  houseChoise.classList.add(`${item}-choice`);
  houseWrap.appendChild(img);
  houseWrap.style.visibility = "visible";
};

const scoreUpdate = () => {
  if (scoreCount < 0) {
    scoreCount = 0;
  } else score.innerHTML = scoreCount;
};

gameArr.forEach((icon) => {
  icon.addEventListener("click", () => {
    handPicked = true;
    gameIcons.style.display = "none";
    gameStart.style.display = "flex";
    houseChoise.classList.add("pulse");

    if (icon.classList.contains("rock")) {
      createIcon("rock");
    } else if (icon.classList.contains("paper")) {
      createIcon("paper");
    } else {
      createIcon("scissors");
    }

    //House pick random hand
    if (handPicked) {
      setInterval(() => {
        scorePop.style.display = "block";

        createIconHouse(handClasses[iconsHandIndex]);
        // console.log(handClasses[iconsHandIndex]);
        if (playerChoise.classList.contains(houseChoiseClass)) {
          scorePop.innerHTML = "It is a DRAW boyy!!";
        } else if (
          (playerChoise.classList.contains("scissors-choice") &&
            houseChoiseClass == paper) ||
          (playerChoise.classList.contains("paper-choice") &&
            houseChoiseClass == rock) ||
          (playerChoise.classList.contains("rock-choice") &&
            houseChoiseClass == scissors)
        ) {
          scoreCount++;
          scoreUpdate();
          scorePop.innerHTML = "Congrats you WON this round :)" + scoreCount;
          // console.log("Congrats you scored: " + scoreCount);
        } else {
          scoreCount--;
          scoreUpdate();
          scorePop.innerHTML = "GGs you Lost this round :(";
          // console.log("you lost: " + scoreCount);
        }
      }, 2000);
    }
  });
});

//Counting score based on selection and rules
//score goes up every time player win
//Score go down till 0 every time player lose
//Score doesn't change if it's draw
//scissors beats paper    A
//paper beats rock        B
//rock beats scissors     C
