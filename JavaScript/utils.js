import {logs} from "./logs.js";
import { HIT, ATTACK } from "./constants.js";


export const generateLogs = (type, player1, player2, damage = 0) => {
    const $chat = document.querySelector(".chat");
    const time = new Date().toLocaleTimeString();
  
    let text = "";
    switch (type) {
      case "start":
        text = logs.start
          .replace("[time]", time)
          .replace("[player1]", player1.name)
          .replace("[player2]", player2.name);
        break;
  
      case "hit":
        text = logs.hit[getRandom(logs.hit.length) - 1]
          .replace("[playerKick]", player1.name)
          .replace("[playerDefence]", player2.name);
        text = `[${time}] ${text} [-${damage}] [${player2.hp}/100]`;
        break;
  
      case "end":
        const endMessage = logs.end[getRandom(logs.end.length) - 1];
        text = endMessage
          .replace("[playerWins]", player1.name)
          .replace("[playerLose]", player2.name);
        break;
  
      case "draw":
        text = "Бой закончился вничью!";
        break;
  
      default:
        // text = "Неизвестный лог";
        break;
    }
  
    const $p = document.createElement("p");
    $p.textContent = text;
    $chat.appendChild($p);
};

export const getRandom = (n) => Math.floor(Math.random() * n) + 1;

export const createReloadButton = () => {
  const reloadWrap = document.createElement("div");
  reloadWrap.classList.add("reloadWrap");

  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "Restart";

  button.addEventListener("click", () => {
    window.location.reload();
  });

  reloadWrap.appendChild(button);
  document.querySelector(".arenas").appendChild(reloadWrap);
};

export const showWinner = (winnerName) => {
  const $winTitle = document.createElement("div");
  $winTitle.classList.add("showResult");
  $winTitle.textContent = winnerName ? `${winnerName} wins!` : "DRAW!";
  document.querySelector(".arenas").appendChild($winTitle);

  createReloadButton();
};

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
  
    return {
      value: HIT[hit],
      hit,
      defence,
    };
  };




export function changeHp(amount) {
  this.hp -= amount;
  if (this.hp <= 0) {
    this.hp = 0;
  }
  console.log(this.name, this.hp);
}

export function elHP() {
  return document.querySelector(
    `.${this.id === 1 ? "player1" : "player2"} .life`
  );
}

const $randomButton = document.getElementById("Fight_Button");

export function renderHP() {
  this.elHP().style.width = this.hp + "%";

  if (this.hp <= 0) {
    this.elHP().style.width = "0%";
    $randomButton.disabled = true;
    console.log("GAME OVER");
  }
}
