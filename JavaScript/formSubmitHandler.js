import { HIT } from "./constants.js";
import {enemyAttack, generateLogs } from "./utils.js";
import {player1, player2} from "../main.js";
import {showWinner} from "./utils.js";

const formSubmitHandler = function (event) {
    event.preventDefault();

    const $form = document.querySelector(".control");
    const $randomButton = document.getElementById("Fight_Button");

    if ($randomButton.disabled) {
      return;
    }
  
    let hitValue = "";
    let defenceValue = "";
  
    for (const radio of $form.querySelectorAll('input[type="radio"]')) {
      if (radio.checked) {
        if (radio.name === "hit") {
          hitValue = radio.value;
        }
        if (radio.name === "defence") {
          defenceValue = radio.value;
        }
      }
    }
  
    const playerChoice = {
      value: HIT[hitValue],
      hit: hitValue,
      defence: defenceValue,
    };
  
    console.log(playerChoice);
  
    const enemy = enemyAttack();
    console.log(`Enemy Hit: ${enemy.hit}, Enemy Defence: ${enemy.defence}`);
  
    const player1Damage = HIT[playerChoice.hit];
    const player2Defence = HIT[enemy.defence];
  
    if (player1Damage > player2Defence) {
      player2.changeHp(player1Damage - player2Defence);
      generateLogs("hit", player1, player2, player1Damage - player2Defence);
    } else {
      generateLogs("defence", player2, player1);
    }
  
    const player2Damage = enemy.value;
    const player1Defence = HIT[playerChoice.defence];
  
    if (player2Damage > player1Defence) {
      player1.changeHp(player2Damage - player1Defence);
      generateLogs("hit", player2, player1, player2Damage - player1Defence);
    } else {
      generateLogs("defence", player1, player2);
    }
  
    player1.renderHP();
    player2.renderHP();
  
    if (player1.hp <= 0 && player2.hp <= 0) {
      showWinner(null);
      $form.removeEventListener("submit", formSubmitHandler);
    } else if (player1.hp <= 0) {
      showWinner(player2.name);
      $form.removeEventListener("submit", formSubmitHandler);
    } else if (player2.hp <= 0) {
      showWinner(player1.name);
      $form.removeEventListener("submit", formSubmitHandler);
    }
  };

  export default formSubmitHandler; 