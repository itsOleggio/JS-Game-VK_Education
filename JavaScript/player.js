export default class Player {
    constructor({ id, name, hp, img, weapon }) {
      this.id = id;
      this.name = name;
      this.hp = hp;
      this.img = img;
      this.weapon = weapon;
    }
  
    attack = () => {
      console.log(`${this.name} attack`);
    };
  
    changeHp = (amount) => {
      this.hp -= amount;
      if (this.hp <= 0) {
        this.hp = 0;
      }
      console.log(this.name, this.hp);
    };
  
    elHP = () => {
      return document.querySelector(
        `.${this.id === 1 ? "player1" : "player2"} .life`
      );
    };
  
    renderHP = () => {
      this.elHP().style.width = `${this.hp}%`;
  
      if (this.hp <= 0) {
        this.elHP().style.width = "0%";
        document.getElementById("Fight_Button").disabled = true;
        console.log("GAME OVER");
      }
    };
  }
  