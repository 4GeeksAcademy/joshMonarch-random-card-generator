import "bootstrap";
import "./style.css";

const randNum = (min, max) => Math.floor(Math.random() * (max-min)) + min;
const randColor = () => Math.random() > 0.5 ? "red" : "black";

function getNumber() {
  const num = randNum(1, 13);
  switch(num) {
    case 1:  return 'A';
    case 11: return 'J';
    case 12: return 'Q';
    case 13: return 'K';
    default: return num;
  }
}

function randSuit() {
  switch(randNum(1,4)) {
    case 1: return ["&hearts;", "heart"];
    case 2: return ["&spades;", "spade"];
    case 3: return ["&clubs;", "club"];
    case 4: return ["&diams;", "diamond"];
  }
}

function startTimer() {
  const minSpan = document.querySelector(".minutes");
  const secSpan = document.querySelector(".seconds");
  let minutes = 0;
  let seconds = 0;

  setInterval(() => {
    seconds++;
    seconds < 10 ? secSpan.innerHTML = `0${seconds}` : secSpan.innerHTML = seconds;

    secSpan.innerHTML % 10 === 0 && generateCard()

    if(seconds === 60) {
      seconds = 0;
      minutes++;
      minutes < 10 ? minSpan.innerHTML = `0${minutes}` : minSpan.innerHTML = minutes;
    }
  }, 1000);
}

function generateCard() {
  const [symbol, suit] = randSuit();
  let cardHTML = `
    <div class="card ${suit}">
        <div class="card-inner">
          <div class="card-front ">
                <span class="icon">${symbol}</span>
                <span class="number">${getNumber()}</span>
                <span class="icon">${symbol}</span>
          </div>
          <div class="card-back"></div>
        </div>
      </div>
  `;
  document.querySelector(".card-container").innerHTML = cardHTML;
  document.querySelector(".card-front").style.color = randColor();
}

window.onload = function() {
  generateCard();
  
  const minSpan     = document.querySelector(".minutes");
  const secSpan     = document.querySelector(".seconds");
  const addCardBtn  = document.querySelector("button");
  const widthInput  = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const card        = document.querySelector(".card");

  startTimer(minSpan, secSpan);

  addCardBtn.addEventListener( "click", generateCard);
  widthInput.addEventListener( "change", () => card.style.setProperty("width", `${widthInput.value}px`, "important"));
  heightInput.addEventListener("change", () => card.style.setProperty("height", `${heightInput.value}px`, "important"));
};
