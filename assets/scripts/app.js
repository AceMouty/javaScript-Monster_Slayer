
const MAX_HEALTH = 100;
const ATTACK_VALUE = 10;

let monsterHealth = MAX_HEALTH;
let playerHealth = MAX_HEALTH;

adjustHealthBars(MAX_HEALTH);

function attackHandler() {

  const damage = dealMonsterDamage(ATTACK_VALUE);
  monsterHealth -= damage;

}

attackBtn.addEventListener('click', attackHandler);