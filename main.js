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
    return document.querySelector(`.${this.id === 1 ? "player1" : "player2"} .life`);
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
      console.log(winnerName + ' wins');

      
    //   const $winTitle = document.createElement('div');
    //   $winTitle.classList.add('winTitle');
    //   $winTitle.textContent = `${winnerName} wins!`;
    //   document.querySelector('.arenas').appendChild($winTitle);
    } else {
      console.log('DRAW');

    //   const $drawTitle = document.createElement('div');
    //   $drawTitle.classList.add('winTitle');
    //   $drawTitle.textContent = 'DRAW!';
    //   document.querySelector('.arenas').appendChild($drawTitle);
    }
  
    createReloadButton(); // Создаём кнопку перезапуска игры
  }
  

function createReloadButton() {
    const reloadWrap = document.createElement('div');
    reloadWrap.classList.add('reloadWrap');

    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'Restart';

    button.addEventListener("click", () => {
        window.location.reload();
      });
    
    // Вложение кнопки
    reloadWrap.appendChild(button);

    // Добавнение на страниицу
    document.querySelector('.arenas').appendChild(reloadWrap);

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

createPlayer("player1", player1);
createPlayer("player2", player2);

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
  };
  
const ATTACK = ["head", "body", "foot"];
  

const $randomButton = document.getElementById("randomButton");
$randomButton.addEventListener("click", function () {

    player1.changeHp(getRandom(20));
    player2.changeHp(getRandom(20));
    
    player1.renderHP();
    player2.renderHP();

    if (player1.hp <= 0 && player2.hp <= 0) {
        $randomButton.disabled = true;
        showWinner(null);
      } else if (player1.hp <= 0) {
        $randomButton.disabled = true;
        showWinner(player2.name);
      } else if (player2.hp <= 0) {
        $randomButton.disabled = true;
        showWinner(player1.name);
      }

});
