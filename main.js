function createPlayer(playerClass, playerObj) {
  // Создание игрока div.player1/player2
  const player = document.createElement("div");
  player.classList.add(playerClass);

  // Создание дочерних элементов
  const progressbar = document.createElement("div");
  const character = document.createElement("div");

  progressbar.classList.add("progressbar");
  character.classList.add("character");

  // Добавление в дочерний элемент progressbar блоки life и name
  const life = document.createElement("div");
  const name = document.createElement("div");

  life.classList.add("life");
  name.classList.add("name");

  name.textContent = playerObj.name;
  life.style.width = playerObj.hp > 0 ? playerObj.hp + "%" : "0%";

  // Добавление в дочерний элемент character изображения img
  const img = document.createElement("img");
  img.src = playerObj.img;

  progressbar.appendChild(life);
  progressbar.appendChild(name);
  character.appendChild(img);

  // Добавление в дочерний элемент
  player.appendChild(progressbar);
  player.appendChild(character);

  // Добавили на arenas
  const arenas = document.querySelector(".arenas");
  arenas.appendChild(player);
}

function getRandom(n) {
  return Math.floor(Math.random() * n) + 1;
}

function changeHp(amount) {
  this.hp -= amount;
  if (this.hp <= 0) {
    this.hp = 0;
  }
  console.log(this.name, this.hp);
}

function elHP() {
  return document.querySelector(
    `.${this.id === 1 ? "player1" : "player2"} .life`
  );
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";

  if (this.hp <= 0) {
    this.elHP().style.width = "0%";
    $randomButton.disabled = true;
    console.log("GAME OVER");
  }
}

function showWinner(winnerName) {
  if (winnerName) {
    console.log(winnerName + " wins");

    const $winTitle = document.createElement("div");
    $winTitle.classList.add("showResult");
    $winTitle.textContent = `${winnerName} wins!`;
    document.querySelector(".arenas").appendChild($winTitle);

    // Добавляем вызов generateLogs для конца игры
    if (winnerName === player1.name) {
      generateLogs("end", player1, player2);
    } else {
      generateLogs("end", player2, player1);
    }
  } else {
    console.log("DRAW");

    const $drawTitle = document.createElement("div");
    $drawTitle.classList.add("showResult");
    $drawTitle.textContent = "DRAW!";
    document.querySelector(".arenas").appendChild($drawTitle);
  }

  createReloadButton(); 
}


function createReloadButton() {
  const reloadWrap = document.createElement("div");
  reloadWrap.classList.add("reloadWrap");

  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "Restart";

  button.addEventListener("click", () => {
    window.location.reload();
  });

  // Вложение кнопки
  reloadWrap.appendChild(button);

  // Добавнение на страниицу
  document.querySelector(".arenas").appendChild(reloadWrap);
}

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: HIT[hit],
    hit,
    defence,
  };
}

function generateLogs(type, player1, player2, damage = 0) {
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
}

const player1 = {
  id: 1,
  name: "SCORPION",
  hp: 100,
  img: "./assets/players/fightingStance/scorpion.gif",
  weapon: ["spear", "kunai", "fireball"],
  attack: function () {
    console.log(this.name + "attack");
  },
  changeHp,
  elHP,
  renderHP,
};

const player2 = {
  id: 2,
  name: "KUNG LAO",
  hp: 100,
  img: "./assets/players/fightingStance/kunglao.gif",
  weapon: ["hat", "kick", "punch"],
  attack: function () {
    console.log(this.name + "attack");
  },
  changeHp,
  elHP,
  renderHP,
};

const $randomButton = document.getElementById("Fight_Button");

createPlayer("player1", player1);
createPlayer("player2", player2);

generateLogs("start", player1, player2);

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const $form = document.querySelector(".control");

$form.addEventListener("submit", function (event) {
  event.preventDefault();

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
    generateLogs('hit', player1, player2, player1Damage - player2Defence);
  } else {
    generateLogs('defence', player2, player1);
  }

  const player2Damage = enemy.value;
  const player1Defence = HIT[playerChoice.defence];

  if (player2Damage > player1Defence) {
    player1.changeHp(player2Damage - player1Defence);
    generateLogs('hit', player2, player1, player2Damage - player1Defence);
  } else {
    generateLogs('defence', player1, player2);
  }

  player1.renderHP();
  player2.renderHP();

  if (player1.hp <= 0 && player2.hp <= 0) {
    showWinner(null);
    $form.removeEventListener("submit", arguments.callee);
  } else if (player1.hp <= 0) {
    showWinner(player2.name);
    $form.removeEventListener("submit", arguments.callee);
  } else if (player2.hp <= 0) {
    showWinner(player1.name);
    $form.removeEventListener("submit", arguments.callee);
  }
});


// const $randomButton = document.getElementById("randomButton");
// $randomButton.addEventListener("click", function () {

//     player1.changeHp(getRandom(20));
//     player2.changeHp(getRandom(20));

//     player1.renderHP();
//     player2.renderHP();

//     if (player1.hp <= 0 && player2.hp <= 0) {
//         $randomButton.disabled = true;
//         showWinner(null);
//       } else if (player1.hp <= 0) {
//         $randomButton.disabled = true;
//         showWinner(player2.name);
//       } else if (player2.hp <= 0) {
//         $randomButton.disabled = true;
//         showWinner(player1.name);
//       }

// });
