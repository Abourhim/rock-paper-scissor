//variables
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
const playAgain = document.querySelector(".replay");

//Restart game
restartGame.addEventListener("click", () => {
  window.location.reload();
});

//Showing up rules on click
ruleSection.querySelector("div").addEventListener("click", () => {
  ruleContainer.style.display = "flex";
});
closePopup.addEventListener("click", () => {
  ruleContainer.style.display = "none";
});

//Choose a card, hide the others and start the game
let handPicked = false;
const handClasses = ["paper", "rock", "scissors"];

let scissors = "scissors-choice";
let paper = "paper-choice";
let rock = "rock-choice";
let scoreCount = 0;
const createIcon = (item) => {
  playerWrap.innerHTML += `<img src="images/icon-${item}.svg" />`;
  playerChoise.classList.add(`${item}-choice`);
};

const createIconHouse = (item) => {
  houseWrap.innerHTML += `<img src="images/icon-${item}.svg" />`;
  houseChoise.classList.add(`${item}-choice`);
  houseWrap.style.visibility = "visible";
};

const removeClass = () => {
  playerChoise.className = "player-choice";
  houseChoise.className = "house-choice house-wait";
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
      setTimeout(() => {
        let iconsHandIndex = Math.floor(Math.random() * handClasses.length);
        let houseChoiseClass = `${handClasses[iconsHandIndex]}` + "-choice";

        houseChoise.classList.remove("pulse");
        scorePop.style.display = "block";
        playAgain.style.display = "block";
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
          scorePop.innerHTML = "Congrats you WON this round :)";
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

//Play Again with saving score
playAgain.addEventListener("click", () => {
  gameIcons.style.display = "block";
  gameStart.style.display = "none";
  scorePop.style.display = "none";
  playAgain.style.display = "none";
  houseWrap.style.visibility = "hidden";
  houseWrap.innerHTML = "";
  playerWrap.innerHTML = "";
  removeClass();
});
