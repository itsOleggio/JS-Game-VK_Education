function createPlayer(playerClass, playerObj) {

    // Создание игрока div.player1/player2
    const player = document.createElement('div');
    player.classList.add(playerClass);

    // Создание дочерних элементов
    const progressbar = document.createElement('div');
    const character = document.createElement('div');

    progressbar.classList.add('progressbar');
    character.classList.add('character');

    // Добавление в дочерний элемент progressbar блоки life и name  
    const life = document.createElement('div');
    const name = document.createElement('div');

    life.classList.add('life');
    name.classList.add('name');

    name.textContent = playerObj.name;
    if (playerObj.hp > 0) {
        life.style.width = playerObj.hp + '%';
    } else {
        life.style.width = 0 + '%';
    }
    

    // Добавление в дочерний элемент character изображения img 
    const img = document.createElement('img');
    img.src = playerObj.img;

    progressbar.appendChild(life);
    progressbar.appendChild(name);
    character.appendChild(img);

    // Добавление в дочерний элемент
    player.appendChild(progressbar);
    player.appendChild(character);

    // Добавление в body
    document.body.appendChild(player);

    // Добавили на arenas
    const arenas = document.querySelector('.arenas');
    arenas.appendChild(player)
}


const player1 = {
    id: 1,
    name: 'SCORPION',
    hp: 100,
    img: './assets/players/fightingStance/scorpion.gif',
    weapon: ["spear","kunai","fireball"],
    attack: function(){
        console.log(this.name + "attack");
    },
}

const player2 = {
    id: 2,
    name: 'KUNG LAO',
    hp: 100,
    img: './assets/players/fightingStance/kunglao.gif',
    weapon: ["hat","kick","punch"],
    attack: function(){
        console.log(this.name + "attack");
    },
}

createPlayer('player1', player1);
createPlayer('player2', player2);
