import createPlayer from "./JavaScript/createPlayer.js";
import formSubmitHandler from "./JavaScript/formSubmitHandler.js";

import {
  generateLogs,
  showWinner,
  enemyAttack,
  changeHp,
  elHP,
  renderHP,
} from "./JavaScript/utils.js";

export const player1 = {
  id: 1,
  name: "SCORPION",
  hp: 100,
  img: "./assets/players/fightingStance/scorpion.gif",
  weapon: ["spear", "kunai", "fireball"],
  attack: function () {
    console.log(this.name + " attack");
  },
  changeHp,
  elHP,
  renderHP,
};

export const player2 = {
  id: 2,
  name: "KUNG LAO",
  hp: 100,
  img: "./assets/players/fightingStance/kunglao.gif",
  weapon: ["hat", "kick", "punch"],
  attack: function () {
    console.log(this.name + " attack");
  },
  changeHp,
  elHP,
  renderHP,
};


createPlayer("player1", player1);
createPlayer("player2", player2);

generateLogs("start", player1, player2);

const $form = document.querySelector(".control");


// обработчик события на форму
$form.addEventListener("submit", formSubmitHandler);
