const createPlayer = (playerClass, { name, hp, img }) => {
    const player = document.createElement("div");
    player.classList.add(playerClass);
  
    const progressbar = document.createElement("div");
    const character = document.createElement("div");
  
    progressbar.classList.add("progressbar");
    character.classList.add("character");
  
    const life = document.createElement("div");
    const nameDiv = document.createElement("div");
  
    life.classList.add("life");
    nameDiv.classList.add("name");
  
    nameDiv.textContent = name;
    life.style.width = hp > 0 ? `${hp}%` : "0%";
  
    const imgElement = document.createElement("img");
    imgElement.src = img;
  
    progressbar.appendChild(life);
    progressbar.appendChild(nameDiv);
    character.appendChild(imgElement);
  
    player.appendChild(progressbar);
    player.appendChild(character);
  
    document.querySelector(".arenas").appendChild(player);
  };
  
  export default createPlayer;
  